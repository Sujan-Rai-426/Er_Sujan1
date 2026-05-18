import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon, FaDesktop, FaPalette } from 'react-icons/fa';
import { Scroll_To_SectionID } from '../utils/Scroll_To_SectionID';
import './assets/css/Navbar.css';

const Navbar = ({ currentTheme, onThemeChange }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && menuOpen) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [menuOpen]);

    const handleNavClick = (e, id, targetPath = '/') => {
        Scroll_To_SectionID(e, id, navigate, location, targetPath);
        setMenuOpen(false);
    };

    const themeCycle = ['light', 'dark', 'system'];
    const getNextTheme = () => {
        const currentIndex = themeCycle.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themeCycle.length;
        return themeCycle[nextIndex];
    };

    const getThemeButtonContent = () => {
        switch (currentTheme) {
            case 'light': return { icon: <FaSun />, label: '' };
            case 'dark': return { icon: <FaMoon />, label: '' };
            case 'system': return { icon: <FaDesktop />, label: '' };
            default: return { icon: <FaPalette />, label: '' };
        }
    };

    const handleToggle = () => onThemeChange(getNextTheme());
    const { icon, label } = getThemeButtonContent();

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Left group: Logo + Theme Toggle */}
                <div className="nav-left">
                    <div className="logo">Er. Sujan Rai</div>
                    <button className="theme-toggle-btn" onClick={handleToggle}>
                        {icon} {label}
                    </button>
                </div>

                {/* Right group: Desktop nav links + Hamburger (mobile) */}
                <div className="nav-right">
                    <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <button className="nav-link" onClick={(e) => handleNavClick(e, 'home-hero')}>Home</button>
                        <button className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>About</button>
                        <button className="nav-link" onClick={(e) => handleNavClick(e, 'skills')}>Skills</button>
                        <button className="nav-link" onClick={(e) => handleNavClick(e, 'projects')}>Projects</button>
                        <button className="nav-link" onClick={(e) => handleNavClick(e, 'contact')}>Contact</button>
                    </div>
                    <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;