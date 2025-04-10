import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
    
        if (!email) {
            setError("Please enter your email.");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8080/forgot/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // <-- Add this line
                body: JSON.stringify({ email }),
              });
    
            const data = await response.json();
    
            if (response.ok && data.success) {
                console.log("OTP sent successfully.");
                navigate("/forgot/verify-otp");
            } else {
                setError(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Server error. Please try again later.");
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
                <h2 style={{ color: '#333', marginBottom: '15px' }}>Forgot Password</h2>
                <p>Enter your email to reset your password</p>
                
                {error && <div className="alert" style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        required 
                        style={{ 
                            width: '90%', 
                            padding: '10px', 
                            margin: '10px 0', 
                            border: '1px solid #ccc', 
                            borderRadius: '5px', 
                            fontSize: '16px' 
                        }} 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" style={{ 
                        width: '100%', 
                        padding: '10px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer', 
                        fontSize: '16px', 
                        transition: '0.3s' 
                    }}>Send OTP</button>
                </form>
                <a href="/" style={{ display: 'block', marginTop: '10px', color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>Back to Login</a>
            </div>
        </div>
    );
};

export default ForgotPassword;
