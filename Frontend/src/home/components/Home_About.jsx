import React, { useState } from 'react';
import Reveal from '../../utils/Reveal';
import Typing_Effect from '../../utils/Typing_Effect';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload, FaQuoteLeft, FaYoutube, FaExpand, FaCompress } from 'react-icons/fa';
import '../assets/css/Home_About.css';

const aboutData = {
    bioIntro: "I'm a",
    bioRole: "Full-Stack Developer",
    bioExtra: "with 3+ years of experience crafting modern, responsive web applications.",
    passion: "I love turning complex problems into simple, elegant designs.",
    focus: "My focus is on performance, accessibility, and delivering",
    focusHighlight: "exceptional user experiences.",
    
    social: {
        github: "https://github.com/Sujan-Rai-426",
        linkedin: "https://www.linkedin.com/in/er-sujan-rai-18a07b2a6/",
        youtube: "https://www.youtube.com/@CodeVora140",
        email: "mailto:rsujan140.in@gmail.com",
    },
    
    resume: {
        url: "https://res.cloudinary.com/dusqlukhy/image/upload/v1766915356/Er_Sujan/CV/xnw5apnafh4uv9nkfkxf.jpg",
        preview: "https://res.cloudinary.com/dusqlukhy/image/upload/v1766915356/Er_Sujan/CV/xnw5apnafh4uv9nkfkxf.jpg",
    }
};

const Home_About = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleDownloadResume = () => window.open(aboutData.resume.url, '_blank');

    return (
        <section className="about-section" id="about">
            <div className="about-container">
                <Reveal direction="up" delay="0.1s">
                    <h2 className="about-title">About Me</h2>
                </Reveal>

                <div className="about-content">
                    {/* LEFT: Bio + Social */}
                    <div className="about-left">
                        <Reveal direction="left" delay="0.2s">
                            <div className="bio-card">
                                <div className="bio-quote-icon">
                                    <FaQuoteLeft />
                                </div>
                                <div className="bio-text">
                                    <p className="bio-line">
                                        {aboutData.bioIntro}{' '}
                                        <span className="typing-wrapper">
                                            <Typing_Effect
                                                words={[aboutData.bioRole, "Problem Solver", "Creative Coder"]}
                                                speed={120}
                                                eraseSpeed={60}
                                                waitTime={2000}
                                            />
                                        </span>
                                    </p>
                                    <p className="bio-line">{aboutData.bioExtra}</p>
                                    <p className="bio-line passion">{aboutData.passion}</p>
                                    <p className="bio-line">
                                        {aboutData.focus}{' '}
                                        <span className="highlight">{aboutData.focusHighlight}</span>
                                    </p>
                                </div>
                                <div className="bio-stats">
                                    <div className="stat-item">
                                        <span className="stat-number">3+</span>
                                        <span className="stat-label">Years Experience</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">5+</span>
                                        <span className="stat-label">Projects Completed</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">10+</span>
                                        <span className="stat-label">Happy Clients</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal direction="left" delay="0.3s">
                            <div className="social-card">
                                <h3>Connect with me</h3>
                                <div className="social-icons">
                                    <a href={aboutData.social.github} target="_blank" rel="noopener noreferrer">
                                        <FaGithub /> GitHub
                                    </a>
                                    <a href={aboutData.social.linkedin} target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin /> LinkedIn
                                    </a>
                                    <a href={aboutData.social.youtube} target="_blank" rel="noopener noreferrer">
                                        <FaYoutube /> YouTube
                                    </a>
                                    <a href={aboutData.social.email}>
                                        <FaEnvelope /> Email
                                    </a>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT: Resume with half preview + unfold button */}
                    <div className="about-right">
                        <Reveal direction="right" delay="0.2s">
                            <div className="resume-card">
                                <h3>📄 Resume / CV</h3>
                                <div className={`resume-preview ${isExpanded ? 'expanded' : ''}`}>
                                    <img src={aboutData.resume.preview} alt="Resume preview" />
                                    <div className="preview-overlay"></div>
                                </div>
                                <div className="preview-actions">
                                    <button 
                                        className="unfold-btn"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        {isExpanded ? <FaCompress /> : <FaExpand />}
                                        {isExpanded ? ' Collapse' : ' Unfold Full View'}
                                    </button>
                                    <button className="resume-btn" onClick={handleDownloadResume}>
                                        <FaDownload /> Download PDF
                                    </button>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home_About;