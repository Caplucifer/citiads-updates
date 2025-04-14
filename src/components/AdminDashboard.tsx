import React, { useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

const AdminDashboard: React.FC<Props> = ({ isLoggedIn, handleLogout }) => {
    const [loggedIn, setLoggedIn] = React.useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            setLoggedIn(isLoggedIn);
        };
        checkLoginStatus();
    }, [isLoggedIn]);

    return (
        <div className="relative">
            <style>
                {`
                .button-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    margin-top: 30px;
                }
                .button-container button {
                    width: 220px;
                    padding: 12px;
                    font-size: 18px;
                    cursor: pointer;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    transition: 0.3s ease-in-out;
                    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
                }
                .btn-list {
                    background: #1e90ff;
                    color: white;
                }
                .btn-categories {
                    background: #2ecc71;
                    color: white;
                }
                .btn-shops {
                    background: #f39c12;
                    color: white;
                }
                .btn-slider {
                    background: #9b59b6;
                    color: white;
                }
                .button-container button:hover {
                    transform: scale(1.1);
                    opacity: 0.9;
                }
                h2 {
                    margin-top: 80px;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 15px 30px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                }
                `}
            </style>

            <h2>Welcome, Admin!</h2>

            <div className="button-container">
                <Link to="/user-list">
                    <button className="btn-list">List</button>
                </Link>

                <Link to="/admin/categories">
                    <button className="btn-categories">Categories</button>
                </Link>

                <Link to="/owner/shops">
                    <button className="btn-shops">Shops</button>
                </Link>

                <Link to="/admin/slider">
                    <button className="btn-slider">Slider</button>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
