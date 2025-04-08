import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
}

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]); // State to hold category data
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/admin/categories");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setCategories(data); // Set the fetched category data
            } catch (error) {
                console.error("Error fetching category data:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchCategories();
    }, []); // Empty dependency array to run only on mount

    const confirmDelete = (categoryId: number) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            // Logic to delete the category
            // You can implement the delete API call here
            console.log(`Deleting category with ID: ${categoryId}`);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading message while fetching
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
                    width: 60%;
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
                .form-container {
                    margin-top: 20px;
                }
                input {
                    padding: 8px;
                    margin-right: 10px;
                }
                .add-btn, .delete-btn {
                    padding: 10px 15px;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
                .add-btn {
                    background-color: #28a745;
                }
                .delete-btn {
                    background-color: #dc3545;
                }
                .back-button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    font-size: 16px;
                    display: inline-block;
                }
                .add-btn:hover, .delete-btn:hover, .back-button:hover {
                    opacity: 0.8;
                }
                h2 {
                    margin-top: 80px; /* Adjust as needed */
                }
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


            <h2>Category List</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <button 
                                    type="button" 
                                    className="delete-btn" 
                                    onClick={() => confirmDelete(category.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="form-container">
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        // Logic to add a new category
                        console.log("Adding new category");
                    }}
                >
                    <input type="text" name="name" placeholder="Enter Category Name" required />
                    <button type="submit" className="add-btn">Add Category</button>
                </form>
            </div>

            <Link to="/admin" className="back-button">Back to Dashboard</Link>
        </div>
    );
};

export default CategoryList;
