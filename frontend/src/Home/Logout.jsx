import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Logout.css';
import Header from './Header';
import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from 'react-toastify';

const Logout = () => {
    const [animationClass, setAnimationClass] = useState('pageOpen');
    const [showConfirmation, setShowConfirmation] = useState(true);

    const handleCancelLogout = () => {
        setShowConfirmation(false);
    };
    const path = import.meta.env.URL_PATH;
    const handleConfirmLogout = async () => {
        try {

            const accessToken = localStorage.getItem('AccessToken'); // Retrieve token from secure storage

            if (!accessToken) {
                // Handle case where no access token is found
                toast.error("Authorization required");
                return;
            }
            console.log(accessToken)
            // Make an API request to logout the user
            const response = await axios.post(`${path}/user/logout`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if (response.status === 200) {
                // Redirect to login page after logout
                window.location.href = '/user/login';
                toast.success("Logout successful")
            }
        } catch (error) {
            // Handle error response from the server
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <div>
            <Header></Header>
            <div className="overlay">
                <div className={`dialog-box ${animationClass}`}>
                    <h2>Confirm Logout</h2>
                    <p>Are you sure you want to logout?</p>
                    <div className="button-container">
                        {/* Use onClick event handler to handle logout */}
                        <button onClick={handleConfirmLogout} className='btns'>
                            <div className='btn logout'>Logout</div>
                        </button>
                        <button onClick={handleCancelLogout} className='btns'>
                            <Link to='/Homepage'><div className='btn cancel'>Cancel</div></Link> {/* Wrap Link component inside button */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;
