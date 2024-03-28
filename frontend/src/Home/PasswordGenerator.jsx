import Header from './Header';
import './PasswordGenerator.css'; // Import the CSS file
import { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordGenerator = () => { // Renamed the component to Random
    const [password, setPassword] = useState('');
    const [passwordLength, setPasswordLength] = useState(12);
    const [Sc, setSc] = useState(false); // State for special characters checkbox
    const [Nb, setNb] = useState(false); // State for numbers checkbox
    const [meaningfulWords, setMeaningfulWords] = useState([]);
    const [iscopied, setCopied] = useState(false);
    const [strength, setStrength] = useState('yellow');
    const [animationClass, setAnimationClass] = useState('pageOpen'); // Initial animation class

    useEffect(() => {
        // Reset animation class after animation duration

        const fetchEnglishWords = async () => {
            try {
                const response = await axios.get('https://api.datamuse.com/words', {
                    params: {
                        sp: '?????,*y*', // Combine multiple patterns using comma
                        md: 'p', // Include part of speech information
                        max: 2000, // Number of words to fetch
                    },
                });

                const response2 = await axios.get('https://api.datamuse.com/words', {
                    params: {
                        sp: '?????,*l*', // Combine multiple patterns using comma
                        md: 'p', // Include part of speech information
                        max: 2000, // Number of words to fetch
                    },
                });

                const words1 = response.data.map(wordObj => capitalizeFirstLetter(wordObj.word));
                const words2 = response2.data.map(wordObj => capitalizeFirstLetter(wordObj.word));

                const combinedWords = [...words1, ...words2]; // Merge the arrays

                // Further processing of the words
                setMeaningfulWords(combinedWords); // Set the state with fetched words
                console.log(meaningfulWords);
            } catch (error) {
                console.error('Error fetching English words:', error);
            }
        };
        fetchEnglishWords();
    }, []);

    useEffect(() => {
        displayStrength(); // Call displayStrength whenever passwordLength changes
    }, [passwordLength]);

    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const displayStrength = () => {
        const lengthCount = passwordLength;
        if (lengthCount <= 8) {
            setStrength('red')
        } else if (lengthCount < 12 && lengthCount > 8) {
            setStrength('yellow')
        } else if (lengthCount >= 12) {
            setStrength('green')
        }
    };

    const generatePassword = () => {
        let generatedPassword = '';
        const shuffledWords = meaningfulWords.sort(() => Math.random() - 0.5);
        const selectedSpecialCharacters = '@#$%^&*()_';
        const selectedNumbers = '1234567890';

        for (let i = 0; i < passwordLength; i++) {
            generatedPassword += shuffledWords[i % shuffledWords.length];

            if (Sc && i % 2 === 0) {
                const randomSpecialChar = selectedSpecialCharacters[Math.floor(Math.random() * selectedSpecialCharacters.length)];
                generatedPassword += randomSpecialChar;
            }

            if (Nb && i % 3 === 0) {
                const randomNumber = selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)];
                generatedPassword += randomNumber;
            }
        }
        setPassword(generatedPassword.slice(0, passwordLength));
        setCopied(false); // Reset the copy state
    };

    return (
        <div className="Wrapper"> {/* Use Wrapper class */}
            <Header />
            <div className={`divcenter ${animationClass}`}> {/* Use divcenter class */}

                {/* Password area */}
                <div className="output">
                    <div className='displaySection'>
                        <input readOnly placeholder="Password" className="display" value={password} />
                        <button className="copy_btn" onClick={() => {
                            if (password.length > 0) {
                                setCopied(true);
                                navigator.clipboard.writeText(password);
                            }
                        }}>
                            {!iscopied ? (<span className="copy_message">Copy</span>) : (<span className="copy_message">Copied!</span>)}
                            <i className="fa fa-copy copy_icon"></i>
                        </button>
                    </div>
                </div>

                {/* Generator box */}
                <div className="box">

                    <div className="length_div">Password Length
                        <div className="length_count">{passwordLength}</div>
                    </div>

                    {/* scroll bar */}

                    <div className="scroll_bar">
                        <input type="range" min="6" max="18" className={`scroll_indicator ${strength}`} step="1" value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} />
                    </div>

                    {/* Typos */}
                    <div className="Restrict">

                        <div className="input_radio_div">
                            <input type="checkbox" name="Numbers" id="NB"
                                className="tick" checked={Nb} onChange={() => setNb(!Nb)} /> {/* Update Nb state */}
                            <label htmlFor="NB">Numbers</label>
                        </div>
                        <div className="input_radio_div">
                            <input type="checkbox" name="Special characters"
                                id="SC" className="tick" checked={Sc} onChange={() => setSc(!Sc)} /> {/* Update Sc state */}
                            <label htmlFor="SC">Special characters</label>
                        </div>
                    </div>

                    {/*Strength Indicator */}
                    <div className="strength_indicator">
                        <span className="display_strength">Strength</span>
                        <div className={`indicator ${strength}`}></div>
                    </div>

                    {/* Generate button */}
                    <button className="generator_password" onClick={generatePassword}>GENERATE PASSWORD</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator; // Export Random component
