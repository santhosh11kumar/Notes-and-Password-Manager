import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Logout.css';
import Header from './Header';

const Logout = () => {
    const [animationClass, setAnimationClass] = useState('pageOpen');
    const [showConfirmation, setShowConfirmation] = useState(true);

    const handleCancelLogout = () => {
        setShowConfirmation(false);
    };
    const handleConfirmLogout = () => {
        console.log('Logout confirmed');
        // For example, you can redirect the user to the logout page
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
                            <Link to='/'><div className='btn logout'>Logout</div></Link> {/* Wrap Link component inside button */}
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
