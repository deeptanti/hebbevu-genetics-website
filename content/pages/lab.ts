/** Page copy for /the-lab/*. Data (cycle, areas, chain) lives in content/lab.ts. */

export const labPages = {
  index: {
    meta: {
      title: "The Lab — South India’s First Private Cattle IVF Lab",
      description:
        "Inside Hebbevu Genetics’ cattle IVF lab at Reynadu Farm, Andhra Pradesh: how IVF works, the facility, our results and research.",
    },
    kicker: "The Lab",
    sections: [
      {
        href: "/the-lab/how-ivf-works",
        title: "How IVF works",
        summary: "The seven-step pipeline and the seven-day lab cycle, with what we record at each stage.",
        icon: "dna",
      },
      {
        href: "/the-lab/facility",
        title: "The facility",
        summary: "Four working areas, from the crush to cryopreservation, on the same land as the herd.",
        icon: "microscope",
      },
      {
        href: "/the-lab/results",
        title: "Results & methodology",
        summary: "Our conception rate, how it is measured, and the figures still to be published.",
        icon: "trending",
      },
      {
        href: "/the-lab/research",
        title: "Research",
        summary: "Work we do to understand our results better — not services for sale.",
        icon: "lab",
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
        "The seven-step Hebbevu Genetic Pipeline and the seven-day lab cycle: OPU, maturation, fertilisation, culture, grading and transfer.",
    },
    lede: "Building an elite dairy herd is not a matter of chance. Here is every step, from choosing a donor to a calf on the ground — and what the lab records along the way.",
    pipelineHeading: "The Hebbevu Genetic Pipeline",
    pipelineIntro:
      "A systematic breeding framework that turns genetic potential into real-world dairy performance, in seven stages.",
    cycleHeading: "Inside the lab: the seven-day IVF cycle",
    cycleIntro: "Steps 3 and 4 of the pipeline happen here. This is what is recorded at each stage of a run.",
    gradingHeading: "Grading rules",
    syncHeading: "Synchronisation & pregnancy checks",
    syncIntro:
      "Donors and recipients are brought to the right stage of their cycle on the right day using a synchronisation protocol.",
    pendingNote: "Not yet confirmed — not offered until it is.",
    cta: {
      heading: "Experts handle the complexity",
      body: "You don’t need to manage any of this yourself. Our team guides you at every stage.",
    },
  },
  facility: {
    meta: {
      title: "The Facility — Inside Our Cattle IVF Lab",
      description:
        "The four working areas of Hebbevu Genetics’ IVF lab at Reynadu Farm: collection, grading and maturation, fertilisation and culture, and cryopreservation.",
    },
    lede: "The laboratory sits on the same land as the herd at Reynadu Farm. Four working areas take an oocyte from the crush to a labelled straw.",
    areasHeading: "Four working areas",
    galleryHeading: "The lab at work",
    photos: [
      "The crush — a donor during an OPU session",
      "Oocyte search and grading under the microscope",
      "Incubators for maturation and culture",
      "Liquid-nitrogen tanks, canisters and canes",
    ],
    cta: {
      heading: "Visit the lab",
      body: "Book a consultation and see where your embryos would be produced.",
    },
  },
  results: {
    meta: {
      title: "Results & Methodology — Cattle IVF Conception Rates",
      description:
        "Hebbevu Genetics’ 35–40% conception rate, measured at the 60-day check, and how our lab figures are recorded and traced.",
    },
    lede: "Numbers only mean something if you know how they were measured. Here is ours, how we measure it, and what we have not published yet.",
    figuresHeading: "Lab figures",
    figuresIntro:
      "These figures will be published with the sample size behind each one. Until then, we show a placeholder rather than an estimate.",
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
  research: {
    meta: {
      title: "Research — Cloning, Pregnancy Loss and Donor × Sire Outcomes",
      description:
        "Hebbevu Genetics’ research programme: cloning, pregnancy loss between day 35 and day 60, and donor × sire outcomes in Indian conditions.",
    },
    lede: "Alongside the services we sell, we run research to understand our own results better. This work is real — but it is not for sale.",
    areasHeading: "Current research",
    whyHeading: "Why we do it",
    why: "The same traceability that makes our published numbers checkable lets us ask why a programme worked or didn’t. Research is how those answers feed back into the work we do for farmers.",
    cta: {
      heading: "Start with a conversation",
      body: "Our research informs every programme. Talk to our team about yours.",
    },
  },
} as const;
