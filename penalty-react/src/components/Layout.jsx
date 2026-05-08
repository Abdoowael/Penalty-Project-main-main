import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    useEffect(() => {
        const cursor = document.querySelector('.custom-cursor');
        
        const handleMouseMove = (e) => {
            if (cursor) {
                // Using transform for better performance
                cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            }

            // Dynamic glow effect logic for cards
            const elements = document.querySelectorAll('.player-card, .info-row, .video-placeholder, .login-btn, .social-icons a, .stadium-header');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                el.style.setProperty('--mouse-x', `${x}px`);
                el.style.setProperty('--mouse-y', `${y}px`);
            });
        };

        const handleMouseEnter = () => cursor?.classList.add('cursor-active');
        const handleMouseLeave = () => cursor?.classList.remove('cursor-active');

        window.addEventListener('mousemove', handleMouseMove);
        
        // Intersection Observer for scroll reveal
        const revealCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        };

        const observer = new IntersectionObserver(revealCallback, {
            threshold: 0.1
        });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        // Add hover effect for all links and buttons
        const interactables = document.querySelectorAll('a, button, .player-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            interactables.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className="custom-cursor"></div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
