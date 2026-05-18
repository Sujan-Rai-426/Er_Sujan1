// src/utils/Reveal.jsx 

import React, { useEffect, useRef, useState } from 'react';

const Reveal = ({ children, direction = "up", delay = "0.2s", className }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // By passing the boolean directly, it resets when leaving the viewport
                setVisible(entry.isIntersecting);
            });
        }, { 
            threshold: 0.1,
            // Adjust margin so it triggers exactly when coming into view
            rootMargin: "0px 0px -20px 0px" 
        });

        if (domRef.current) {
            observer.observe(domRef.current);
        }
        
        return () => {
            if (domRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(domRef.current);
            }
        };
    }, []);

    const getTransform = () => {
        switch(direction) {
            case 'left': return 'translateX(-40px)';
            case 'right': return 'translateX(40px)';
            case 'down': return 'translateY(-40px)';
            default: return 'translateY(40px)';
        }
    };

    const finalDelay = typeof delay === 'number' ? `${delay}s` : delay;

    const styles = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0,0)' : getTransform(),
        transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${finalDelay}`,
        width: '100%',
        // Use inherit to prevent breaking flex/grid parent layouts
        // display: 'inherit' 
    };

    return (
        <div ref={domRef} style={styles} className={className}>
            {children}
        </div>
    );
};

export default Reveal;

// --- EXAMPLE USAGE COMPONENT ---
/*
    <Reveal direction="right" delay="0.4s">
        <CARD />
    </Reveal>
*/