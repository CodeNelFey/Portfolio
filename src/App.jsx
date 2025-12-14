import React, { useEffect, useState } from 'react';
import NavBar from './Components/NavBar';
import Hero from './Components/Hero';
import About from './Components/About';
import Education from './Components/Education';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import { useLanguage } from './context/LanguageContext';
// 1. IMPORT DU LOADER
import Loader from './Components/Loader';
import './Styles/App.css';

function App() {
    const { language } = useLanguage();

    // 2. ÉTAT DE CHARGEMENT
    // Par défaut à true pour afficher l'animation au lancement
    const [isLoading, setIsLoading] = useState(true);

    // Moteur de scroll (ton code existant)
    useEffect(() => {
        const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const smoothScroll = (e) => {
            const targetLink = e.target.closest('a[href^="#"]');
            if (!targetLink) return;
            e.preventDefault();
            const targetId = targetLink.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;
            const duration = 1500;
            const startPosition = window.pageYOffset;
            const navOffset = 100;
            const targetPosition = targetElement.getBoundingClientRect().top + startPosition - navOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;
            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutCubic(Math.min(timeElapsed / duration, 1));
                const nextScroll = startPosition + (distance * run);
                window.scrollTo(0, nextScroll);
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };
            requestAnimationFrame(animation);
        };
        document.addEventListener('click', smoothScroll);
        return () => document.removeEventListener('click', smoothScroll);
    }, []);

    return (
        <>
            {/* 3. LE LOADER S'AFFICHE SI isLoading EST TRUE */}
            {/* On lui passe une fonction pour dire "C'est fini, cache-toi" */}
            {isLoading && <Loader onLoaded={() => setIsLoading(false)} />}

            {/* Le reste du site est toujours là en dessous, prêt à être révélé */}
            <div className="app-container">
                <NavBar />

                <main key={language} className="lang-animate">
                    <Hero />
                    <About />
                    <Education />
                    <Projects />
                    <Contact />
                </main>
            </div>
        </>
    );
}

export default App;