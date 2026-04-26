// Auto-curated catalog from Catalogo_Experiencias_BePelican.md
// Each experience has bilingual fields. price = null → "próximamente / coming soon"

export type ThemeId =
  | "adventure"
  | "ecotourism"
  | "ancestral"
  | "urban-memory"
  | "flavors"
  | "heritage"
  | "postcard"
  | "express";

export type ZoneId =
  | "amazonas"
  | "guajira"
  | "santa-marta"
  | "medellin"
  | "bogota"
  | "cundinamarca"
  | "boyaca"
  | "guaviare";

export type Difficulty = "easy" | "moderate" | "hard" | "extreme";

export interface Experience {
  slug: string;
  zone: ZoneId;
  themes: ThemeId[];
  duration: { es: string; en: string };
  durationDays: number;
  difficulty: Difficulty;
  pace: { es: string; en: string };
  priceCOP: number | null;
  priceNote?: { es: string; en: string };
  name: { es: string; en: string };
  hook: { es: string; en: string };
  description: { es: string; en: string };
  insights: { es: string[]; en: string[] };
  impact: { es: string; en: string };
  image: string;
  details?: ExperienceDetails;
}

export interface ItineraryDay {
  title: { es: string; en: string };
  body: { es: string[]; en: string[] };
}

export interface ExperienceDetails {
  about?: { es: string; en: string };
  difficultyNote?: { es: string; en: string };
  maxPeople?: number;
  languages?: { es: string; en: string };
  petsAllowed?: boolean;
  itinerary?: ItineraryDay[];
  includes?: { es: string[]; en: string[] };
  meetingPoint?: { es: string; en: string };
  meetingPointMapUrl?: string;
  endingPoint?: { es: string; en: string };
  startTime?: string;
  flexibleSchedule?: boolean;
  recommendations?: { es: string[]; en: string[] };
  arrivalTips?: { es: string; en: string };
  cancellation?: { es: string; en: string };
  climate?: {
    temperature?: { es: string; en: string };
    bestSeason?: { es: string; en: string };
  };
}

export const ZONES: Record<ZoneId, { name: { es: string; en: string }; pitch: { es: string; en: string } }> = {
  amazonas: {
    name: { es: "Amazonas", en: "Amazon" },
    pitch: {
      es: "El destino más transformador de Colombia. Selva, delfines rosados, comunidades indígenas y silencios que se llevan puestos.",
      en: "Colombia's most transformative destination. Jungle, pink dolphins, indigenous communities and silences that stay with you.",
    },
  },
  guajira: {
    name: { es: "La Guajira", en: "La Guajira" },
    pitch: {
      es: "El único lugar de Colombia donde el desierto llega al mar. Acceso real al pueblo Wayúu, no un set turístico.",
      en: "The only place in Colombia where desert meets the sea. Real access to the Wayúu people — not a tourist set.",
    },
  },
  "santa-marta": {
    name: { es: "Santa Marta & Sierra Nevada", en: "Santa Marta & Sierra Nevada" },
    pitch: {
      es: "La ciudad más antigua de Colombia + el trekking arqueológico más importante del continente: Ciudad Perdida.",
      en: "Colombia's oldest city + the continent's most important archaeological trek: the Lost City.",
    },
  },
  medellin: {
    name: { es: "Medellín & Antioquia", en: "Medellín & Antioquia" },
    pitch: {
      es: "De ciudad peligrosa a ejemplo mundial de transformación. Eterna primavera + Comuna 13 + café + Guatapé.",
      en: "From dangerous city to global example of transformation. Eternal spring + Comuna 13 + coffee + Guatapé.",
    },
  },
  bogota: {
    name: { es: "Bogotá", en: "Bogotá" },
    pitch: {
      es: "Capital a 2.600 m: museos del oro, mercados, tejo y arte urbano. Más allá del centro turístico.",
      en: "A capital at 2,600 m: gold museums, markets, tejo and urban art. Beyond the tourist center.",
    },
  },
  cundinamarca: {
    name: { es: "Alrededores de Bogotá", en: "Around Bogotá" },
    pitch: {
      es: "Escapadas de un día desde la capital: páramo, cascadas y la leyenda de El Dorado.",
      en: "Day escapes from the capital: páramo, waterfalls and the legend of El Dorado.",
    },
  },
  boyaca: {
    name: { es: "Boyacá", en: "Boyacá" },
    pitch: {
      es: "La masa glaciar más grande de Colombia + cuna de la Independencia.",
      en: "Colombia's largest glacier mass + cradle of Independence.",
    },
  },
  guaviare: {
    name: { es: "Guaviare", en: "Guaviare" },
    pitch: {
      es: "Turismo no convencional. Selva amazónica + arte rupestre de 10.000 años + ríos de colores cerca de Chiribiquete.",
      en: "Off-the-beaten-path travel. Amazon jungle + 10,000-year-old rock art + colored rivers near Chiribiquete.",
    },
  },
};

export const THEMES: Record<ThemeId, { name: { es: string; en: string }; tagline: { es: string; en: string }; image: string }> = {
  adventure: {
    name: { es: "Aventura & Outdoor", en: "Adventure & Outdoor" },
    tagline: { es: "Glaciares, selva y alta montaña.", en: "Glaciers, jungle and high mountains." },
    image: "/src/assets/theme-adventure.jpg",
  },
  ecotourism: {
    name: { es: "Ecoturismo & Vida Silvestre", en: "Ecotourism & Wildlife" },
    tagline: { es: "Delfines, cóndores, biodiversidad única.", en: "Dolphins, condors, unique biodiversity." },
    image: "/src/assets/theme-eco.jpg",
  },
  ancestral: {
    name: { es: "Cultura Ancestral & Comunidades", en: "Ancestral Culture & Communities" },
    tagline: { es: "Acceso real a comunidades indígenas.", en: "Real access to indigenous communities." },
    image: "/src/assets/theme-ancestral.jpg",
  },
  "urban-memory": {
    name: { es: "Arte Urbano, Memoria & Resiliencia", en: "Urban Art, Memory & Resilience" },
    tagline: { es: "Comuna 13, La Perse, Ciudad Bolívar.", en: "Comuna 13, La Perse, Ciudad Bolívar." },
    image: "/src/assets/theme-urban.jpg",
  },
  flavors: {
    name: { es: "Sabores & Mercados Locales", en: "Flavors & Local Markets" },
    tagline: { es: "Café de origen y cocina viva.", en: "Origin coffee and living cuisine." },
    image: "/src/assets/theme-flavors.jpg",
  },
  heritage: {
    name: { es: "Patrimonio & Misticismo", en: "Heritage & Mysticism" },
    tagline: { es: "Catedral de Sal, Ciudad Perdida, Monserrate.", en: "Salt Cathedral, Lost City, Monserrate." },
    image: "/src/assets/theme-heritage.jpg",
  },
  postcard: {
    name: { es: "Postales & Caribe", en: "Postcards & Caribbean" },
    tagline: { es: "Cabo de la Vela, Guatapé, embalses.", en: "Cabo de la Vela, Guatapé, lakes." },
    image: "/src/assets/theme-postcard.jpg",
  },
  express: {
    name: { es: "Escapadas Express", en: "Express Escapes" },
    tagline: { es: "Full days desde Bogotá y Medellín.", en: "Full days from Bogotá and Medellín." },
    image: "/src/assets/theme-express.jpg",
  },
};

export const EXPERIENCES: Experience[] = [
  // ---------------- AMAZONAS ----------------
  {
    slug: "amazonas-6-dias",
    zone: "amazonas",
    themes: ["ancestral", "ecotourism", "flavors"],
    duration: { es: "6 días / 5 noches", en: "6 days / 5 nights" },
    durationDays: 6,
    difficulty: "moderate",
    pace: { es: "Moderado", en: "Moderate" },
    priceCOP: 2328000,
    priceNote: { es: "Desde, 3+ pax", en: "From, 3+ pax" },
    name: { es: "Amazonas — Inmersión 6 días", en: "Amazon — 6-day Immersion" },
    hook: {
      es: "La inmersión total: balsa flotante, comunidades, casa en el árbol, reservas en Perú.",
      en: "Total immersion: floating raft, communities, treehouse, Peruvian reserves.",
    },
    description: {
      es: "Seis días en lo más profundo de la selva amazónica colombiana. Convivencia real con comunidades indígenas, navegación por la triple frontera y silencios que transforman.",
      en: "Six days deep in the Colombian Amazon. Real life with indigenous communities, navigation across the triple border, and transformative silences.",
    },
    insights: {
      es: ["Balsa flotante frente a la triple frontera", "Comunidades indígenas Tikuna", "Casa en el árbol", "Taller gastronómico de pirarucú", "Reservas naturales en Perú"],
      en: ["Floating raft at the triple border", "Tikuna indigenous communities", "Treehouse stay", "Pirarucú cooking workshop", "Nature reserves in Peru"],
    },
    impact: {
      es: "Cada viaje aporta directamente a familias y guías locales del trapecio amazónico.",
      en: "Every trip directly supports local families and guides of the Amazon Trapezoid.",
    },
    image: "https://images.unsplash.com/photo-1585926494452-3bbf4064af50?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  {
    slug: "amazonas-5-dias",
    zone: "amazonas",
    themes: ["ancestral", "ecotourism"],
    duration: { es: "5 días / 4 noches", en: "5 days / 4 nights" },
    durationDays: 5,
    difficulty: "moderate",
    pace: { es: "Moderado", en: "Moderate" },
    priceCOP: 1930000,
    priceNote: { es: "Desde, 3+ pax", en: "From, 3+ pax" },
    name: { es: "Amazonas — 5 días Goldilocks", en: "Amazon — 5-day Goldilocks" },
    hook: {
      es: "Profundidad cultural sin el compromiso de seis días.",
      en: "Cultural depth without the 6-day commitment.",
    },
    description: {
      es: "El balance perfecto: tiempo suficiente para conectar con la selva y las comunidades, sin extender en exceso el viaje.",
      en: "The perfect balance: enough time to connect with the jungle and communities, without overextending.",
    },
    insights: {
      es: ["Convivencia con comunidades", "Avistamiento de fauna", "Navegación por afluentes", "Comidas típicas amazónicas"],
      en: ["Living with communities", "Wildlife watching", "Navigating tributaries", "Typical Amazon meals"],
    },
    impact: { es: "Apoyo directo a guías y artesanos locales.", en: "Direct support to local guides and artisans." },
    image: "https://images.unsplash.com/photo-1604092257464-d0d7f0d167bc?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  {
    slug: "amazonas-acampada",
    zone: "amazonas",
    themes: ["adventure", "ecotourism"],
    duration: { es: "5 días / 4 noches", en: "5 days / 4 nights" },
    durationDays: 5,
    difficulty: "hard",
    pace: { es: "Moderado-exigente", en: "Moderate-demanding" },
    priceCOP: 2616000,
    priceNote: { es: "Desde, 3+ pax", en: "From, 3+ pax" },
    name: { es: "Amazonas — Acampada en la selva", en: "Amazon — Jungle Camping" },
    hook: {
      es: "Selva cruda: dormir en carpa, caminatas nocturnas, hongos bioluminiscentes.",
      en: "Raw jungle: sleeping in tents, night hikes, bioluminescent mushrooms.",
    },
    description: {
      es: "Para el viajero que quiere experimentar la selva sin filtros, durmiendo bajo el dosel y caminando con guías indígenas.",
      en: "For travelers who want to experience the jungle unfiltered, sleeping under the canopy and walking with indigenous guides.",
    },
    insights: {
      es: ["Acampada en selva primaria", "Caminatas nocturnas con guías", "Hongos bioluminiscentes", "Avistamiento de aves al amanecer"],
      en: ["Camping in primary forest", "Night hikes with guides", "Bioluminescent mushrooms", "Birdwatching at dawn"],
    },
    impact: { es: "Tu viaje sostiene programas de conservación y guías locales.", en: "Your trip supports conservation and local guides." },
    image: "https://images.unsplash.com/photo-1590324493291-747afe32ff58?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  {
    slug: "amazonas-4-dias",
    zone: "amazonas",
    themes: ["ecotourism", "ancestral"],
    duration: { es: "4 días / 3 noches", en: "4 days / 3 nights" },
    durationDays: 4,
    difficulty: "moderate",
    pace: { es: "Moderado", en: "Moderate" },
    priceCOP: 1536000,
    priceNote: { es: "Desde, 3+ pax", en: "From, 3+ pax" },
    name: { es: "Amazonas — Plan estrella 4 días", en: "Amazon — Signature 4-day" },
    hook: {
      es: "Delfines rosados, taller de pirarucú, casa en el árbol, isla de los micos.",
      en: "Pink dolphins, pirarucú workshop, treehouse and Monkey Island.",
    },
    description: {
      es: "El plan más popular: lo esencial del Amazonas en cuatro días intensos y bien curados.",
      en: "Our most popular plan: the essentials of the Amazon in four intense, well-curated days.",
    },
    insights: {
      es: ["Delfines rosados", "Isla de los micos", "Casa en el árbol", "Taller de pirarucú", "Atardeceres en Parque Santander"],
      en: ["Pink dolphins", "Monkey Island", "Treehouse", "Pirarucú workshop", "Sunsets at Santander Park"],
    },
    impact: { es: "Apoyo directo a comunidades del trapecio amazónico.", en: "Direct support to Amazon Trapezoid communities." },
    image: "https://images.unsplash.com/photo-1604989558437-853b50d6c331?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  {
    slug: "amazonas-3-dias",
    zone: "amazonas",
    themes: ["express", "ecotourism"],
    duration: { es: "3 días / 2 noches", en: "3 days / 2 nights" },
    durationDays: 3,
    difficulty: "moderate",
    pace: { es: "Moderado", en: "Moderate" },
    priceCOP: 1019000,
    priceNote: { es: "Desde, 3+ pax", en: "From, 3+ pax" },
    name: { es: "Amazonas — Probadita 3 días", en: "Amazon — 3-day Taster" },
    hook: { es: "El \"probadita\" del Amazonas para fines de semana largos.", en: "The Amazon taster for long weekends." },
    description: {
      es: "Una introducción corta pero auténtica al Amazonas: navegación, fauna y comunidades en formato fin de semana extendido.",
      en: "A short but authentic intro to the Amazon: navigation, wildlife and communities in an extended weekend format.",
    },
    insights: { es: ["Navegación por el Amazonas", "Comunidad indígena", "Atardecer con loros", "Comida típica"], en: ["Amazon navigation", "Indigenous community", "Sunset with parrots", "Typical food"] },
    impact: { es: "Beneficio directo a guías locales.", en: "Direct benefit to local guides." },
    image: "https://images.unsplash.com/photo-1604092257464-d0d7f0d167bc?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  // ---------------- LA GUAJIRA ----------------
  {
    slug: "inmersion-wayuu-4-dias",
    zone: "guajira",
    themes: ["ancestral", "postcard", "ecotourism", "flavors"],
    duration: { es: "4 días / 3 noches", en: "4 days / 3 nights" },
    durationDays: 4,
    difficulty: "easy",
    pace: { es: "Apto para todos", en: "Suitable for all" },
    priceCOP: 2080000,
    priceNote: { es: "Por persona · hasta 15 personas", en: "Per person · up to 15 people" },
    name: { es: "Inmersión Wayúu — Cabo de la Vela", en: "Wayúu Immersion — Cabo de la Vela" },
    hook: {
      es: "Comunidad Ulishamana en exclusiva, taller de tejido, Yonna y cata de Yotshi.",
      en: "Exclusive access to the Ulishamana community, weaving workshop, Yonna dance and Yotshi tasting.",
    },
    description: {
      es: "La Guajira no se visita, se lleva puesta. Acceso real al pueblo Wayúu en una experiencia única que combina cultura ancestral, desierto y Caribe.",
      en: "La Guajira isn't visited, it's worn. Real access to the Wayúu people in a unique experience blending ancestral culture, desert and Caribbean.",
    },
    insights: {
      es: ["Comunidad Wayúu Ulishamana en exclusiva", "Cabo de la Vela y Pilón de Azúcar", "Faro al atardecer + fogata", "Flamencos rosados en Manaure", "Langosta y gastronomía Wayúu"],
      en: ["Exclusive Wayúu Ulishamana community", "Cabo de la Vela and Pilón de Azúcar", "Lighthouse sunset + bonfire", "Pink flamingos at Manaure", "Lobster and Wayúu cuisine"],
    },
    impact: { es: "El plan se construyó con la comunidad Ulishamana — los ingresos apoyan su escuela.", en: "Built with the Ulishamana community — revenue supports their school." },
    image: "https://i.pinimg.com/1200x/c8/83/ab/c883ab9e63b1937ffb72b50a02ef8c2c.jpg",
    details: {
      about: {
        es: "Existe un rincón del mundo donde el desierto se derrama sobre el Caribe, donde el viento no ha parado en siglos y donde el tiempo funciona distinto. La Guajira de este viaje no es la que aparece en las búsquedas. Es la que se siente cuando una mujer Wayúu enseña a tejer sin que nadie se lo haya pedido, cuando el sol tiñe de naranja una tierra que parece de otro planeta, cuando te das cuenta de que llevas horas sin mirar el teléfono y no te importa en lo absoluto. No es un viaje que se planea para contarlo. Es uno que se lleva adentro mucho después de haber vuelto.",
        en: "There's a corner of the world where the desert spills into the Caribbean, where the wind hasn't stopped in centuries and where time works differently. The Guajira of this trip is not the one that shows up in searches. It's the one you feel when a Wayúu woman teaches you to weave without anyone asking, when the sun turns an otherworldly land orange, when you realize you've gone hours without checking your phone and don't care at all. It's not a trip you plan to talk about. It's one you carry inside long after returning.",
      },
      difficultyNote: { es: "Baja", en: "Low" },
      maxPeople: 15,
      itinerary: [
        {
          title: { es: "Día 1 — El día que Ulishamana abre sus puertas", en: "Day 1 — The day Ulishamana opens its doors" },
          body: {
            es: [
              "El viaje empieza desde que suben a la camioneta. Una 4x4 los recoge en el aeropuerto y desde ese momento el ritmo cambia. Antes de salir de la ciudad, tienen tiempo para abastecerse de productos de aseo o lo que necesiten para viajar cómodos.",
              "Después, el asfalto se vuelve polvo y el polvo se vuelve desierto. El primer destino es Ulishamana: una comunidad Wayúu que no recibe a cualquier visitante. No es un set turístico ni una recreación cultural. Es una comunidad real, viva, que ha elegido abrirles sus puertas de forma exclusiva. No hay otro grupo, solo la comunidad y lo que ese día tenga para ofrecer: taller de tejido, pintura facial tradicional con su significado, el toque de la Yonna y una cata de Yotshi, el licor sagrado Wayúu, una manta Wayúu para las mujeres y un sombrero típico para los hombres.",
              "Todo lo que vivan ahí tiene siglos de historia detrás y debe ser recibido con la misma seriedad con que se ofrece. El día termina con almuerzo y cena típica de la región, pescado fresco de temporada. Si hay alguna restricción alimentaria, se coordina con anticipación.",
            ],
            en: [
              "The trip starts the moment you get in the truck. A 4x4 picks you up at the airport and from then on the pace changes. Before leaving the city you have time to stock up on toiletries or whatever you need to travel comfortably.",
              "Then asphalt turns to dust, and dust turns to desert. The first destination is Ulishamana: a Wayúu community that doesn't host just anyone. It's not a tourist set or a cultural recreation. It's a real, living community that has chosen to open its doors exclusively to you. No other group — just the community and what the day brings: a weaving workshop, traditional face painting with its meaning, the rhythm of the Yonna dance and a Yotshi tasting (the sacred Wayúu liquor), a Wayúu manta for the women and a traditional hat for the men.",
              "Everything you live there carries centuries of history and must be received with the same seriousness with which it is offered. The day ends with lunch and a typical regional dinner — fresh seasonal fish. Any dietary restrictions are coordinated in advance.",
            ],
          },
        },
        {
          title: { es: "Día 2 — Siendo Wayúu, sin más", en: "Day 2 — Being Wayúu, simply" },
          body: {
            es: [
              "El desayuno no tiene afán. Un chinchorro, la enramada, el sonido del viento y una conversación que solo puede darse cuando eres parte de la comunidad. Las personas están ahí para responder lo que el día anterior no se pudo contestar.",
              "Si el viaje es entre semana, hay posibilidad de visitar la escuela de la comunidad. Se llevan refrigerios para los niños y se acompañan las clases con los profesores. Los fines de semana la escuela no abre, pero la ranchería sigue viva con sus propias rutinas, y los refrigerios se reparten ahí, entre los niños de la comunidad. Es uno de esos momentos que no estaba en ningún plan pero que termina siendo el más recordado.",
              "Sobre el mediodía, cuando ya el sol pega fuerte y la comunidad retoma su ritmo, llega el momento de agradecer y seguir. La camioneta los espera. En el camino se almuerza en Uribia, capital indígena de Colombia. Y si el clima y la ruta lo permiten, llegar justo a tiempo para ver cómo el sol cae sobre el mar desde el balcón de la habitación frente al mar.",
              "En la noche: cena de bienvenida con langosta de pesca local. Y después, cuando los platos se recogen y el ruido del día se apaga, una fogata frente al mar. De un lado el fuego, del otro el Caribe.",
            ],
            en: [
              "Breakfast has no rush. A chinchorro hammock, the enramada shade, the sound of the wind and a conversation that can only happen when you're part of the community. People are there to answer what the previous day couldn't.",
              "If the trip is on a weekday, there's a chance to visit the community school. You bring snacks for the children and join classes with the teachers. On weekends the school is closed, but the ranchería is still alive with its own routines, and snacks are shared there, among the community children. It's one of those moments that wasn't on any itinerary but ends up being the most remembered.",
              "Around midday, when the sun hits hard and the community returns to its rhythm, it's time to give thanks and move on. The truck is waiting. On the way you'll have lunch in Uribia, indigenous capital of Colombia. And if the weather and route allow, you'll arrive just in time to watch the sun fall over the sea from the balcony of your oceanfront room.",
              "At night: welcome dinner with locally caught lobster. And afterward, when the plates are cleared and the day's noise fades, a bonfire facing the sea. On one side, fire. On the other, the Caribbean.",
            ],
          },
        },
        {
          title: { es: "Día 3 — Jepirra: el lugar donde los vivos entienden a los que ya no están", en: "Day 3 — Jepirra: where the living understand those who are gone" },
          body: {
            es: [
              "Hay lugares que se entienden solo cuando se está parado en ellos. El Pilón de Azúcar es uno de esos. En quince minutos de subida llegan a una vista de 360 grados sobre el Cabo: de un lado, el mar que golpea fuerte contra las rocas; del otro, una calma que parece no pertenecer al mismo océano.",
              "Para el pueblo Wayúu, este lugar no es solo paisaje. El Cabo de la Vela es Jepirra, el destino final de las almas. Según su cosmología, cuando alguien muere, su espíritu camina hasta aquí, hasta este punto donde la tierra se acaba y el mar empieza, para hacer su último viaje. Es el umbral entre este mundo y el siguiente. Por eso el viento nunca para. Por eso el mar golpea así.",
              "La tarde es más libre. Almuerzo a elección propia en el pueblo, el guía tiene sus recomendaciones, pero la decisión es de ustedes. Después, la camioneta los lleva al Mirador Tortuga y a Playa Ojo de Agua: tiempo para caminar, fotografiar, sentarse. El día cierra en el faro, esperando el atardecer. Cuando el sol baja y el faro enciende, se van al hotel. Cena frente al mar con mero de temporada.",
            ],
            en: [
              "Some places you only understand by standing in them. Pilón de Azúcar is one. A 15-minute climb takes you to a 360° view over the Cabo: on one side, the sea pounding the rocks; on the other, a stillness that doesn't seem to belong to the same ocean.",
              "For the Wayúu, this place is not just scenery. Cabo de la Vela is Jepirra, the final destination of souls. According to their cosmology, when someone dies their spirit walks here, to this point where land ends and sea begins, to make its final journey. It is the threshold between this world and the next. That's why the wind never stops. That's why the sea hits like that.",
              "The afternoon is freer. Lunch of your choice in the village — the guide has recommendations, but the decision is yours. Afterward the truck takes you to Mirador Tortuga and Playa Ojo de Agua: time to walk, photograph, sit. The day closes at the lighthouse, waiting for sunset. When the sun drops and the lighthouse lights, you head back to the hotel. Dinner facing the sea with seasonal grouper.",
            ],
          },
        },
        {
          title: { es: "Día 4 — La sal de la tierra y el sabor de lo que fuiste", en: "Day 4 — The salt of the earth and the taste of who you were" },
          body: {
            es: ["Día de cierre con visita a Manaure y los flamencos rosados, regreso al aeropuerto y despedida."],
            en: ["Closing day with a visit to Manaure and the pink flamingos, return to the airport and farewell."],
          },
        },
      ],
      flexibleSchedule: true,
      climate: {
        temperature: { es: "Entre 27 °C y 32 °C", en: "Between 27 °C and 32 °C" },
        bestSeason: {
          es: "La mejor época para viajar es de diciembre a abril, cuando las lluvias prácticamente desaparecen y el cielo se mantiene despejado. De mayo a noviembre hay presencia de lluvias ocasionales. El viento fuerte es una constante en el Cabo de la Vela en cualquier época y hace parte de la experiencia.",
          en: "The best time to travel is December to April, when rains practically disappear and the sky stays clear. From May to November there are occasional rains. Strong wind is a constant at Cabo de la Vela in any season and is part of the experience.",
        },
      },
      recommendations: {
        es: [
          "Ropa ligera y de colores claros. El sol pega fuerte desde temprano",
          "Protector solar de alta protección y gafas de sol; el reflejo en el desierto y el agua es intenso",
          "Sombrero o gorra, imprescindible durante el día",
          "Repelente de insectos para las noches",
          "Calzado cómodo para caminar en arena y terreno irregular",
          "Ropa de baño y toalla",
          "Efectivo en pesos colombianos. No hay cajeros en el Cabo de la Vela ni en la zona del desierto",
          "Mente abierta y disposición para conectar. Las comunidades que se visitan merecen presencia real, no solo una cámara",
        ],
        en: [
          "Light, light-colored clothing. The sun hits hard from early on",
          "High-protection sunscreen and sunglasses; the glare on desert and water is intense",
          "Hat or cap, essential during the day",
          "Insect repellent for the nights",
          "Comfortable footwear for sand and uneven terrain",
          "Swimwear and towel",
          "Cash in Colombian pesos. There are no ATMs at Cabo de la Vela or in the desert zone",
          "Open mind and willingness to connect. The communities you visit deserve real presence, not just a camera",
        ],
      },
      arrivalTips: {
        es: "Una vez sepas del vuelo, avísanos para coordinar la recogida saliendo del aeropuerto.",
        en: "Once you know your flight, let us know so we can coordinate pickup at the airport exit.",
      },
      cancellation: { es: "Flexible", en: "Flexible" },
    },
  },
  // ---------------- SANTA MARTA ----------------
  {
    slug: "ciudad-perdida-4-dias",
    zone: "santa-marta",
    themes: ["adventure", "ancestral", "heritage"],
    duration: { es: "4 días / 3 noches", en: "4 days / 3 nights" },
    durationDays: 4,
    difficulty: "extreme",
    pace: { es: "Exigente — 44 km, ríos, calor", en: "Demanding — 44 km, rivers, heat" },
    priceCOP: 1860000,
    priceNote: { es: "Por persona", en: "Per person" },
    name: { es: "Ciudad Perdida — Trek 4 días", en: "Lost City — 4-day Trek" },
    hook: { es: "El trek mítico: Teyuna, comunidades Kogui, escalinatas sagradas.", en: "The mythical trek: Teyuna, Kogui communities, sacred staircases." },
    description: {
      es: "Cuatro días de selva, río y montaña hasta Teyuna — una ciudad arqueológica más antigua que Machu Picchu.",
      en: "Four days of jungle, river and mountain up to Teyuna — an archaeological city older than Machu Picchu.",
    },
    insights: { es: ["44 km de trek", "Ciudad arqueológica de Teyuna (>30 ha)", "Encuentros con Kogui y Tayrona", "Más antigua que Machu Picchu"], en: ["44 km trek", "Teyuna archaeological site (>30 ha)", "Encounters with Kogui and Tayrona", "Older than Machu Picchu"] },
    impact: { es: "Cada trekker contribuye con guías locales y comunidades indígenas de la Sierra.", en: "Every trekker supports local guides and indigenous communities of the Sierra." },
    image: "https://i.pinimg.com/1200x/54/98/06/549806ba9d18933d172d584ae1038108.jpg",
  },
  {
    slug: "ciudad-perdida-5-dias",
    zone: "santa-marta",
    themes: ["adventure", "ancestral", "heritage"],
    duration: { es: "5 días / 4 noches", en: "5 days / 4 nights" },
    durationDays: 5,
    difficulty: "extreme",
    pace: { es: "Exigente", en: "Demanding" },
    priceCOP: 2150000,
    priceNote: { es: "Por persona", en: "Per person" },
    name: { es: "Ciudad Perdida — Trek 5 días", en: "Lost City — 5-day Trek" },
    hook: { es: "Ritmo más lento + mayor inmersión espiritual.", en: "Slower pace + deeper spiritual immersion." },
    description: {
      es: "La versión extendida del trek a Teyuna: más tiempo en la Sierra, más conexión con las comunidades indígenas.",
      en: "Extended version of the Teyuna trek: more time in the Sierra, deeper connection with indigenous communities.",
    },
    insights: { es: ["5 días en la Sierra", "Ritmo contemplativo", "Mayor tiempo en Teyuna", "Comunidades Kogui"], en: ["5 days in the Sierra", "Contemplative pace", "More time at Teyuna", "Kogui communities"] },
    impact: { es: "Apoyo extendido a comunidades indígenas de la Sierra Nevada.", en: "Extended support to Sierra Nevada indigenous communities." },
    image: "https://i.pinimg.com/1200x/bf/28/d6/bf28d6d17e73b1768b7bd70f994d7aff.jpg",
    details: {
      about: {
        es: "Hay algo raro que pasa cuando te metes en la Sierra Nevada: el tiempo deja de importar. Empiezas caminando con la idea de \"hacer un trekking\", pero rápido entiendes que esto no va de kilómetros… aunque sí, son casi 60 en total. Va de lo que te pasa mientras avanzas. Sudas, te cansas, te ríes con gente que no conocías hace dos días, te metes a un río helado sin pensarlo mucho… y todo empieza a sentirse más simple, más puro.\n\nDurante cinco días te metes en una selva que está viva de verdad. No es paisaje, es presencia. Caminas entre montañas, cruzas ríos una y otra vez, duermes con el sonido constante de la naturaleza y te desconectas de todo lo que normalmente te ocupa la cabeza.\n\nLa ruta sigue el mismo camino hacia Ciudad Perdida que el tour clásico de 4 días. El tercer día pasa lo soñado: subes por 1.200 escaleras de piedra que parecen no terminar… y de repente estás ahí. Ciudad Perdida. Sin ruido, sin filtros. Solo tú, la selva y un lugar que lleva siglos ahí, mucho antes de que todo lo demás existiera.\n\nPero acá es donde este viaje cambia. Cuando la mayoría empieza a devolverse, tú sigues. El cuarto día tomas un desvío fuera de la ruta tradicional. Te metes por zonas menos transitadas, pasas por cascadas, por comunidades campesinas y rincones donde casi no hay nadie. No es una versión más suave, es más inmersiva. Más tiempo en la Sierra, más contacto real.\n\nNo es fácil. Hay días largos, calor, humedad, cansancio real. Pero justo por eso vale más. Porque te lo ganas. Ciudad Perdida no es un plan bonito. Es una experiencia que te mueve cosas.",
        en: "Something strange happens when you go into the Sierra Nevada: time stops mattering. You start walking thinking you'll just \"do a trek,\" but you quickly understand this isn't about kilometers… although yes, it's almost 60 total. It's about what happens to you as you go. You sweat, you tire, you laugh with people you didn't know two days ago, you jump into an icy river without thinking… and everything starts to feel simpler, purer.\n\nFor five days you step into a jungle that's truly alive. It's not scenery, it's presence. You walk between mountains, cross rivers over and over, sleep to the constant sound of nature and disconnect from everything that usually fills your head.\n\nThe route follows the same path to the Lost City as the classic 4-day tour. On the third day the dream happens: you climb 1,200 stone steps that seem endless… and suddenly you're there. Ciudad Perdida. No noise, no filters. Just you, the jungle and a place that's been there for centuries, long before everything else existed.\n\nBut this is where the trip changes. When most start heading back, you keep going. On the fourth day you take a detour off the traditional route. You head into less-traveled areas, past waterfalls, peasant communities and corners where almost no one goes. It's not a softer version — it's more immersive. More time in the Sierra, more real contact.\n\nIt's not easy. Long days, heat, humidity, real exhaustion. But that's exactly why it's worth more. Because you earn it. Ciudad Perdida isn't a pretty plan. It's an experience that moves things in you.",
      },
      difficultyNote: {
        es: "Caminatas diarias entre 10 y 18 kilómetros en subida. Buena condición física requerida.",
        en: "Daily hikes of 10 to 18 km uphill. Good physical condition required.",
      },
      includes: {
        es: [
          "Alimentación completa",
          "Alojamiento en camarotes con toldillo (opción de hamacas disponible)",
          "Guías locales expertos en montaña",
          "Traslados Santa Marta – El Mamey – Santa Marta",
          "Ingreso al Parque Arqueológico Teyuna – Ciudad Perdida",
          "Seguro de asistencia médica",
          "Almacenamiento de equipaje extra para subir lo más ligero posible",
        ],
        en: [
          "Full meal plan",
          "Lodging in bunks with mosquito nets (hammock option available)",
          "Expert local mountain guides",
          "Transfers Santa Marta – El Mamey – Santa Marta",
          "Entrance to Teyuna – Lost City Archaeological Park",
          "Medical assistance insurance",
          "Extra luggage storage so you climb as light as possible",
        ],
      },
      meetingPoint: {
        es: "Recogida en hoteles del centro histórico o en la oficina en el centro histórico de Santa Marta",
        en: "Pickup at historic-center hotels or at our office in the historic center of Santa Marta",
      },
      startTime: "08:15",
      recommendations: {
        es: [
          "Un morral ligero y cómodo",
          "Botas de trekking o tenis con buen agarre",
          "Llevar mínimo 4 pares de medias o calcetines",
          "Toalla",
          "Traje de baño",
          "Repelente con DEET o natural",
          "Bloqueador solar + gorra o sombrero",
          "Botella de agua reutilizable",
          "Bolsa de plástico hermética para que no se mojen tus cosas",
          "Documento de identidad",
        ],
        en: [
          "A light, comfortable backpack",
          "Trekking boots or shoes with good grip",
          "Bring at least 4 pairs of socks",
          "Towel",
          "Swimwear",
          "Repellent with DEET or natural",
          "Sunscreen + cap or hat",
          "Reusable water bottle",
          "Sealed plastic bag to keep your things dry",
          "ID document",
        ],
      },
      arrivalTips: {
        es: "Se recomienda llegar la noche anterior, descansados y puntuales. Llevar solo lo necesario y lo más ligero posible. Si se necesita, podemos guardar el equipaje extra sin costo y con seguridad.",
        en: "We recommend arriving the night before, well rested and on time. Bring only what's necessary and as light as possible. If needed, we can store extra luggage at no cost and securely.",
      },
      cancellation: { es: "Moderada", en: "Moderate" },
    },
  },
  // ---------------- MEDELLÍN ----------------
  {
    slug: "city-tour-comuna-13",
    zone: "medellin",
    themes: ["urban-memory", "express"],
    duration: { es: "8 horas", en: "8 hours" },
    durationDays: 1,
    difficulty: "easy",
    pace: { es: "Bajo-medio", en: "Low-medium" },
    priceCOP: null,
    name: { es: "City Tour + Comuna 13", en: "City Tour + Comuna 13" },
    hook: { es: "Pueblito Paisa, Plaza Botero, Pies Descalzos + Comuna 13.", en: "Pueblito Paisa, Botero Plaza, Pies Descalzos + Comuna 13." },
    description: {
      es: "El recorrido cultural imprescindible: de la Medellín tradicional a la transformación de la Comuna 13.",
      en: "The essential cultural tour: from traditional Medellín to the transformation of Comuna 13.",
    },
    insights: { es: ["Plaza Botero", "Pueblito Paisa", "Comuna 13 con guías locales", "Arte urbano y resiliencia"], en: ["Botero Plaza", "Pueblito Paisa", "Comuna 13 with local guides", "Street art and resilience"] },
    impact: { es: "Trabajamos con guías de la Comuna 13 que cuentan su propia historia.", en: "We work with Comuna 13 guides telling their own story." },
    image: "https://images.unsplash.com/photo-1731560818517-00c245cec091?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  {
    slug: "tour-pablo-escobar",
    zone: "medellin",
    themes: ["urban-memory", "express"],
    duration: { es: "4 horas", en: "4 hours" },
    durationDays: 1,
    difficulty: "easy",
    pace: { es: "Bajo", en: "Low" },
    priceCOP: 147000,
    priceNote: { es: "Desde, 1 pax · USD $41", en: "From, 1 pax · USD $41" },
    name: { es: "Pablo Escobar — Memoria y Transformación", en: "Pablo Escobar — Memory & Transformation" },
    hook: { es: "Reflexivo, NO romantización: Parque de la Inflexión, barrio de infancia, tumba.", en: "Reflective, NOT romanticized: Inflexion Park, childhood neighborhood, grave." },
    description: {
      es: "Una mirada honesta a uno de los capítulos más oscuros de Colombia, contada con respeto a las víctimas.",
      en: "An honest look at one of Colombia's darkest chapters, told with respect for the victims.",
    },
    insights: { es: ["Parque de la Inflexión", "Memoria de las víctimas", "Contexto histórico real", "Sin romantización"], en: ["Inflexion Park", "Memory of the victims", "Real historical context", "Zero romanticization"] },
    impact: { es: "Tour diseñado con familias afectadas; los ingresos apoyan iniciativas de memoria.", en: "Designed with affected families; revenue supports memory initiatives." },
    image: "https://images.unsplash.com/photo-1551282643-392c82ebb909?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  {
    slug: "guatape-penol",
    zone: "medellin",
    themes: ["postcard", "express"],
    duration: { es: "11 horas", en: "11 hours" },
    durationDays: 1,
    difficulty: "moderate",
    pace: { es: "Medio — 740 escalones opcionales", en: "Medium — 740 optional steps" },
    priceCOP: null,
    name: { es: "Guatapé y El Peñol", en: "Guatapé and El Peñol" },
    hook: { es: "La postal #1 de Antioquia: piedra de 220 m, embalse y zócalos.", en: "Antioquia's #1 postcard: 220 m rock, lake and zócalos." },
    description: {
      es: "Full day a uno de los paisajes más fotografiados de Colombia, con tiempo para subir El Peñol y caminar el pueblo de zócalos.",
      en: "Full day to one of Colombia's most photographed landscapes, with time to climb El Peñol and walk the zócalo town.",
    },
    insights: { es: ["Piedra de El Peñol — 220 m", "Embalse de Guatapé", "Pueblo de zócalos pintados", "Almuerzo típico paisa"], en: ["El Peñol rock — 220 m", "Guatapé reservoir", "Painted zócalo town", "Typical paisa lunch"] },
    impact: { es: "Operadores y guías locales de Guatapé.", en: "Local Guatapé operators and guides." },
    image: "https://images.unsplash.com/photo-1582568742002-499ac33758ce?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  {
    slug: "santa-fe-antioquia",
    zone: "medellin",
    themes: ["heritage", "express"],
    duration: { es: "Full day", en: "Full day" },
    durationDays: 1,
    difficulty: "easy",
    pace: { es: "Bajo", en: "Low" },
    priceCOP: null,
    name: { es: "Santa Fe de Antioquia", en: "Santa Fe de Antioquia" },
    hook: { es: "Pueblo colonial, Puente de Occidente, balcones históricos.", en: "Colonial town, Western Bridge, historic balconies." },
    description: {
      es: "Una escapada al pueblo colonial mejor conservado de Antioquia, con calles empedradas y arquitectura del siglo XVI.",
      en: "An escape to Antioquia's best-preserved colonial town, with cobblestone streets and 16th-century architecture.",
    },
    insights: { es: ["Centro colonial", "Puente de Occidente", "Iglesias coloniales", "Almuerzo típico"], en: ["Colonial center", "Western Bridge", "Colonial churches", "Typical lunch"] },
    impact: { es: "Apoyo a operadores y artesanos del municipio.", en: "Support to local operators and artisans." },
    image: "https://i.pinimg.com/1200x/4d/cd/a6/4dcda65cd031157277014aebd6b5ae8e.jpg",
  },
  {
    slug: "tour-cafe-antioquia",
    zone: "medellin",
    themes: ["flavors", "express"],
    duration: { es: "Full day", en: "Full day" },
    durationDays: 1,
    difficulty: "easy",
    pace: { es: "Bajo", en: "Low" },
    priceCOP: null,
    name: { es: "Cultivo y Degustación de Café", en: "Coffee Farm & Tasting" },
    hook: { es: "Caminata por cafetal, despulpado, cata profesional con barista.", en: "Walk through the farm, depulping, pro tasting with a barista." },
    description: {
      es: "Vive el café desde la rama hasta la taza con familias caficultoras de Antioquia.",
      en: "Experience coffee from branch to cup with Antioquia coffee-growing families.",
    },
    insights: { es: ["Caminata por cafetal", "Proceso completo", "Cata con barista", "Almuerzo en finca"], en: ["Coffee farm walk", "Full process", "Tasting with barista", "Farm lunch"] },
    impact: { es: "Ingresos directos a familias caficultoras.", en: "Direct income to coffee-growing families." },
    image: "https://i.pinimg.com/736x/78/29/63/7829632d4fd0065245b7ee107b5e6889.jpg",
  },
  // ---------------- BOGOTÁ ----------------
  {
    slug: "tour-la-perse",
    zone: "bogota",
    themes: ["urban-memory"],
    duration: { es: "3-4 horas", en: "3-4 hours" },
    durationDays: 1,
    difficulty: "moderate",
    pace: { es: "Moderado", en: "Moderate" },
    priceCOP: 80000,
    priceNote: { es: "Por persona", en: "Per person" },
    name: { es: "El Tour de La Perse", en: "The La Perse Tour" },
    hook: { es: "Barrio obrero histórico: chicha, calle de los abrazos, monumento del silencio.", en: "Historic working-class neighborhood: chicha, street of hugs, monument of silence." },
    description: {
      es: "Un recorrido íntimo por un barrio que cuenta la historia obrera de Bogotá, con guías de la propia comunidad.",
      en: "An intimate tour of a neighborhood telling Bogotá's working-class history, with guides from the community itself.",
    },
    insights: { es: ["Calle de los abrazos", "Cata de chicha", "Monumento del silencio", "Guías locales"], en: ["Street of hugs", "Chicha tasting", "Monument of silence", "Local guides"] },
    impact: { es: "Guías de La Perse cuentan su propia historia y reciben ingresos directos.", en: "La Perse guides tell their own story and receive direct income." },
    image: "https://images.unsplash.com/photo-1568632234167-789922ea3cc4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
    details: {
      about: {
        es: "Hay barrios que se visitan. Y hay barrios que se sienten. La Perseverancia es de los segundos.",
        en: "There are neighborhoods you visit. And there are neighborhoods you feel. La Perseverancia is one of the second kind.",
      },
      difficultyNote: { es: "Baja — son cuadras empinadas, pero el recorrido es pausado.", en: "Low — the streets are steep, but the pace is unhurried." },
      maxPeople: 20,
      languages: { es: "Español, Inglés", en: "Spanish, English" },
      includes: {
        es: [
          "Guía local experto en historia urbana y procesos comunitarios",
          "Acompañamiento permanente durante todo el recorrido",
          "Degustación de chicha tradicional",
          "Snack",
          "Experiencia sensorial guiada en las Torres del Silencio",
          "Encuentros con líderes y habitantes del barrio",
          "Interpretación cultural, histórica y social del territorio",
          "Aporte directo a la economía comunitaria y a los anfitriones locales",
          "Seguro de asistencia básica durante la experiencia",
        ],
        en: [
          "Local guide expert in urban history and community processes",
          "Continuous accompaniment throughout the tour",
          "Traditional chicha tasting",
          "Snack",
          "Guided sensory experience at the Towers of Silence",
          "Encounters with neighborhood leaders and residents",
          "Cultural, historical and social interpretation of the territory",
          "Direct contribution to the community economy and local hosts",
          "Basic assistance insurance during the experience",
        ],
      },
      meetingPoint: { es: "Museo Nacional de Colombia", en: "Museo Nacional de Colombia" },
      meetingPointMapUrl: "https://maps.google.com/?q=Museo+Nacional+de+Colombia+Bogota",
      endingPoint: {
        es: "Puede ser en Calle Bonita, en la Plaza de Mercado de La Perseverancia o en el punto de inicio (Museo Nacional de Colombia).",
        en: "Can be at Calle Bonita, at the La Perseverancia Market Square, or at the starting point (Museo Nacional de Colombia).",
      },
      flexibleSchedule: true,
      arrivalTips: { es: "Ubicarse frente a la puerta principal del Museo Nacional.", en: "Meet at the main entrance of the Museo Nacional." },
      cancellation: { es: "Flexible", en: "Flexible" },
    },
  },
  {
    slug: "graffiti-tour-candelaria",
    zone: "bogota",
    themes: ["urban-memory"],
    duration: { es: "4 horas", en: "4 hours" },
    durationDays: 1,
    difficulty: "moderate",
    pace: { es: "Media", en: "Medium" },
    priceCOP: 100000,
    priceNote: { es: "Por persona · USD $28", en: "Per person · USD $28" },
    name: { es: "La Alta — Graffiti Tour Candelaria", en: "La Alta — Candelaria Graffiti Tour" },
    hook: { es: "Egipto + El Rocío + Calle Caliente. Arte y resistencia.", en: "Egipto + El Rocío + Hot Street. Art and resistance." },
    description: {
      es: "Sube por La Candelaria Alta entre murales que cuentan la historia política, social y artística de Bogotá.",
      en: "Walk up upper Candelaria among murals that tell the political, social and artistic history of Bogotá.",
    },
    insights: { es: ["Egipto y El Rocío", "Murales políticos", "Calle Caliente", "Vista de Bogotá"], en: ["Egipto and El Rocío", "Political murals", "Hot Street", "View of Bogotá"] },
    impact: { es: "Trabajamos con artistas y colectivos del barrio.", en: "We work with neighborhood artists and collectives." },
    image: "https://images.unsplash.com/photo-1664851490956-b45905d6ffba?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  {
    slug: "ciudad-bolivar-arte",
    zone: "bogota",
    themes: ["urban-memory"],
    duration: { es: "3 horas", en: "3 hours" },
    durationDays: 1,
    difficulty: "easy",
    pace: { es: "Baja", en: "Low" },
    priceCOP: 75000,
    priceNote: { es: "Por persona · USD $21", en: "Per person · USD $21" },
    name: { es: "Ciudad Bolívar — Arte y resiliencia", en: "Ciudad Bolívar — Art & Resilience" },
    hook: { es: "TransMiCable + taller de graffiti + comunidad. Turismo con propósito.", en: "TransMiCable + graffiti workshop + community. Travel with purpose." },
    description: {
      es: "Sube en cable a uno de los barrios más sorprendentes de Bogotá y comparte un taller con artistas locales.",
      en: "Take the cable car up to one of Bogotá's most surprising neighborhoods and share a workshop with local artists.",
    },
    insights: { es: ["TransMiCable", "Taller de graffiti", "Vista panorámica", "Guías de la comunidad"], en: ["TransMiCable", "Graffiti workshop", "Panoramic view", "Community guides"] },
    impact: { es: "Los ingresos apoyan colectivos juveniles de Ciudad Bolívar.", en: "Revenue supports youth collectives in Ciudad Bolívar." },
    image: "https://i.pinimg.com/1200x/90/82/1f/90821fb0a0a5fde047ca85de9836a3dd.jpg",
  },
  {
    slug: "paloquemao",
    zone: "bogota",
    themes: ["flavors"],
    duration: { es: "3 horas", en: "3 hours" },
    durationDays: 1,
    difficulty: "easy",
    pace: { es: "Baja", en: "Low" },
    priceCOP: null,
    name: { es: "Plaza de Mercado Paloquemao", en: "Paloquemao Market" },
    hook: { es: "El mercado gastronómico icónico: flores, frutas exóticas, chefs.", en: "The iconic food market: flowers, exotic fruits, chefs." },
    description: {
      es: "Recorre el mercado más fotogénico de Bogotá probando frutas que solo existen en Colombia.",
      en: "Walk Bogotá's most photogenic market tasting fruits that only exist in Colombia.",
    },
    insights: { es: ["Más de 30 frutas exóticas", "Flores y plantas", "Desayuno típico", "Historia del mercado"], en: ["30+ exotic fruits", "Flowers and plants", "Typical breakfast", "Market history"] },
    impact: { es: "Compras directas a comerciantes del mercado.", en: "Direct purchases from market vendors." },
    image: "https://i.pinimg.com/1200x/ef/19/bf/ef19bf55bb5a016114a59f3d916818b3.jpg",
  },
  {
    slug: "corabastos",
    zone: "bogota",
    themes: ["flavors"],
    duration: { es: "6 horas", en: "6 hours" },
    durationDays: 1,
    difficulty: "moderate",
    pace: { es: "Moderada", en: "Moderate" },
    priceCOP: 140000,
    priceNote: { es: "Por persona · USD $35", en: "Per person · USD $35" },
    name: { es: "Corabastos — El mercado más grande de Sudamérica", en: "Corabastos — South America's Biggest Market" },
    hook: { es: "El mercado más grande de Sudamérica + Kennedy. Para foodies hardcore.", en: "South America's largest market + Kennedy. For hardcore foodies." },
    description: {
      es: "Una experiencia inmersiva de seis horas en el corazón logístico de la comida de Colombia.",
      en: "A six-hour immersive experience at the logistical heart of Colombia's food.",
    },
    insights: { es: ["Mercado de 60 ha", "Recorrido a las 5 a.m.", "Desayuno con cargueros", "Almuerzo en Kennedy"], en: ["60 ha market", "5 a.m. tour", "Breakfast with porters", "Lunch in Kennedy"] },
    impact: { es: "Trabajamos con cargueros y comerciantes locales.", en: "We work with porters and local vendors." },
    image: "https://i.pinimg.com/1200x/ef/19/bf/ef19bf55bb5a016114a59f3d916818b3.jpg",
  },
  {
    slug: "monserrate",
    zone: "bogota",
    themes: ["heritage"],
    duration: { es: "6 horas", en: "6 hours" },
    durationDays: 1,
    difficulty: "moderate",
    pace: { es: "Media", en: "Medium" },
    priceCOP: 160000,
    priceNote: { es: "Por persona", en: "Per person" },
    name: { es: "Monserrate — El mirador sagrado", en: "Monserrate — The Sacred Lookout" },
    hook: { es: "Funicular, teleférico o sendero. La postal de Bogotá.", en: "Funicular, cable car or trail. The Bogotá postcard." },
    description: {
      es: "El cerro tutelar de Bogotá: 3.152 m, vista panorámica de la sabana y peregrinación histórica.",
      en: "Bogotá's guardian hill: 3,152 m, panoramic view of the savannah and historic pilgrimage.",
    },
    insights: { es: ["3.152 m de altura", "3 formas de subir", "Vista de la sabana", "Iglesia y peregrinación"], en: ["3,152 m altitude", "3 ways up", "Savannah view", "Church and pilgrimage"] },
    impact: { es: "Operadores locales bogotanos.", en: "Local Bogotá operators." },
    image: "https://i.pinimg.com/736x/53/1f/00/531f0081c46e718c8eafe1eb51a7ebad.jpg",
    details: {
      about: {
        es: "Monserrate, sí. Pero no por el camino de siempre. Este trekking inicia en la Plaza de Mercado de La Perseverancia y asciende por una ruta antigua, menos transitada, que combina naturaleza altoandina, panorámicas potentes de Bogotá y una historia real de transformación comunitaria. Es montaña con contexto. Es ciudad vista desde arriba… después de caminarla desde abajo.",
        en: "Monserrate, yes. But not by the usual path. This trek starts at the La Perseverancia Market Square and ascends an old, less-traveled route that combines high-Andean nature, powerful views of Bogotá, and a real story of community transformation. Mountain with context. The city seen from above… after walking it from below.",
      },
      difficultyNote: { es: "Media — se sube por la montaña, que en días de lluvia suele tener barro.", en: "Medium — you climb the mountain, which can be muddy on rainy days." },
      maxPeople: 30,
      languages: { es: "Español", en: "Spanish" },
      petsAllowed: true,
      includes: {
        es: [
          "Guía local",
          "Acompañamiento de jóvenes líderes del territorio",
          "Interpretación ambiental y social durante el recorrido",
          "Trekking por ruta alternativa a Monserrate",
          "Parada estratégica en el Pico del Águila",
          "Seguro básico de asistencia",
          "Contribución directa al proceso comunitario de La Perseverancia",
        ],
        en: [
          "Local guide",
          "Accompaniment by young community leaders",
          "Environmental and social interpretation along the way",
          "Trek along the alternative Monserrate route",
          "Strategic stop at Pico del Águila",
          "Basic assistance insurance",
          "Direct contribution to the La Perseverancia community process",
        ],
      },
      meetingPoint: { es: "Plaza de Mercado La Perseverancia", en: "La Perseverancia Market Square" },
      meetingPointMapUrl: "https://maps.google.com/?q=Plaza+de+Mercado+La+Perseverancia+Bogota",
      flexibleSchedule: true,
      recommendations: {
        es: [
          "Calzado de trekking con buen agarre",
          "El sendero tiene tramos en pendiente y superficie irregular",
          "Ropa cómoda por capas — la temperatura puede cambiar durante el ascenso",
          "Mínimo 1 litro de agua",
          "Snack ligero o energético",
          "Protección solar y gorra",
          "Condición física básica",
        ],
        en: [
          "Trekking footwear with good grip",
          "Trail has steep stretches and uneven surfaces",
          "Comfortable layered clothing — temperature can change during the climb",
          "At least 1 liter of water",
          "Light or energy snack",
          "Sun protection and cap",
          "Basic physical condition",
        ],
      },
      arrivalTips: {
        es: "En la plaza puedes llegar antes de la hora y disfrutar de un jugo o un desayuno tradicional.",
        en: "You can arrive at the market early and enjoy a juice or a traditional breakfast.",
      },
      cancellation: { es: "Flexible", en: "Flexible" },
    },
  },
  {
    slug: "full-day-bogota",
    zone: "bogota",
    themes: ["express", "urban-memory", "flavors"],
    duration: { es: "6-7 horas", en: "6-7 hours" },
    durationDays: 1,
    difficulty: "moderate",
    pace: { es: "Moderado", en: "Moderate" },
    priceCOP: null,
    name: { es: "Full Day Bogotá", en: "Bogotá Full Day" },
    hook: { es: "La Perse + tejo + cata de café. Todo en uno.", en: "La Perse + tejo + coffee tasting. All in one." },
    description: {
      es: "El paquete \"todo en uno\" para conocer lo más auténtico de Bogotá en un solo día.",
      en: "The all-in-one package to discover the most authentic Bogotá in a single day.",
    },
    insights: { es: ["La Perse", "Partido de tejo (deporte nacional)", "Cata de café", "Comida tradicional"], en: ["La Perse", "Tejo match (national sport)", "Coffee tasting", "Traditional food"] },
    impact: { es: "Ingresos directos a operadores locales.", en: "Direct income to local operators." },
    image: "https://images.unsplash.com/photo-1561165804-08ddb43c659f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  // ---------------- CUNDINAMARCA ----------------
  {
    slug: "chingaza",
    zone: "cundinamarca",
    themes: ["adventure", "ecotourism"],
    duration: { es: "7 horas", en: "7 hours" },
    durationDays: 1,
    difficulty: "hard",
    pace: { es: "Alto — 3.400+ msnm", en: "High — 3,400+ masl" },
    priceCOP: null,
    name: { es: "Chingaza — Donde el páramo susurra", en: "Chingaza — Where the Páramo Whispers" },
    hook: { es: "Páramo a 3.400+ msnm, lagunas glaciares, frailejones, fauna emblemática.", en: "Páramo at 3,400+ masl, glacial lakes, frailejones, iconic wildlife." },
    description: {
      es: "Un día completo en uno de los ecosistemas más raros del planeta, con cupo controlado.",
      en: "A full day in one of the planet's rarest ecosystems, with limited capacity.",
    },
    insights: { es: ["Páramo a 3.400 msnm", "Frailejones milenarios", "Posible avistamiento de oso de anteojos", "Cupo controlado"], en: ["Páramo at 3,400 masl", "Ancient frailejones", "Possible spectacled bear sighting", "Limited capacity"] },
    impact: { es: "Apoyo a programas de conservación del PNN Chingaza.", en: "Support to Chingaza National Park conservation." },
    image: "https://images.unsplash.com/photo-1540955330685-7fb3408d9c5b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  {
    slug: "la-chorrera",
    zone: "cundinamarca",
    themes: ["adventure"],
    duration: { es: "5 horas", en: "5 hours" },
    durationDays: 1,
    difficulty: "moderate",
    pace: { es: "Medio", en: "Medium" },
    priceCOP: null,
    name: { es: "La Chorrera — Cascada más alta de Colombia", en: "La Chorrera — Colombia's Tallest Waterfall" },
    hook: { es: "Cascada de 590 m, bosque de niebla.", en: "590 m waterfall, cloud forest." },
    description: {
      es: "Senderismo a la cascada más alta del país a través de un bosque de niebla mágico.",
      en: "Hike to the country's tallest waterfall through a magical cloud forest.",
    },
    insights: { es: ["Cascada de 590 m", "Bosque de niebla", "Almuerzo típico", "Ida y vuelta desde Bogotá"], en: ["590 m waterfall", "Cloud forest", "Typical lunch", "Round trip from Bogotá"] },
    impact: { es: "Familias campesinas de Choachí.", en: "Choachí peasant families." },
    image: "https://i.pinimg.com/1200x/11/8f/b0/118fb09856589a6bde2dd60e22fdeee1.jpg",
  },
  {
    slug: "catedral-sal-guatavita",
    zone: "cundinamarca",
    themes: ["heritage", "express"],
    duration: { es: "7-8 horas", en: "7-8 hours" },
    durationDays: 1,
    difficulty: "easy",
    pace: { es: "Bajo-Medio", en: "Low-Medium" },
    priceCOP: null,
    name: { es: "Catedral de Sal + Laguna de Guatavita", en: "Salt Cathedral + Guatavita Lagoon" },
    hook: { es: "Primera Maravilla de Colombia (180 m bajo tierra) + leyenda Muisca de El Dorado.", en: "Colombia's First Wonder (180 m underground) + the Muisca legend of El Dorado." },
    description: {
      es: "Combina el icónico templo subterráneo de Zipaquirá con la laguna sagrada que originó el mito de El Dorado.",
      en: "Combine the iconic underground temple in Zipaquirá with the sacred lagoon that birthed the El Dorado myth.",
    },
    insights: { es: ["180 m bajo tierra", "Catedral construida en sal", "Laguna sagrada Muisca", "Origen de El Dorado"], en: ["180 m underground", "Cathedral carved in salt", "Sacred Muisca lagoon", "Origin of El Dorado"] },
    impact: { es: "Operadores locales de Zipaquirá y Sesquilé.", en: "Local Zipaquirá and Sesquilé operators." },
    image: "https://images.unsplash.com/photo-1707073687052-0edc1463d1f8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  },
  // ---------------- BOYACÁ ----------------
  {
    slug: "cocuy-3-dias",
    zone: "boyaca",
    themes: ["adventure", "ecotourism"],
    duration: { es: "3 días / 2 noches", en: "3 days / 2 nights" },
    durationDays: 3,
    difficulty: "extreme",
    pace: { es: "Exigente — 5.330 msnm", en: "Demanding — 5,330 masl" },
    priceCOP: 660000,
    priceNote: { es: "Desde, grupal sin tiquete · hasta $850.000 individual con tiquete", en: "From, group without ticket · up to $850,000 solo with flight" },
    name: { es: "El Cocuy — Salida jueves", en: "El Cocuy — Thursday Departure" },
    hook: { es: "Glaciar + páramo de frailejones. Salidas grupales programadas.", en: "Glacier + frailejones páramo. Scheduled group departures." },
    description: {
      es: "Tres días en la sierra glaciar más imponente de Colombia. Requiere aclimatación previa.",
      en: "Three days in Colombia's most impressive glacier range. Prior altitude acclimation required.",
    },
    insights: { es: ["Glaciar a 5.330 msnm", "Páramo de frailejones", "Grupos pequeños programados", "Reserva: $150.000 anticipo"], en: ["Glacier at 5,330 masl", "Frailejones páramo", "Small scheduled groups", "Deposit: $150,000"] },
    impact: { es: "Guías locales certificados de Güicán.", en: "Certified local Güicán guides." },
    image: "https://i.pinimg.com/736x/fd/d5/e7/fdd5e7215c178ca104d1eb767a9d71b4.jpg",
  },
  {
    slug: "cocuy-termales",
    zone: "boyaca",
    themes: ["adventure", "flavors"],
    duration: { es: "3 días / 2 noches", en: "3 days / 2 nights" },
    durationDays: 3,
    difficulty: "extreme",
    pace: { es: "Exigente", en: "Demanding" },
    priceCOP: null,
    name: { es: "Cocuy + Güicán + Termales", en: "Cocuy + Güicán + Hot Springs" },
    hook: { es: "Misma exigencia + recuperación en aguas termales naturales.", en: "Same intensity + recovery in natural hot springs." },
    description: {
      es: "El trek del Cocuy con un cierre redondo en las aguas termales de Güicán.",
      en: "The Cocuy trek with a perfect closing at Güicán's hot springs.",
    },
    insights: { es: ["Trek a glaciar", "Termales naturales", "Pueblo de Güicán", "Aclimatación obligatoria"], en: ["Glacier trek", "Natural hot springs", "Güicán village", "Mandatory acclimation"] },
    impact: { es: "Familias campesinas de Güicán.", en: "Güicán peasant families." },
    image: "https://i.pinimg.com/736x/fd/d5/e7/fdd5e7215c178ca104d1eb767a9d71b4.jpg",
  },
  {
    slug: "tour-tunja",
    zone: "boyaca",
    themes: ["heritage", "flavors", "express"],
    duration: { es: "4 horas", en: "4 hours" },
    durationDays: 1,
    difficulty: "easy",
    pace: { es: "Bajo", en: "Low" },
    priceCOP: null,
    name: { es: "Tunja — Gastronomía e Historia", en: "Tunja — Food & History" },
    hook: { es: "Cuna de la Independencia + sabores boyacenses.", en: "Cradle of Independence + Boyacá flavors." },
    description: {
      es: "Una tarde tranquila por el centro de Tunja conociendo su historia y su cocina tradicional.",
      en: "A quiet afternoon through downtown Tunja, exploring its history and traditional cuisine.",
    },
    insights: { es: ["Casas coloniales", "Sitios independentistas", "Cocina boyacense", "Para parejas y culturales"], en: ["Colonial homes", "Independence sites", "Boyacá cuisine", "For couples and culture lovers"] },
    impact: { es: "Restaurantes y guías locales de Tunja.", en: "Local Tunja restaurants and guides." },
    image: "https://i.pinimg.com/1200x/72/76/b0/7276b09c97c5d8f168da7c151c5ee42b.jpg",
  },
  // ---------------- GUAVIARE ----------------
  {
    slug: "guaviare-5-dias",
    zone: "guaviare",
    themes: ["adventure", "ancestral", "heritage"],
    duration: { es: "5 días / 4 noches", en: "5 days / 4 nights" },
    durationDays: 5,
    difficulty: "hard",
    pace: { es: "Moderado-exigente", en: "Moderate-demanding" },
    priceCOP: null,
    name: { es: "Guaviare — Inmersión 5 días", en: "Guaviare — 5-day Immersion" },
    hook: { es: "Serranía La Lindosa, túneles, fósiles, río Guayabero, murales rupestres.", en: "La Lindosa range, tunnels, fossils, Guayabero river, rock art murals." },
    description: {
      es: "Una mezcla rara entre Amazonas, Caño Cristales y desierto rocoso. Para viajeros que ya conocen Colombia y quieren algo nuevo.",
      en: "A rare mix between the Amazon, Caño Cristales and rocky desert. For travelers who already know Colombia and want something new.",
    },
    insights: { es: ["Murales rupestres de 10.000 años", "Serranía La Lindosa", "Río Guayabero", "Cerca de Chiribiquete"], en: ["10,000-year-old rock art", "La Lindosa range", "Guayabero river", "Near Chiribiquete"] },
    impact: { es: "Guías locales de San José del Guaviare.", en: "Local San José del Guaviare guides." },
    image: "https://i.pinimg.com/1200x/48/ac/f1/48acf1b5ff9d80e77e2993b2cb051a97.jpg",
  },
  {
    slug: "guaviare-4-dias",
    zone: "guaviare",
    themes: ["adventure", "ancestral"],
    duration: { es: "4 días / 3 noches", en: "4 days / 3 nights" },
    durationDays: 4,
    difficulty: "moderate",
    pace: { es: "Moderado", en: "Moderate" },
    priceCOP: null,
    name: { es: "Guaviare — 4 días balanceado", en: "Guaviare — Balanced 4-day" },
    hook: { es: "Lo esencial sin perder profundidad.", en: "The essentials without losing depth." },
    description: {
      es: "Versión balanceada de la inmersión en Guaviare: tiempo suficiente para los hits sin la exigencia del plan completo.",
      en: "Balanced version of the Guaviare immersion: enough time for the highlights without the full demand.",
    },
    insights: { es: ["Lindosa", "Murales rupestres", "Río Guayabero", "Comunidades locales"], en: ["Lindosa", "Rock art", "Guayabero river", "Local communities"] },
    impact: { es: "Guías locales de Guaviare.", en: "Local Guaviare guides." },
    image: "https://i.pinimg.com/1200x/48/ac/f1/48acf1b5ff9d80e77e2993b2cb051a97.jpg",
  },
  {
    slug: "guaviare-3-dias",
    zone: "guaviare",
    themes: ["adventure", "ancestral"],
    duration: { es: "3 días / 2 noches", en: "3 days / 2 nights" },
    durationDays: 3,
    difficulty: "hard",
    pace: { es: "Moderado-exigente", en: "Moderate-demanding" },
    priceCOP: null,
    name: { es: "Guaviare — Concentrado 3 días", en: "Guaviare — Concentrated 3-day" },
    hook: { es: "Agua, piedra y memoria ancestral. Sin relleno.", en: "Water, stone and ancestral memory. No filler." },
    description: {
      es: "La versión exprés del Guaviare para viajeros que tienen poco tiempo pero buscan intensidad.",
      en: "The express Guaviare version for travelers with limited time but high intensity demands.",
    },
    insights: { es: ["Murales rupestres", "Río Guayabero", "Lindosa concentrada", "Sin relleno"], en: ["Rock art", "Guayabero river", "Concentrated Lindosa", "No filler"] },
    impact: { es: "Guías locales de Guaviare.", en: "Local Guaviare guides." },
    image: "https://i.pinimg.com/1200x/48/ac/f1/48acf1b5ff9d80e77e2993b2cb051a97.jpg",
  },
];

export const getExperienceBySlug = (slug: string) => EXPERIENCES.find(e => e.slug === slug);
export const getExperiencesByZone = (zone: ZoneId) => EXPERIENCES.filter(e => e.zone === zone);
export const getExperiencesByTheme = (theme: ThemeId) => EXPERIENCES.filter(e => e.themes.includes(theme));
