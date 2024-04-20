import React, { useState, useEffect } from 'react';
import './PasswordPage.css'; // Import your CSS file for styling
import Header from './Header';
import defaultLogo from '../assets/default-company-logo.png';
import axios from 'axios';
import addImage from "../assets/addPassword.png";
import { useNavigate } from 'react-router-dom';
import Credentials from './Credentials';

const SearchBar = ({ siteLogos, onSearchChange }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase(); // Convert search terms to lowercase for case-insensitive matching
        setSearchQuery(query); // Set the search query state
        onSearchChange(query); // Pass the search query to the parent component
    };

    return (
        <div>
            <Header />
            <div className="search-bar-container">
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
            </div>
        </div>
    );
};

const PasswordPage = () => {
    const [initialWebsites, setInitialWebsites] = useState([]); // Store initially fetched websites
    const [filteredWebsites, setFilteredWebsites] = useState([]); // Store filtered websites based on search query
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [siteLogosData, setSiteLogos] = useState({}); // State for site logos
    const [animationClass, setAnimationClass] = useState('pageOpen'); // Initial animation class
    const [searchStarted, setSearchStarted] = useState(false);
    const [selectedWebsite, setSelectedWebsite] = useState(null); // State to store selected website
    const [overlay, setToDisplay] = useState(false); // Initialize overlay state to false
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPasswords = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const accessToken = localStorage.getItem('AccessToken');

                if (!accessToken) {
                    // Handle case where no access token is found
                    throw new Error("Authorization required");
                }

                const response = await axios.get('http://localhost:8000/v2/PasswordManager', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                // Extract unique website names
                console.log(response)
                const uniqueWebsites = Array.from(new Set(response.data.map(item => item.websiteName)));

                // Get the most recent 5 unique website names based on updated time
                const recentUniqueWebsites = uniqueWebsites
                    .map(websiteName => response.data.find(item => item.websiteName === websiteName))
                    .sort((a, b) => new Date(b.updatedTime) - new Date(a.updatedTime))
                    .slice(0, 5);

                setInitialWebsites(recentUniqueWebsites);
                setFilteredWebsites(recentUniqueWebsites); // Set filtered websites initially
            } catch (error) {
                console.error('Error fetching passwords:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPasswords();
    }, []);

    useEffect(() => {
        const fetchSiteLogos = async () => {
            const siteLogos = {};
            for (const site of initialWebsites) {
                const websiteName = site.websiteName; // Capture website name for closure

                try {
                    const logoUrl = `https://logo.uplead.com/${websiteName}.com`;
                    if (logoUrl) {
                        siteLogos[websiteName] = logoUrl;
                    } else {
                        siteLogos[websiteName] = defaultLogo;
                    }
                } catch (error) {
                    console.error(`Error fetching logo for ${websiteName}:`, error);
                }
            }
            setSiteLogos(siteLogos);
        };
        fetchSiteLogos();
    }, [initialWebsites]);

    const handleSearchChange = (query) => {
        if (!query) {
            setFilteredWebsites(initialWebsites); // Reset to initial websites if query is empty
            setSearchStarted(false);
            return;
        }
        const filteredData = initialWebsites.filter((website) =>
            website.websiteName.toLowerCase().includes(query)
        );
        setFilteredWebsites(filteredData);
        setSearchStarted(true);
    };

    const handleSiteInfoClick = (websiteName) => {
        setSelectedWebsite(websiteName);
        setToDisplay(true); // Set the overlay state to true when a website is selected
    };

    console.log(filteredWebsites)


    return (
        <div className={`password-page`}>
            <SearchBar siteLogos={siteLogosData} onSearchChange={handleSearchChange} />
            <div className='hero-section'>
                {isLoading}
                {error && <p>Error: {error}</p>}
                {!isLoading && !error && filteredWebsites.length > 0 && (
                    <div className="filtered-site-names">
                        {filteredWebsites.map((password, index) => (
                            <div key={index} className="password-item">
                                <div className="site-info" onClick={() => handleSiteInfoClick(password.websiteName)}>
                                    <div className="site-name">{password.websiteName.charAt(0).toUpperCase() + password.websiteName.slice(1)}</div>
                                    <img
                                        src={siteLogosData[password.websiteName] || defaultLogo} // Use defaultLogo if logo URL doesn't exist
                                        alt={password.websiteName}
                                        className={`site-logo ${animationClass} `}
                                    />
                                </div>
                            </div>
                        ))
                        }
                        <div div className="site-info" onClick={() => { navigate('/v2/AddPassword') }}>
                            <div className="site-name">Add user</div>
                            <img src={addImage} alt="" className={`site-logo ${animationClass} `} />
                        </div>
                    </div>
                )}
                {filteredWebsites.length === 0 &&
                    <div className="site-info" onClick={() => { navigate('/v2/AddPassword') }}>
                        <div className="site-name">Add user</div>
                        <img src={addImage} alt="" className={`site-logo ${animationClass} `} />
                    </div>
                }
            </div>
            {
                overlay && (
                    <div className="overlay">
                        <Credentials
                            websiteName={selectedWebsite}
                            setToDisplay={setToDisplay}
                        />
                    </div>
                )
            }
        </div >
    );
};
export default PasswordPage;
