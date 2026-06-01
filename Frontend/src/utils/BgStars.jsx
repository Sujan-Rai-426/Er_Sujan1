import React, { useEffect, useRef, useState } from 'react';

const BgStars = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const themeRef = useRef('dark');
    
    const [isMobile, setIsMobile] = useState(false);
    const [deviceType, setDeviceType] = useState('desktop'); // 'desktop', 'tablet', 'mobile'

    // Check for device type
    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setDeviceType('mobile');
                setIsMobile(true);
            } else if (width < 1024) {
                setDeviceType('tablet');
                setIsMobile(false);
            } else {
                setDeviceType('desktop');
                setIsMobile(false);
            }
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
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
            // Adjust particle size based on device
            this.size = Math.random() * (deviceType === 'mobile' ? 1.5 : 2) + (deviceType === 'mobile' ? 0.5 : 1);
            this.speedX = (Math.random() - 0.5) * (deviceType === 'mobile' ? 0.2 : 0.3);
            this.speedY = (Math.random() - 0.5) * (deviceType === 'mobile' ? 0.2 : 0.3);
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
            const maxDistance = deviceType === 'mobile' ? 100 : 150;
            
            if (distance < maxDistance) {
                const force = (1 - distance / maxDistance) * influence;
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * 2;
                this.y -= Math.sin(angle) * force * 2;
            }
        }

        draw(ctx, canvasWidth, canvasHeight, isDark) {
            // Star/particle colors based on theme
            let color;
            if (isDark) {
                color = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
            } else {
                color = `rgba(100, 100, 100, ${this.opacity * 0.6})`;
            }
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Get connection line color based on theme and device
    const getLineColor = (isDark) => {
        if (isDark) {
            // Dark mode: subtle white/blue glow
            return 'rgba(255, 255, 255, 0.12)';
        } else {
            // Light mode: subtle gray/purple
            return 'rgba(100, 100, 150, 0.15)';
        }
    };

    // Adjust connection distance based on device
    const getConnectionDistance = () => {
        switch(deviceType) {
            case 'mobile': return 80;
            case 'tablet': return 100;
            default: return 120;
        }
    };

    // Initialize particles
    const initParticles = (canvasWidth, canvasHeight) => {
        const particles = [];
        // Adjust particle count based on device for performance
        let particleCount;
        switch(deviceType) {
            case 'mobile': particleCount = 60;
                break;
            case 'tablet': particleCount = 120;
                break;
            default: particleCount = 180;
        }
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
        const influence = deviceType === 'mobile' ? 1.2 : (deviceType === 'tablet' ? 1.8 : 2.5);
        const particles = particlesRef.current;
        
        particles.forEach(particle => {
            particle.update(width, height, mouseRef.current.x, mouseRef.current.y, influence);
            particle.draw(ctx, width, height, themeRef.current === 'dark');
        });
        
        // Draw connection lines between nearby particles - NOW VISIBLE ON ALL DEVICES AND THEMES
        const isDark = themeRef.current === 'dark';
        const lineColor = getLineColor(isDark);
        const maxDistance = getConnectionDistance();
        
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = deviceType === 'mobile' ? 0.4 : 0.6;
        
        // Optimized connection drawing (skip some checks for performance on mobile)
        const step = deviceType === 'mobile' ? 3 : 1; // Skip some connections on mobile for performance
        
        for (let i = 0; i < particles.length; i += step) {
            for (let j = i + 1; j < particles.length; j += step) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    // Calculate opacity based on distance (closer = more visible)
                    const opacity = isDark ? 0.15 : 0.12;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
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
    }, [deviceType]);

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