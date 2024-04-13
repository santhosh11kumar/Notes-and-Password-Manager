import React, { useState } from 'react';
import gifImage from '../assets/plus.gif';
import PlusImage from '../assets/PlusNormal.png';
import './HomePage.css';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate(); // Use useNavigate directly within the component
    const [imageClick, setIsImgClicked] = useState(true);

    const handleClick = () => {
        setIsImgClicked(!imageClick);
        setTimeout(() => {
            navigate("/v2/AddPassword"); // Use navigate directly here
        }, 1500);
    };

    return (
        <div className='body'>
            <div className={"home-page "}>
                <Header></Header>
                <main className={`main-content ${'pageOpen'}`}>
                    <div>
                        <div className='mainText'>
                            <div className='text'><div className='headingText'>Worried about online security?</div> We get it. Secure your passwords with our industry-leading encryption technology. Upgrade your online safety today.</div>
                            <div className='plus' onClick={handleClick}>
                                {imageClick ? (
                                    <>
                                        <div className='tap-effect'></div>
                                        <img src={PlusImage} alt="Plus Image " height="150" width="180px" className='btn_--shockwave is-active' />
                                    </>
                                ) : (
                                    <img src={gifImage} alt="Animated GIF" height="160" width="160px" />
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HomePage;
