import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
}

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState(""); // NEW

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:8080/admin/categories", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching category data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const confirmDelete = async (categoryId: number) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8080/admin/categories/${categoryId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
                } else {
                    console.error("Failed to delete category");
                }
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const formData = new URLSearchParams();
            formData.append("name", newCategoryName);

            const response = await fetch("http://localhost:8080/admin/categories/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${token}`
                },
                body: formData.toString()
            });

            if (response.ok) {
                const newCategory = await response.json(); // Optional
                setCategories(prev => [...prev, newCategory]);
                setNewCategoryName("");
            } else {
                console.error("Failed to add category");
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

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
                    margin-top: 80px;
                }
                .logout-btn {
                    background-color: #2ecc71;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .logout-btn:hover {
                    background-color: #27ae60;
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
                <form onSubmit={handleAddCategory}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Enter Category Name" 
                        required 
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <button type="submit" className="add-btn">Add Category</button>
                </form>
            </div>

            <Link to="/admin" className="back-button">Back to Dashboard</Link>
        </div>
    );
};

export default CategoryList;
