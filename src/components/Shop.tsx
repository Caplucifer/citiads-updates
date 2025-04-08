import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
}

interface Shop {
    id: number;
    name: string;
}

const Shop: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/admin/categories");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const fetchShopsByCategory = async (categoryId: number) => {
        setSelectedCategory(categoryId);
        setLoading(true);
        try {
            const response = await fetch(`/admin/shops/byCategory/${categoryId}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const shopsData = await response.json();
            setShops(shopsData);
        } catch (error) {
            console.error("Error fetching shops:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteShop = async (shopId: number) => {
        if (window.confirm("Are you sure you want to delete this shop?")) {
            try {
                const response = await fetch("/owner/shops/delete", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `shopId=${shopId}`,
                });
                if (response.ok) {
                    setShops(shops.filter(shop => shop.id !== shopId));
                    alert("Shop deleted successfully!");
                } else {
                    alert("Failed to delete the shop!");
                }
            } catch (error) {
                console.error("Error deleting shop:", error);
            }
        }
    };

    return (
        <div>
           <style>
{`
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f7f8;
        margin: 0;
        padding: 0;
    }

    .container {
        max-width: 800px;
        margin: 40px auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
    }

    h2 {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 30px;
    }

    label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
        color: #34495e;
    }

    select {
        width: 100%;
        padding: 10px;
        margin-bottom: 30px;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 16px;
    }

    .shop-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .shop-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background-color: #ecf0f1;
        border-radius: 8px;
        transition: background-color 0.3s;
    }

    .shop-item:hover {
        background-color: #dfe6e9;
    }

    .shop-link {
        font-size: 18px;
        font-weight: 500;
        text-decoration: none;
        color: #2980b9;
        transition: color 0.3s;
    }

    .shop-link:hover {
        color: #1abc9c;
    }

    .delete-button {
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 8px 14px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s;
    }

    .delete-button:hover {
        background-color: #c0392b;
    }

    .add-btn {
        display: inline-block;
        margin-top: 25px;
        background-color: #27ae60;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        font-weight: bold;
        border-radius: 6px;
        transition: background-color 0.3s;
    }

    .add-btn:hover {
        background-color: #219150;
    }

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        color: white;
        cursor: pointer;
        margin-top: 10px;
        transition: background-color 0.3s;
    }

    button:hover {
        opacity: 0.9;
    }

    button[style*="#3498db"] {
        background-color: #3498db;
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


            <div className="container">
                <h2>Shops</h2>

                <label htmlFor="category">Select Category:</label>
                <select id="category" onChange={(e) => fetchShopsByCategory(Number(e.target.value))}>
                    <option value="">-- Select --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <div className="shop-container">
                    {loading ? (
                        <p>Loading shops...</p>
                    ) : (
                        shops.map(shop => (
                            <div className="shop-item" key={shop.id}>
                                <Link to={`/owner/shops/discount/${shop.id}`} className="shop-link">{shop.name}</Link>
                                <button onClick={() => deleteShop(shop.id)} className="delete-button">Delete</button>
                            </div>
                        ))
                    )}
                </div>

                <Link to="/owner/shops/add" className="add-btn">Add Shop</Link>
                <div style={{ marginTop: '20px' }}>
                    <button style={{ background: '#3498db' }} onClick={() => window.history.back()}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default Shop;
