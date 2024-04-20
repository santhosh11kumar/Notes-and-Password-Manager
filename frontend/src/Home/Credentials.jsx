import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./Credentials.css";
import { toast } from 'react-toastify';

const Credentials = ({ websiteName, setToDisplay }) => {
    const [showPopup, setShowPopup] = useState(true);
    const [credentials, setCredentials] = useState([]);
    const [showPassword, setShowPassword] = useState({});
    const [password, setPassword] = useState({});
    const [otpRequested, setOtpRequested] = useState({});
    const [otpSent, setOtpSent] = useState({});
    const [enteredOTP, setEnteredOTP] = useState({});
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
                setOtpSent(prevState => ({
                    ...prevState,
                    [username]: true
                }));
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
                otp: enteredOTP[username],
                websiteToFind: websiteName,
                userName: username,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            if (response.status === 200) {
                setOtpRequested(prevState => ({
                    ...prevState,
                    [username]: true
                }));
                setPassword(prevState => ({
                    ...prevState,
                    [username]: response.data.password
                }));
                setShowPassword(prevState => ({
                    ...prevState,
                    [username]: true
                }));
                setTimeout(() => {
                    setShowPassword(prevState => ({
                        ...prevState,
                        [username]: false
                    }));
                }, 300000); // Hide password after 5 minutes
            } else if (response.status === 401) {
                toast.warning("Wrong OTP");
            }

        } catch (error) {
            toast.warning("Wrong OTP", {
                className: 'toast'
            })
            console.error('Error verifying OTP:', error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        // Reset all state variables
        setCredentials([]);
        setShowPassword({});
        setPassword({});
        setOtpRequested({});
        setOtpSent({});
        setEnteredOTP({});
        setSelectedUsername(null);
        setToDisplay(false);
    };

    const handleOTPChange = (username, otp) => {
        setEnteredOTP(prevState => ({
            ...prevState,
            [username]: otp
        }));
    };

    return (
        <div className="popup-container">
            {showPopup && (
                <div className="overlay">
                    <div className="popup-content" ref={popupRef}>
                        <h2>{websiteName.charAt(0).toUpperCase() + websiteName.slice(1)}</h2>
                        <div className="credentials-list" >
                            {credentials.map((credential, index) => (
                                <div className="credential-item" key={index}>
                                    <div className="username">User Name : {credential.userName.length > 14 ? `${credential.userName.slice(0, 14)}...` : credential.userName}</div>
                                    <div className="password"> Password : {showPassword[credential.userName] && selectedUsername === credential.userName ? (password[credential.userName].length > 14 ? `${password[credential.userName].slice(0, 14)}...` : password[credential.userName]) : '**********'}</div>
                                    {(otpRequested[credential.userName] && selectedUsername === credential.userName) ? (
                                        <div></div>
                                    ) : (
                                        otpSent[credential.userName] ? (
                                            <div className="otp-input-container">
                                                <input
                                                    type="text"
                                                    value={enteredOTP[credential.userName] || ''}
                                                    onChange={(e) => handleOTPChange(credential.userName, e.target.value)}
                                                    placeholder="Enter OTP"
                                                    className="otp-input"
                                                />
                                                <button className='send-otp-button' onClick={() => handleSendOTP(credential.userName)}>Submit OTP</button>
                                            </div>
                                        ) : (
                                            <button className="otp-button" onClick={() => handleGenerateOTP(credential.userName)}>Generate OTP</button>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className='close-button-div'>
                            <button className="close-button" onClick={handleClosePopup}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Credentials;
