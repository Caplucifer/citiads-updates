import React from 'react';

const AddShop: React.FC = () => {
    return (
        <div style={{ 
            background: 'white',
            color: 'black',
            textAlign: 'center', 
            padding: '50px',
            minHeight: '100vh', // Ensure it takes full height
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '20px', 
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(36, 32, 32, 0.5)' // Add shadow for better visibility
            }}>Add Shop</h2>
            <div style={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                padding: '20px', 
                borderRadius: '10px', 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', 
                display: 'inline-block', 
                width: '300px',
                marginTop: '20px' // Add margin to separate from the title
            }}>
                <form action="/owner/shops/save" method="post">
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Shop Name:</label>
                    <input type="text" id="name" name="name" required style={{ 
                        width: '100%', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        border: '1px solid black',
                        marginBottom: '15px' 
                    }} />

                    <label htmlFor="category" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Category:</label>
                    <select id="category" name="category.id" required style={{ 
                        width: '100%', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        border: '1px solid black',
                        marginBottom: '15px' 
                    }}>
                        <option value="">-- Select --</option>
                        {/* Dynamically populate categories here */}
                    </select>

                    <label htmlFor="userId" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>User ID:</label>
                    <input type="number" id="userId" name="userId" style={{ 
                        width: '100%', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        border: '1px solid black',
                        marginBottom: '15px' 
                    }} />

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
