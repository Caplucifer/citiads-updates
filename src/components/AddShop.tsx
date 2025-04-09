import React, { useEffect, useState } from 'react';

const AddShop: React.FC = () => {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [name, setName] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [userId, setUserId] = useState('');

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/owner/categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }

            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const payload = {
            name,
            category: { id: parseInt(selectedCategoryId) }
        };

        try {
            const response = await fetch(`http://localhost:8080/owner/shops/save${userId ? `?userId=${userId}` : ''}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.text();
            if (response.ok) {
                alert(result);
                setName('');
                setSelectedCategoryId('');
                setUserId('');
            } else {
                alert("Error: " + result);
            }
        } catch (error) {
            console.error("Error saving shop:", error);
        }
    };

    return (
        <div style={{
            background: 'white',
            color: 'black',
            textAlign: 'center',
            padding: '50px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h2 style={{
                fontSize: '2.5rem',
                marginBottom: '20px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(36, 32, 32, 0.5)'
            }}>Add Shop</h2>

            <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                display: 'inline-block',
                width: '300px',
                marginTop: '20px'
            }}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Shop Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid black',
                            marginBottom: '15px'
                        }}
                    />

                    <label htmlFor="category" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Category:</label>
                    <select
                        id="category"
                        value={selectedCategoryId}
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid black',
                            marginBottom: '15px'
                        }}
                    >
                        <option value="">-- Select --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <label htmlFor="userId" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>User ID:</label>
                    <input
                        type="number"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid black',
                            marginBottom: '15px'
                        }}
                    />

                    <button type="submit" style={{
                        width: '100%',
                        background: '#2ecc71',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        transition: 'background 0.3s'
                    }}>Save</button>
                </form>

                <div style={{ marginTop: '20px' }}>
                    <button style={{
                        background: '#3498db',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        transition: 'background 0.3s'
                    }} onClick={() => window.history.back()}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default AddShop;
