/**
 * Privacy Policy, as approved by the client (src-docs/privacy Policy (1).pdf, received 2026-11-26).
 * Wording is the approved text. Only house-style fixes were applied: em dashes rewritten,
 * the bracketed retention periods shown as plain figures, and "Cookie Settings Link"
 * made a real link that opens the cookie consent panel.
 */
import type { LegalDoc } from "./legal";

export const privacyPage: LegalDoc = {
  title: "Privacy policy",
  metaDescription:
    "How Hebbevu Genetics collects, uses, shares and protects your personal data under the Digital Personal Data Protection Act, 2023, and the rights you have over it.",
  path: "/legal/privacy",
  lede: "What personal data we collect, why, who we share it with, how long we keep it, and the rights you have over it.",
  updated: "Effective 26 November 2026",
  sections: [
    {
      id: "who-we-are",
      n: "1",
      title: "Who we are",
      blocks: [
        {
          text: 'This website, hebbevugenetics.com, is operated by Hebbevu Genetics Farms Private Limited (CIN U72100AP2025PTC117516), referred to in this policy as "Hebbevu Genetics", "we", "us" or "our".',
        },
        {
          table: {
            caption: "Company details",
            rows: [
              ["Registered office", "Sy. No. 46/1C, Chinnamanthur, Roddam Mandal, Sri Sathya Sai District (Ananthapur), Andhra Pradesh 515124."],
              ["Operations", "46/1C Chinnamanthur, Roddam Mandal, Reynadu Farm, Cholemarri Chinnamanthur, Sri Sathya Sai, Andhra Pradesh 515124"],
              ["Email", "[info@hebbevugenetics.com](mailto:info@hebbevugenetics.com)"],
              ["Phone", "[+91 80505 39391](tel:+918050539391)"],
            ],
          },
        },
        {
          text: "Under the Digital Personal Data Protection Act, 2023, we act as a Data Fiduciary in respect of the personal data described below. You are the Data Principal.",
        },
      ],
    },
    {
      id: "scope",
      n: "2",
      title: "What this policy covers",
      blocks: [
        {
          text: "This policy explains what personal data we collect through this website and our related channels (our enquiry forms, WhatsApp, telephone and email), how we use it, who we share it with, how long we keep it, and what rights you have over it.",
        },
        {
          text: "It does not cover any third-party website we link to. It does not cover data you provide to other companies in the Hebbevu group, which operate under their own policies.",
        },
      ],
    },
    {
      id: "what-we-collect",
      n: "3",
      title: "What we collect",
      blocks: [
        { n: "3.1", lead: "Information you give us.", text: "When you submit an enquiry, request a quotation, or book a consultation or farm visit, we collect:" },
        {
          list: [
            "Your name",
            "Your mobile number",
            "Your email address, where you provide one",
            "Your district and state",
            "Your herd size, where you provide it",
            "The service you are interested in",
            "Any additional information about your herd you choose to include",
          ],
        },
        {
          text: "We ask for district and herd size because they change the advice we give and let us estimate travel. They are not used to screen you out.",
        },
        {
          n: "3.2",
          lead: "Information about your animals.",
          text: "If you engage us for a service, you may share records about your cattle, such as pedigree, milk yield, breeding and health history. This is commercial information about your livestock rather than personal data about you, but we treat it as confidential and handle it under the same safeguards set out in this policy. See the [Terms and Conditions](/legal/terms#records) for how this information is used in the course of a programme.",
        },
        {
          n: "3.3",
          lead: "Information collected automatically.",
          text: "When you visit this website we and our analytics providers may collect your IP address, approximate location derived from it, device and browser type, operating system, referring page, pages viewed, time spent, and similar technical information.",
        },
        {
          n: "3.4",
          lead: "WhatsApp.",
          text: "If you contact us via the WhatsApp link on this site, your message and mobile number are processed by WhatsApp (Meta Platforms, Inc.) under its own terms and privacy policy, in addition to being received by us. We keep a record of the conversation as described in [section 7](#retention). Please do not send sensitive personal or financial information over WhatsApp.",
        },
      ],
    },
    {
      id: "cookies",
      n: "4",
      title: "Cookies and tracking",
      blocks: [
        { text: "We use cookies and similar technologies for three purposes:" },
        {
          table: {
            caption: "Cookies we use",
            head: ["Type", "Purpose", "Consent"],
            rows: [
              ["Strictly necessary", "Making the site work: page delivery, security, form submission", "Not required"],
              ["Analytics", "Understanding how the site is used, via Google Analytics through Google Tag Manager", "Required"],
              ["Advertising", "Measuring and targeting campaigns, via the Meta Pixel", "Required"],
            ],
          },
        },
        {
          text: "Analytics and advertising cookies are set only after you consent through the cookie banner. You can withdraw consent at any time via [Cookie settings](#cookie-settings), or by clearing cookies in your browser.",
        },
      ],
    },
    {
      id: "purposes",
      n: "5",
      title: "Why we use your data, and on what basis",
      blocks: [
        {
          table: {
            caption: "Purposes and legal basis",
            head: ["What we do", "Why", "Basis under the DPDP Act"],
            rows: [
              ["Respond to your enquiry; call or message you back", "To answer the question you asked us", "Your consent"],
              ["Prepare and send a written quotation", "To provide the service you requested", "Consent / performance of engagement"],
              ["Schedule and conduct a consultation or farm visit", "To deliver the service", "Consent / performance"],
              ["Deliver a breeding programme and report its outcome", "To perform our contract with you", "Performance of engagement"],
              ["Maintain statutory records of embryo production and transfer", "Required by the Department of Animal Husbandry and Dairying", "Compliance with law"],
              ["Improve the website", "To make it more useful", "Your consent (analytics cookies)"],
              ["Send you information about our services", "Only where you have asked for it", "Your consent"],
            ],
          },
        },
        { lead: "We do not sell your personal data.", text: "We do not share it with third parties for their own marketing." },
      ],
    },
    {
      id: "sharing",
      n: "6",
      title: "Who we share it with",
      blocks: [
        {
          list: [
            { lead: "Our own staff:", text: "the veterinary, embryology and operations team, to the extent needed to respond to you or deliver a programme" },
            { lead: "Service providers:", text: "website hosting, email, analytics, and communications platforms, acting on our instructions" },
            { lead: "Meta Platforms, Inc.:", text: "where you contact us on WhatsApp, or where advertising cookies are enabled with your consent" },
            {
              lead: "Government authorities:",
              text: "where records of embryo production, transfer, or germplasm movement must be reported under applicable law, including to the Department of Animal Husbandry and Dairying and on the Bharat Pashudhan platform",
            },
            { lead: "Professional advisers:", text: "lawyers, auditors and insurers, where necessary" },
            { lead: "Where required by law,", text: "or to establish, exercise or defend a legal claim" },
          ],
        },
      ],
    },
    {
      id: "retention",
      n: "7",
      title: "How long we keep it",
      blocks: [
        {
          table: {
            caption: "Retention periods",
            head: ["Data", "Retention"],
            rows: [
              ["Enquiries that do not become engagements", "24 months from last contact"],
              ["Client and programme records", "Duration of the engagement plus 8 years"],
              ["Statutory breeding and traceability records", "As required by DAHD rules and applicable law"],
              ["WhatsApp and call records", "24 months"],
              ["Website analytics", "14 months"],
              ["Accounting records", "8 years, as required under the Companies Act, 2013"],
            ],
          },
        },
        { text: "When a purpose is served and no legal obligation requires us to keep the data, we erase it." },
      ],
    },
    {
      id: "your-rights",
      n: "8",
      title: "Your rights",
      blocks: [
        { text: "Under the DPDP Act you have the right to:" },
        {
          list: [
            { lead: "Access:", text: "obtain a summary of the personal data we hold about you and how it is processed" },
            { lead: "Correction and completion:", text: "have inaccurate or incomplete data corrected" },
            { lead: "Erasure:", text: "ask us to delete your personal data, unless we are required to keep it" },
            { lead: "Grievance redressal:", text: "complain to us, and receive a response within 90 days" },
            { lead: "Nominate:", text: "nominate another individual to exercise your rights in the event of your death or incapacity" },
            { lead: "Withdraw consent:", text: "at any time, as easily as you gave it" },
          ],
        },
        {
          text: "To exercise any of these, contact our [Grievance Officer](#grievance-officer) below. We may ask you to verify your identity. If you are not satisfied with our response, you may complain to the Data Protection Board of India.",
        },
      ],
    },
    {
      id: "grievance-officer",
      n: "9",
      title: "Grievance Officer",
      blocks: [
        {
          table: {
            caption: "Grievance Officer",
            rows: [
              ["Name", "Deeksha Mittal"],
              ["Designation", "Legal & Grievance Officer"],
              ["Email", "[deeksha@hebbevu.com](mailto:deeksha@hebbevu.com)"],
              ["Address", "As in [section 1](#who-we-are)"],
              ["Response time", "Within 90 days of receipt"],
            ],
          },
        },
      ],
    },
    {
      id: "security",
      n: "10",
      title: "Security",
      blocks: [
        {
          text: "We maintain reasonable security safeguards to protect personal data against unauthorised access, disclosure, alteration and loss, including access controls, encryption in transit, and restricting access to staff who need it.",
        },
        {
          text: "In the event of a personal data breach we will inform affected Data Principals and report to the Data Protection Board of India as required, within 72 hours for the detailed report, once that obligation takes effect.",
        },
        { text: "No method of transmission over the internet is completely secure, and we cannot guarantee absolute security." },
      ],
    },
    {
      id: "children",
      n: "11",
      title: "Children",
      blocks: [
        {
          text: "This website and our services are directed at adults engaged in dairy and cattle farming. We do not knowingly collect personal data from anyone under 18. If you believe a child has provided us with personal data, contact us and we will delete it.",
        },
      ],
    },
    {
      id: "transfers",
      n: "12",
      title: "Transfers outside India",
      blocks: [
        {
          text: "Our website hosting and analytics providers may process data on servers outside India. Where we work with international partners (including in Brazil, Mexico and the United Arab Emirates), limited information may be shared for the purposes of that collaboration.",
        },
        {
          text: "Any transfer of bovine germplasm itself is separately governed by the Guidelines for Export/Import of Bovine Germplasm issued by the Department of Animal Husbandry and Dairying, and by the Livestock Importation (Amended) Act, 2001. See our [Terms and Conditions](/legal/terms#germplasm).",
        },
        { text: "We do not transfer personal data to any country to which such transfer is restricted by the Central Government." },
      ],
    },
    {
      id: "changes",
      n: "13",
      title: "Changes to this policy",
      blocks: [
        {
          text: "We may update this policy. The current version is always the one on this page, with its effective date at the top. Where a change materially affects your rights we will take reasonable steps to tell you.",
        },
      ],
    },
  ],
  contact: {
    id: "contact",
    n: "14",
    title: "Contact",
    before: [{ text: "Questions about this policy, or about how we handle your data:" }],
  },
  cta: {
    heading: "Questions about how we use your data?",
    primary: { label: "Contact us", href: "/contact" },
  },
};
