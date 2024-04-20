import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import hide from "../assets/hide.png";
import view from "../assets/view.png";


const HomePage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Move useNavigate here

    const handleLogin = async () => {
        try {
            const loginData = {
                username,
                password
            };

            const response = await axios.post('http://localhost:8000/user/login', loginData);
            if (response.status === 200) {
                toast.success("Login Successful");
                const authToken = response.data.data.accessToken;
                console.log(response, authToken)
                localStorage.removeItem('AccessToken');
                localStorage.setItem('AccessToken', authToken);
                navigate('/Homepage');
            } else {
                toast.error("Login Failed");
            }
        } catch (error) {
            toast.error("Login Failed");
            console.error('Login failed:', error.message);
        }
    }

    const handleSignup = () => {

    };
    const [show, setShow] = useState(false)

    return (
        <div className={`container `}>
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
                        type={show ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin();
                            }
                        }}
                        className="text-input"
                        placeholder="Enter your password"
                    />
                    <div className='show_hide'>
                        {show ? (
                            <img src={view} onClick={() => setShow(!show)} alt="Hide" width={20}></img>
                        ) : (
                            <img src={hide} onClick={() => setShow(!show)} alt="View" width={20}></img>
                        )}
                    </div>

                </div>
                <div className='buttonDiv' >
                    <button type="button" onClick={handleLogin} className="button">Login</button>
                </div>
            </form >
            <div className="signup">
                <span className='signUp_icon' onClick={handleSignup}><Link to="/user/register">Create free account</Link></span>
            </div>
        </div >
    );
};

export default HomePage;
