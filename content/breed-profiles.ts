/**
 * Researched breed profiles — the depth behind each breed page.
 *
 * Sources: primarily ICAR-NBAGR's breed registry (AGRI-IS) and NDDB's Dairy Knowledge Portal,
 * plus peer-reviewed papers listed per breed. "NBAGR average" figures are national breed
 * averages per lactation; they include animals kept in very different conditions and are
 * not the same measure as the client's typical daily yield under good management.
 * Researched November 2026. Re-check population figures against DAHD's breed report before launch.
 */

export interface Source {
  label: string;
  url: string;
}

export interface BreedProfile {
  slug: string;
  species: string;
  /** True for the one breed that is not cattle. */
  isBuffalo?: boolean;
  intro: string;
  homeland: { tract: string; nameOrigin: string; localNames?: string[] };
  looks: { label: string; text: string }[];
  /** Body size, NBAGR averages. */
  size: { cow?: string; bull?: string; cowHeight?: string; bullHeight?: string };
  dairy: {
    lactation: string;
    lactationRange?: string;
    fat: string;
    firstCalving?: string;
    calvingInterval?: string;
    note?: string;
  };
  uses: string[];
  adaptation: string[];
  world?: { heading: string; paragraphs: string[]; countries?: string[] };
  population?: string;
  farmerNotes: { title: string; body: string }[];
  sources: Source[];
}

const NBAGR: Source = { label: "ICAR-NBAGR breed registry (AGRI-IS)", url: "http://14.139.252.116/agris/breed.aspx" };
const A1A2: Source = {
  label: "Sodhi et al. 2012, Indian Journal of Animal Sciences — A1/A2 β-casein in Indian cattle",
  url: "https://epubs.icar.org.in/index.php/IJAnS/article/download/15263/7649/32579",
};
const PAB: Source = {
  label: "Mukhopadhyay et al. 2025, Pesquisa Agropecuária Brasileira — Indian zebu in Brazil",
  url: "https://www.scielo.br/j/pab/a/rQLytGyzBymxjH4n4z5KCpk/?lang=en",
};

export const breedProfiles: BreedProfile[] = [
  {
    slug: "gir",
    species: "Cattle · Bos indicus (zebu)",
    intro:
      "Gir is one of India’s best-known dairy breeds and the foundation of Brazil’s tropical dairy industry. It is hardy, heat-tolerant and gives rich milk — and it responds strongly to selection, which is exactly what IVF multiplies.",
    homeland: {
      tract: "Amreli, Bhavnagar, Junagadh and Rajkot districts in the Saurashtra region of Gujarat, in and around the Gir forest.",
      nameOrigin: "Named after the Gir forest.",
      localNames: ["Bhodali", "Desan", "Gujarati", "Kathiawari", "Sorthi", "Surati"],
    },
    looks: [
      { label: "Coat", text: "Mostly pure red, sometimes speckled red." },
      { label: "Horns", text: "Curve sideways, down and back, then up and forward in a spiral — a distinctive half-moon shape." },
      { label: "Ears", text: "Long and pendulous, folded like a leaf." },
    ],
    size: { cow: "310 kg", bull: "544 kg", cowHeight: "131 cm", bullHeight: "160 cm" },
    dairy: {
      lactation: "2,110 kg",
      lactationRange: "800–3,300 kg",
      fat: "4.6%",
      firstCalving: "46 months",
      calvingInterval: "13.4 months",
      note: "Breeding-tract studies record lactations of about 2,030–2,060 litres over 320–326 days.",
    },
    uses: ["Milk", "Draught — Gir bullocks pull heavy loads on sandy, black or rocky soils"],
    adaptation: [
      "Hardy: survives and produces in difficult environments",
      "Tolerant of heat and stress",
      "Resistant to many tropical diseases",
    ],
    world: {
      heading: "From Saurashtra to Brazil",
      paragraphs: [
        "Gir has been exported to Brazil, the USA, Venezuela and Mexico. In Brazil it has been formally recorded since 1938, with more than 600,000 purebreds registered — and Brazil now holds more Gir cows than India.",
        "Decades of sire selection lifted the average Brazilian Gir cow to about 4,500 kg per 305-day lactation. Crossed with Holstein, Gir created the Girolando (5/8 Holstein, 3/8 Gir), which supplies about 80% of Brazil’s milk. Brazil is now the largest bovine IVF market in the world — built on Indian genetics.",
      ],
      countries: ["Brazil", "USA", "Venezuela", "Mexico"],
    },
    population: "About 13.8 lakh Gir in India’s 2013 breed survey.",
    farmerNotes: [
      { title: "Plan for a long rearing period", body: "Gir heifers calve for the first time at around 46 months on average, so budget for nearly four years before the first lactation." },
      { title: "Genetics matter more than the label", body: "The same breed averages about 2,100 kg per lactation in India and about 4,500 kg in Brazil. The difference is decades of selecting the right donors and sires." },
      { title: "Rich milk", body: "An average fat content of 4.6% makes Gir a strong fit where milk is priced on fat." },
    ],
    sources: [
      NBAGR,
      { label: "NDDB Dairy Knowledge Portal — Gir", url: "https://www.dairyknowledge.in/dkp/article/gir" },
      {
        label: "Gir cattle breed of India: characteristics and present status — Animal Genetic Resources (Cambridge)",
        url: "https://www.cambridge.org/core/journals/animal-genetic-resources-resources-genetiques-animales-recursos-geneticos-animales/article/gir-cattle-breed-of-india-characteristics-and-present-status/A689843E8FCF994B31C3AF552CA0F356",
      },
      PAB,
      {
        label: "Embrapa — Brazilian Dairy Gir programme",
        url: "https://www.alice.cnptia.embrapa.br/alice/bitstream/doc/1150078/1/Providing-genetics-for-the-dairy-industry-in-the-tropics-the-Brazilian-Daury-Gir.pdf",
      },
      A1A2,
    ],
  },
  {
    slug: "sahiwal",
    species: "Cattle · Bos indicus (zebu)",
    intro:
      "Sahiwal has the highest average yield of the indigenous breeds on this site, and rich milk. It is heat-tolerant and tick-resistant — which is why dairy farmers across Africa and Australia imported it.",
    homeland: {
      tract: "Ferozpur and Amritsar in Punjab and Ganganagar in Rajasthan; the purest herds are found around Fazilka and Abohar.",
      nameOrigin: "Named after the Sahiwal area of Montgomery district, now in Punjab, Pakistan.",
      localNames: ["Lambi Bar", "Lola", "Montgomery", "Multani", "Teli"],
    },
    looks: [
      { label: "Coat", text: "Brownish red, from mahogany to greyish red; bulls are darker at the extremities, with occasional white patches." },
      { label: "Horns", text: "Short and stumpy." },
      { label: "Build", text: "Loose skin, a medium dewlap and a well-developed udder." },
    ],
    size: { cow: "327 kg", bull: "540 kg", cowHeight: "124 cm", bullHeight: "170 cm" },
    dairy: {
      lactation: "2,325 kg",
      lactationRange: "1,600–2,750 kg",
      fat: "4.9%",
      firstCalving: "42 months",
      calvingInterval: "15.6 months",
      note: "On organised farms, individual Sahiwal cows have recorded up to 6,000 litres in a lactation.",
    },
    uses: ["Milk", "Abroad: dual-purpose milk and meat, and as dams for crossbreeding"],
    adaptation: [
      "Sweats about 2.6 times more than a Holstein — a key reason it copes with heat",
      "Reported resistance to ticks and tick-borne disease",
    ],
    world: {
      heading: "A breed that went global",
      paragraphs: [
        "Kenya imported Sahiwal bulls and cows between 1939 and 1963 and founded its National Sahiwal Stud at Naivasha in 1962. The breed also went to Jamaica, Guyana, Burundi, Somalia, Sierra Leone and Nigeria.",
        "In Australia, Sahiwal sires helped create the Australian Milking Zebu, bred for tick resistance in hot dairy country.",
      ],
      countries: ["Kenya", "Australia", "Jamaica", "Guyana", "Nigeria"],
    },
    population: "About 10.9 lakh Sahiwal in India’s 2013 breed survey.",
    farmerNotes: [
      { title: "The strongest indigenous milker", body: "At about 2,325 kg per lactation and 4.9% fat, Sahiwal leads the indigenous breeds on this page." },
      { title: "Watch fertility", body: "The average calving interval is about 15.6 months. Good heat detection and nutrition shorten it, and every month saved is milk earned." },
      { title: "Heat-tolerant, not heat-proof", body: "Studies show even Sahiwal yields fall once heat stress sets in. Shade and water still pay." },
    ],
    sources: [
      NBAGR,
      { label: "NDDB Dairy Knowledge Portal — Sahiwal", url: "https://www.dairyknowledge.in/dkp/article/sahiwal" },
      { label: "ILRI — Kenyan Sahiwal", url: "https://agtr.ilri.org/kenyan_sahiwal" },
      { label: "Wang et al. 2015 — sweating rates of zebu and Holstein cattle", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4647095" },
      { label: "NDRI study — heat stress and Sahiwal milk yield (Indian Journal of Dairy Science)", url: "https://epubs.icar.org.in/index.php/IJDS/article/view/80404" },
      { label: "FAO — the Australian Milking Zebu", url: "https://www.fao.org/DOCREP/004/X6500E/X6500E09.htm" },
      A1A2,
    ],
  },
  {
    slug: "ongole",
    species: "Cattle · Bos indicus (zebu)",
    intro:
      "Ongole is Andhra Pradesh’s own breed — a powerful, glossy-white animal prized for strength and hardiness. Its descendants, the Nelore, now form the backbone of Brazil’s beef herd, and a Nelore cow once set the world record as the most expensive cow ever sold.",
    homeland: {
      tract: "Prakasam (Ongole), Guntur, Nellore, Kurnool and East Godavari districts of Andhra Pradesh, along the coast from Nellore to Vizianagaram.",
      nameOrigin: "Named after the Ongole area. Also called Nellore, because Ongole taluk was once part of Nellore district.",
      localNames: ["Nellore"],
    },
    looks: [
      { label: "Coat", text: "Glossy white. Bulls carry dark grey markings on the head, neck and hump, with black points at the knees." },
      { label: "Horns", text: "Short and stumpy, growing outward and backward." },
      { label: "Build", text: "A large, fan-shaped dewlap, a black muzzle and a famously majestic gait." },
    ],
    size: { cow: "382 kg", bull: "434 kg", cowHeight: "144 cm", bullHeight: "148 cm" },
    dairy: {
      lactation: "798 kg",
      fat: "3.8%",
      firstCalving: "46 months",
      calvingInterval: "13.1 months",
      note: "Ongole is first a draught and dual-purpose breed; its national milk average is modest.",
    },
    uses: ["Draught", "Milk", "Abroad: beef (USA, Brazil, Australia) and draught (Sri Lanka, Fiji, Jamaica)"],
    adaptation: ["Exceptionally hardy", "Disease-resistant", "Thrives on scanty, dry fodder"],
    world: {
      heading: "Andhra’s gift to Brazil",
      paragraphs: [
        "Ongole cattle were shipped from India to Brazil between 1868 and 1963. There they became the Nelore — Brazil’s most important beef breed — and also contributed to the Tabapuã, Indubrasil and American Brahman breeds.",
        "In 2023 a Nelore cow, Viatina-19, was valued at about US$4.3 million when a one-third share sold at auction — a Guinness World Record at the time. The genetics behind that price started in Andhra Pradesh.",
      ],
      countries: ["Brazil", "USA", "Australia", "Sri Lanka", "Fiji", "Jamaica"],
    },
    population: "About 1.16 lakh Ongole in India’s 2013 breed survey.",
    farmerNotes: [
      { title: "Choose it for strength, not peak milk", body: "Ongole’s value is hardiness, draught power and genetic prestige. If milk volume is the goal, Gir or Sahiwal will out-produce it." },
      { title: "Built for dry fodder", body: "It does well on scanty, dry fodder where more demanding breeds struggle." },
      { title: "Andhra’s own breed", body: "Ongole is native to the same state as our farm, adapted to its coast and climate, and backed by its own breeders’ association." },
    ],
    sources: [
      NBAGR,
      { label: "NDDB Dairy Knowledge Portal — Ongole", url: "https://www.dairyknowledge.in/dkp/article/ongole" },
      { label: "Fernandes Júnior et al. 2020, Scientific Reports — Nelore genomics", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7287098" },
      PAB,
      {
        label: "Guinness World Records — most expensive cow (Viatina-19, 2023)",
        url: "https://www.guinnessworldrecords.com/news/2023/8/worlds-most-expensive-cow-sold-for-an-astronomical-price-in-brazil-756554",
      },
    ],
  },
  {
    slug: "kankrej",
    species: "Cattle · Bos indicus (zebu)",
    intro:
      "Kankrej is a big, silver-grey dual-purpose breed from the edge of the Rann of Kutch — strong enough to pull, productive enough to milk. In Brazil, where it is called Guzerá, breeders used embryo technology to speed up its genetic gain.",
    homeland: {
      tract: "Banaskantha, Mehsana, Sabarkantha, Kutch, Ahmedabad and Kheda in Gujarat, and Barmer and Jodhpur in Rajasthan — south-east of the Rann of Kutch.",
      nameOrigin: "Named after Kankrej taluka in Banaskantha district.",
      localNames: ["Wadad", "Vagadia", "Talabda", "Nagar", "Bonnai"],
    },
    looks: [
      { label: "Coat", text: "Silver-grey to iron-grey; bulls are darker on the fore- and hindquarters and the hump." },
      { label: "Horns", text: "Strong and lyre-shaped, with skin running further up the horn than in other breeds." },
      { label: "Gait", text: "A distinctive ‘sawai chal’ — an easy one-and-a-quarter pace." },
    ],
    size: { cow: "343 kg", bull: "525 kg", cowHeight: "125 cm", bullHeight: "158 cm" },
    dairy: {
      lactation: "1,738 kg",
      fat: "2.9–4.2%",
      firstCalving: "47 months",
      calvingInterval: "15.1 months",
      note: "Selected Kankrej cows in villages have produced about 4,900 kg in a lactation.",
    },
    uses: ["Milk", "Draught and road transport"],
    adaptation: ["Resistant to tick fever", "Tolerates heat stress well", "Very low rates of contagious abortion and TB"],
    world: {
      heading: "Proof that embryo technology works for zebu",
      paragraphs: [
        "Kankrej cattle taken to Brazil at the end of the 19th century became the Guzerá breed, which also helped form the American Brahman.",
        "From 1994, Brazilian breeders ran a Guzerá dairy programme using embryo transfer and later in-vitro embryo production. Genetic gain for milk was about 9.4 kg a year in the embryo-based nucleus — against about 1 kg a year without it. It is one of the clearest records of what reproductive technology can do for an indigenous breed.",
      ],
      countries: ["Brazil", "USA"],
    },
    population: "About 19.5 lakh Kankrej in India’s 2013 breed survey.",
    farmerNotes: [
      { title: "A true dual-purpose animal", body: "Kankrej gives moderate milk and real working strength. That suits mixed farms better than pure dairies." },
      { title: "Mind the calving interval", body: "First calving comes at around 47 months and the calving interval is about 15 months, so fertility management matters." },
      { title: "Room to improve", body: "The gap between the national average (about 1,740 kg) and selected cows (about 4,900 kg) is the opportunity good genetics can close." },
    ],
    sources: [
      NBAGR,
      { label: "NDDB Dairy Knowledge Portal — Kankrej", url: "https://www.dairyknowledge.in/dkp/article/kankrej" },
      { label: "Peixoto et al. 2022, Frontiers in Genetics — Guzerá dairy programme and MOET", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9557008" },
      PAB,
    ],
  },
  {
    slug: "rathi",
    species: "Cattle · Bos indicus (zebu)",
    intro:
      "Rathi is the milk cow of the Thar desert. It produces on wheat straw and desert grasses, through 50 °C summers and near-freezing winters, with little shelter — and the best cows give far more than the average.",
    homeland: {
      tract: "Bikaner, Ganganagar and Jaisalmer in Rajasthan, concentrated in Loonkaransar tehsil — the ‘Rathi tract’ of the Thar desert.",
      nameOrigin: "Named after the Raths, a pastoral community of the region. The breed is thought to blend Sahiwal, Red Sindhi, Tharparkar and Dhanni, mostly Sahiwal.",
    },
    looks: [
      { label: "Coat", text: "Brown with white patches; all-brown, or black with white patches, also occur. The lower body is lighter." },
      { label: "Horns", text: "Short to medium, curving outward, upward and inward." },
      { label: "Build", text: "A broad, slightly dished face, a fine dewlap and a long tail." },
    ],
    size: { cow: "295 kg", cowHeight: "115 cm" },
    dairy: {
      lactation: "1,560 kg",
      lactationRange: "1,062–2,810 kg",
      fat: "3.7–4.0%",
      firstCalving: "46 months",
      calvingInterval: "17.1 months",
      note: "Selected Rathi cows have produced about 4,800 kg in a lactation at the farmer’s door.",
    },
    uses: ["Milk — a major source of livelihood in its home region"],
    adaptation: [
      "Copes with about 50 °C summers, near-freezing winters and under 200 mm of rain",
      "Produces on wheat straw, pala leaves and sewan grass",
      "Thrives with little shelter",
    ],
    population: "About 8.7 lakh Rathi in India’s 2013 breed survey.",
    farmerNotes: [
      { title: "Made for dry country", body: "Where water and fodder are short, Rathi keeps producing when more demanding breeds would not." },
      { title: "Fertility is the bottleneck", body: "An average calving interval of about 17 months is the breed’s biggest economic drag. Reproductive management pays off quickly here." },
      { title: "A wide range", body: "Yields run from about 1,060 to 2,800 kg per lactation. That spread is exactly what careful selection — and IVF — can work with." },
    ],
    sources: [NBAGR, { label: "NDDB Dairy Knowledge Portal — Rathi", url: "https://www.dairyknowledge.in/dkp/article/rathi" }],
  },
  {
    slug: "jaffarabadi",
    species: "Water buffalo · Bubalus bubalis (river type)",
    isBuffalo: true,
    intro:
      "Jaffarabadi is a buffalo, not a cow — the heaviest buffalo breed in India, with massive ring-shaped horns and milk that averages about 7.7% fat. Its home is the same Saurashtra country as the Gir cattle.",
    homeland: {
      tract: "Amreli, Bhavnagar, Jamnagar, Junagadh, Porbandar and Rajkot in the Saurashtra region of Gujarat, around the Gir forest.",
      nameOrigin: "Named after the town of Jaffarabad. Traditionally kept by Maldhari herding communities — the Rabari, Bharwad, Aher and Mer.",
      localNames: ["Bhavnagri", "Gir", "Jaffari"],
    },
    looks: [
      { label: "Coat", text: "Black, sometimes with a white or grey tail switch." },
      { label: "Horns", text: "Long and heavy, drooping down and sideways, then curling up and inward into a ring — which makes the eyes look small." },
      { label: "Build", text: "The heaviest of all Indian buffalo breeds." },
    ],
    size: { cow: "620 kg", bull: "700 kg", cowHeight: "139 cm", bullHeight: "143 cm" },
    dairy: {
      lactation: "2,239 kg",
      lactationRange: "2,150–2,340 kg",
      fat: "7.7%",
      firstCalving: "45 months",
      calvingInterval: "14.6 months",
      note: "Fat averages about 7.7% and ranges from 6.8% to 8.5% — far richer than cow’s milk.",
    },
    uses: ["Milk", "Draught and transport"],
    adaptation: ["A heavy grazer, kept on natural pasture year-round in its home tract", "Strong enough for draught and transport work"],
    world: {
      heading: "Beyond India",
      paragraphs: [
        "Jaffarabadi is one of the four buffalo breeds raised in Brazil, where the last imports from India arrived in 1962.",
      ],
      countries: ["Brazil"],
    },
    population: "About 5.7 lakh Jaffarabadi in India’s 2013 breed survey.",
    farmerNotes: [
      { title: "It is a buffalo", body: "Housing, feeding, breeding and veterinary care differ from cattle. Plan for buffalo management, not cow management." },
      { title: "Best where fat pays", body: "With fat around 7.7%, Jaffarabadi milk earns most where it is priced on fat content." },
      { title: "A big animal to feed", body: "At 600–700 kg, feed and space needs are well above any cattle breed on this page." },
    ],
    sources: [
      NBAGR,
      { label: "NDDB Dairy Knowledge Portal — Jaffarabadi", url: "https://www.dairyknowledge.in/dkp/node/1236" },
      { label: "Bastianetto et al. 2020 — buffalo breeds in Brazil", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7995262" },
    ],
  },
  {
    slug: "holstein-friesian",
    species: "Cattle · Bos taurus (European dairy)",
    intro:
      "Holstein Friesian is the highest-yielding dairy breed in the world. In cool climates with excellent feed it gives over 10,000 kg a lactation. In Indian heat the picture is very different — and that gap is the whole story.",
    homeland: {
      tract: "The Netherlands, where the breed has been developing for some 2,000 years.",
      nameOrigin: "Named after Friesland in the Netherlands and the neighbouring region of Holstein.",
    },
    looks: [
      { label: "Coat", text: "Black-and-white or, less often, red-and-white patches." },
      { label: "Build", text: "Large, angular dairy frame with a big udder." },
    ],
    size: { cow: "about 680 kg", cowHeight: "about 147 cm" },
    dairy: {
      lactation: "9,600–12,700 kg",
      fat: "about 4.1%",
      note: "305-day averages for recorded Holsteins in the Netherlands, Canada and the USA. In India, exotic and crossbred cows averaged 8.55 kg of milk a day in 2022–23 — against 3.44 kg for indigenous and non-descript cows.",
    },
    uses: ["Milk", "Crossbreeding with indigenous breeds — for example the Girolando in Brazil"],
    adaptation: [
      "Sweats far less than zebu cattle and pants nearly twice as fast under heat",
      "Heat stress begins at a temperature-humidity index of about 68 — routinely exceeded in Indian summers",
      "Needs consistent, high-quality feed and close health management",
    ],
    world: {
      heading: "Crossing, not replacing",
      paragraphs: [
        "India has crossbred Holsteins with indigenous cattle since the early 1900s. Military farm data showed the best results at half to five-eighths Holstein.",
        "In Brazil, the Girolando — five-eighths Holstein, three-eighths Gir — combines Holstein yield with Gir heat tolerance and now supplies most of the country’s milk.",
      ],
      countries: ["Netherlands", "USA", "Canada", "Brazil"],
    },
    farmerNotes: [
      { title: "Cooling is not optional", body: "In one study, heat-stressed Holsteins gave about 16% less milk over a lactation than cooled cows. Budget for shade, fans or sprinklers." },
      { title: "Not reliably A2", body: "Testing of Holstein bulls in India found only about a third were A2A2. If your market pays for A2 milk, choose an indigenous breed." },
      { title: "Consider a cross", body: "Crosses of about half to five-eighths Holstein have historically balanced yield and hardiness better than pure Holsteins in Indian conditions." },
    ],
    sources: [
      { label: "University of Delaware — Holstein breed history", url: "https://sites.udel.edu/canr-animalscience/?p=507" },
      {
        label: "Agriculture and Agri-Food Canada — 305-day production by breed and country",
        url: "https://agriculture.canada.ca/sites/default/files/documents/2024-05/production_breed_select_countries_e.pdf",
      },
      {
        label: "Basic Animal Husbandry Statistics 2023 (via Vikaspedia)",
        url: "https://en.vikaspedia.in/agriculture/agri-directory/reports-and-policy-briefs/basic-animal-husbandry-statistics",
      },
      { label: "Safa et al. 2018, Journal of Animal Science — heat stress and lactation", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6313133/" },
      { label: "Wang et al. 2015 — sweating rates of zebu and Holstein cattle", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4647095" },
      { label: "FAO — crossbreeding in India", url: "https://www.fao.org/4/t0095e/T0095E05.htm" },
      A1A2,
    ],
  },
];

export const getBreedProfile = (slug: string) => breedProfiles.find((p) => p.slug === slug);
