import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setSuccessMessage('OTP has been sent to your email.');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedOtp = otp.toString().trim();
      
        if (!trimmedOtp || trimmedOtp.length !== 4) {
            setError("OTP must be 4 digits.");
            return;
        }
      
        try {
            const response = await fetch('http://localhost:8080/forgot/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                credentials: 'include',
                body: new URLSearchParams({ otp: trimmedOtp }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                navigate('/reset-password');
            } else {
                setError(result.message || "OTP verification failed.");
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
            setError("Network error. Please try again.");
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            margin: 0,
            background: 'linear-gradient(135deg, rgb(255, 255, 255), rgb(146, 189, 255))'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '30px',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                textAlign: 'center',
                width: '320px',
                marginTop: '80px'
            }}>
                <h2 style={{ color: '#333', marginBottom: '15px' }}>Verify OTP</h2>
                {successMessage && <div style={{ color: 'green', fontSize: '14px', marginBottom: '10px' }}>{successMessage}</div>}
                {error && <div className="alert alert-danger" style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="otp"
                        placeholder="Enter OTP"
                        required
                        style={{
                            width: '90%',
                            padding: '10px',
                            margin: '10px 0',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            fontSize: '16px'
                        }}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button type="submit" style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#49c43b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        transition: '0.3s'
                    }}>Verify</button>
                </form>
                <Link to="/" style={{ display: 'block', marginTop: '10px', color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>Back to Login</Link>
            </div>
        </div>
    );
};

export default VerifyOtp;
