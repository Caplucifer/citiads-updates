import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    role: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token"); // Get JWT token
                const response = await fetch("http://localhost:8080/admin/list", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Set Authorization header
                    }
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <style>
                {`
                body {
                    text-align: center;
                    margin: 50px;
                }
                .header {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.9);
                    padding: 15px 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                }
                .logo {
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: #2a6b9c;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: color 0.3s ease;
                    margin: 0;
                }
                table {
                    width: 80%;
                    margin: 20px auto;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 10px;
                    border: 1px solid black;
                }
                th {
                    background-color: #007bff;
                    color: white;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                .back-button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    font-size: 16px;
                    display: inline-block;
                }
                h2 {
                    margin-top: 80px;
                }
                .back-button:hover {
                    background-color: #a50f23;
                }
                `}
            </style>

            <h2>User List</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to="/admin" className="back-button">Back to Dashboard</Link>
        </div>
    );
};

export default UserList;
