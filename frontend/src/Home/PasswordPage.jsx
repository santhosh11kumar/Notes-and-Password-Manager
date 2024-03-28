import React, { useState, useEffect } from 'react';
import './PasswordPage.css'; // Import your CSS file for styling
import Header from './Header';
import defaultLogo from '../assets/default-company-logo.png';

const SearchBar = ({ siteNames }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [siteLogos, setSiteLogos] = useState({});
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const [animationClass, setAnimationClass] = useState('pageOpen'); // Initial animation class

    useEffect(() => {

    }, []);

    useEffect(() => {
        const fetchSiteLogos = async () => {
            const siteLogosData = {};
            for (const site of siteNames) {
                try {
                    // Fetch the logo image for the site
                    const logoUrl = `https://logo.uplead.com/${site}.com`;
                    console.log(logoUrl)

                    // Check if the request was successful and if the response contains image data
                    if (logoUrl) {
                        // If the conditions are met, set the logo URL to the fetched image data
                        siteLogosData[site] = logoUrl;
                    }

                } catch (error) {
                    console.error(`Error fetching logo for ${site}:`, error);
                }
            }
            setSiteLogos(siteLogosData);
        };

        fetchSiteLogos();
        // Reset animation class after animation duration
        const timeout = setTimeout(() => {
            setAnimationClass('');
        }, 500);

        // Clear timeout when component unmounts
        return () => clearTimeout(timeout);
    }, [siteNames]);

    const filteredSiteNames = siteNames.filter(siteName =>
        siteName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Header />
            <div className="search-bar-container ">
                <div className='heroSection'>
                    <input
                        type="text"
                        name="q"
                        id="query"
                        placeholder="Website Name"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button className="search-button">
                        <span>Search</span>
                    </button>
                </div>

                <div>
                    {/* Display filtered site names with logos */}
                    <div className="filtered-site-names">
                        {filteredSiteNames.map((siteName, index) => (
                            <div key={index} className="site-info">
                                <div className="site-name">{capitalizeFirstLetter(siteName)}</div>
                                {/* Set src attribute to siteLogos[siteName] if it exists, otherwise use defaultLogo */}
                                <img src={siteLogos[siteName]} alt={siteName} className={`site-logo ${animationClass} `} onError={(e) => { e.target.onerror = null; e.target.src = defaultLogo }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PasswordPage = () => {



    const [passwords] = useState([
        { id: 1, site: 'google', username: 'user1', password: 'password1' },
        { id: 2, site: 'garena', username: 'user2', password: 'password2' },
        { id: 3, site: 'reddit', username: 'user3', password: 'password3' },
        { id: 4, site: 'instagram', username: 'user4', password: 'password4' },
        { id: 5, site: 'youtube', username: 'user5', password: 'password5' },
        { id: 6, site: 'cuchd', username: 'user6', password: 'password6' },
        // Add more passwords as needed
    ]);

    return (
        <div className={`password-page`}>
            <SearchBar siteNames={passwords.map(password => password.site)} />
            {/* Render other password-related content here */}
        </div>
    );
};

export default PasswordPage;
