/** Page copy for /about/*. Core client copy lives in content/site.ts (about, vision, mission) and content/team.ts. */

export const aboutPages = {
  index: {
    meta: {
      title: "About Hebbevu Genetics | Cattle IVF & Indigenous Genetics India",
      description:
        "Learn about Hebbevu Genetics, a leading cattle IVF and genetics company in India focused on improving indigenous breeds through advanced reproductive technology.",
    },
    overviewHeading: "Company Overview",
    visionHeading: "Our Vision",
    missionHeading: "Our Mission",
    impactHeading: "Our Impact in Cattle Genetics",
    whyHeading: "Why Choose Hebbevu Genetics",
    moreHeading: "More about us",
    more: [
      { href: "/about/story", title: "Our story", summary: "The founders’ brief and the vision behind it.", icon: "heart" },
      { href: "/about/team", title: "Our team", summary: "The named embryologists, vets and managers who do the work.", icon: "users" },
      { href: "/about/partners", title: "Partners", summary: "Brazilian expertise, and where our genetics are going.", icon: "globe" },
      { href: "/about/farm", title: "Reynadu Farm", summary: "The herd, the fodder land and the lab, on one site.", icon: "leaf" },
    ],
    cta: {
      heading: "Contact our team to get started",
      body: "Tell us about your herd and your goals. We’ll tell you honestly whether IVF is worth it for you.",
    },
  },
  story: {
    meta: {
      title: "Our Story — Founders Brief",
      description:
        "The founders’ vision behind Hebbevu Genetics: “Har ghar mein acchi gai” — high-quality cattle as a standard for every home, not a privilege for a few.",
    },
    heading: "From vision to reality",
    articleSlug: "story-behind-hebbevu-genetics",
    articleHeading: "Read the full story",
    cta: {
      heading: "Be part of the future of dairy farming",
      body: "Explore our IVF services, or talk to our team about your herd.",
    },
  },
  team: {
    meta: {
      title: "Our Team | Hebbevu Genetics Leadership & IVF Experts",
      description:
        "Meet the team behind Hebbevu Genetics, including founders, embryologists, and veterinary experts driving cattle IVF and genetics innovation in India.",
    },
    heading: "The Team Driving India’s Cattle Genetics Revolution",
    teamHeading: "Our Expert Team",
    groups: [
      { id: "leadership", heading: "Leadership" },
      { id: "lab", heading: "Embryology lab" },
      { id: "veterinary", heading: "Veterinary team" },
      { id: "data", heading: "Data & dairy management" },
    ],
    milestonesHeading: "Our Milestones",
    cta: {
      heading: "Contact our team to learn more",
      body: "Speak directly with the people who will run your programme.",
    },
  },
  partners: {
    meta: {
      title: "Partners — Brazilian Expertise and International Links",
      description:
        "How Hebbevu Genetics integrates Brazilian reproductive expertise to strengthen Indian cattle genetics, and the Gir link between India and Brazil.",
    },
    heading: "Global collaboration, Indian genetics",
    lede: "Integrating Brazilian expertise to strengthen Indian cattle genetics.",
    brazilHeading: "Why Brazil",
    brazil: [
      "Gir cattle exported from India generations ago became the foundation of Brazil’s dairy Zebu industry — now the largest bovine IVF market in the world.",
      "The reproductive expertise Brazil built on Indian Gir is the expertise we are bringing back to Indian farms: protocols and conception rates that stand up to scrutiny, applied to indigenous bloodlines.",
    ],
    linksHeading: "International links",
    countries: ["Brazil", "Mexico", "UAE"],
    linksNote:
      "We work with links into Brazil, Mexico and the UAE. Whether each is a source of expertise, a destination for our genetics, or both is being confirmed — this page will say exactly which once it is.",
    partnersHeading: "Named partners",
    partnersNote: "Partner organisations will be listed here once confirmed for publication.",
    cta: {
      heading: "World-class science, applied locally",
      body: "Talk to our team about bringing these protocols to your herd.",
    },
  },
  farm: {
    meta: {
      title: "Reynadu Farm — Our Herd, Fodder Land and Lab",
      description:
        "Reynadu Farm in Sri Sathya Sai district, Andhra Pradesh: 1700+ indigenous cattle, 400+ acres of fodder land and Hebbevu Genetics’ IVF lab on one site.",
    },
    heading: "Reynadu Farm",
    lede: "Our herd, our fodder land and our lab share one site in Sri Sathya Sai district, Andhra Pradesh. The laboratory sits on the same land as the animals it works with.",
    housingHeading: "Ethical & hygienic housing",
    housing:
      "World-class infrastructure designed for optimal animal health and performance. Every animal is cared for by a named veterinary team that manages treatment, medication schedules, feed and milking records.",
    visitHeading: "Where we are",
    cta: {
      heading: "Visit Reynadu Farm",
      body: "Book a consultation to see the herd, the housing and the lab for yourself.",
    },
  },
} as const;
