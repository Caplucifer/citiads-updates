import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Discount: React.FC = () => {
    const navigate = useNavigate();
    const [discounts, setDiscounts] = useState([]); // Assuming discounts will be fetched from an API
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleDeleteDiscount = async (discountId: number, shopId: number) => {
        if (window.confirm("Are you sure you want to delete this discount?")) {
            try {
                const response = await fetch(`/owner/shops/discount/delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ discountId, shopId }),
                });

                if (response.ok) {
                    setSuccessMessage('Discount deleted successfully!');
                    // Update the discounts state to remove the deleted discount
                    setDiscounts(discounts.filter(discount => discount.id !== discountId));
                } else {
                    setErrorMessage('Failed to delete discount.');
                }
            } catch (error) {
                setErrorMessage('An error occurred while deleting the discount.');
            }
        }
    };

    return (
        <div style={{ 
            background: 'white',
            color: 'black', 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'flex-start', 
            height: '100vh', 
            margin: 0, 
            paddingTop: '90px', 
            overflowX: 'hidden' 
        }}>
            <div style={{ 
                width: '100%', 
                background: '#f39c12', 
                color: 'white', 
                padding: '15px', 
                fontSize: '18px', 
                fontWeight: 'bold', 
                textAlign: 'center', 
                position: 'fixed', 
                top: '60px', 
                left: 0, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                boxSizing: 'border-box' 
            }}>
                <span>Discount: {discounts.length > 0 ? `${discounts[0].title} - Upto ${discounts[0].discountPercentage}% Off` : 'No discounts available'}</span>
                {discounts.length > 0 && (
                    <button 
                        onClick={() => handleDeleteDiscount(discounts[0].id, discounts[0].shopId)} 
                        style={{ 
                            background: '#e74c3c', 
                            color: 'white', 
                            border: 'none', 
                            padding: '8px 20px', 
                            fontSize: '14px', 
                            borderRadius: '5px', 
                            cursor: 'pointer' 
                        }}
                    >
                        Delete Discount
                    </button>
                )}
            </div>

            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: '20px', 
                width: '100%', 
                maxWidth: '1200px', 
                marginTop: '150px' 
            }}>
                {discounts.length === 0 && (
                    <div style={{ 
                        background: 'rgba(255, 255, 255, 0.8)',
                        padding: '20px', 
                        borderRadius: '10px', 
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', 
                        width: '350px', 
                        textAlign: 'center', 
                        border: '1px solid black'
                    }}>
                        <h2>Add Discount</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input type="hidden" name="shopId" value="1" /> {/* Replace with actual shop ID */}
                            <label htmlFor="title">Discount Title:</label>
                            <input type="text" id="title" name="title" required style={{ 
                                width: '90%', 
                                padding: '10px', 
                                margin: '10px 0', 
                                borderRadius: '5px', 
                                border: '1px solid black'
                            }} />
                            <label htmlFor="discount">Enter Discount Percentage:</label>
                            <input type="number" id="discount" name="discount" required min="1" max="100" style={{ 
                                width: '90%', 
                                padding: '10px', 
                                margin: '10px 0', 
                                borderRadius: '5px', 
                                border: '1px solid black'
                            }} />
                            <button type="submit" style={{ 
                                background: '#2ecc71', 
                                color: 'white', 
                                cursor: 'pointer', 
                                fontWeight: 'bold', 
                                padding: '10px', 
                                borderRadius: '5px', 
                                border: 'none', 
                                width: '90%' 
                            }}>Add Discount</button>
                        </form>
                    </div>
                )}

                <div style={{ 
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '20px', 
                    borderRadius: '10px', 
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', 
                    width: '350px', 
                    textAlign: 'center', 
                    border: '1px solid black'
                }}>
                    <h2>Upload Shop Images</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type="file" name="imageFile" accept="image/*" required style={{ 
                            width: '90%', 
                            padding: '10px', 
                            margin: '10px 0', 
                            borderRadius: '5px', 
                            border: '1px solid black'
                        }} />
                        <button type="submit" style={{ 
                            background: '#2ecc71', 
                            color: 'white', 
                            cursor: 'pointer', 
                            fontWeight: 'bold', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            border: 'none', 
                            width: '90%' 
                        }}>Upload</button>
                    </form>
                    <div style={{ marginTop: '10px' }}>
                        <button style={{ 
                            background: '#3498db', 
                            color: 'white', 
                            cursor: 'pointer', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            border: 'none', 
                            width: '90%' 
                        }} onClick={() => navigate(-1)}>Back</button>
                    </div>
                </div>
            </div>

            <h2>Shop Images</h2>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '20px', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '90%', 
                maxWidth: '1200px', 
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '20px', 
                borderRadius: '10px', 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', 
                marginTop: '20px' 
            }}>
                {/* Dynamically render images here */}
            </div>

            {successMessage && (
                <div style={{ 
                    position: 'fixed', 
                    top: '90px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    background: 'rgba(0, 255, 0, 0.8)', 
                    color: 'white', 
                    padding: '10px 20px', 
                    borderRadius: '5px', 
                    fontWeight: 'bold', 
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', 
                    zIndex: 1100, 
                    textAlign: 'center' 
                }}>
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div style={{ 
                    position: 'fixed', 
                    top: '90px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    background: 'rgba(255, 0, 0, 0.8)', 
                    color: 'white', 
                    padding: '10px 20px', 
                    borderRadius: '5px', 
                    fontWeight: 'bold', 
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', 
                    zIndex: 1100, 
                    textAlign: 'center' 
                }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default Discount;
