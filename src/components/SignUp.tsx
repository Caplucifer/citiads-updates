import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    role: '',
    acceptTerms: false,
  });

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Registration attempt:', registerForm);
    // Example API call
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });

      if (response.ok) {
        // Handle successful registration
        console.log("Registration successful");
        navigate('/'); // Redirect to home or login page after successful registration
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="auth-form-container">
      <style>
        {`
          .auth-form-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: calc(100vh - 100px); /* Adjust based on your footer height */
            padding: 20px;
            box-sizing: border-box;
          }

          .auth-form {
            width: 100%;
            max-width: 400px; /* Set a max width for the form */
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .form-footer {
            text-align: center;
            margin-top: 20px;
          }
        `}
      </style>
      <form className="auth-form register-form" onSubmit={handleRegister}>
        <h3>Registration</h3>
        <input
          type="text"
          placeholder="Enter your full name"
          className="box"
          value={registerForm.fullName}
          onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Enter your mobile number"
          className="box"
          value={registerForm.mobile}
          onChange={(e) => setRegisterForm({ ...registerForm, mobile: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="box"
          value={registerForm.email}
          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
        />
        <div className="password-input-container">
          <input
            type="password"
            placeholder="Create a password"
            className="box"
            value={registerForm.password}
            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
          />
        </div>
        <select
          className="box"
          value={registerForm.role}
          onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="owner">Owner</option>
          <option value="user">User</option>
        </select>
        <div className="terms">
          <input
            type="checkbox"
            id="terms"
            checked={registerForm.acceptTerms}
            onChange={(e) => setRegisterForm({ ...registerForm, acceptTerms: e.target.checked })}
          />
          <label htmlFor="terms">I accept all terms & conditions</label>
        </div>
        <button type="submit" className="btn">
          Register Now
        </button>
        <div className="form-footer">
          <p>Already have an account? <Link to="/login" className="switch-btn">Login now</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
