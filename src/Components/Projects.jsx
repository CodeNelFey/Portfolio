import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import '../Styles/Projects.css';

// --- IMPORTS IMAGES (Modifie selon tes vrais fichiers) ---
import imgPortfolio from '../assets/portfolio.png';
import imgHelloSchool from '../assets/helloschool.png';
import imgGamble from '../assets/soon.png';
import imgSoon from '../assets/soon.png';
import imgIaippon from '../assets/iaippon.png';
import imgDefault from '../assets/react.svg';

const Projects = () => {
    const { t } = useLanguage();
    const [selectedProject, setSelectedProject] = useState(null);

    // Refs pour le scroll spy mobile
    const containerRef = useRef(null);
    const [activeCardIndex, setActiveCardIndex] = useState(null);

    const imageMap = {
        'portfolio': imgPortfolio,
        'helloschool': imgHelloSchool,
        'gamble': imgGamble,
        'iaippon': imgIaippon,
        'soon': imgSoon,
    };

    // Scroll Spy pour détecter la carte au centre sur mobile
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Sur desktop, on ne veut pas de ce système
        if (window.matchMedia('(min-width: 769px)').matches) {
            setActiveCardIndex(null);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Si la carte est bien visible au centre
                    if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                        setActiveCardIndex(Number(entry.target.dataset.index));
                    }
                });
            },
            {
                root: container,
                threshold: [0.6, 0.7, 0.8], // Plusieurs seuils pour la précision
            }
        );

        const cards = container.querySelectorAll('.project-card');
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    const openProject = (project, image) => {
        setSelectedProject({ ...project, image });
        document.body.style.overflow = 'hidden';
    };

    const closeProject = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section className="projects-section" id="projects">
            <h2 className="section-title">{t.projects.title}</h2>

            <div className="projects-container" ref={containerRef}>
                {t.projects.items.map((project, index) => {
                    const projectImage = imageMap[project.imgKey] || imgDefault;
                    // isActive est true seulement sur mobile pour la carte du centre
                    const isActive = index === activeCardIndex;

                    return (
                        <div
                            key={index}
                            data-index={index}
                            className={`project-card ${isActive ? 'mobile-active' : ''}`}
                            onClick={() => openProject(project, projectImage)}
                        >
                            <div className="card-image-box">
                                <img src={projectImage} alt={project.title} />
                            </div>

                            <div className="card-content">
                                <h3>{project.title}</h3>
                                <div className="tech-tags-container">
                                    {project.tech.map((techItem, i) => (
                                        <span key={i} className="tech-tag">{techItem}</span>
                                    ))}
                                </div>
                                <p className="description">{project.desc}</p>
                                <div className="card-footer">
                                    <div className="card-number">0{index + 1}</div>
                                    <span className="click-info">{t.projects.btn_more} &rarr;</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modale inchangée */}
            {selectedProject && createPortal(
                <div className="project-modal-overlay" onClick={closeProject}>
                    <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeProject}>&times;</button>
                        <div className="modal-header">
                            <div className="modal-image-placeholder">
                                <img src={selectedProject.image} alt={selectedProject.title} />
                            </div>
                        </div>
                        <div className="modal-body">
                            <h2>{selectedProject.title}</h2>
                            <div className="tech-tags-container modal-tags">
                                {selectedProject.tech.map((techItem, i) => (
                                    <span key={i} className="tech-tag">{techItem}</span>
                                ))}
                            </div>
                            <p className="modal-desc">{selectedProject.details}</p>
                            <a href={selectedProject.link} target="_blank" rel="noreferrer" className="modal-link">
                                {t.projects.btn_github}
                            </a>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
};

export default Projects;