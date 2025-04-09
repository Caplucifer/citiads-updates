import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your password reset logic here
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        // Simulate a successful password reset
        setSuccess('Password reset successfully!');
        setTimeout(() => {
            navigate('/login'); // Redirect to login page after success
        }, 2000);
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
                <h2 style={{ color: '#333', marginBottom: '15px' }}>Reset Password</h2>
                <p>Enter your new password</p>
                
                {error && <div className="alert alert-danger" style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</div>}
                {success && <div className="alert alert-success" style={{ color: 'green', fontSize: '14px', marginBottom: '10px' }}>{success}</div>}
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        required 
                        style={{ 
                            width: '90%', 
                            padding: '10px', 
                            margin: '10px 0', 
                            border: '1px solid #ccc', 
                            borderRadius: '5px', 
                            fontSize: '16px' 
                        }} 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        required 
                        style={{ 
                            width: '90%', 
                            padding: '10px', 
                            margin: '10px 0', 
                            border: '1px solid #ccc', 
                            borderRadius: '5px', 
                            fontSize: '16px' 
                        }} 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                    }}>Reset Password</button>
                </form>
                
                <Link to="/" style={{ display: 'block', marginTop: '10px', color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>Back to Login</Link>
            </div>
        </div>
    );
};

export default ResetPassword;
