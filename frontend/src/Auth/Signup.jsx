import React, { useState } from 'react';
import './Signup.css'; // Import your CSS file for styling

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSignup = () => {
        // Validation checks
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Prepare user data object
        const userData = {
            username,
            email,
            password,
            phoneNumber
        };

        // Send userData to backend for authentication and storage
        // Example: Use fetch or axios to send a POST request to your backend API
        fetch('https://your-backend-api.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (response.ok) {
                    // Redirect to authentication page or login page
                    // Example: Use react-router-dom history object or Link component to navigate
                    // history.push('/login');
                } else {
                    // Handle error response from backend
                    console.error('Signup failed:', response.statusText);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="signup-container">
            <h1 >Sign Up</h1>
            <form className="signup-form">
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-input"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-input"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-input"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-input"
                        placeholder="Confirm your password"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="text-input"
                        placeholder="Enter your phone number"
                    />
                </div>
                <button type="button" onClick={handleSignup} className="button">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
