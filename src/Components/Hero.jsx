import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../Styles/Hero.css';
import logo from '../assets/logo.svg';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="hero-section" id="home">
            <div className="hero-content">
                <h1 className="hero-title">{t.hero.title}</h1>
                <h2 className="hero-subtitle">{t.hero.subtitle}</h2>
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="hero-logo" />
                </div>
            </div>
        </section>
    );
};

export default Hero;