// src/utilis/Scroll_To_SectionID.jsx


export const Scroll_To_SectionID = (e, id, navigate, location, targetPath = '/') => {
    if (e && e.preventDefault) e.preventDefault();

    const element = document.getElementById(id);

    // If already on the page
    if (location.pathname === targetPath && element) {
        const offset = 70;
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    } 
    // If navigating from /school/ or /contact/
    else {
        navigate(targetPath, { state: { scrollToSection: id } });
    }
};

// GLOBAL LISTENER - Put this at the bottom of the utility file
if (typeof window !== "undefined") {
    const executeScroll = () => {
        const state = window.history.state?.usr;
        const id = state?.scrollToSection;

        if (id) {
            // Use a small delay to "beat" the browser's default jump to top
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 70;
                    // If scrolling to HERO (top), we sometimes need to force a non-zero scroll 
                    // first or wait for the paint to finish.
                    const top = id === 'HOME_HERO' ? 0 : element.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({ top, behavior: 'smooth' });

                    // Clear state so it doesn't loop
                    window.history.replaceState({ ...window.history.state, usr: {} }, document.title);
                }
            }, 150); // Increased delay slightly for HERO
        }
    };

    window.addEventListener('popstate', executeScroll);
    window.addEventListener('load', executeScroll);
    
    // Catch cases where the page is already loaded but React is still mounting
    if (document.readyState === 'complete') {
        executeScroll();
    }
}
/* ========================================================================
                    USAGE EXAMPLE in NAVBAR.JSX
======================================================================== */

// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { Scroll_To_SectionID } from './utilis/Scroll_To_SectionID';

// const Navbar = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     // Helper to keep JSX clean
//     const handleScroll = (e, id, path) => Scroll_To_SectionID(e, id, navigate, location, path);
    
//     return (
//         <nav>
//             {/* CASE A: Scrolling on the SAME PAGE */}
//             <button onClick={(e) => handleScroll(e, 'FEATURES')}>
//                 Features
//             </button>

//             {/* CASE B: Navigating to HOME and then scrolling */}
//             <Link 
//                 to="/" 
//                 onClick={(e) => handleScroll(e, 'HERO_SECTION', '/')}
//             >
//                 Home
//             </Link>

//             {/* CASE C: Navigating to a DIFFERENT URL and then scrolling */}
//             <button 
//                 onClick={(e) => handleScroll(e, 'SUJAN', '/utils/viewport-reveal')}
//             >
//                 Reveal Sujan
//             </button>
//         </nav>
//     );
// };