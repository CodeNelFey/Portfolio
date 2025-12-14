import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../Styles/Contact.css';

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">

                <div className="contact-card">
                    <h2 className="section-title">{t.contact.title}</h2>

                    {/* CSS pour gérer les sauts de ligne (\n) en React */}
                    <h3 className="contact-headline" style={{ whiteSpace: 'pre-line' }}>
                        {t.contact.headline}
                    </h3>

                    <p className="contact-text">
                        {t.contact.text}
                    </p>

                    <div className="contact-buttons">
                        <a href="mailto:sohan.birotheau@example.com" className="btn btn-secondary">
                            {t.contact.btn_email}
                        </a>

                        <a href="/cv.pdf" download="CV_Sohan_Birotheau.pdf" className="btn btn-primary">
                            {t.contact.btn_cv}
                        </a>
                    </div>

                    <div className="social-links">
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
                        <span className="separator">•</span>
                        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;