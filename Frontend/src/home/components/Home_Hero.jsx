// src/home/components/Home_Hero.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Reveal from '../../utils/Reveal';
import Typing_Effect from '../../utils/Typing_Effect';
import { Scroll_To_SectionID } from '../../utils/Scroll_To_SectionID';
import '../assets/css/Home_Hero.css';

// Optional: profile image (replace with your actual image)
import profileImg from '../assets/img/profile.jpg'; // or use a placeholder
import { FaHandPaper, FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane, FaPhone, FaYoutube } from 'react-icons/fa';

const Home_Hero = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (e, id, path = '/') => {
    Scroll_To_SectionID(e, id, navigate, location, path);
  };

  return (
    <section className="hero" id="home-hero">
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>

      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-content">
          <Reveal direction="left" delay="0.1s">
              <p className="hero-greeting">
                  <span className="waving-hand"><FaHandPaper /></span> Hello, I'm
              </p>
          </Reveal>

          <Reveal direction="left" delay="0.2s">
            <h1 className="hero-name">Sujan Rai</h1>
          </Reveal>

          <Reveal direction="left" delay="0.3s">
            <div className="hero-title-wrapper">
              <span className="hero-title-prefix">I am a </span>
              <Typing_Effect
                words={[
                  'Full-Stack Developer',
                  'Problem Solver',
                  'Logic Builder',
                  'Creative Coder'
                ]}
                speed={100}
                eraseSpeed={50}
                waitTime={2000}
              />
            </div>
          </Reveal>

          <Reveal direction="left" delay="0.4s">
            <p className="hero-description">
              I build responsive, accessible, and high‑performance web applications.
              Passionate about modern React, beautiful interfaces, and seamless user experiences.
            </p>
          </Reveal>

          <Reveal direction="left" delay="0.5s">
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={(e) => handleScroll(e, 'contact')}
              >
                  <FaPaperPlane/> Contact
              </button>
              <button
                className="btn btn-secondary"
                onClick={(e) => handleScroll(e, 'projects')}
              >
                  projects →
              </button>
            </div>
          </Reveal>

          <Reveal direction="left" delay="0.6s">
            <div className="social-links">
              <a href="https://github.com/Sujan-Rai-426" target="_blank" rel="noopener noreferrer">
                <FaGithub/>
              </a>
              <a href="https://www.linkedin.com/in/er-sujan-rai-18a07b2a6/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin/>
              </a>
              <a href="https://www.youtube.com/@CodeVora140" target="_blank" rel="noopener noreferrer">
                <FaYoutube/>
              </a>
              <a href="mailto:rsujan140.in@gmail.com">
                <FaEnvelope/>
              </a>
            </div>
          </Reveal>
        </div>

        {/* RIGHT AVATAR WITH REVEAL */}
        <Reveal direction="right" delay="0.3s">
          <div className="hero-avatar">
            <div className="avatar-wrapper">
              <img
                src={profileImg}
                alt="Sujan Rai"
                className="avatar-img"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Sujan'; }}
              />
              <div className="avatar-ring"></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Home_Hero;