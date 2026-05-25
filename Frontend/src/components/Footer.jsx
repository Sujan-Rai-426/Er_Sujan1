import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaYoutube, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import { Scroll_To_SectionID } from '../utils/Scroll_To_SectionID';
import './assets/css/Footer.css';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const handleNavClick = (e, id, targetPath = '/') => {
        Scroll_To_SectionID(e, id, navigate, location, targetPath);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    {/* Logo & Bio Section */}
                    <div className="footer-section">
                        <h3 className="footer-logo">Er. Sujan Rai</h3>
                        <p className="footer-bio">
                            Full-Stack Developer passionate about building modern, 
                            responsive web applications with excellent user experiences.
                        </p>
                        <div className="footer-social">
                            <a href="https://github.com/Sujan-Rai-426" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/er-sujan-rai-18a07b2a6/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="https://www.youtube.com/@CodeVora140" target="_blank" rel="noopener noreferrer">
                                <FaYoutube />
                            </a>
                            <a href="mailto:rsujan140.in@gmail.com">
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li>
                                <button onClick={(e) => handleNavClick(e, 'home-hero')}>Home</button>
                            </li>
                            <li>
                                <button onClick={(e) => handleNavClick(e, 'about')}>About</button>
                            </li>
                            <li>
                                <button onClick={(e) => handleNavClick(e, 'skills')}>Skills</button>
                            </li>
                            <li>
                                <button onClick={(e) => handleNavClick(e, 'projects')}>Projects</button>
                            </li>
                            <li>
                                <button onClick={(e) => handleNavClick(e, 'contact')}>Contact</button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info Section */}
                    <div className="footer-section">
                        <h4>Contact Info</h4>
                        <ul className="footer-contact">
                            <li>
                                <a href="mailto:rsujan140.in@gmail.com">rsujan140.in@gmail.com</a>
                            </li>
                            <li>
                                <a href="tel:+9779805376861">+977 9805376861</a>
                            </li>
                            <li>Morang, Nepal</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>
                        © {currentYear} Sujan Rai. All rights reserved.
                    </p>
                    <p className="footer-made-with">
                        I <FaHeart className="heart-icon" /> challenging my limits.
                    </p>
                    <button className="scroll-top" onClick={scrollToTop}>
                        <FaArrowUp /> Back to Top
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;