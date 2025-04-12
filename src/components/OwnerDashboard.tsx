import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

type Shop = {
  id: number;
  name: string;
  category: {
    name: string;
  };
};

// The component now only needs onLogout from the parent
type OwnerDashboardProps = {
  onLogout: () => void;
};

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ onLogout }) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // --- Fetch Shops (runs once on mount) ---
  useEffect(() => {
    const fetchShops = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("No token found. Logging out.");
        setError("Authentication token not found. Please log in again.");
        setIsLoading(false);
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
          onLogout();
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch shops:', response.status, errorText);
          setError(`Failed to fetch shops (Status: ${response.status}). Please try again later.`);
        }
      } catch (err) {
        console.error('Network error fetching shops:', err);
        setError('A network error occurred while fetching shops. Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only once

  // --- NEW Handle Shop Deletion (integrating the provided logic) ---
  // Renamed from handleDeleteClick for clarity if desired, or keep the old name.
  const deleteShopHandler = useCallback(async (shopId: number) => {
    // Confirmation is now inside the handler
    if (window.confirm(`Are you sure you want to delete shop ID ${shopId}? This action cannot be undone.`)) {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Authentication error. Cannot delete shop. Please log in again.");
            console.error("Delete aborted: No token found.");
            onLogout(); // Logout if no token during delete attempt
            return; // Stop the deletion process
        }

        // Store original shops *before* optimistic update, in case of failure
        const originalShops = [...shops];
        // Optimistic Update (remove shop from UI immediately)
        // NOTE: We update state *before* the API call returns for better UX
        setShops(currentShops => currentShops.filter(shop => shop.id !== shopId));

        try {
            // CORRECTED URL: Ensure this matches your backend @DeleteMapping exactly
            // It uses /owner/delete/{shopId} based on your provided code snippet
            const apiUrl = `http://localhost:8080/owner/delete/${shopId}`;
            console.log(`Attempting to DELETE ${apiUrl}`); // Log the URL being hit

            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    // "Content-Type" is generally not needed for DELETE requests with no body
                },
            });

            if (response.ok) {
                // Success! The optimistic update was correct.
                console.log(`Successfully deleted shop ${shopId} via API.`);
                alert("Shop deleted successfully!");
                // No need to setShops again here, it was done optimistically
            } else {
                // API call failed, handle specific errors
                console.error(`Failed to delete shop ${shopId}. Status: ${response.status}`);
                 // Rollback the optimistic update
                 setShops(originalShops);

                if (response.status === 403) {
                     alert("Failed to delete the shop: You do not have permission (403 Forbidden).");
                     // Potentially log out if forbidden indicates a deeper auth issue
                     // onLogout();
                } else if (response.status === 404) {
                     alert("Failed to delete the shop: Shop not found (404 Not Found).");
                     // The shop might have been deleted already, UI was stale. Refresh might be needed.
                } else {
                    // Try to get more specific error text from the response body
                    let errorText = response.statusText; // Fallback
                    try {
                       const body = await response.text(); // Read body as text
                       if (body) { // Only use if body is not empty
                          errorText = body;
                       }
                    } catch(e) { /* Ignore if reading body fails */ }
                    alert(`Failed to delete the shop (${response.status}): ${errorText}`);
                }
            }
        } catch (error) {
            console.error("Network or other error deleting shop:", error);
            alert(`An error occurred while trying to delete the shop: ${error instanceof Error ? error.message : 'Unknown error'}`);
             // Rollback the optimistic update on network/other errors too
             setShops(originalShops);
        }
      }
    // Dependencies: 'shops' is needed for the optimistic update & rollback, 'onLogout' is used if token is missing
  }, [shops, onLogout]);


  // --- Handle Add Shop Navigation ---
  const handleAddShopClick = useCallback(() => {
    navigate('/owner/shops/add');
  }, [navigate]);


  // --- Render Component ---
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
                    {/* Call the new integrated delete handler */}
                    <button className="delete-btn" onClick={() => deleteShopHandler(shop.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Styles */}
      <style>{`
        /* Styles remain the same */
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
           background-color:rgb(235, 12, 12);
        }
        .logout-btn:hover {
           background-color:rgb(223, 50, 38);
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