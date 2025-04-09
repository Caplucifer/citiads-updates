import React, { useEffect, useState, useCallback } from 'react'; // Import useCallback for internal handlers if needed
import { useNavigate } from 'react-router-dom';

type Shop = {
  id: number;
  name: string;
  category: {
    name: string;
  };
};

type OwnerDashboardProps = {
  // It's still recommended for the PARENT component to memoize these props using useCallback
  onDelete: (shopId: number) => Promise<void>; // Or (shopId: number) => void if not async
  onLogout: () => void;
};

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ onDelete, onLogout }) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch shops only ONCE when the component mounts
  useEffect(() => {
    // Define the async function inside the effect
    const fetchShops = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("No token found. Logging out.");
        setError("Authentication token not found. Please log in again.");
        setIsLoading(false);
        // Call the onLogout function captured during the initial render
        onLogout();
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/owner/shops/list', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setShops(data);
        } else if (response.status === 401) {
          console.warn('Session expired or unauthorized. Logging out.');
          alert('Session expired. Please log in again.');
          // Call the onLogout function captured during the initial render
          onLogout();
        } else {
          console.error('Failed to fetch shops:', response.status, response.statusText);
          setError(`Failed to fetch shops (Status: ${response.status}). Please try again later.`);
        }
      } catch (error) {
        console.error('Error fetching shops:', error);
        setError('An network error occurred while fetching shops. Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops(); // Execute the fetch function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- **THE FIX**: Empty dependency array ensures this effect runs only ONCE on mount.
          // We removed `onLogout` from here to prevent re-fetching if the parent provides unstable function references.
          // The `onLogout` used inside the effect is the one available during the initial mount.

  // Internal handler for the delete button click
  // Using useCallback here is optional but good practice if this handler were passed down further
  // or used in another effect's dependency array *within this component*.
  const handleDeleteClick = useCallback(async (shopId: number) => {
    if (window.confirm('Are you sure you want to delete this shop? This action cannot be undone.')) {
      const originalShops = [...shops]; // Create a copy for potential rollback
      // Optimistic update
      setShops((prevShops) => prevShops.filter((shop) => shop.id !== shopId));

      try {
        // Call the onDelete function passed as a prop from the parent
        await onDelete(shopId);
        console.log(`Shop ${shopId} delete initiated via parent handler.`);
        // On success, the optimistic update is correct. Optionally show success message.
      } catch (error) {
        // On failure, revert the optimistic update and show error
        console.error(`Failed to delete shop ${shopId} via parent handler:`, error);
        alert(`Failed to delete shop ${shopId}. Restoring list.`);
        setShops(originalShops); // Rollback UI change
      }
    }
  }, [shops, onDelete]); // Depends on current 'shops' for rollback and the 'onDelete' prop

  // Internal handler for adding a shop
  const handleAddShopClick = useCallback(() => {
    navigate('/owner/shops/add');
  }, [navigate]); // Depends on navigate

  return (
    <div className="dashboard-container">
      <h2>Owner Dashboard</h2>

      <button className="add-shop-btn" onClick={handleAddShopClick}>
        Add New Shop
      </button>

      {isLoading && <p>Loading shops...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!isLoading && !error && (
        <table className="shop-table">
          <thead>
            <tr>
              <th>Shop Id</th>
              <th>Shop Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shops.length === 0 && !isLoading ? (
              <tr>
                <td colSpan={4}>You haven't added any shops yet.</td>
              </tr>
            ) : (
              shops.map((shop) => (
                <tr key={shop.id}>
                  <td>{shop.id}</td>
                  <td>
                    <a href={`/owner/shops/discount/${shop.id}`} className="shop-link">
                      {shop.name}
                    </a>
                  </td>
                  <td>{shop.category?.name || 'N/A'}</td>
                  <td>
                    {/* Call the internal handler */}
                    <button className="delete-btn" onClick={() => handleDeleteClick(shop.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Logout button still uses the direct prop */}
      <button onClick={onLogout} style={{ marginTop: '20px' }} className="logout-btn">
        Logout
      </button>

      {/* Styles remain the same */}
      <style>{`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
          color: #333;
        }

        .dashboard-container {
          max-width: 900px;
          margin: 40px auto;
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #343a40;
          margin-bottom: 25px;
        }

        .add-shop-btn, .logout-btn {
          display: block;
          margin: 15px auto;
          padding: 12px 25px;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          text-align: center;
          font-size: 1rem;
          transition: background-color 0.2s ease;
        }
        .add-shop-btn {
          background-color: #28a745;
        }
        .add-shop-btn:hover {
          background-color: #218838;
        }
        .logout-btn {
           background-color: #6c757d;
        }
        .logout-btn:hover {
           background-color: #5a6268;
        }


        .shop-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
        }

        .shop-table th,
        .shop-table td {
          border: 1px solid #dee2e6;
          padding: 12px 15px;
          text-align: left;
        }

        .shop-table th {
          background-color: #007bff;
          color: white;
          font-weight: 600;
        }

         .shop-table td:last-child, .shop-table th:last-child {
             text-align: center;
         }


        .shop-table tbody tr:nth-child(odd) {
          background-color: #f8f9fa;
        }
         .shop-table tbody tr:hover {
          background-color: #e9ecef;
        }

        .delete-btn {
          padding: 6px 12px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          background-color: #dc3545;
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
          transition: background-color 0.2s ease;
        }

        .delete-btn:hover {
          background-color: #c82333;
        }

        .shop-link {
            color: #0056b3;
            text-decoration: none;
            font-weight: 500;
        }
        .shop-link:hover {
            text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default OwnerDashboard;