const activitiesData = [
  {
    title: "Randonnée Gorilles de Montagne",
    description: "Une expérience unique pour observer les gorilles de montagne dans leur habitat naturel au Parc National des Volcans.",
    region: "Nord",
    duration: 4,
    price: 1500,
    difficulty: "difficile",
    location: "Parc National des Volcans",
    schedule: "Tous les jours, 7h-17h",
    maxParticipants: 8,
    tags: ["nature", "gorilles", "randonnée", "photographie"],
    images: [
      "https://example.com/gorilla1.jpg",
      "https://example.com/gorilla2.jpg"
    ],
    included: [
      "Guide professionnel",
      "Permis de visite",
      "Transport depuis Kigali",
      "Déjeuner",
      "Équipement de randonnée"
    ],
    notIncluded: [
      "Assurance voyage",
      "Pourboires",
      "Dépenses personnelles"
    ],
    requirements: [
      "Âge minimum: 15 ans",
      "Bonne condition physique",
      "Vaccination contre la fièvre jaune",
      "Masque chirurgical"
    ],
    cancellationPolicy: "Annulation gratuite jusqu'à 48h avant. Remboursement de 50% entre 48h et 24h avant.",
    contactInfo: {
      phone: "+250 788 123 456",
      email: "gorilla@tourism-rwanda.com"
    }
  },
  {
    title: "Safari Akagera",
    description: "Découvrez la faune africaine dans le Parc National de l'Akagera, le seul parc de savane du Rwanda.",
    region: "Est",
    duration: 8,
    price: 200,
    difficulty: "facile",
    location: "Parc National de l'Akagera",
    schedule: "Tous les jours, 6h-18h",
    maxParticipants: 12,
    tags: ["safari", "faune", "photographie", "nature"],
    images: [
      "https://example.com/akagera1.jpg",
      "https://example.com/akagera2.jpg"
    ],
    included: [
      "Guide safari",
      "Transport 4x4",
      "Déjeuner",
      "Entrée au parc",
      "Rafraîchissements"
    ],
    notIncluded: [
      "Assurance voyage",
      "Pourboires",
      "Dépenses personnelles"
    ],
    requirements: [
      "Âge minimum: 5 ans",
      "Vaccination contre la fièvre jaune",
      "Vêtements confortables"
    ],
    cancellationPolicy: "Annulation gratuite jusqu'à 24h avant. Pas de remboursement après.",
    contactInfo: {
      phone: "+250 788 234 567",
      email: "safari@tourism-rwanda.com"
    }
  }
];

module.exports = { activitiesData }; 