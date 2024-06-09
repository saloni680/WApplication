import React, { useEffect, useState } from 'react';
import './Nav.css';

const Nav = () => {
  // State for managing dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  // State for managing sidebar open/close status
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Effect to toggle the body's class based on dark mode
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  // Handler to toggle dark mode
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handler to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`mainNavdiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className={`Navdiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        {/* Left section of the navigation bar */}
        <section className='navsect'>
          <h1 className={`websiteIcon ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>🌤️Weather</h1>
        </section>
        
        {/* Right section of the navigation bar */}
        <section className='navsectright'>
          {/* Dark mode toggle switch */}
          <label className="ui-switch">
            <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
            <div className="slider">
              <div className='icons'>
                ☀️🌙
              </div>
              <div className="circle"></div>
            </div>
          </label>
          
          {/* Sidebar toggle button */}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
        </section>
      </div>

      {/* Sidebar menu */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <span className="close-btn" onClick={toggleSidebar}>&times;</span>
        <h2>Sidebar Menu</h2>
        <ul>
          <li><a href="https://drive.google.com/uc?export=download&id=1IZWXFrQU_AsCxRH6KBLreYusGAaW7UN2" download="Resume.pdf">Resume</a></li>
          <li><a href="https://www.linkedin.com/in/saloni-chourasiya-261600195/">LinkedIn</a></li>
          <li><a href="https://github.com/saloni680">Github</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
