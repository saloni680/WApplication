import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = ({ isDarkMode }) => {
    // Weather API configuration
    const weatherApi = {
        key: '6a0e8023948d99e45cfe3fa5933732be',
        base: 'https://api.openweathermap.org/data/2.5/weather'
    };

    // State variables
    const [search, setSearch] = useState(''); // To store the search input
    const [weather, setWeather] = useState({}); // To store weather data
    const [date, setDate] = useState(new Date()); // To store current date and time
    const [error, setError] = useState(''); // To store error messages

    // Effect to update date and time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Function to handle search action
    const handleSearch = () => {
        if (search.trim() === '') {
            setError('Please enter a city name or pincode');
            return;
        }
        setError('');
        // fetching data using api
        fetch(`${weatherApi.base}?q=${search}&appid=${weatherApi.key}&units=metric`)
            .then(res => res.json())
            .then(data => {
                if (data.cod !== 200) {
                    setWeather({});
                    setError('Place not found. Please enter a correct name/pincode.');
                } else {
                    setWeather(data);
                    setError('');
                }
            })
            // if data is not found catch the error
            .catch(err => {
                setWeather({});
                if (err.message === 'Failed to fetch') {
                    setError('Check your connection.');
                } else {
                    setError('Error fetching weather data. Please try again later.');
                }
            });
    };

    // Formatting date and time
    const formattedDate = date.toLocaleDateString('en-GB');
    const formattedTime = date.toLocaleTimeString();

    // Weather icon URL
    const weatherIcon = weather.weather ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : '';

    return (
        <div className={`mainWeather ${isDarkMode ? 'dark-mode' : ''}`} style={{marginTop:"20px"}}>
            <h1>Find Weather in your city...</h1>
            <div>
                <section>
                    <input 
                        type="text" 
                        placeholder="Search city" 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <button onClick={handleSearch}>Search</button>
                </section>
                <div>
                    {/* Displaying data */}
                    {weather.main ? (
                        <div className='weatherdiv'>
                            <div className='weatherdiv'>
                                <h1>{weather.main.temp.toFixed()} °C</h1>
                                <img src={weatherIcon} alt={weather.weather[0].description} />
                                <h1>{weather.weather[0].main}</h1>
                            </div>
                            <h1><b><i className="fa-solid fa-location-dot"></i></b> {weather.name}</h1>
                            <h1><b>Real Feel:</b> {weather.main.feels_like.toFixed()}<sup>°C</sup></h1>
                            <h1>
                                <b>Wind Speed:</b> {weather.wind.speed.toFixed(1)} <span style={{ fontSize: 'large' }}>km/hr</span>
                            </h1>
                            <h1><b>Date:</b> {formattedDate}</h1>
                            <h1><b>Time:</b> {formattedTime}</h1>
                            <br /><br />
                        </div>
                    ) : (
                        <div>
                            <br /><br />
                            {error && <p>{error}</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Weather;
