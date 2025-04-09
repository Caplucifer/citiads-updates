import React from 'react';
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
  onLogout: () => void;
};

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ shops, onDelete, onLogout }) => {
  const navigate = useNavigate();

  const handleDelete = (shopId: number) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      onDelete(shopId);
    }
  };

  const handleAddShop = () => {
    navigate('/owner/shops/add'); // Redirect to the AddShop page
  };

  return (
    <div className="dashboard-container">
      <h2>Owner Dashboard</h2>

      <button className="add-shop-btn" onClick={handleAddShop}>
        Add Shop
      </button>

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
          {shops.map((shop) => (
            <tr key={shop.id}>
              <td>{shop.id}</td>
              <td>
                <a href={`/owner/shops/discount/${shop.id}`} className="shop-link">
                  {shop.name}
                </a>
              </td>
              <td>{shop.category.name}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(shop.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>

      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          padding: 0;
          background-color: #f4f4f4;
        }

        .dashboard-container {
          max-width: 800px;
          margin: auto;
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
        }

        .add-shop-btn {
          display: block;
          margin: 10px auto;
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          text-align: center;
        }

        .shop-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .shop-table th,
        .shop-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }

        .shop-table th {
          background-color: #007bff;
          color: white;
        }

        .delete-btn {
          padding: 5px 10px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          background-color: #dc3545;
          color: white;
          text-decoration: none;
        }

        .delete-btn:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
};

export default OwnerDashboard;
