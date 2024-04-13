import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Credentials = ({ websiteName, setToDisplay }) => {
    const [showPopup, setShowPopup] = useState(true);
    const [credentials, setCredentials] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [otpRequested, setOtpRequested] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [enteredOTP, setEnteredOTP] = useState('');
    const [selectedUsername, setSelectedUsername] = useState(null);
    const popupRef = useRef(null);

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const accessToken = localStorage.getItem('AccessToken');
                if (!accessToken) {
                    throw new Error("Authorization required");
                }

                const response = await axios.get(`http://localhost:8000/v2/PasswordManager/${websiteName}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                setCredentials(response.data.credentials);
            } catch (error) {
                console.error('Error fetching credentials:', error);
            }
        };

        fetchCredentials();
    }, [websiteName]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
                setToDisplay(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleGenerateOTP = async (username) => {
        try {
            const accessToken = localStorage.getItem('AccessToken');
            if (!accessToken) {
                throw new Error("Authorization required");
            }

            const response = await axios.post('http://localhost:8000/v2/generate-otp', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.status === 200) {
                console.log(response)
                setOtpSent(true);
                setSelectedUsername(username);
            }

        } catch (error) {
            console.error('Error generating OTP:', error);
        }
    };

    const handleSendOTP = async (username) => {
        try {
            const accessToken = localStorage.getItem('AccessToken');
            if (!accessToken) {
                throw new Error("Authorization required");
            }

            const response = await axios.post('http://localhost:8000/v2/verify-otp', {
                otp: enteredOTP,
                websiteToFind: websiteName,
                userName: username,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            if (response.status === 200) {
                setOtpRequested(true);
                setPassword(response.data.password); // Assuming the response contains the password
                setShowPassword(true); // Show the password after OTP verification
                setTimeout(() => {
                    setShowPassword(false);
                }, 300000); // Hide password after 5 minutes
            }
            console.log(response)

        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        // Reset all state variables
        setCredentials([]);
        setShowPassword(false);
        setPassword('');
        setOtpRequested(false);
        setOtpSent(false);
        setEnteredOTP('');
        setSelectedUsername(null);
        setToDisplay(false);
    };

    return (
        <div className="popup-container">
            {showPopup && (
                <div className="overlay">
                    <div className="popup-content" ref={popupRef}>
                        <h2>{websiteName}</h2>
                        <div className="credentials-list" >
                            {credentials.map((credential, index) => (
                                <div key={index} className="credential-item">
                                    <div className="username">User Name : {credential.userName}</div>
                                    <div className="password"> Password : {showPassword ? password : '**********'}</div>
                                    {(otpRequested && selectedUsername === credential.userName) ? (
                                        <div></div>
                                    ) : (
                                        otpSent && selectedUsername === credential.userName ? (
                                            <div className="otp-input-container">
                                                <input
                                                    type="text"
                                                    value={enteredOTP}
                                                    onChange={(e) => setEnteredOTP(e.target.value)}
                                                    placeholder="Enter OTP"
                                                    className="otp-input"
                                                />
                                                <button className="send-otp-button" onClick={() => handleSendOTP(credential.userName)}>Send OTP</button>
                                            </div>
                                        ) : (
                                            <button className="otp-button" onClick={() => handleGenerateOTP(credential.userName)}>Generate OTP</button>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                        <button className="close-button" onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Credentials;
