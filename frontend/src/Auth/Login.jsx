import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
const HomePage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [theme, setTheme] = useState('light');


    const handleLogin = () => toast.success("Login Successfull");

    const handleSignup = () => {
        // Logic for handling signup
        console.log('Signing up with:', { username, password });
    };

    return (
        <div className={`container ${theme}`}>
            <form className="form-container">
                <h1>Login to continue</h1>
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
                <div className='buttonDiv'>
                    <button type="button" onClick={handleLogin} className="button">Login</button>
                </div>
            </form>
            <div className="signup">
                <p>New user? <span className='signUp_icon' onClick={handleSignup}><Link to="/signup">Sign up here</Link></span></p>
            </div>
        </div>
    );
};

export default HomePage;
