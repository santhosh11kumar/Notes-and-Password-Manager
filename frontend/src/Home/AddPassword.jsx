import React, { useState } from 'react';
import "./AddPassword.css";

const AddPassword = ({ setIsSubmitted, setIsImgClicked }) => {
    const [siteName, setSiteName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [animationClass, setAnimationClass] = useState('pageOpen');

    const handleAddPassword = (e) => {
        setAnimationClass('pageClose')
        e.preventDefault(); // Prevent default form submission behavior
        setIsSubmitted(true);
        setIsImgClicked(true);
        console.log('Adding password:', { siteName, userName, password });

        // Clear input fields after submitting
        setSiteName('');
        setUserName('');
        setPassword('');
        // Reset animation after a delay
        setTimeout(() => {
            setAnimationClass('');
        }, 5000);
    };

    return (
        <div className={`addPasswordSection ${animationClass}`}>
            <div className="add-password-form">
                <h3>Add a Password</h3>
                <form onSubmit={handleAddPassword}>
                    <div className="input-group">
                        <label htmlFor="siteName">Site Name:</label>
                        <input
                            type="text"
                            id="siteName"
                            value={siteName}
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
    );
};

export default AddPassword;
