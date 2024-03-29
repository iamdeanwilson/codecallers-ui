import React, { useState, useEffect } from 'react';
import { Switch } from '../components/Switch';


function LightDark() {
    //State to track the current theme 
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');

        //Check if the theme is saved in localStorage, otherwise use prefers color scheme 
        return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    });

    // Function to toggle between light and dark mode 
    const toggleTheme = () => {
        const newTheme = theme == 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        console.log("TOGGLED!")
    };

    //Add/remove dark-mode class based on theme 
    useEffect(() => {
        document.body.classList.toggle('dark-mode', theme === 'dark');
    }, [theme]);

    return (
        <div className="LightDark">
            <header>

                {/* <Switch onClick={toggleTheme}>ToggleTheme</button> */}
                {/* <Switch toggleTheme={toggleTheme} theme={theme} /> */}
                <Switch toggleTheme={toggleTheme} theme={theme} />

            </header>

        </div>
    );
}

export default LightDark;