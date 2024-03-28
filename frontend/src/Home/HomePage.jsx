// HomePage.jsx
import React, { useState } from 'react';
import gifImage from '../assets/plus.gif';
import PlusImage from '../assets/PlusNormal.png';
import './HomePage.css';
import AddPassword from './AddPassword';
import Header from './Header.jsx';

const HomePage = () => {
    const [isSubmitted, setIsSubmitted] = useState(true);
    const [imageClick, setIsImgClicked] = useState(true);

    const handleClick = () => {
        setIsImgClicked(!imageClick);
        setTimeout(() => {
            setIsSubmitted(!isSubmitted);
        }, 1500);
    };

    return (
        <div className='body'>
            <div className={"home-page "}>
                <Header></Header>

                <main className={`main-content ${isSubmitted ? 'pageOpen' : 'pageClose'}`}>
                    <div>
                        {isSubmitted ? (
                            <div className='mainText'>
                                <p className='text'><h1 className='headingText'>Worried about online security?</h1> We get it. Secure your passwords with our industry-leading encryption technology. Upgrade your online safety today.</p>
                                <div className='plus' onClick={handleClick}>
                                    {imageClick ? (
                                        <img src={PlusImage} alt="Plus Image" height="150" width="180px" />
                                    ) : (
                                        <img src={gifImage} alt="Animated GIF" height="160" width="160px" />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <AddPassword setIsSubmitted={setIsSubmitted} setIsImgClicked={setIsImgClicked} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HomePage;
