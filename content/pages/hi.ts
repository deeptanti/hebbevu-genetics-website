/**
 * Hindi layer (brief §5) - scoped to Home, Services, Breeds, Book (+ three articles later).
 * NO translations have been supplied. Nothing here is machine-translated.
 */
export const hiPending = "[ TO BE SUPPLIED ] Hindi translation pending";

export const hiPages = {
  home: { path: "/hi", title: "Hebbevu Genetics: हिंदी", english: { label: "Read the English home page", href: "/" } },
  services: { path: "/hi/services", title: "Services: हिंदी", english: { label: "Read Services in English", href: "/services" } },
  breeds: { path: "/hi/breeds", title: "Breeds: हिंदी", english: { label: "Read Breeds in English", href: "/breeds" } },
  book: { path: "/hi/book", title: "Book a consultation: हिंदी", english: { label: "Book in English", href: "/book" } },
} as const;

export const hiCopy = {
  explainer:
    "This page will be available in Hindi. The translation has not been supplied yet, and we will not publish a machine translation in its place.",
  scope: "Hindi will cover Home, Services, Breeds, Book a Consultation and three key articles.",
  contactHeading: "Call or WhatsApp us",
  callLine: "You can also call or WhatsApp us. Our team will help you in your language.",
  cta: {
    heading: "Talk to our team",
    primary: { label: "Book a Consultation", href: "/book" },
    secondary: { label: "Contact us", href: "/contact" },
  },
};
