import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../constants/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('fr');

    useEffect(() => {
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            setLanguage(browserLang);
        }
    }, []);

    const switchLanguage = (lang) => {
        if (translations[lang]) setLanguage(lang);
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);