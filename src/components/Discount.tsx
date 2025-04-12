import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Discount {
    id: number;
    title: string;
    discountPercentage: number;
    shopId: number;
}

interface ShopImage {
    id: number;
    imageData: string;
}

const Discount: React.FC = () => {
    const { shopId } = useParams<{ shopId: string }>();
    const navigate = useNavigate();
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [images, setImages] = useState<ShopImage[]>([]);
    const [title, setTitle] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/owner/shops/discount/${shopId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (!response.ok) throw new Error('Failed to load data');

                const data = await response.json();
                setDiscounts(data.discounts);
                setImages(data.images);
            } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        };
        fetchData();
    }, [shopId]);

    const handleDeleteDiscount = async (discountId: number) => {
        if (window.confirm("Are you sure you want to delete this discount?")) {
            try {
                const response = await fetch(
                    `http://localhost:8080/owner/shops/discount/delete/${discountId}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );

                const result = await response.json();
                if (response.ok) {
                    setDiscounts(discounts.filter(d => d.id !== discountId));
                    setSuccessMessage(result.message);
                } else {
                    setErrorMessage(result.error);
                }
            } catch (error) {
                setErrorMessage('Failed to delete discount');
            }
        }
    };

    const handleAddDiscount = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/owner/shops/discount/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                body: new URLSearchParams({
                    shopId: shopId || '',
                    title,
                    discount: discountPercentage.toString()
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setDiscounts([...discounts, data]);
                setSuccessMessage('Discount added successfully!');
                setTitle('');
                setDiscountPercentage('');
            } else {
                setErrorMessage(data.error);
            }
        } catch (error) {
            setErrorMessage('Failed to add discount');
        }
    };

    const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch(
                `http://localhost:8080/owner/shops/${shopId}/upload`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const data = await response.json();
            if (response.ok) {
                setImages([...images, data]);
                setSuccessMessage('Image uploaded successfully!');
                e.currentTarget.reset();
            } else {
                setErrorMessage(data.error);
            }
        } catch (error) {
            setErrorMessage('Failed to upload image');
        }
    };

    const handleDeleteImage = async (imageId: number) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                const response = await fetch(
                    `http://localhost:8080/owner/shops/${shopId}/delete-image/${imageId}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );

                const result = await response.json();
                if (response.ok) {
                    setImages(images.filter(img => img.id !== imageId));
                    setSuccessMessage(result.message);
                } else {
                    setErrorMessage(result.error);
                }
            } catch (error) {
                setErrorMessage('Failed to delete image');
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
            height: '100%',
            margin: 0,
            paddingTop: '90px',
            overflowX: 'hidden'
        }}>
            <h1>Shop Discounts</h1>

            {discounts.length > 0 ? (
                <div style={{ marginBottom: '30px' }}>
                    {discounts.map(discount => (
                        <div key={discount.id} style={{
                            background: '#f9f9f9',
                            padding: '10px 20px',
                            color: 'red',
                            margin: '10px auto',
                            borderRadius: '8px',
                            boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                            width: '300px'
                        }}>
                            <h3>{discount.title}</h3>
                            <p>{discount.discountPercentage}% OFF</p>
                            <button
                                onClick={() => handleDeleteDiscount(discount.id)}
                                style={{
                                    marginTop: '10px',
                                    padding: '6px 14px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'background-color 0.3s'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
                            >
                                Delete Discount
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <form onSubmit={handleAddDiscount} style={{ marginBottom: '30px' }}>
                    <h2>Add Discount</h2>
                    <input
                        type="text"
                        placeholder="Discount Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="number"
                        placeholder="Discount Percentage"
                        value={discountPercentage}
                        onChange={e => setDiscountPercentage(e.target.value)}
                        required
                    />
                    <br />
                    <button
                        type="submit"
                        style={{
                            marginTop: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
                    >
                        Add Discount
                    </button>
                </form>
            )}

            <h2>Shop Images</h2>
            <form onSubmit={handleImageUpload} encType="multipart/form-data" style={{ marginBottom: '20px' }}>
                <input type="file" name="imageFile" required />
                <button
                    type="submit"
                    style={{
                        marginLeft: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0069d9')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                    Upload Image
                </button>
            </form>

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
                marginBottom: '40px'
            }}>
                {images.map(image => (
                    <div key={image.id} style={{ position: 'relative' }}>
                        <img
                            src={`data:image/png;base64,${image.imageData}`}
                            alt="Shop"
                            style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                        />
                        <button
                            onClick={() => handleDeleteImage(image.id)}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                background: 'rgba(0,0,0,0.8)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ❌
                        </button>
                    </div>
                ))}
            </div>

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Discount;
