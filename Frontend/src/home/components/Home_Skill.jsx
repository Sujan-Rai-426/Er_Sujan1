// src/home/components/Home_Skill.jsx

import React from 'react';
import Reveal from '../../utils/Reveal';
import { FaCode, FaDatabase, FaTools, FaCloud, FaReact, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaFigma, FaCpanel, FaNetworkWired } from 'react-icons/fa';
import { SiTailwindcss, SiRedux, SiMongodb, SiExpress, SiNodedotjs, SiBootstrap, SiDjango, SiPostgresql, SiMysql, SiPython, SiCloudinary, SiRender } from 'react-icons/si';
import '../assets/css/Home_Skill.css';

// Skills data object – replace with your actual skills
const skillsData = {
    categories: [
        {
            name: "Frontend Development",
            icon: <FaCode color="#61dafb" />,
            skills: [
                { name: "React JS", level: 80, icon: <FaReact color="#61dafb" /> },
                { name: "JavaScript/ES6", level: 68, icon: <FaJs color="#f7df1e" /> },
                { name: "HTML5", level: 85, icon: <FaHtml5 color="#e34f26" /> },
                { name: "CSS3", level: 85, icon: <FaCss3Alt color="#1572b6" /> },
                { name: "Bootstrap", level: 92, icon: <SiBootstrap color="#7952b3" /> },
            ]
        },
        {
            name: "Backend & Database",
            icon: <FaDatabase color="#336791" />,
            skills: [
                { name: "Python", level: 75, icon: <SiPython color="#3776ab" /> },
                { name: "Django", level: 75, icon: <SiDjango color="#092e20" /> },
                { name: "Django REST Framework", level: 70, icon: <FaNetworkWired color="#a30000" /> },
                { name: "PostgreSQL", level: 70, icon: <SiPostgresql color="#4169e1" /> },
                { name: "MySQL", level: 65, icon: <SiMysql color="#4479a1" /> }
            ]
        },
        {
            name: "Tools & Others",
            icon: <FaTools color="#ff8c00" />,
            skills: [
                { name: "Git/GitHub", level: 85, icon: <FaGitAlt color="#f05032" /> },
                { name: "Cpanel", level: 75, icon: <FaCpanel color="#ff6c2c" /> },
                { name: "Render", level: 80, icon: <SiRender color="#46e3b7" /> },
                { name: "VS Code", level: 90, icon: <FaCode color="#007acc" /> },
                { name: "Cloudinary", level: 75, icon: <SiCloudinary color="#3448c5" /> }
            ]
        }
    ]
};

const Home_Skill = () => {
    return (
        <section className="skills-section" id="skills">
            <div className="skills-container">
                <Reveal direction="up" delay="0.1s">
                    <h2 className="skills-title">Technical Skills</h2>
                </Reveal>

                <div className="skills-grid">
                    {skillsData.categories.map((category, catIdx) => (
                        <Reveal key={catIdx} direction="up" delay={0.2 + catIdx * 0.1}>
                            <div className="skill-category">
                                <div className="category-header">
                                    <span className="category-icon">{category.icon}</span>
                                    <h3>{category.name}</h3>
                                </div>
                                <div className="skills-list">
                                    {category.skills.map((skill, idx) => (
                                        <div key={idx} className="skill-item">
                                            <div className="skill-info">
                                                <span className="skill-icon">{skill.icon}</span>
                                                <span className="skill-name">{skill.name}</span>
                                                <span className="skill-percent">{skill.level}%</span>
                                            </div>
                                            <div className="skill-bar">
                                                <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                                            </div>
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

export default Home_Skill;