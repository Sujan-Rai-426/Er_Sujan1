import React, { useEffect, useRef, useState } from 'react';

const BgStars = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const themeRef = useRef('dark');
    
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile/touch device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Watch for theme changes
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const isDark = document.body.classList.contains('dark');
            themeRef.current = isDark ? 'dark' : 'light';
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Track pointer movement (mouse or touch)
    useEffect(() => {
        const handlePointerMove = (e) => {
            let clientX, clientY;
            if (e.touches) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            const normX = clientX / window.innerWidth;
            const normY = clientY / window.innerHeight;
            mouseRef.current = { x: normX, y: normY };
        };

        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchmove', handlePointerMove);
        window.addEventListener('touchstart', handlePointerMove);
        
        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('touchstart', handlePointerMove);
        };
    }, []);

    // Particle class
    class Particle {
        constructor(canvasWidth, canvasHeight) {
            this.reset(canvasWidth, canvasHeight);
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        reset(canvasWidth, canvasHeight) {
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() * canvasHeight;
        }

        update(canvasWidth, canvasHeight, mouseX, mouseY, influence) {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x < 0) this.x = canvasWidth;
            if (this.x > canvasWidth) this.x = 0;
            if (this.y < 0) this.y = canvasHeight;
            if (this.y > canvasHeight) this.y = 0;
            
            // Mouse/touch influence - particles move away from pointer
            const dx = mouseX * canvasWidth - this.x;
            const dy = mouseY * canvasHeight - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;
            
            if (distance < maxDistance) {
                const force = (1 - distance / maxDistance) * influence;
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * 2;
                this.y -= Math.sin(angle) * force * 2;
            }
        }

        draw(ctx, canvasWidth, canvasHeight, isDark) {
            const color = isDark ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(0, 0, 0, ${this.opacity * 0.5})`;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    const initParticles = (canvasWidth, canvasHeight) => {
        const particles = [];
        const particleCount = isMobile ? 100 : 200; // Fewer particles on mobile for performance
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvasWidth, canvasHeight));
        }
        particlesRef.current = particles;
    };

    // Animation loop
    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        const influence = isMobile ? 1.5 : 2.5; // Slightly less influence on mobile for smoother performance
        particlesRef.current.forEach(particle => {
            particle.update(width, height, mouseRef.current.x, mouseRef.current.y, influence);
            particle.draw(ctx, width, height, themeRef.current === 'dark');
        });
        
        // Draw connection lines between nearby particles (optional, only on desktop)
        if (!isMobile && themeRef.current === 'dark') {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const p1 = particlesRef.current[i];
                    const p2 = particlesRef.current[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        animationRef.current = requestAnimationFrame(animate);
    };

    // Setup canvas and resize handler
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(canvas.width, canvas.height);
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        animate();
        
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isMobile]);

    return (
        <canvas
            ref={canvasRef}
            className="bg-stars-canvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
            }}
        />
    );
};

export default BgStars;