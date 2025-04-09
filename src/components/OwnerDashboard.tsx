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
  shops: Shop[];
  onDelete: (shopId: number) => void;
  onAddShop: () => void;
  onLogout: () => void;
};

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ shops, onDelete, onAddShop, onLogout }) => {
  const navigate = useNavigate();

  const handleDelete = (shopId: number) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      onDelete(shopId);
    }
  };

  const handleAddShop = () => {
    navigate('/owner/shops/add'); // Redirect to the Shop page
  };

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