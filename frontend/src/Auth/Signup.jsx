import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import your CSS file for styling'
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import hide from "../assets/hide.png";
import view from "../assets/view.png";


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const navigate = useNavigate(); // Initialize navigate function

    const handleSignup = async () => {
        // Validation checks
        if (password !== confirmPassword) {
            toast.error("Passwords do not match"); // Display error message with react-toastify
            return;
        }
        const path = import.meta.env.URL_PATH;
        // Prepare user data object
        const userData = {
            username,
            email,
            password,
            mobile: phoneNumber
        };

        try {
            // Send userData to backend for authentication and storage
            const response = await axios.post(`${path}/user/register`, userData);

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
                        type={show1 ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-input"
                        placeholder="Enter your password"
                    />
                    <div className='show_hide'>
                        {show1 ? (
                            <img src={view} onClick={() => setShow1(!show1)} alt="Hide" width={20}></img>
                        ) : (
                            <img src={hide} onClick={() => setShow1(!show1)} alt="View" width={20}></img>
                        )}
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type={show2 ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-input"
                        placeholder="Confirm your password"
                    />
                    <div className='show_hide'>
                        {show2 ? (
                            <img src={view} onClick={() => setShow2(!show2)} alt="Hide" width={20}></img>
                        ) : (
                            <img src={hide} onClick={() => setShow2(!show2)} alt="View" width={20}></img>
                        )}
                    </div>
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
