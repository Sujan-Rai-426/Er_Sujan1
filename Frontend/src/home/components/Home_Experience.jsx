// src/home/components/Home_Experience.jsx

import React from 'react';
import Reveal from '../../utils/Reveal';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import '../assets/css/Home_Experience.css';

// Experience data object – replace with your real data
const experienceData = {
    experiences: [
        {
            title: "Junior Developer",
            company: "INFIVITY Labs",
            location: "Damak, Nepal",
            period: "2026 – present",
            description: "Role as developer and mentor. From system designing to building optimized system like LMS, attendance system, catalog ecommerce site, etc.",
            technologies: ["HTML/CSS", "React JS", "Django", "Django Rest Framework", "MySql", "github"]
        },
        {
            title: "Intern",
            company: "INFIVITY Labs",
            location: "Damak, Nepal",
            period: "2026 Jan15 – 2026 Apr15",
            description: "Intern for 3 months. Learn how to work as a team in github in professional environment.",
            technologies: ["React JS", "Django", "Django Rest Framework", "MySql", "github"]
        },
        {
            title: "Learning Phase",
            company: "Self Learing",
            location: "Nepal",
            period: "2021 – present",
            description: "Build projects like BCT License prep, CodeVora UI, InternHUB, etc..",
            technologies: ["Problem Solving", "Data Structure & Algorithms", "HTML/CSS", "github", "React JS", "Django", "Django Rest Framework", "MySql", "C++"]
        }
    ],
    education: [
        {
            degree: "Bachelor in Computer Engineering",
            institution: "Madan Bhandari Collage of Engineering",
            location: "Urlabari-03, Jhapa. Nepal",
            period: "2019 – 2024",
            description: "Specialized in Computer programming, Data Structure and Algorithms [DSA], Artificial Intelligence and Machine Learing.",
            achievements: ["Licensed Engineer registered in NEC"]
        },
        {
            degree: "Higher Secondary Education",
            institution: "Bishnu Memorial Secondary School",
            location: "Dharan-09, Sunsari, Nepal",
            period: "",
            description: "Major in Maths and Biology."
        },
        {
            degree: "Secondary Education",
            institution: "Amar Boarding School",
            location: "Belbari-10, Morang, Nepal",
            period: "",
            description: "Character development and basics of Maths, science and socials."
        }
    ]
};

const Home_Experience = () => {
    return (
        <section className="experience-section" id="experience">
            <div className="experience-container">
                <Reveal direction="up" delay="0.1s">
                    <h2 className="experience-title">Professional Journey</h2>
                </Reveal>

                <div className="experience-grid">
{/*********************** Work Experience Column ***********************/}
                    <div className="exp-column">
                        <Reveal direction="left" delay="0.2s">
                            <div className="exp-header">
                                <FaBriefcase className="header-icon" />
                                <h3>Work Experience</h3>
                            </div>
                        </Reveal>
                        <div className="timeline">
                            {experienceData.experiences.map((exp, idx) => (
                                <Reveal key={idx} direction="left" delay={0.2 + idx * 0.1}>
                                    <div className="timeline-card">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <h4>{exp.title}</h4>
                                            <div className="timeline-meta">
                                                <span className="company">{exp.company}</span>
                                                <span className="meta-sep">•</span>
                                                <span className="location"><FaMapMarkerAlt /> {exp.location}</span>
                                                <span className="meta-sep">•</span>
                                                <span className="period"><FaCalendarAlt /> {exp.period}</span>
                                            </div>
                                            <p className="description">{exp.description}</p>
                                            {exp.technologies && (
                                                <div className="tech-stack">
                                                    {exp.technologies.map((tech, i) => (
                                                        <span key={i} className="tech-badge">{tech}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                        <div className="smoky-overlay"></div>
                    </div>

{/*********************** Education Column ***********************/}
                    <div className="edu-column">
                        <Reveal direction="right" delay="0.2s">
                            <div className="exp-header">
                                <FaGraduationCap className="header-icon" />
                                <h3>Education</h3>
                            </div>
                        </Reveal>
                        <div className="timeline">
                            {experienceData.education.map((edu, idx) => (
                                <Reveal key={idx} direction="right" delay={0.2 + idx * 0.1}>
                                    <div className="timeline-card">
                                        <div className="timeline-dot edu-dot"></div>
                                        <div className="timeline-content">
                                            <h4>{edu.degree}</h4>
                                            <div className="timeline-meta">
                                                <span className="company">{edu.institution}</span>
                                                <span className="meta-sep">•</span>
                                                <span className="location"><FaMapMarkerAlt /> {edu.location}</span>
                                                <span className="meta-sep">•</span>
                                                <span className="period"><FaCalendarAlt /> {edu.period}</span>
                                            </div>
                                            <p className="description">{edu.description}</p>
                                            {edu.achievements && (
                                                <ul className="achievements-list">
                                                    {edu.achievements.map((ach, i) => (
                                                        <li key={i}>🏆 {ach}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                        <div className="smoky-overlay"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home_Experience;
