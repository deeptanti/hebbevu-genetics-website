import type { FaqItem } from "./types";

/** Verbatim from the client content doc (Home FAQ). The content doc takes precedence over the brief's paraphrase. */
export const faqs: FaqItem[] = [
  {
    id: "safety",
    question: "Are IVF & ET safe for cattle?",
    answer:
      "Absolutely. All procedures follow scientific protocols, animal welfare standards, and ethical breeding practices.",
  },
  {
    id: "services",
    question: "What services does Hebbevu Genetics offer?",
    answer:
      "We provide IVF embryo production, embryo transfer, donor programs, surrogate management, and genetics support.",
    link: { label: "See all services", href: "/services" },
  },
  {
    id: "own-cows",
    question: "Can farmers use their own cows for IVF?",
    answer:
      "Yes. Farmers can use their own donor cows or choose embryos from Hebbevu’s elite genetics program.",
    link: { label: "Compare the two paths", href: "/services" },
  },
  {
    id: "surrogates",
    question: "Do you provide surrogate cows for embryo transfer?",
    answer: "Yes. We provide both farmer-owned and Hebbevu-managed surrogate options.",
    link: { label: "Embryo transfer & surrogates", href: "/services/embryo-transfer" },
  },
  {
    id: "results",
    question: "What kind of results can farmers expect?",
    answer: "IVF enables faster genetic improvement, healthier calves, and stronger herd performance.",
    link: { label: "Results & methodology", href: "/the-lab/results" },
  },
  {
    id: "get-started",
    question: "How can I get started with Hebbevu Genetics?",
    answer: "You can contact our team to discuss your herd goals.",
    link: { label: "Book a consultation", href: "/book" },
  },
];
