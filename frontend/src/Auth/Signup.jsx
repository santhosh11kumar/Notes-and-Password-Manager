import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import your CSS file for styling'
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate(); // Initialize navigate function

    const handleSignup = async () => {
        // Validation checks
        if (password !== confirmPassword) {
            toast.error("Passwords do not match"); // Display error message with react-toastify
            return;
        }

        // Prepare user data object
        const userData = {
            username,
            email,
            password,
            mobile: phoneNumber
        };

        try {
            // Send userData to backend for authentication and storage
            const response = await axios.post('http://localhost:8000/user/register', userData);

            if (response.status === 200) {
                // Handle successful signup
                toast.success('Signup successful. Please log in.'); // Display success message with react-toastify
                navigate('/user/login'); // Redirect to login page
            }
        } catch (error) {
            // Handle error response from backend
            console.error('Signup failed:', error.message);
            toast.error('Signup failed. Please try again.'); // Display error message with react-toastify
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
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
