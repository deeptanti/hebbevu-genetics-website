/** Enquiry form options (brief §14: short, phone-first - name, phone, city, service interest). */
export const serviceInterests = [
  { value: "ivf-own-donors", label: "IVF with my own donor cows" },
  { value: "sex-sorted-embryos", label: "Buy sex-sorted embryos" },
  { value: "normal-embryos", label: "Buy normal embryos" },
  { value: "embryo-transfer", label: "Embryo transfer / surrogates" },
  { value: "breed-advice", label: "Breed selection advice" },
  { value: "not-sure", label: "Not sure yet, I want to talk it through" },
] as const;

export type ServiceInterest = (typeof serviceInterests)[number]["value"];

export const enquiryCopy = {
  heading: "Book a consultation",
  lede: "Tell us four things and our team will call you back. No email needed.",
  submit: "Request a call back",
  success: "Thank you. Our team will call you on the number you gave us.",
  deliveryError: "Sorry, we could not send your enquiry just now. Please call us on +91 80505 39391 and we will help you straight away.",
  privacy: { text: "We use your details only to contact you about your enquiry. See our", link: "privacy policy", href: "/legal/privacy" },
};
