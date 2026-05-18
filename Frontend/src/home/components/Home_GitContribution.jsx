// src/home/components/Home_GitContribution.css
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { FaGithub, FaHistory } from 'react-icons/fa';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Reveal from '../../utils/Reveal';
import '../assets/css/Home_GitContribution.css';

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

function useCurrentTheme() {
    const [theme, setTheme] = useState(() =>
        typeof document !== 'undefined' && document.body.classList.contains('dark') ? 'dark' : 'light'
    );
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(document.body.classList.contains('dark') ? 'dark' : 'light');
        });
            observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
            return () => observer.disconnect();
    }, []);
    return theme;
}

const Home_GitContribution = () => {
    const scrollRef = useRef(null);
    const [selectedYear, setSelectedYear] = useState('last');
    const { width } = useWindowSize();
    const currentTheme = useCurrentTheme();

    let blockSize = 15;
    if (width < 768) blockSize = 12;
    else if (width < 1024) blockSize = 13;

    const calendarTheme = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    useLayoutEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }, [selectedYear]);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container || width >= 1024) return;
        let timeout;
        const handleScroll = () => {
            container.classList.add('is-scrolling');
            clearTimeout(timeout);
            timeout = setTimeout(() => container.classList.remove('is-scrolling'), 1000);
        };
        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            container.removeEventListener('scroll', handleScroll);
            clearTimeout(timeout);
        };
    }, [width]);

    const years = ['last', 2026, 2025, 2024];

    return (
        <section className="git-section" id="git-contributions">
            <div className="git-container">
                <Reveal direction="up" delay="0.1s">
                {/* Terminal header – no card background */}
                    <div className="git-terminal-header">
                        <div className="git-dots">
                            <span className="git-dot red"></span>
                            <span className="git-dot yellow"></span>
                            <span className="git-dot green"></span>
                        </div>
                        <div className="git-id">GITHUB_CONTRIBUTIONS_v4.2</div>
                    </div>

                    <div className="git-scroll-container" ref={scrollRef}>
                        <div className="git-header-inline">
                            <div className="git-user-block">
                                <FaGithub className="git-icon-neon" />
                                <h3 className="git-project-name">@Sujan-Rai-426</h3>
                            </div>
                            <div className="git-year-selector">
                                <FaHistory className="history-icon" />
                                {years.map((y) => (
                                    <button
                                        key={y}
                                        onClick={() => setSelectedYear(y)}
                                        className={`year-btn ${selectedYear === y ? 'active' : ''}`}
                                    >
                                        {y === 'last' ? 'LATEST' : y}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="calendar-wrapper">
                            <GitHubCalendar
                                username="Sujan-Rai-426"
                                year={selectedYear === 'last' ? undefined : selectedYear}
                                theme={calendarTheme}
                                fontSize={14}
                                blockSize={blockSize}
                                blockMargin={4}
                                colorScheme={currentTheme}
                                renderBlock={(block, activity) =>
                                    React.cloneElement(block, {
                                        'data-tooltip-id': 'git-tooltip',
                                        'data-tooltip-content': `${activity.count} contributions on ${activity.date}`,
                                    })
                                }
                            />
                            <ReactTooltip id="git-tooltip" className="matrix-tooltip" delayShow={100} />
                        </div>

                        <p className="git-terminal-prompt">
                            &gt; @Sujan-Rai-426 Github Contribution <span className="blink">_</span>
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Home_GitContribution;