import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../Styles/Education.css';

const Education = () => {
    const { t } = useLanguage();

    return (
        <section className="education-section" id="education">
            <h2 className="section-title">{t.education.title}</h2>

            <div className="timeline-container">
                {/* On mappe sur les items du fichier de traduction */}
                {t.education.items.map((item, index) => (
                    <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <span className="timeline-date">{item.year}</span>
                            <h3>{item.title}</h3>
                            <h4>{item.school}</h4>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;