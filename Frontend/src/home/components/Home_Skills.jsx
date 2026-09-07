// src/home/components/Home_Skills.jsx

import React from 'react';
import Reveal from '../../utils/Reveal';
import { FaCode, FaDatabase, FaTools, FaReact, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaCpanel, FaNetworkWired } from 'react-icons/fa';
import { SiBootstrap, SiDjango, SiPostgresql, SiMysql, SiPython, SiCloudinary, SiRender } from 'react-icons/si';
import '../assets/css/Home_Skills.css';

const Home_Skills = () => {
    const skillsData = {
        categories: [
            {
                name: "Frontend Development",
                icon: <FaCode color="#61dafb" />,
                tag: "My daily drivers.",
                skills: [
                    { name: "React JS", icon: <FaReact color="#61dafb" /> },
                    { name: "JavaScript/ES6", icon: <FaJs color="#f7df1e" /> },
                    { name: "HTML5", icon: <FaHtml5 color="#e34f26" /> },
                    { name: "CSS3", icon: <FaCss3Alt color="#1572b6" /> },
                    { name: "Bootstrap", icon: <SiBootstrap color="#7952b3" /> },
                ]
            },
            {
                name: "Backend & Database",
                icon: <FaDatabase color="#336791" />,
                tag: "What I build with.",
                skills: [
                    { name: "Python", icon: <SiPython color="#3776ab" /> },
                    { name: "Django", icon: <SiDjango color="#092e20" /> },
                    { name: "Django REST Framework", icon: <FaNetworkWired color="#a30000" /> },
                    { name: "PostgreSQL", icon: <SiPostgresql color="#4169e1" /> },
                    { name: "MySQL", icon: <SiMysql color="#4479a1" /> }
                ]
            },
            {
                name: "Tools & Others",
                icon: <FaTools color="#ff8c00" />,
                tag: "Bread and butter.",
                skills: [
                    { name: "Git/GitHub", icon: <FaGitAlt color="#f05032" /> },
                    { name: "Cpanel", icon: <FaCpanel color="#ff6c2c" /> },
                    { name: "Render", icon: <SiRender color="#46e3b7" /> },
                    { name: "VS Code", icon: <FaCode color="#007acc" /> },
                    { name: "Cloudinary", icon: <SiCloudinary color="#3448c5" /> }
                ]
            }
        ]
    };

    return (
        <section className="skills-section" id="skills">
            <div className="skills-container">
                <Reveal direction="up" delay="0.1s">
                    <div className="skills-header">
                        <div className="skills-badge-wrapper">
                            <span className="skills-badge">✦ Toolkit</span>
                        </div>
                        <h2 className="skills-title">Skills & <span>Services</span></h2>
                        <p className="skills-subtitle">What I work with day to day.</p>
                    </div>
                </Reveal>

                <div className="skills-grid">
                    {skillsData.categories.map((category, catIdx) => (
                        <Reveal key={catIdx} direction="up" delay={0.2 + catIdx * 0.1}>
                            <div className="skill-card">
                                <div className="skill-card-glow"></div>
                                <div className="skill-card-header">
                                    <div className="skill-category-icon-wrapper">
                                        {category.icon}
                                    </div>
                                    <div className="skill-category-info">
                                        <h3>{category.name}</h3>
                                        <span className="skill-tag">{category.tag}</span>
                                    </div>
                                </div>
                                <div className="skill-chips">
                                    {category.skills.map((skill, idx) => (
                                        <div key={idx} className="skill-chip">
                                            <div className="skill-chip-icon">
                                                {skill.icon}
                                            </div>
                                            <span className="skill-chip-name">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home_Skills;