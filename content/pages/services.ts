import type { PhotoKey } from "../media";
/**
 * Page-level copy for /services/*, /book and /contact.
 * Product facts live in content/services.ts - this file only holds framing copy.
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
  heroPhoto: "banners/herd-close" as PhotoKey,
  supportPhoto: "farm/vet-checking" as PhotoKey,
  ctaPhoto: "farm/barn-row" as PhotoKey,
  helpLinks: [
    { label: "Is IVF right for you?", href: "/services/is-ivf-right-for-you" },
    { label: "How pricing works", href: "/services/pricing" },
  ],
};

export const ivfYourDonorsPage = {
  meta: {
    title: "IVF With Your Own Donor Cows",
    description:
      "Multiply your best cows with OPU-IVF. Hebbevu Genetics collects oocytes from your donors, fertilises them in our lab and transfers the embryos. The genetics stay yours.",
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
  heroPhoto: "farm/handler-with-calf" as PhotoKey,
  heroCaption: "Founder Mr. Amith Kishan with a calf at the farm",
  /** Body visual (not the hero). */
  photo: "lab/microscope" as PhotoKey,
  ctaPhoto: "people/handler-long-horns" as PhotoKey,
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
  heroPhoto: "farm/calves-at-barn" as PhotoKey,
  photo: "farm/herd-walking" as PhotoKey,
  ctaPhoto: "people/team-at-fence" as PhotoKey,
};

export const sexSortedPage = {
  meta: {
    title: "Sex-Sorted Cattle Embryos",
    description:
      "Sex-sorted embryos from elite indigenous donor cattle, ideal for producing female calves and faster herd expansion. Embryo production, transfer, and transfer with confirmation.",
  },
  benefitsHeader: { kicker: "Why sex-sorted", title: "Built for herd growth" },
  optionsHeader: {
    kicker: "Available options",
    title: "How you can buy them",
    intro: "Choose the level of service that fits your farm.",
  },
  heroPhoto: "farm/young-calves" as PhotoKey,
  photo: "farm/calves-resting" as PhotoKey,
  ctaPhoto: "farm/cow-and-calf" as PhotoKey,
};

export const conventionalPage = {
  meta: {
    title: "Normal (Conventional) Cattle Embryos",
    description:
      "Normal embryos produced using selected bulls and proven breeding methods: a cost-effective route to reliable, consistent herd improvement.",
  },
  benefitsHeader: { kicker: "Why normal embryos", title: "Steady, cost-effective progress" },
  optionsHeader: {
    kicker: "Available options",
    title: "How you can buy them",
    intro: "Choose the level of service that fits your farm.",
  },
  heroPhoto: "farm/gir-bull" as PhotoKey,
  photo: "farm/gir-bull-fence" as PhotoKey,
  ctaPhoto: "farm/herd-walking" as PhotoKey,
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
      "Embryo transfer pregnancies are checked at 35 and 60 days. Our published conception rate is the 60-day figure, the harder test.",
  },
  heroPhoto: "farm/vet-checking" as PhotoKey,
  photo: "farm/cow-and-calf" as PhotoKey,
  ctaPhoto: "farm/calves-at-barn" as PhotoKey,
};

export const qualifierPage = {
  meta: {
    title: "Is IVF Right for Your Farm?",
    description:
      "An honest guide to when cattle IVF is worth it, when natural breeding makes more sense, and how farmers combine the two.",
  },
  honestyHeader: { kicker: "Straight answers", title: "What IVF can and can’t do" },
  compareHeader: { kicker: "Decide for your farm", title: "IVF or natural breeding?" },
  heroPhoto: "farm/cow-and-calf" as PhotoKey,
  combinedPhoto: "people/handler-red-calf" as PhotoKey,
  ctaPhoto: "farm/young-calves" as PhotoKey,
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
  heroPhoto: "farm/handler-with-bulls" as PhotoKey,
  ctaPhoto: "farm/aerial" as PhotoKey,
  factorsHeader: {
    kicker: "What moves the price",
    title: "Six things that change your quote",
    intro: "We can’t publish rupee figures, but we can show you exactly what goes into the number.",
  },
  factorIcons: ["target", "snowflake", "users", "check", "package", "truck"] as const,
  matrixHeader: {
    kicker: "What you can buy",
    title: "Options by embryo type",
  },
  basicsHeader: { kicker: "The fixed terms", title: "Every order" },
  quoteHeader: {
    title: "Getting a quote",
    intro:
      "Pricing is shared on request. Tell us your district, how many embryos you want, which type, and whose recipient cows, and we’ll give you a figure.",
  },
};

export const bookPage = {
  meta: {
    title: "Book a Consultation",
    description:
      "Book a consultation with Hebbevu Genetics. Leave your name, mobile number and district and our cattle genetics team will call you back.",
  },
  kicker: "Book a consultation",
  heroPhoto: "people/two-at-fence" as PhotoKey,
  heroCaption: "Founder Mr. Amith Kishan (right) at the paddock fence",
  formIntro: "Four fields, no email needed. We’ll call you back on your mobile.",
  title: "Talk to our cattle genetics team",
  lede: "Tell us four things and we’ll call you back. No email needed.",
  formHeading: "Request a call back",
  directHeading: "Prefer to talk now?",
  directBody: "Call or WhatsApp us directly.",
  nextHeader: { kicker: "What happens next", title: "After you send this" },
  nextSteps: [
    { step: 1, title: "We call you", body: "A member of our team calls you on the number you gave us." },
    { step: 2, title: "We talk about your herd", body: "Your herd goals, your animals, and which path fits: your own donors or our embryos." },
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
  lede: "Call, WhatsApp, email or visit us at Reynadu Farm. The lab is on the same land as the herd.",
  detailsHeader: { kicker: "Reach us", title: "Contact details" },
  visitHeader: {
    kicker: "Visit",
    title: "Reynadu Farm, Sri Sathya Sai",
    intro: "The lab sits on the same land as the herd.",
  },
  heroPhoto: "banners/calves-barn" as PhotoKey,
  /** Body visual: where we are. */
  photo: "farm/aerial" as PhotoKey,
};

/** CTA bands for the conversion pages (one per page). */
export const bookCta = {
  photo: "farm/gir-bull" as PhotoKey,
  heading: "Still weighing it up?",
  body: "Read the questions other farmers ask first, or check whether IVF fits your farm.",
  primary: { label: "Read the FAQs", href: "/knowledge/faqs" },
  secondary: { label: "Is IVF right for you?", href: "/services/is-ivf-right-for-you" },
};

export const contactCta = {
  photo: "farm/barn-row" as PhotoKey,
  heading: "Ready to talk about your herd?",
  body: "Leave your name, number and district, and our team will call you back.",
  primary: { label: "Book a Consultation", href: "/book" },
  secondary: { label: "Explore our services", href: "/services" },
};

/** 404 page. */
export const notFoundPage = {
  heroPhoto: "farm/herd-walking" as PhotoKey,
  title: "We couldn’t find that page",
  lede: "It may have moved when we reorganised the site.",
  actions: [
    { label: "Go to the home page", href: "/" },
    { label: "Contact us", href: "/contact" },
  ],
};
