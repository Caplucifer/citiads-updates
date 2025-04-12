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

    // Fetch Discounts and Images
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
    }, [shopId, token]);

    // Handle Discount Deletion
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

    // Add Discount
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

    // Handle Image Upload
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

    // Handle Image Deletion
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
        <div className="bg-white text-black text-center flex flex-col items-center justify-start min-h-screen pt-24 overflow-x-hidden">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Shop Discounts</h1>

            {/* Display Discounts */}
            {discounts.length > 0 ? (
                <div className="mb-8">
                    {discounts.map((discount) => (
                        <div
                            key={discount.id}
                            className="bg-gray-100 text-red-600 p-5 my-3 rounded-lg shadow-md w-72 mx-auto"
                        >
                            <h3 className="text-xl font-semibold">{discount.title}</h3>
                            <p>{discount.discountPercentage}% OFF</p>
                            <button
                                onClick={() => handleDeleteDiscount(discount.id)}
                                className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Delete Discount
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-lg text-gray-500">No discounts available</p>
            )}

            {/* Add Discount Form */}
            <form
                onSubmit={handleAddDiscount}
                className="mb-8 flex flex-col items-center gap-3"
            >
                <h2 className="text-2xl font-semibold mb-2">Add Discount</h2>
                <input
                    type="text"
                    placeholder="Discount Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border border-gray-300 rounded px-3 py-2 w-64"
                />
                <input
                    type="number"
                    placeholder="Discount Percentage"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    required
                    min="1"
                    max="100"
                    className="border border-gray-300 rounded px-3 py-2 w-64"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                >
                    Add Discount
                </button>
            </form>

            {/* Success and Error Messages */}
            {successMessage && <p className="text-green-600 font-medium">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 font-medium">{errorMessage}</p>}

            {/* Upload Images Section */}
            <h2 className="text-2xl font-semibold mb-4">Shop Images</h2>

            <form
                onSubmit={handleImageUpload}
                encType="multipart/form-data"
                className="mb-6"
            >
                <input
                    type="file"
                    name="imageFile"
                    required
                    className="mb-2"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Upload Image
                </button>
            </form>

            {/* Display Uploaded Images */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 w-11/12 max-w-screen-xl bg-white bg-opacity-80 p-6 rounded-lg shadow-xl border-2 border-red-500 mb-10">
                {images.map((image) => (
                    <div key={image.id} className="relative">
                        <img
                            src={`data:image/png;base64,${image.imageData}`}
                            alt="Shop"
                            className="w-full h-auto rounded-lg"
                        />
                        <button
                            onClick={() => handleDeleteImage(image.id)}
                            className="absolute top-1 right-1 bg-black bg-opacity-80 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-90"
                        >
                            ❌
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Discount;
