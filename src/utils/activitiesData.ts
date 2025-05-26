import { Activity } from './types';

export const activitiesData: Activity[] = [
  {
    id: "1",
    title: "Mountain Gorilla Trekking",
    image: "/images/gorilla.jpg",
    images: [
      "/images/gorilla.jpg",
      "/images/volcano.jpg",
      "/images/immersion.jpg"
    ],
    shortDescription: "Get up close with the magnificent mountain gorillas in their natural habitat.",
    description: "Embark on an unforgettable adventure to observe the mountain gorillas in Volcanoes National Park. After a briefing at the park entrance, experienced guides will lead you through the bamboo forest in search of a gorilla family. Once located, you will spend a magical hour observing these majestic primates up close. This incredible experience provides a rare opportunity to witness these gentle giants in their natural habitat, playing, feeding, and interacting with each other. The trek difficulty level varies depending on the location of the gorilla families, but the reward is worth every effort.",
    duration: "1 day",
    region: "Volcanoes National Park",
    included: [
      "Gorilla trekking permit",
      "Transportation from/to Kigali",
      "Park guide",
      "Bottled water",
      "Certificate of participation"
    ],
    notIncluded: [
      "International flights",
      "Visa fees",
      "Personal expenses",
      "Gratuities"
    ],
    accommodationIncluded: false,
    transportIncluded: true,
    mealsIncluded: false,
    featured: true,
    tags: ["wildlife", "adventure", "photography"],
    location: {
      lat: -1.4823,
      lng: 29.4907
    },
    highlights: [
      "Intimate wildlife encounter: Spend one hour with a mountain gorilla family in their natural habitat",
      "Conservation contribution: Your visit directly contributes to gorilla conservation efforts",
      "Expert guidance: Knowledgeable local guides share insights about gorilla behavior and conservation"
    ],
    itinerary: [
      {
        title: "Morning Preparation",
        description: "Arrive at the park headquarters at 7:00 AM for a safety briefing and group formation. Receive walking sticks and depart for the trek."
      },
      {
        title: "The Trek (Morning)",
        description: "Gradual ascent through bamboo forest and alpine meadows. Possible sightings of golden monkeys and other wildlife. Steeper climb in the final section."
      },
      {
        title: "Gorilla Encounter & Return (Afternoon)",
        description: "One magical hour with the gorilla family, observing their natural behaviors. Return trek to the base, arriving in mid-afternoon to receive your certificate."
      }
    ],
    price: 1500,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "2",
    title: "Safari dans le Parc National d'Akagera",
    image: "/images/safari.jpg",
    images: [
      "/images/safari.jpg",
      "/images/lake.jpg",
      "/images/elephant.jpg"
    ],
    shortDescription: "Une expérience safari inoubliable dans le plus grand parc national du Rwanda.",
    description: "Le Parc National d'Akagera est le seul parc de savane du Rwanda, abritant une faune africaine impressionnante. Ce safari vous permettra d'observer les Big Five (lions, éléphants, buffles, léopards et rhinocéros) ainsi que de nombreuses autres espèces dans leur habitat naturel.",
    duration: "2 jours",
    region: "Parc National Akagera",
    included: [
      "Entrée du parc",
      "Guide professionnel",
      "Hébergement en lodge",
      "Transport dans le parc",
      "Repas"
    ],
    notIncluded: [
      "Transport vers/du parc",
      "Boissons",
      "Pourboires"
    ],
    accommodationIncluded: true,
    transportIncluded: false,
    mealsIncluded: true,
    tags: ["safari", "nature", "wildlife"],
    highlights: [
      "Observation des Big Five",
      "Paysages de savane spectaculaires",
      "Guide expert en faune sauvage"
    ],
    itinerary: [
      {
        title: "Departure and Morning Safari (Day 1)",
        description: "Early morning departure from Kigali (5:30 AM). Arrival at the park and entry through the south gate. Morning safari with the opportunity to observe animals during their active period. Lunch at the lodge."
      },
      {
        title: "Safari and Sunset (Day 1, afternoon)",
        description: "Afternoon safari in the savanna areas. Sunset viewing over the plains. Dinner and overnight at the lodge with the sounds of the bush."
      },
      {
        title: "Boat Safari and Return (Day 2)",
        description: "Early morning safari, breakfast, then boat safari on Lake Ihema to observe hippos and crocodiles. Lunch and safari back towards the park exit. Return to Kigali in late afternoon."
      }
    ],
    price: 800,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "3",
    title: "Kigali City Tour",
    image: "/images/kigali.jpg",
    images: [
      "/images/kigali.jpg",
      "/images/food.jpg",
      "/images/hotel.jpg"
    ],
    shortDescription: "Explore Rwanda's capital and discover its fascinating history.",
    description: "Discover Kigali, one of Africa's cleanest and safest cities. This tour will take you to the Genocide Memorial, Kimironko Market, Nyamirambo Muslim Quarter, and local art galleries. You'll learn more about Rwanda's history, culture, and remarkable development following the 1994 genocide.",
    duration: "1 day",
    region: "Kigali",
    included: [
      "English or French speaking guide",
      "Private car transportation",
      "Site entrance fees",
      "Lunch at a local restaurant"
    ],
    notIncluded: [
      "Gratuities",
      "Personal purchases"
    ],
    accommodationIncluded: false,
    transportIncluded: true,
    mealsIncluded: true,
    tags: ["culture", "history", "city"],
    location: {
      lat: -1.9403,
      lng: 30.0618
    },
    highlights: [
      "Contemporary history: Guided tour of the Kigali Genocide Memorial",
      "Local culture: Immersion in daily life through markets and typical neighborhoods",
      "Rwandan art: Discovery of art galleries and contemporary crafts"
    ],
    itinerary: [
      {
        title: "History and memory (Morning)",
        description: "Visit to the Kigali Genocide Memorial to understand the country's recent history. Visit to Camp Kigali and the Natural History Museum."
      },
      {
        title: "Local gastronomy (Noon)",
        description: "Lunch at a typical restaurant to taste traditional Rwandan cuisine."
      },
      {
        title: "Culture and modernity (Afternoon)",
        description: "Visit to the Nyamirambo neighborhood, Kimironko market, and contemporary art galleries. Pass through downtown to observe the modernization of the capital."
      }
    ],
    price: 150,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "4",
    title: "Mount Bisoke Volcano Hike",
    image: "/images/volcano.jpg",
    images: [
      "/images/volcano.jpg",
      "/images/gorilla.jpg",
      "/images/lake.jpg"
    ],
    shortDescription: "Climb to the summit of Mount Bisoke and admire its magnificent crater lake.",
    description: "Embark on an adventurous hike up Mount Bisoke, a volcano rising to 3711 meters. At the summit, you'll be rewarded with a spectacular view of a crater lake. The trek passes through different ecosystems, from bamboo forests to alpine meadows, offering opportunities to observe unique flora and potentially golden monkeys and other wildlife.",
    duration: "1 day",
    region: "Volcanoes National Park",
    included: [
      "Park entrance permit",
      "Hiking guide",
      "Walking stick",
      "Water"
    ],
    notIncluded: [
      "Transportation to/from starting point",
      "Hiking equipment",
      "Meals"
    ],
    accommodationIncluded: false,
    transportIncluded: false,
    mealsIncluded: false,
    tags: ["hiking", "nature", "adventure"],
    highlights: [
      "Spectacular view: Crater lake at the summit and panorama of the Virunga volcano chain",
      "Biodiversity: Discovery of different ecosystems and endemic fauna and flora",
      "Sporting challenge: Stimulating hike for adventure and nature enthusiasts"
    ],
    itinerary: [
      {
        title: "Preparation and departure (Early morning)",
        description: "Meet at the park office at 7:00 AM for safety briefing and group formation. Receive walking sticks and depart for the hike."
      },
      {
        title: "Ascent (Morning)",
        description: "Progressive climb through bamboo forest and alpine meadows. Possible sightings of golden monkeys and other animals. Steeper climb in the final section."
      },
      {
        title: "Summit and descent (Afternoon)",
        description: "Arrival at the summit, time to admire the crater lake and panorama. Picnic (if planned) then descent via the same path. Return to the starting point in mid-afternoon."
      }
    ],
    price: 100,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "5",
    title: "Lake Kivu Excursion",
    image: "/images/lake.jpg",
    images: [
      "/images/lake.jpg",
      "/images/kayak.jpg",
      "/images/food.jpg"
    ],
    shortDescription: "Relax on the shores of beautiful Lake Kivu and explore its islands.",
    description: "Enjoy the tranquil beauty of Lake Kivu, one of Africa's Great Lakes. This excursion includes a boat cruise to picturesque islands, the chance to swim in the lake's clear waters, and discovery of charming fishing villages. You can also relax on sandy beaches and savor fresh fish.",
    duration: "3 days",
    region: "West",
    included: [
      "Lakeside hotel accommodation",
      "Daily breakfast",
      "Boat excursion",
      "Round-trip transportation from Kigali"
    ],
    notIncluded: [
      "Lunches and dinners",
      "Optional activities (kayaking, cycling)",
      "Gratuities",
      "Personal expenses"
    ],
    accommodationIncluded: true,
    transportIncluded: true,
    mealsIncluded: false,
    tags: ["relaxation", "nature", "water"],
    location: {
      lat: -1.7325,
      lng: 29.2732
    },
    highlights: [
      "Exceptional landscapes: Admire the spectacular scenery of the lake surrounded by verdant mountains",
      "Character islands: Explore small isolated islands with unique fauna and flora",
      "Local life: Discover the life of fishermen and traditional lake communities"
    ],
    itinerary: [
      {
        title: "Travel and check-in (Day 1)",
        description: "Morning departure from Kigali, scenic route to Lake Kivu. Arrival at the hotel in the early afternoon, check-in and free time to enjoy the beach. Opportunity to swim or walk along the shore."
      },
      {
        title: "Boat excursion (Day 2)",
        description: "Day dedicated to discovering the lake by boat. Visit to Nkombo Island with its typical villages, swimming stop in an isolated cove, and fresh fish lunch on a deserted beach. Return to the hotel in late afternoon."
      },
      {
        title: "Local market and return (Day 3)",
        description: "Free morning to relax or participate in optional activities (kayaking, paddle boarding, cycling). Visit to a local market in late morning. Lunch then return to Kigali, arriving in the evening."
      }
    ],
    price: 600,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "6",
    title: "Cultural Immersion in a Traditional Village",
    image: "/images/immersion.jpg",
    images: [
      "/images/immersion.jpg",
      "/images/food.jpg",
      "/images/kigali.jpg"
    ],
    shortDescription: "Discover daily life and traditions of rural Rwanda.",
    description: "Experience an authentic immersion in a traditional Rwandan village. You'll participate in daily activities such as meal preparation, farming, local crafts creation, and traditional dance. This immersion will allow you to discover Rwanda's cultural richness and make connections with local inhabitants.",
    duration: "1 day",
    region: "East",
    included: [
      "Round-trip transportation",
      "Interpreter guide",
      "Traditional meal",
      "Cultural activities",
      "Intore dance demonstration"
    ],
    notIncluded: [
      "Craft purchases",
      "Gratuities"
    ],
    accommodationIncluded: false,
    transportIncluded: true,
    mealsIncluded: true,
    tags: ["culture", "community", "traditional"],
    highlights: [
      "Cultural exchange: Authentic interactions with village inhabitants",
      "Local crafts: Introduction to traditional techniques of craftwork",
      "Traditional dances: Witness an Intore dance demonstration, a Rwandan cultural heritage"
    ],
    itinerary: [
      {
        title: "Welcome and discovery (Morning)",
        description: "Welcome by the village chief and inhabitants. Guided tour of the location and presentation of traditional activities. Participation in preparing a traditional Rwandan meal."
      },
      {
        title: "Sharing and discovery (Midday)",
        description: "Community lunch with the villagers. Cultural exchanges and discussions about daily life and Rwandan traditions."
      },
      {
        title: "Activities and celebration (Afternoon)",
        description: "Participation in craft activities (pottery, basketry) or agricultural work depending on the season. Introduction to traditional dances and Intore dance performance. Farewell ceremony before returning to Kigali."
      }
    ],
    price: 120,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "7",
    title: "Kayaking on Lake Kivu",
    image: "/images/kayak.jpg",
    images: [
      "/images/kayak.jpg",
      "/images/lake.jpg",
      "/images/food.jpg"
    ],
    shortDescription: "Paddle on the calm waters of Lake Kivu and discover its hidden bays.",
    description: "This kayaking adventure takes you on the calm waters of Lake Kivu, where you can explore isolated bays, visit small islands, and observe water birds. The route offers magnificent views of the surrounding hills and fishing villages. A perfect experience for outdoor enthusiasts and water activities lovers.",
    duration: "1 day",
    region: "West",
    included: [
      "Kayaking equipment",
      "Experienced guide",
      "Picnic lunch",
      "Water and refreshments"
    ],
    notIncluded: [
      "Transportation to/from Lake Kivu",
      "Change of clothes",
      "Sun protection"
    ],
    accommodationIncluded: false,
    transportIncluded: false,
    mealsIncluded: true,
    tags: ["adventure", "water", "sport"],
    highlights: [
      "Nautical exploration: Discovery of coves and bays inaccessible by land",
      "Wildlife observation: Opportunity to observe water birds in their natural habitat",
      "Sporting activity: Experience combining sport, nature, and discovery in an idyllic setting"
    ],
    itinerary: [
      {
        title: "Briefing and departure (Morning)",
        description: "Welcome at the kayak base, introduction to basic techniques and safety instructions. Launching and departure toward the first isolated coves of the lake, with stops to observe birds and local life."
      },
      {
        title: "Lunch break (Midday)",
        description: "Stop at a small isolated beach for a picnic lunch. Opportunity to swim in the crystal-clear waters of the lake. Time to relax and observe the landscape."
      },
      {
        title: "Continued exploration and return (Afternoon)",
        description: "Continuation of the kayaking adventure toward a small island and then along fishing villages. Observation of traditional fishing methods. Return to base in late afternoon."
      }
    ],
    price: 80,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "8",
    title: "Culinary Tour of Kigali",
    image: "/images/food.jpg",
    images: [
      "/images/food.jpg",
      "/images/kigali.jpg",
      "/images/hotel.jpg"
    ],
    shortDescription: "Discover the unique flavors of Rwandan cuisine.",
    description: "Explore the unique flavors of Rwandan cuisine by visiting local restaurants and tasting traditional dishes. You'll discover varied dishes, local specialties, and unique spices.",
    duration: "1 day",
    region: "Kigali",
    included: [
      "Culinary guide",
      "Private car transportation",
      "Lunch at local restaurants",
      "Tasting of traditional dishes"
    ],
    notIncluded: [
      "Alcoholic beverages",
      "Personal expenses"
    ],
    accommodationIncluded: false,
    transportIncluded: true,
    mealsIncluded: true,
    tags: ["food", "culinary", "culture"],
    highlights: [
      "Varied tastings: Sample emblematic dishes of Rwandan cuisine in different establishments",
      "Meet with chefs: Exchange with local chefs who share their passion and culinary secrets",
      "Spice market: Discovery of ingredients and spices typical of East African cuisine"
    ],
    itinerary: [
      {
        title: "Market and preparation (Morning)",
        description: "Visit to a local market to discover fresh ingredients used in Rwandan cuisine. Participation in a cooking workshop to learn how to prepare some traditional dishes like isombe or matoke."
      },
      {
        title: "Main tasting (Midday)",
        description: "Lunch at a traditional restaurant with tasting of a complete Rwandan menu including skewers, rice, beans, plantains, and local vegetables."
      },
      {
        title: "Coffee and sweets (Afternoon)",
        description: "Visit to a coffee plantation or a café specializing in Rwandan coffee. Coffee and local dessert tasting. End of the day in a contemporary restaurant that reinvents traditional cuisine with a modern touch."
      }
    ],
    price: 90,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "9",
    title: "Rwanda Lakes Circuit",
    image: "/images/circuitlac.jpg",
    images: [
      "/images/circuitlac.jpg",
      "/images/lake.jpg",
      "/images/kayak.jpg"
    ],
    shortDescription: "Explore Rwanda's magnificent lakes during a complete circuit.",
    description: "This circuit takes you to discover Rwanda's most beautiful lakes: Kivu, Burera, Ruhondo, and Muhazi. You'll admire varied landscapes, visit picturesque villages, and enjoy different water activities. This journey offers a perfect balance between adventure, culture, and relaxation in the country's most beautiful natural settings.",
    duration: "5 days",
    region: "North",
    included: [
      "Accommodation in comfortable hotels",
      "All transportation",
      "Daily breakfast",
      "Professional tour guide",
      "Basic water activities"
    ],
    notIncluded: [
      "Lunches and dinners",
      "Optional activities",
      "Personal expenses"
    ],
    accommodationIncluded: true,
    transportIncluded: true,
    mealsIncluded: false,
    featured: true,
    tags: ["nature", "scenic", "multiple destinations"],
    highlights: [
      "Lake diversity: Exploration of four major Rwandan lakes with different characteristics",
      "Volcanic landscapes: Breathtaking views of twin lakes Burera and Ruhondo surrounded by volcanoes",
      "Water activities: Opportunities for swimming, kayaking, paddleboarding, and cruises on different lakes"
    ],
    itinerary: [
      {
        title: "Kigali - Lake Muhazi (Day 1)",
        description: "Departure from Kigali to Lake Muhazi in the eastern part of the country. Check-in at the hotel and discovery of the lake shores. Possibility to go sailing or paddleboarding in the late afternoon."
      },
      {
        title: "Lake Muhazi - Lakes Burera and Ruhondo (Day 2)",
        description: "Route to the north to discover the twin lakes of Burera and Ruhondo, located at the foot of volcanoes. Panoramic hike offering spectacular views of both lakes. Overnight in a lodge with lake views."
      },
      {
        title: "Northern lakes exploration (Day 3)",
        description: "Day dedicated to in-depth exploration of Lakes Burera and Ruhondo. Visit to an island on Lake Burera by traditional canoe. Meeting with local fishermen and discovery of their techniques."
      },
      {
        title: "Transfer to Lake Kivu (Day 4)",
        description: "Journey west to reach the majestic Lake Kivu. Check-in at the hotel in Gisenyi or Kibuye. Free time to enjoy the lake beaches and relax."
      },
      {
        title: "Lake Kivu and return to Kigali (Day 5)",
        description: "Morning cruise on Lake Kivu to discover its islands and observe fishermen. Free time for final swims before returning to Kigali in the evening."
      }
    ],
    price: 1200,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "10",
    title: "Birdwatching in Akagera",
    image: "/images/oiseau.jpg",
    images: [
      "/images/oiseau.jpg",
      "/images/safari.jpg",
      "/images/lake.jpg"
    ],
    shortDescription: "Discover the rich avifauna of Akagera National Park.",
    description: "Akagera National Park is home to over 500 bird species, making it a paradise for ornithologists. This specialized excursion will allow you to observe numerous species, from majestic raptors to colorful kingfishers, including the rare shoebills. An ornithologist guide will accompany you to identify species and provide detailed information.",
    duration: "2 days",
    region: "Akagera National Park",
    included: [
      "Park entrance",
      "Specialized ornithologist guide",
      "Lodge accommodation",
      "Binoculars and identification guides",
      "Transportation within the park"
    ],
    notIncluded: [
      "Transportation to/from Kigali",
      "Photographic equipment",
      "Gratuities"
    ],
    accommodationIncluded: true,
    transportIncluded: false,
    mealsIncluded: true,
    tags: ["wildlife", "birdwatching", "nature"],
    highlights: [
      "Exceptional biodiversity: Possible observation of over 500 bird species in their natural habitats",
      "Expert guide: Accompaniment by a qualified ornithologist to identify and understand species",
      "Varied landscapes: Exploration of different ecosystems promoting a great diversity of species"
    ],
    itinerary: [
      {
        title: "Park entry and wetlands (Day 1)",
        description: "Early morning arrival at Akagera Park. Briefing on the different species to observe. Morning ornithological safari around lakes and marshes to observe aquatic species such as herons, egrets, ibises, and the rare shoebill. Lunch at the lodge then late afternoon outing to observe raptors. Dinner and overnight at the lodge."
      },
      {
        title: "Savannas and gallery forests (Day 2)",
        description: "Departure at dawn to enjoy the intense bird activity at sunrise. Exploration of savanna areas and gallery forests in search of species such as turacos, hornbills, bee-eaters, and rollers. Picnic lunch in nature then final observation session before leaving the park in late afternoon."
      }
    ],
    price: 400,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
]; 