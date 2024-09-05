import React, { useState } from 'react';
import "./AddPassword.css";
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const AddPassword = () => {
    const [animationClass, setAnimationClass] = useState('pageOpen');
    const [websiteName, setSiteName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const path = import.meta.env.URL_PATH;
    const handleAddPassword = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('AccessToken'); // Retrieve token from secure storage

            if (!accessToken) {
                // Handle case where no access token is found
                toast.error("Authorization required");
                return;
            }
            const PasswordData = await axios.post(`${path}/v2/AddPassword`, {
                websiteName,
                userName,
                password
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log(PasswordData)
            if (PasswordData.status === 200) {
                console.log("Successful Saved");
                toast.success("Password saved successfully!");
                navigate('/Homepage'); // Uncomment if you want to redirect
            } else {
                console.error('Error:', response.data); // Handle potential error messages from server
                toast.warning("Username already exists for this website!");
            }
        } catch (error) {
            console.error('Unable to Store Data', error.message);
            toast.warning("Failed to save password!");
        }
    };


    return (
        <div>
            <Header></Header>
            <div className={`addPasswordSection ${animationClass}`}>

                <div className="add-password-form">
                    <h3>Add a Password</h3>
                    <form onSubmit={handleAddPassword}>
                        <div className="input-group">
                            <label htmlFor="siteName">Site Name:</label>
                            <input
                                type="text"
                                id="websiteName"
                                value={websiteName}
                                onChange={(e) => setSiteName(e.target.value)}
                                className="text-input"
                                placeholder="Enter site name"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="userName">User Name:</label>
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="text-input"
                                placeholder="Enter user name"
                                required
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
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div className='submitDiv'>
                            <button type="submit" className="button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddPassword;



