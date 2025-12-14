import React, { useEffect, useState } from 'react';
import '../Styles/Loader.css';

const Loader = ({ onLoaded }) => {
    const [count, setCount] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Durée totale en ms (ici 3500ms = 3.5 secondes)
        const duration = 3500;
        const intervalTime = duration / 100; // Temps entre chaque %

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    // Une fois à 100%, on déclenche l'animation de sortie
                    setIsFading(true);

                    // On attend la fin de l'animation CSS (0.8s) avant de démonter le composant
                    setTimeout(onLoaded, 800);
                    return 100;
                }
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onLoaded]);

    return (
        <div className={`loader-container ${isFading ? 'fade-out' : ''}`}>
            <div className="loader-content">
                <h1 className="loader-counter">{count}%</h1>
                <div className="loader-bar-bg">
                    <div className="loader-bar-fill" style={{ width: `${count}%` }}></div>
                </div>
                <p className="loader-text">INITIALISATION DU PORTFOLIO...</p>
            </div>
        </div>
    );
};

export default Loader;