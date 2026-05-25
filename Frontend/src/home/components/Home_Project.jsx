import React, { useState, useEffect } from 'react';
import Reveal from '../../utils/Reveal';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../assets/css/Home_Project.css';

// Helper hook to get window width
function useWindowSize() {
    const [size, setSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1200 });
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => setSize({ width: window.innerWidth });
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return size;
}

// Projects data – replace with your actual projects
const projectsData = {
    projects: [
        {
            id: 1,
            title: "Text Playground",
            category: "React",
            image: "https://res.cloudinary.com/dusqlukhy/image/upload/v1766908136/Er_Sujan/Project/gh6jgunmji6p7ej8f3sv.png",
            description: "Simple React App to manipulate the text style.",
            tech: ["React JS", "Bootstrap", "vercel", "github"],
            liveLink: "https://react-projects-azure.vercel.app/",
            githubLink: "https://github.com/Sujan-Rai-426/TextPlay"
        },
        {
            id: 2,
            title: "Quotes Generator",
            category: "JavaScripts",
            image: "https://res.cloudinary.com/dusqlukhy/image/upload/v1766908515/Er_Sujan/Project/ytcu2zbslvu47grhefko.png",
            description: "Random Quotes generator using JavaScripts.",
            tech: ["JavaScripts", "Netlify"],
            liveLink: "https://spiffy-bubblegum-422ac0.netlify.app/",
            githubLink: "https://github.com/Sujan-Rai-426/Quotes_Generator"
        },
        {
            id: 3,
            title: "BCT License Prep",
            category: ["React", "django"],
            image: "https://res.cloudinary.com/dusqlukhy/image/upload/v1766927849/Er_Sujan/Project/qxnrorrjkt90krfth4rf.png",
            description: "Website to help students to prepare for their Computer Engineering License with past Questions.",
            tech: ["React JS", "Bootstrap", "PostgreSQL", "DRF" ],
            liveLink: "https://bct-license.vercel.app/",
            githubLink: "https://github.com/Sujan-Rai-426/Liscense_Prep"
        },
        {
            id: 4,
            title: "CodeVora UI Library",
            category: ["React", "npm pkg"],
            image: "https://res.cloudinary.com/dusqlukhy/image/upload/v1767424459/Er_Sujan/Project/n0ebzrwdypeqw2p4747e.png",
            description: "Open source React Library from where user can get free animated components like Background, Buttons.",
            tech: ["JavaScript", "React JS", "github", "npm"],
            liveLink: "https://codevora140.vercel.app/react-library/topics",
            githubLink: "https://github.com/Sujan-Rai-426/CodeVora-UI-Library"
        },
        {
            id: 5,
            title: "CodeVora UI",
            category: ["React", "django", "UI/UX"],
            image: "https://res.cloudinary.com/dusqlukhy/image/upload/v1766928307/Er_Sujan/Project/lid9g4rj3oulrjyukuiv.png",
            description: "Website to help developer get free animated UI Components, prebuilt Templates, React Libraries.",
            tech: ["React JS", "vercel", "github", "PostgreSQL", "DRF"],
            liveLink: "https://codevora140.vercel.app/",
            githubLink: "https://github.com/Sujan-Rai-426/CodeVora/"
        },
        {
            id: 6,
            title: "INFIVITY Store",
            category: ["React", "django"],
            image: "https://res.cloudinary.com/dusqlukhy/image/upload/v1772272488/Er_Sujan/Project/mfa5kmyy59my4nda8jwn.png",
            description: "Full‑featured admin dashboard with product management and Product Catalog website to showcase product.",
            tech: ["React JS", "github", "DRF", "MySQL", "django", "cloudinary", "cpanel"],
            liveLink: "https://infivity.com.np",
            githubLink: "https://github.com/INFIVITY"
        },
        {
            id: 7,
            title: "INFIVITY Labs",
            category: ["React", "django"],
            image: "https://res.cloudinary.com/dusqlukhy/image/upload/v1773394211/Er_Sujan/Project/aewppcvbf0zzsoquoz2i.png",
            description: "Official Infivity Labs website with staff attendance track using GPS including checkin and checkout time.",
            tech: ["React JS", "Bootstrap", "github", "DRF", "JavaScript", "MySQL", "django", "cloudinary", "cpanel"],
            liveLink: "https://infivitylabs.com",
            githubLink: "https://github.com/INFIVITY"
        },
        {
            id: 8,
            title: "INFIVITY LMS",
            category: ["React", "django"],
            image: "https://res.cloudinary.com/dusqlukhy/image/upload/v1779705961/lms_s6xppu.png",
            description: "LMS with interactive learning modules, content, quizzes and progress tracking.",
            tech: ["React JS", "github", "DRF", "JavaScript", "MySQL", "django", "cpanel"],
            liveLink: "https://lms.infivitylabs.com",
            githubLink: "https://github.com/INFIVITY"
        }
    ]
};

// Helper function to check if a project matches a category
const matchesCategory = (project, category) => {
    if (category === 'All') return true;
    const projectCat = project.category;
    if (Array.isArray(projectCat)) {
        return projectCat.includes(category);
    }
    return projectCat === category;
};

const Home_Project = () => {
    const { width } = useWindowSize();
    const [activeCategory, setActiveCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(6);
    const [isExpanded, setIsExpanded] = useState(false);

    // Sort projects by id descending (latest first)
    const sortedProjects = [...projectsData.projects].sort((a, b) => b.id - a.id);

    // Dynamically generate categories from all projects (including array categories)
    const allCategories = new Set();
    projectsData.projects.forEach(project => {
        const cat = project.category;
        if (Array.isArray(cat)) {
            cat.forEach(c => allCategories.add(c));
        } else {
            allCategories.add(cat);
        }
    });
    const categoriesList = ['All', ...Array.from(allCategories).sort()];

    // Filter projects based on active category (support multiple)
    const filteredProjects = sortedProjects.filter(project => matchesCategory(project, activeCategory));

    const getDefaultVisibleCount = () => {
        if (width > 1024) return 6;
        if (width > 768) return 4;
        return 3;
    };

    useEffect(() => {
        if (!isExpanded) {
            setVisibleCount(getDefaultVisibleCount());
        }
    }, [activeCategory, width]);

    useEffect(() => {
        if (!isExpanded) {
            setVisibleCount(getDefaultVisibleCount());
        }
    }, [width, isExpanded]);

    const displayedProjects = filteredProjects.slice(0, visibleCount);
    const showViewMore = filteredProjects.length > getDefaultVisibleCount();

    const handleViewMore = () => {
        if (isExpanded) {
            setVisibleCount(getDefaultVisibleCount());
            setIsExpanded(false);
        } else {
            setVisibleCount(filteredProjects.length);
            setIsExpanded(true);
        }
    };

    return (
        <section className="projects-section" id="projects">
            <div className="projects-container">
                <Reveal direction="up" delay="0.1s">
                    <h2 className="projects-title">Featured Projects</h2>
                </Reveal>

                <Reveal direction="up" delay="0.2s">
                    <div className="project-filters">
                        {categoriesList.map((cat, idx) => (
                            <button
                                key={idx}
                                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </Reveal>

                <div className="projects-grid">
                    {displayedProjects.map((project, idx) => (
                        <Reveal key={project.id} direction="up" delay={0.2 + idx * 0.1}>
                            <div className="project-card">
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="project-overlay">
                                        <div className="project-links">
                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                                <FaExternalLinkAlt /> Live
                                            </a>
                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                                <FaGithub /> Code
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="project-info">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="project-tech">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {showViewMore && (
                    <div className="view-more-wrapper">
                        <button className="view-more-btn" onClick={handleViewMore}>
                            {isExpanded ? 'Show Less' : 'View More Projects'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home_Project;