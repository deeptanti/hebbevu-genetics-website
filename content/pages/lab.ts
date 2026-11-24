/** Page copy for /the-lab/*. Data (cycle, areas, chain) lives in content/lab.ts. */

export const labPages = {
  index: {
    meta: {
      title: "The Lab — South India’s First Private Cattle IVF Lab",
      description:
        "Inside Hebbevu Genetics’ cattle IVF lab at Reynadu Farm, Andhra Pradesh: how IVF works, the facility and our results.",
    },
    kicker: "The Lab",
    sections: [
      {
        href: "/the-lab/how-ivf-works",
        title: "How IVF works",
        summary: "From choosing a donor to a calf on the ground, and the seven days an embryo spends in the lab.",
        icon: "dna",
      },
      {
        href: "/the-lab/facility",
        title: "The facility",
        summary: "Collection, the embryology lab and embryo storage — all on the same land as the herd.",
        icon: "microscope",
      },
      {
        href: "/the-lab/results",
        title: "Results & methodology",
        summary: "Our conception rate, and why we measure it the harder way.",
        icon: "trending",
      },
    ],
    traceHeading: "Every embryo is traceable",
    cta: {
      heading: "See what IVF could do for your herd",
      body: "Talk to our team about your donors, your recipients and your goals.",
    },
  },
  howIvfWorks: {
    meta: {
      title: "How Cattle IVF Works — The Pipeline and the Lab Cycle",
      description:
        "The seven-step Hebbevu Genetic Pipeline and the seven days an embryo spends in the lab, explained in plain language.",
    },
    lede: "Building an elite dairy herd is not a matter of chance. Here is every step, from choosing a donor to a calf on the ground.",
    pipelineHeading: "The Hebbevu Genetic Pipeline",
    pipelineIntro:
      "A systematic breeding framework that turns genetic potential into real-world dairy performance, in seven stages.",
    cycleHeading: "Seven days in the lab",
    cycleIntro: "Step 3 of the pipeline happens here. Select a day to see what happens.",
    checksHeading: "When pregnancies are checked",
    checksIntro: "After transfer, every pregnancy is confirmed twice. We report the result at the later, harder check.",
    cta: {
      heading: "Experts handle the complexity",
      body: "You don’t need to manage any of this yourself. Our team guides you at every stage.",
    },
  },
  facility: {
    meta: {
      title: "The Facility — Inside Our Cattle IVF Lab",
      description:
        "Hebbevu Genetics’ cattle IVF lab at Reynadu Farm, Andhra Pradesh: egg collection, the embryology lab and embryo storage, on the same land as the herd.",
    },
    lede: "The laboratory sits on the same land as the herd at Reynadu Farm. From the donor cow to a stored embryo, everything happens in one place.",
    areasHeading: "What happens where",
    cta: {
      heading: "Visit the lab",
      body: "Book a consultation and see where your embryos would be produced.",
    },
  },
  results: {
    meta: {
      title: "Results & Methodology — Cattle IVF Conception Rates",
      description:
        "Hebbevu Genetics’ 35–40% conception rate, measured at the 60-day check — and why we measure it the harder way.",
    },
    lede: "Numbers only mean something if you know how they were measured. Here is ours, and how we measure it.",
    traceHeading: "Why our numbers are checkable",
    probability: {
      heading: "IVF improves probability, not certainty",
      body: "Like any biological process, IVF does not guarantee success every time. We publish how we measure so you can judge the odds for yourself.",
    },
    cta: {
      heading: "Ask us about the numbers",
      body: "Our team will walk you through how a programme for your herd would be measured and reported.",
    },
  },
} as const;
