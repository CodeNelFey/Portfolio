import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../Styles/NavBar.css';

import frFlag from '../assets/fr.svg';
import enFlag from '../assets/en.svg';
import cnFlag from '../assets/cn.svg'; // Assure-toi d'avoir ce fichier
import ruFlag from '../assets/ru.svg'; // Assure-toi d'avoir ce fichier

// ... (Gardez les constantes IconHome, IconUser, etc. inchangées) ...
// Pour gagner de la place ici, je ne remets pas les icônes SVG, garde celles que tu as déjà.
const IconHome = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconUser = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconEdu = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const IconCode = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconMenu = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;


const NavBar = () => {
    const { language, switchLanguage, t } = useLanguage();

    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navRefs = useRef({});
    const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });

    // --- Gestion du Scroll ---
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'education', 'projects', 'contact'];
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= -300 && rect.top <= 300) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- Gestion de la Bulle ---
    useEffect(() => {
        const currentLink = navRefs.current[activeSection];
        if (currentLink) {
            setBubbleStyle({
                left: currentLink.offsetLeft,
                width: currentLink.offsetWidth,
                opacity: 1
            });
        }
    }, [activeSection, language]);

    // --- Helpers ---
    const getActiveSectionName = () => {
        switch(activeSection) {
            case 'home': return t.nav.home;
            case 'about': return t.nav.about;
            case 'education': return t.nav.education;
            case 'projects': return t.nav.projects;
            case 'contact': return t.nav.contact;
            default: return "MENU";
        }
    };

    const getActiveIcon = () => {
        switch(activeSection) {
            case 'home': return <IconHome />;
            case 'about': return <IconUser />;
            case 'education': return <IconEdu />;
            case 'projects': return <IconCode />;
            case 'contact': return <IconMail />;
            default: return <IconMenu />;
        }
    };

    // --- HELPER MISE À JOUR POUR LE DRAPEAU ACTUEL ---
    const getCurrentFlag = () => {
        switch (language) {
            case 'fr': return frFlag;
            case 'en': return enFlag;
            case 'zh': return cnFlag; // Chinois
            case 'ru': return ruFlag; // Russe
            default: return frFlag;
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">SB.</div>

            {/* MENU DESKTOP */}
            <div className="nav-links-wrapper desktop-only">
                <ul className="nav-links">
                    <div className="nav-bubble" style={bubbleStyle}></div>

                    <li ref={el => navRefs.current['home'] = el}>
                        <a href="#home" className={activeSection === 'home' ? 'active-text' : ''} key={language + '1'}>{t.nav.home}</a>
                    </li>
                    <li ref={el => navRefs.current['about'] = el}>
                        <a href="#about" className={activeSection === 'about' ? 'active-text' : ''} key={language + '2'}>{t.nav.about}</a>
                    </li>
                    <li ref={el => navRefs.current['education'] = el}>
                        <a href="#education" className={activeSection === 'education' ? 'active-text' : ''} key={language + 'edu'}>{t.nav.education}</a>
                    </li>
                    <li ref={el => navRefs.current['projects'] = el}>
                        <a href="#projects" className={activeSection === 'projects' ? 'active-text' : ''} key={language + '3'}>{t.nav.projects}</a>
                    </li>
                    <li ref={el => navRefs.current['contact'] = el}>
                        <a href="#contact" className={activeSection === 'contact' ? 'active-text' : ''} key={language + '4'}>{t.nav.contact}</a>
                    </li>
                </ul>
            </div>

            {/* MENU MOBILE CENTRAL */}
            <div className="nav-mobile-dropdown-container">
                <button
                    className={`nav-btn-mobile ${isNavOpen ? 'active-btn' : ''}`}
                    onClick={() => { setIsNavOpen(!isNavOpen); setIsLangOpen(false); }}
                >
                    <div className="nav-label-wrapper" key={activeSection}>
                        {getActiveIcon()}
                        <span className="btn-text">{getActiveSectionName().toUpperCase()}</span>
                    </div>
                    <span className={`arrow-icon ${isNavOpen ? 'open' : ''}`}>▼</span>
                </button>
                {isNavOpen && (
                    <div className="nav-dropdown-menu">
                        <a href="#home" className={`nav-dropdown-item ${activeSection === 'home' ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}><IconHome /> <span>{t.nav.home}</span></a>
                        <a href="#about" className={`nav-dropdown-item ${activeSection === 'about' ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}><IconUser /> <span>{t.nav.about}</span></a>
                        <a href="#education" className={`nav-dropdown-item ${activeSection === 'education' ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}><IconEdu /> <span>{t.nav.education}</span></a>
                        <a href="#projects" className={`nav-dropdown-item ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}><IconCode /> <span>{t.nav.projects}</span></a>
                        <a href="#contact" className={`nav-dropdown-item ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}><IconMail /> <span>{t.nav.contact}</span></a>
                    </div>
                )}
            </div>

            {/* SÉLECTEUR DE LANGUE */}
            <div className="lang-dropdown-container">
                <button className="lang-btn-current" onClick={() => { setIsLangOpen(!isLangOpen); setIsNavOpen(false); }}>
                    <img src={getCurrentFlag()} alt={language} className="flag-icon" />
                    <span className="lang-code">{language.toUpperCase()}</span>
                    <span className={`arrow-icon ${isLangOpen ? 'open' : ''}`}>▼</span>
                </button>

                {isLangOpen && (
                    <div className="dropdown-menu">
                        {/* Français */}
                        <div className={`dropdown-item ${language === 'fr' ? 'active' : ''}`} onClick={() => { switchLanguage('fr'); setIsLangOpen(false); }}>
                            <img src={frFlag} alt="FR" className="flag-icon" /> <span>Français</span>
                        </div>

                        {/* English */}
                        <div className={`dropdown-item ${language === 'en' ? 'active' : ''}`} onClick={() => { switchLanguage('en'); setIsLangOpen(false); }}>
                            <img src={enFlag} alt="EN" className="flag-icon" /> <span>English</span>
                        </div>

                        {/* Chinois */}
                        <div className={`dropdown-item ${language === 'zh' ? 'active' : ''}`} onClick={() => { switchLanguage('zh'); setIsLangOpen(false); }}>
                            <img src={cnFlag} alt="ZH" className="flag-icon" /> <span>中文</span>
                        </div>

                        {/* Russe */}
                        <div className={`dropdown-item ${language === 'ru' ? 'active' : ''}`} onClick={() => { switchLanguage('ru'); setIsLangOpen(false); }}>
                            <img src={ruFlag} alt="RU" className="flag-icon" /> <span>Русский</span>
                        </div>
                    </div>
                )}
            </div>

        </nav>
    );
};

export default NavBar;