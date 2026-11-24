import { articles } from "./articles";
import type { Article, ArticleTopic, GlossaryTerm } from "./types";

/** Knowledge hub is organised by READER PROBLEM, not by date or content type (brief §12). */
export const topics: { id: ArticleTopic; question: string; summary: string }[] = [
  {
    id: "is-ivf-for-me",
    question: "Is IVF right for my farm?",
    summary: "What IVF changes, what it doesn’t, and how it compares with natural breeding.",
  },
  {
    id: "choosing-genetics",
    question: "Which genetics should I choose?",
    summary: "Breeds, bloodlines and what they mean for your herd.",
  },
  {
    id: "how-it-works",
    question: "What actually happens?",
    summary: "From selecting a donor to a milking cow, step by step.",
  },
  {
    id: "who-we-are",
    question: "Who is Hebbevu Genetics?",
    summary: "Where we came from and why we do this.",
  },
];

export const getArticle = (slug: string): Article | undefined => articles.find((a) => a.slug === slug);
export const articlesByTopic = (topic: ArticleTopic) => articles.filter((a) => a.topic === topic);

/** Reading time from body word count (≈200 wpm). */
export function readingMinutes(a: Article): number {
  const words = a.body
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : b.label))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Plain-language glossary (brief §12). DRAFT definitions written for the build -
 * have the lab team review before launch.
 */
export const glossary: GlossaryTerm[] = [
  { term: "OPU", expansion: "Ovum pick-up", definition: "Collecting eggs (oocytes) from a live donor cow’s ovaries using an ultrasound-guided needle. The cow is not harmed and the session can be repeated." },
  { term: "Oocyte", definition: "An egg cell collected from the donor cow. Only good-quality eggs go on to be fertilised." },
  { term: "IVF", expansion: "In vitro fertilisation", definition: "Fertilising eggs with semen in the laboratory instead of inside the cow, then growing the embryos for seven days." },
  { term: "Embryo", definition: "The fertilised egg after it has developed in the lab. After seven days it is either transferred or frozen." },
  { term: "ET", expansion: "Embryo transfer", definition: "Placing an embryo into a recipient cow, who carries the pregnancy to term." },
  { term: "Donor", definition: "The genetically valuable cow whose eggs are collected. Her genetics are what IVF multiplies." },
  { term: "Recipient (surrogate)", definition: "A healthy cow that carries an embryo from another cow. She can be your own animal or one managed by Hebbevu." },
  { term: "CL", expansion: "Corpus luteum", definition: "A temporary structure on the ovary after a cow ovulates. A vet checks it to judge whether a recipient cow is ready for transfer." },
  { term: "Synchronisation", definition: "Bringing a cow’s cycle to the right stage on the right day for egg collection or embryo transfer, under a vet’s supervision." },
  { term: "Sex-sorted", definition: "Embryos produced with semen sorted to give, in most cases, a calf of the chosen sex, usually female for dairy." },
  { term: "Vitrification", definition: "Ultra-fast freezing of embryos so they can be stored in liquid nitrogen and transferred later." },
  { term: "Cleavage", definition: "The first divisions of a fertilised egg, checked on day 2 as an early sign that fertilisation worked." },
  { term: "A2 milk", definition: "Milk containing only the A2 type of beta-casein protein, characteristic of indigenous Indian breeds such as Gir and Sahiwal." },
];
