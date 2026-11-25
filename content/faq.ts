import type { FaqItem } from "./types";
import { contact } from "./site";
import { stats } from "./stats";

/**
 * FAQs, grouped by the question a farmer is really asking.
 * The six client questions (brief §11) open with the client's own words; the rest is drawn only
 * from facts already published on the site (services, lab, stats, glossary, articles).
 * Never add figures here that are not in content/stats.ts or content/services.ts.
 */

export interface FaqGroup {
  id: string;
  heading: string;
  intro: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "basics",
    heading: "Cattle IVF, explained",
    intro: "What IVF and embryo transfer are, and how they differ from the breeding you already know.",
    items: [
      {
        id: "what-is-ivf",
        question: "What is cattle IVF?",
        answer:
          "Cattle IVF (in vitro fertilisation) means collecting eggs from a genetically valuable donor cow, fertilising them with semen from a chosen bull in the laboratory, and growing the embryos for seven days. The best embryos are then transferred into recipient cows, who carry the calves to term. It lets one elite cow produce many more calves than natural breeding allows.",
        link: { label: "How IVF works, step by step", href: "/the-lab/how-ivf-works" },
      },
      {
        id: "ivf-vs-natural",
        question: "How is IVF different from natural breeding or artificial insemination?",
        answer:
          "Natural breeding and AI give about one calf per cow per year, and the cow carries her own calf. With IVF, a single high-value donor can contribute several embryos in one cycle, and recipient cows carry them, so your best animal can shape far more of your herd’s future. Many farmers use both: IVF for their elite animals and natural breeding for the rest of the herd.",
        link: { label: "Natural breeding vs IVF", href: "/knowledge/natural-breeding-vs-ivf" },
      },
      {
        id: "safety",
        question: "Are IVF & ET safe for cattle?",
        answer:
          "Absolutely. All procedures follow scientific protocols, animal welfare standards, and ethical breeding practices. Egg collection (OPU) is non-invasive and can be repeated, the donor cow is not harmed, and all work follows strict aseptic standards. IVF has been used in cattle around the world for years.",
        link: { label: "IVF myths vs reality", href: "/knowledge/ivf-myths-vs-reality" },
      },
      {
        id: "opu",
        question: "What is OPU, and does it hurt the donor cow?",
        answer:
          "OPU (ovum pick-up) is how eggs are collected from a live donor cow, using an ultrasound-guided needle. It is non-invasive, the cow is not harmed, and the session can be repeated, which is why a good donor can keep contributing embryos over time.",
        link: { label: "Plain-language glossary", href: "/knowledge/glossary" },
      },
      {
        id: "timeline",
        question: "How long does the IVF process take?",
        answer:
          "The lab part takes seven days: eggs are collected on day 0, fertilised on day 1, show their first divisions on day 2, and are ready on day 7. Each embryo is then transferred fresh or frozen for later. After transfer, the pregnancy is checked at 35 days and again at 60 days.",
        link: { label: "Seven days in the lab", href: "/the-lab/how-ivf-works" },
      },
      {
        id: "fresh-frozen",
        question: "What is the difference between fresh and frozen embryos?",
        answer:
          "A fresh embryo is transferred into a recipient cow on day 7, straight from the lab. A frozen embryo is vitrified (frozen very fast), stored in liquid nitrogen, and transferred later, when a recipient cow is ready. Fresh or frozen is one of the things that changes the price.",
        link: { label: "How pricing works", href: "/services/pricing" },
      },
      {
        id: "indigenous",
        question: "Does IVF work for indigenous breeds like Gir and Sahiwal?",
        answer:
          "Yes, and indigenous breeds arguably benefit most. IVF multiplies scarce elite animals of breeds such as Gir, Sahiwal, Kankrej and Ongole far faster than natural breeding, which helps both to improve and to preserve them. Our own herd is over 1700 indigenous cattle.",
        link: { label: "Compare the breeds", href: "/breeds" },
      },
    ],
  },
  {
    id: "services",
    heading: "Services and embryos",
    intro: "The two ways to work with us, and what you can buy.",
    items: [
      {
        id: "services",
        question: "What services does Hebbevu Genetics offer?",
        answer:
          "We provide IVF embryo production, embryo transfer, donor programs, surrogate management, and genetics support. In practice there are two paths: IVF with your own donor cows, or buying elite embryos produced from our own herd. Either way, we can transfer the embryos and confirm the pregnancy.",
        link: { label: "See all services", href: "/services" },
      },
      {
        id: "own-cows",
        question: "Can farmers use their own cows for IVF?",
        answer:
          "Yes. Farmers can use their own donor cows or choose embryos from Hebbevu’s elite genetics program. With your own donors, the programme covers donor assessment, synchronisation, egg collection (OPU), lab fertilisation and culture, embryo grading, embryo transfer and pregnancy confirmation. The genetics stay yours.",
        link: { label: "IVF with your own donors", href: "/services/ivf-your-donors" },
      },
      {
        id: "buy-embryos",
        question: "Can I buy cattle embryos from Hebbevu Genetics?",
        answer:
          "Yes. We sell embryos produced from donors in our own indigenous herd at Reynadu Farm, paired with proven sires and graded in our lab before they leave. You can choose sex-sorted or normal embryos, and the minimum order is 10 embryos.",
        link: { label: "Buy elite embryos", href: "/services/buy-embryos" },
      },
      {
        id: "sex-sorted",
        question: "What are sex-sorted embryos?",
        answer:
          "Sex-sorted embryos are produced with semen sorted so that, in most cases, the calf is of the chosen sex, usually female for dairy. They suit farmers who want more heifers and faster herd expansion. They are available as embryo production, embryo transfer, or transfer with confirmation.",
        link: { label: "Sex-sorted embryos", href: "/services/buy-embryos/sex-sorted" },
      },
      {
        id: "sex-sorted-vs-normal",
        question: "Should I choose sex-sorted or normal embryos?",
        answer:
          "Choose sex-sorted embryos if you want female calves and faster growth of your milking herd. Choose normal embryos, produced with selected bulls and proven breeding methods, for cost-effective, steady genetic improvement. Our team can help you decide based on your herd and budget.",
        link: { label: "Compare the two", href: "/services/buy-embryos" },
      },
      {
        id: "surrogates",
        question: "Do you provide surrogate cows for embryo transfer?",
        answer:
          "Yes. We provide both farmer-owned and Hebbevu-managed surrogate options. If you use your own recipient cows, we check their health and reproductive condition, synchronise them and transfer the embryos. If you use ours, Hebbevu provides and manages healthy recipient cows to carry the pregnancy.",
        link: { label: "Embryo transfer & surrogates", href: "/services/embryo-transfer" },
      },
      {
        id: "breed-choice",
        question: "Which breed is right for my farm?",
        answer:
          "It depends on your land and your market: how hot and dry it gets, whether you can hold feed quality through a bad season, and what buyers pay for. Our breed guide compares indigenous cattle, buffalo and global dairy breeds on milk yield, hardiness and care.",
        link: { label: "Choosing a breed", href: "/breeds" },
      },
    ],
  },
  {
    id: "cost-results",
    heading: "Cost and results",
    intro: "What goes into the price, and what you can honestly expect.",
    items: [
      {
        id: "cost",
        question: "How much does cattle IVF cost in India?",
        answer:
          "Every herd is different, so we share pricing on request rather than publishing one figure. Six things change your quote: sex-sorted or normal embryos, fresh or frozen, your recipient cows or ours, transfer with or without pregnancy confirmation, order size, and travel and logistics.",
        link: { label: "How pricing works", href: "/services/pricing" },
      },
      {
        id: "minimum-order",
        question: "Is there a minimum order, and who pays for travel?",
        answer:
          "The minimum order is 10 embryos. Travel and logistics are covered by the farmer, on top of the service price.",
        link: { label: "Important information before you order", href: "/services" },
      },
      {
        id: "conception-rate",
        question: "What is Hebbevu Genetics’ conception rate?",
        answer: `Our conception rate is ${stats.conception.value}, measured at the 60-day pregnancy check. Many labs quote the 35-day figure instead. Some pregnancies confirmed at day 35 are lost before day 60, so ours is the harder test and gives a lower number, but it is closer to the calves you will actually see.`,
        link: { label: "Results & methodology", href: "/the-lab/results" },
      },
      {
        id: "guarantee",
        question: "Does IVF guarantee a pregnancy?",
        answer:
          "No. Like any biological process, IVF improves probability, not certainty. It increases the chances of producing superior offspring and gives you better control over breeding outcomes, which is why we publish exactly how we measure our results.",
        link: { label: "Is IVF right for you?", href: "/services/is-ivf-right-for-you" },
      },
      {
        id: "results",
        question: "What kind of results can farmers expect?",
        answer: `IVF enables faster genetic improvement, healthier calves, and stronger herd performance. With each cycle, the herd moves closer to elite performance standards. More than ${stats.calves.value.replace("+", "")} IVF calves have been born through our programme so far.`,
        link: { label: "Results & methodology", href: "/the-lab/results" },
      },
      {
        id: "worth-it",
        question: "Is IVF worth it for a small farm?",
        answer:
          "It can be. IVF is not only for large farms: small and medium farmers can use it selectively on their best animals and upgrade the herd gradually. It costs more up front than natural breeding, and the return comes through faster genetic improvement and higher lifetime productivity, over years rather than months.",
        link: { label: "Is IVF right for you?", href: "/services/is-ivf-right-for-you" },
      },
    ],
  },
  {
    id: "working-with-us",
    heading: "Working with us",
    intro: "Where we are, visiting the farm, and how to get started.",
    items: [
      {
        id: "location",
        question: "Where is Hebbevu Genetics located?",
        answer:
          "At Reynadu Farm, Chinnamanthur, in Sri Sathya Sai district, Andhra Pradesh. It is South India’s first private cattle IVF lab, and the laboratory sits on the same land as our herd and 400+ acres of fodder land.",
        link: { label: "Contact details and map", href: "/contact" },
      },
      {
        id: "visit",
        question: "Can I visit the farm and the lab?",
        answer:
          "Yes. Book a consultation and ask to visit. You can see the herd, the donors and the lab where your embryos would be produced.",
        link: { label: "Book a visit", href: "/book" },
      },
      {
        id: "expertise",
        question: "Do I need technical knowledge to use IVF?",
        answer:
          "No. Experts handle the complexity. Our team runs every step, from donor assessment to pregnancy confirmation, and guides you through nutrition and health care during the pregnancy.",
        link: { label: "The Hebbevu Genetic Pipeline", href: "/the-lab/how-ivf-works" },
      },
      {
        id: "get-started",
        question: "How can I get started with Hebbevu Genetics?",
        answer: `You can contact our team to discuss your herd goals. Leave your name, mobile number and city on the booking form and we will call you back, or call or WhatsApp us on ${contact.phoneDisplay}.`,
        link: { label: "Book a consultation", href: "/book" },
      },
    ],
  },
];

/** Every FAQ, in page order. */
export const faqs: FaqItem[] = faqGroups.flatMap((g) => g.items);

/** The short list on the home page: the client's six questions (brief §11). */
const homeIds = ["safety", "services", "own-cows", "surrogates", "results", "get-started"];
export const homeFaqs: FaqItem[] = homeIds.map((id) => faqs.find((f) => f.id === id)!);
