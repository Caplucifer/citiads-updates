import React from "react";

const UserDashboard = ({ isLoggedIn, handleLogout }: { isLoggedIn: boolean; handleLogout: () => void; }) => {
    return (
        <div>
            <style>
                {`
                .logout-btn {
                    background-color: #2ecc71; /* Green background */
                    color: white; /* White text */
                    border: none; /* No border */
                    padding: 10px 20px; /* Padding for size */
                    border-radius: 5px; /* Rounded corners */
                    font-size: 16px; /* Font size */
                    cursor: pointer; /* Pointer cursor on hover */
                    transition: background-color 0.3s; /* Smooth transition */
                }

                .logout-btn:hover {
                    background-color: #27ae60; /* Darker green on hover */
                }
                `}
            </style>
            <h1>User Dashboard</h1>
            {isLoggedIn && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
        </div>
    );
};

export default UserDashboard;
