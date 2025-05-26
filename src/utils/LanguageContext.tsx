import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

// Définir les clés de traduction possibles
type TranslationKey = 
  | 'home.hero.title'
  | 'home.hero.subtitle'
  | 'home.hero.cta'
  | 'nav.home'
  | 'nav.activities'
  | 'nav.contact'
  | 'language.fr'
  | 'language.en';

// Interface pour les traductions d'une langue
interface TranslationStrings {
  [key: string]: string;
}

// Interface pour toutes les traductions
interface Translations {
  [language: string]: TranslationStrings;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  fr: {
    'home.hero.title': 'Explorez le Rwanda',
    'home.hero.subtitle': 'Terre des mille collines, pays aux paysages à couper le souffle',
    'home.hero.cta': 'Découvrir les activités',
    'nav.home': 'Accueil',
    'nav.activities': 'Activités',
    'nav.contact': 'Contact',
    'language.fr': 'FR',
    'language.en': 'EN',
  },
  en: {
    'home.hero.title': 'Explore Rwanda',
    'home.hero.subtitle': 'Land of a thousand hills, country with breathtaking landscapes',
    'home.hero.cta': 'Discover activities',
    'nav.home': 'Home',
    'nav.activities': 'Activities',
    'nav.contact': 'Contact',
    'language.fr': 'FR',
    'language.en': 'EN',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 