import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../Styles/About.css';
// Remplace par ton image réelle
//const profileImg = "https://placehold.co/600x800/1a1a1a/FFFFFF?text=PHOTO";
import profileImg from "../assets/photo.webp"

const About = () => {
    const { t } = useLanguage();

    return (
        <section className="about-section" id="about">
            <div className="about-container">

                <div className="about-text-content">
                    <h2 className="section-title-left">{t.about.title}</h2>
                    <h3 className="about-headline">{t.about.headline}</h3>

                    <p>{t.about.p1}</p>
                    <p>{t.about.p2}</p>
                    <p>{t.about.p3}</p>

                    <div className="about-stats">
                        <div className="stat-item">
                            <span className="stat-number">3+</span>
                            <span className="stat-label">{t.about.stat1}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">{t.about.stat2}</span>
                        </div>
                    </div>
                </div>

                <div className="about-image-wrapper">
                    <div className="image-container-style">
                        <img src={profileImg} alt="Sohan Birotheau" className="about-profile-img" />
                        <div className="img-overlay"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;