/**
 * Page-level copy for /services/*, /book and /contact.
 * Product facts live in content/services.ts — this file only holds framing copy.
 */
export const servicesPage = {
  meta: {
    title: "Cattle IVF & Embryo Transfer Services in India | Hebbevu Genetics",
    description:
      "Hebbevu Genetics offers cattle IVF, embryo production, and embryo transfer services in India to help farmers improve herd quality and genetic performance.",
  },
  pathsHeader: {
    kicker: "Two ways to work with us",
    title: "Use your own cows, or buy better genetics",
    intro:
      "Everything we do starts from one question: do you already own the genetics you want to multiply? If yes, we multiply them. If not, you can buy embryos from our own herd.",
  },
  supportHeader: {
    kicker: "Either path",
    title: "Transfer, surrogates and confirmation",
    intro: "Whichever path you choose, the embryo still has to reach a healthy recipient cow and become a confirmed pregnancy.",
  },
  guidelinesHeader: { kicker: "Before you order", title: "Important Information" },
  differentiatorsHeader: { kicker: "What sets our services apart", title: "Why Choose Hebbevu Genetics" },
  helpHeader: {
    title: "Not sure where to start?",
    intro: "Two short pages answer the questions most farmers ask first.",
  },
  helpLinks: [
    { label: "Is IVF right for you?", href: "/services/is-ivf-right-for-you" },
    { label: "How pricing works", href: "/services/pricing" },
  ],
};

export const ivfYourDonorsPage = {
  meta: {
    title: "IVF With Your Own Donor Cows",
    description:
      "Multiply your best cows with OPU-IVF. Hebbevu Genetics collects oocytes from your donors, fertilises them in our lab and transfers the embryos — the genetics stay yours.",
  },
  includesHeader: {
    kicker: "What’s included",
    title: "From donor assessment to pregnancy confirmation",
    intro: "Every programme follows the same sequence, recorded at each step.",
  },
  fitHeader: {
    kicker: "Who this is for",
    title: "When IVF with your own donors makes sense",
  },
  fitPoints: [
    "You have a high-genetic-value cow",
    "You want to multiply elite bloodlines",
    "You aim to upgrade herd quality quickly",
    "You are planning long-term dairy growth",
  ],
  photo: "OPU session in progress at the crush, donor cow and aspirator",
};

export const buyEmbryosPage = {
  meta: {
    title: "Buy Elite Indigenous Cattle Embryos",
    description:
      "Buy sex-sorted or normal cattle embryos from Hebbevu Genetics’ own 1700-head indigenous herd and proven sires. Minimum order 10 embryos.",
  },
  productsHeader: {
    kicker: "Two embryo types",
    title: "Sex-sorted or normal",
    intro: "Both are produced in our lab from our own herd. The difference is what you want from the calf crop.",
  },
  compareHeader: { kicker: "Side by side", title: "Which options each embryo type comes with" },
  photo: "Donor cows from the Reynadu Farm indigenous herd",
};

export const sexSortedPage = {
  meta: {
    title: "Sex-Sorted Cattle Embryos",
    description:
      "Sex-sorted embryos from elite indigenous donor cattle — ideal for producing female calves and faster herd expansion. Embryo production, transfer, and transfer with confirmation.",
  },
  benefitsHeader: { kicker: "Why sex-sorted", title: "Built for herd growth" },
  optionsHeader: {
    kicker: "Available options",
    title: "How you can buy them",
    intro: "Choose the level of service that fits your farm.",
  },
  photo: "Female calf born from a sex-sorted embryo",
};

export const conventionalPage = {
  meta: {
    title: "Normal (Conventional) Cattle Embryos",
    description:
      "Normal embryos produced using selected bulls and proven breeding methods — a cost-effective route to reliable, consistent herd improvement.",
  },
  benefitsHeader: { kicker: "Why normal embryos", title: "Steady, cost-effective progress" },
  optionsHeader: {
    kicker: "Available options",
    title: "How you can buy them",
    intro: "Choose the level of service that fits your farm.",
  },
  photo: "Proven sire from the Hebbevu breeding programme",
};

export const embryoTransferPage = {
  meta: {
    title: "Embryo Transfer & Surrogate Management",
    description:
      "Embryo transfer into your own recipient cows or Hebbevu-managed surrogates, with pregnancy checks at 35 and 60 days.",
  },
  includesHeader: {
    kicker: "What we do",
    title: "From recipient check to confirmed pregnancy",
  },
  surrogatesHeader: {
    kicker: "Surrogates",
    title: "Your recipients, or ours",
    intro: "We provide both farmer-owned and Hebbevu-managed surrogate options.",
  },
  surrogateOptions: [
    {
      title: "Your own recipient cows",
      body: "We check their health and reproductive condition, synchronise them, and transfer the embryos.",
      icon: "users" as const,
    },
    {
      title: "Hebbevu-managed surrogates",
      body: "Hebbevu provides and manages healthy recipient cows to carry the pregnancy.",
      icon: "shield" as const,
    },
  ],
  checksHeader: {
    kicker: "Confirmation",
    title: "Two pregnancy checks, not one",
    intro:
      "Embryo transfer pregnancies are checked at 35 and 60 days. Our published conception rate is the 60-day figure — the harder test.",
  },
  photo: "Embryo transfer into a recipient cow",
};

export const qualifierPage = {
  meta: {
    title: "Is IVF Right for Your Farm?",
    description:
      "An honest guide to when cattle IVF is worth it, when natural breeding makes more sense, and how farmers combine the two.",
  },
  honestyHeader: { kicker: "Straight answers", title: "What IVF can and can’t do" },
  compareHeader: { kicker: "Decide for your farm", title: "IVF or natural breeding?" },
  breedHeader: {
    kicker: "Before you choose genetics",
    title: "Four questions about your land",
    intro: "The right breed matters as much as the right method.",
  },
};

export const pricingPage = {
  meta: {
    title: "How Cattle IVF & Embryo Pricing Works",
    description:
      "What goes into the price of cattle IVF and embryos at Hebbevu Genetics: sex-sorted vs normal, fresh vs frozen, recipients, confirmation, the 10-embryo minimum and logistics.",
  },
  factorsHeader: { kicker: "What moves the price", title: "Six things that change your quote" },
  matrixHeader: {
    kicker: "What you can buy",
    title: "Options by embryo type",
  },
  basicsHeader: { kicker: "The fixed terms", title: "Every order" },
  quoteHeader: {
    title: "Getting a quote",
    intro:
      "Pricing is shared on request. Tell us your district, how many embryos you want, which type, and whose recipient cows — and we’ll give you a figure.",
  },
};

export const bookPage = {
  meta: {
    title: "Book a Consultation",
    description:
      "Book a consultation with Hebbevu Genetics. Leave your name, mobile number and district and our cattle genetics team will call you back.",
  },
  kicker: "Book a consultation",
  title: "Talk to our cattle genetics team",
  lede: "Tell us four things and we’ll call you back. No email needed.",
  formHeading: "Request a call back",
  directHeading: "Prefer to talk now?",
  directBody: "Call or WhatsApp us directly.",
  nextHeader: { kicker: "What happens next", title: "After you send this" },
  nextSteps: [
    { step: 1, title: "We call you", body: "A member of our team calls you on the number you gave us." },
    { step: 2, title: "We talk about your herd", body: "Your herd goals, your animals, and which path fits — your own donors or our embryos." },
    { step: 3, title: "You get a plan and a price", body: "Pricing is shared on request, once we know what your farm needs." },
  ],
};

export const contactPage = {
  meta: {
    title: "Contact Hebbevu Genetics",
    description:
      "Contact Hebbevu Genetics at Reynadu Farm, Sri Sathya Sai, Andhra Pradesh. Call +91 80505 39391 or email info@hebbevugenetics.com.",
  },
  title: "Contact Hebbevu Genetics",
  lede: "Call, WhatsApp, email or visit us at Reynadu Farm — the lab is on the same land as the herd.",
  detailsHeader: { kicker: "Reach us", title: "Contact details" },
  visitHeader: {
    kicker: "Visit",
    title: "Reynadu Farm, Sri Sathya Sai",
    intro: "The lab sits on the same land as the herd.",
  },
  photo: "Reynadu Farm entrance and lab building",
};

/** CTA bands for the conversion pages (one per page). */
export const bookCta = {
  heading: "Still weighing it up?",
  body: "Read the questions other farmers ask first, or check whether IVF fits your farm.",
  primary: { label: "Read the FAQs", href: "/knowledge/faqs" },
  secondary: { label: "Is IVF right for you?", href: "/services/is-ivf-right-for-you" },
};

export const contactCta = {
  heading: "Ready to talk about your herd?",
  body: "Leave your name, number and district, and our team will call you back.",
  primary: { label: "Book a Consultation", href: "/book" },
  secondary: { label: "Explore our services", href: "/services" },
};
