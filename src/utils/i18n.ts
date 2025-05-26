import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Définir les traductions directement
export const resources = {
  fr: {
    translation: {
      general: {
        home: "Accueil",
        activities: "Activités",
        about: "À propos",
        contact: "Contact",
        language: "Langue",
        cart: "Panier",
        search: "Rechercher"
      },
      home: {
        hero: {
          title: "Découvrez le Rwanda",
          subtitle: "Le pays des mille collines vous attend",
          cta: "Explorer nos activités"
        },
        sections: {
          popular: "Activités populaires",
          testimonials: "Témoignages",
          discover: "Découvrez le Rwanda",
          view_all: "Voir tout"
        }
      },
      activities: {
        title: "Nos Activités",
        filter: "Filtrer par",
        sort: "Trier par",
        duration: "Durée",
        region: "Région",
        all_regions: "Toutes les régions",
        all_durations: "Toutes les durées",
        view_details: "Voir détails",
        book_now: "Réserver maintenant",
        add_to_cart: "Ajouter au panier"
      },
      detail: {
        description: "Description",
        itinerary: "Itinéraire",
        details: "Détails",
        faq: "FAQ",
        highlights: "Points forts",
        to_know: "À savoir",
        included: "Ce qui est inclus",
        not_included: "Non inclus",
        book_this_activity: "Réserver cette activité",
        day: "Jour",
        read_reviews: "Lire les avis",
        need_help: "Besoin d'aide?"
      },
      contact: {
        get_in_touch: "Contactez-nous",
        name: "Nom",
        email: "Email",
        message: "Message",
        send: "Envoyer",
        address: "Adresse",
        phone: "Téléphone",
        follow_us: "Suivez-nous"
      },
      footer: {
        company: "L'Entreprise",
        newsletter: "Inscrivez-vous à notre newsletter",
        subscribe: "S'abonner",
        terms: "Conditions d'utilisation",
        privacy: "Politique de confidentialité",
        copyright: "© 2023 Tourisme Rwanda. Tous droits réservés."
      },
      chat: {
        need_help: "Besoin d'aide ?",
        welcome: "Bienvenue ! Comment puis-je vous aider aujourd'hui ?",
        send: "Envoyer",
        ask_question: "Posez une question...",
        close: "Fermer"
      }
    }
  },
  en: {
    translation: {
      general: {
        home: "Home",
        activities: "Activities",
        about: "About",
        contact: "Contact",
        language: "Language",
        cart: "Cart",
        search: "Search"
      },
      home: {
        hero: {
          title: "Discover Rwanda",
          subtitle: "The land of a thousand hills awaits you",
          cta: "Explore our activities"
        },
        sections: {
          popular: "Popular Activities",
          testimonials: "Testimonials",
          discover: "Discover Rwanda",
          view_all: "View all"
        }
      },
      activities: {
        title: "Our Activities",
        filter: "Filter by",
        sort: "Sort by",
        price: "Price",
        duration: "Duration",
        region: "Region",
        all_regions: "All regions",
        all_durations: "All durations",
        per_person: "per person",
        view_details: "View details",
        book_now: "Book now",
        add_to_cart: "Add to cart"
      },
      detail: {
        description: "Description",
        itinerary: "Itinerary",
        details: "Details",
        faq: "FAQ",
        highlights: "Highlights",
        to_know: "Good to know",
        included: "What's included",
        not_included: "Not included",
        book_this_activity: "Book this activity",
        day: "Day",
        read_reviews: "Read reviews",
        need_help: "Need help?",
        price_from: "From"
      },
      contact: {
        get_in_touch: "Get in touch",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send",
        address: "Address",
        phone: "Phone",
        follow_us: "Follow us"
      },
      footer: {
        company: "Company",
        newsletter: "Subscribe to our newsletter",
        subscribe: "Subscribe",
        terms: "Terms of use",
        privacy: "Privacy policy",
        copyright: "© 2023 Tourism Rwanda. All rights reserved."
      },
      chat: {
        need_help: "Need help?",
        welcome: "Welcome! How can I help you today?",
        send: "Send",
        ask_question: "Ask a question...",
        close: "Close"
      }
    }
  }
};

i18n
  // Détection automatique de la langue du navigateur
  .use(LanguageDetector)
  // Intégration avec React
  .use(initReactI18next)
  // Configuration i18next
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut si la langue détectée n'est pas disponible
    debug: true, // En mode développement pour voir les logs dans la console
    defaultNS: 'translation', // Namespace par défaut
    ns: ['translation'], // Namespaces utilisés

    interpolation: {
      escapeValue: false, // Non nécessaire pour React
    },

    detection: {
      order: ['localStorage', 'navigator'], // Ordre de détection
      lookupLocalStorage: 'i18nextLng', // Clé localStorage pour stocker la langue
      caches: ['localStorage'], // Utiliser localStorage pour mettre en cache
    }
  });

// Helper function to get translation and fix TypeScript issues
export const translate = (key: string): string => {
  // @ts-ignore - Ignorer l'erreur TypeScript ici car nous savons que la fonction accepte bien un argument
  return i18n.t(key) as string;
};

export default i18n; 