/**
 * Terms and Conditions of Use, as supplied by the client's lawyer
 * (src-docs/Hebbevu Genetics - Terms and Conditions (Draft for Review).pdf, received 2026-11-26).
 * Wording is the lawyer's. Only house-style and obvious drafting fixes were applied:
 * em dashes rewritten, typos and duplicate numbering corrected, and the indemnity in 14.1
 * names the Company rather than another firm left over from a template.
 */

/** A clause: optional number, optional bold lead-in, then text. Or a bulleted list. */
export type LegalBlock = { n?: string; lead?: string; text: string } | { list: string[] };

export interface LegalSection {
  id: string;
  n?: string;
  title: string;
  blocks: LegalBlock[];
}

export const termsPage = {
  title: "Terms and conditions",
  metaDescription:
    "Terms and conditions for using the Hebbevu Genetics website and for our bovine IVF, embryo supply and related reproductive services.",
  company: "Hebbevu Genetics Farms Private Limited",
  lede: "The terms that govern your use of this website and how our services are engaged.",
  updated: "Last updated 26 November 2026",
  tocHeading: "Contents",
  sections: [
    {
      id: "about",
      title: "About these terms",
      blocks: [
        {
          text: 'These Terms and Conditions of Use ("Terms") constitute a legally binding agreement between Hebbevu Genetics Farms Private Limited, a company incorporated under the provisions of the Companies Act, 2013, having its registered office at 46/1C, Chinnamanthur, Roddam Mandal, Shri Sathya Sai District, Ananthapur, Roddam, Ananthapur, Andhra Pradesh, 515124, India (hereinafter referred to as the "Company", "Hebbevu Genetics", "we", "our" or "us"), and every natural or legal person who accesses, browses, visits, registers with, communicates through or otherwise uses this website (hereinafter referred to as the "User", "you" or "your").',
        },
        {
          text: 'These Terms govern your access to and use of this website, including all webpages, digital platforms, product catalogues, technical literature, downloadable documents, scientific publications, research content, enquiry forms, communication channels, software, applications, databases and all other information, content and services made available through this website (collectively referred to as the "Website").',
        },
        {
          text: "By accessing or using the Website, you acknowledge that you have carefully read, understood and agreed to be legally bound by these Terms, together with the Company's Privacy Policy and any other policies published on the Website from time to time. If you do not agree with these Terms, you must immediately discontinue your access to and use of the Website.",
        },
      ],
    },
    {
      id: "definitions",
      n: "1",
      title: "Definitions",
      blocks: [
        { n: "1.1", text: "Unless the context otherwise requires, the following expressions shall have the meanings assigned to them herein." },
        {
          n: "1.2",
          lead: '"Company"',
          text: "shall mean Hebbevu Genetics Farms Private Limited, including its successors, permitted assigns, affiliates, subsidiaries, directors, officers, employees, authorised representatives and agents.",
        },
        {
          n: "1.3",
          lead: '"Website"',
          text: "shall mean the official website operated by the Company, together with all associated webpages, microsites, portals, mobile applications, digital platforms, databases, software, downloadable materials, technical documents and all other online services owned, controlled or operated by the Company.",
        },
        {
          n: "1.4",
          lead: '"User"',
          text: "shall mean any individual, company, partnership, limited liability partnership, governmental authority, educational institution or any other legal entity accessing or using the Website for any purpose whatsoever.",
        },
        {
          n: "1.5",
          lead: '"Content"',
          text: "shall include all text, graphics, trademarks, logos, product descriptions, technical specifications, formulations, photographs, videos, illustrations, software, source code, databases, research publications, laboratory information, scientific data, brochures, catalogues, manuals, process descriptions, documents and all other information made available on the Website.",
        },
        {
          n: "1.6",
          lead: '"Intellectual Property Rights"',
          text: "shall include all present and future rights relating to patents, patent applications, copyrights, trademarks, service marks, trade names, industrial designs, domain names, trade dress, confidential information, know-how, proprietary technology, software, databases, trade secrets and all other proprietary rights recognised under applicable law.",
        },
      ],
    },
    {
      id: "information-not-offer",
      n: "2",
      title: "This website is information, not an offer",
      blocks: [
        {
          text: "Everything on this site, including service descriptions, breed information, laboratory protocols, performance figures and indicative timelines, is provided for general information.",
        },
        {
          lead: "Nothing on this website constitutes an offer capable of acceptance, a quotation, or a binding commitment to provide any service.",
          text: "A binding engagement arises only when we issue a written quotation and you accept it in writing.",
        },
        {
          text: "We take care to keep the information here accurate and current, but we do not warrant that it is complete, accurate or up to date at any given moment.",
        },
      ],
    },
    {
      id: "services",
      n: "3",
      title: "Our services and products",
      blocks: [
        { text: "We provide bovine reproductive services, principally:" },
        {
          n: "(a)",
          lead: "IVF using your own donor animals.",
          text: "Ovum pick-up (OPU) from donor cattle you own, in-vitro fertilisation and culture at our laboratory, embryo grading, and transfer into recipient animals.",
        },
        {
          n: "(b)",
          lead: "Supply of embryos produced from our own herd.",
          text: "Sex-sorted or conventional embryos produced from our donor animals and selected sires, supplied fresh or frozen, with transfer and pregnancy confirmation available as separate services.",
        },
        {
          n: "(c)",
          lead: "Related services:",
          text: "donor assessment, synchronisation protocols, recipient sourcing and management, pregnancy diagnosis, and breeding advice.",
        },
        { text: "The precise scope of any engagement is defined in your written service agreement." },
      ],
    },
    {
      id: "eligibility",
      n: "4",
      title: "Eligibility",
      blocks: [
        {
          n: "4.1",
          text: "By accessing or using the Website, you represent and warrant that you possess the legal capacity to enter into a binding agreement under the applicable laws governing your jurisdiction and that your use of the Website does not violate any applicable law, regulation or contractual obligation.",
        },
        {
          n: "4.2",
          text: 'If you are accessing the Website on behalf of any company, partnership, organisation or other legal entity, you represent and warrant that you are duly authorised to bind such entity to these Terms, and all references to "User" shall include such entity.',
        },
        {
          n: "4.3",
          text: "The Company reserves the right to refuse access to any User who is found to have violated these Terms or any applicable law, or whose use of the Website may adversely affect the Company's operations, reputation or legal interests.",
        },
      ],
    },
    {
      id: "pricing",
      n: "5",
      title: "Quotations, pricing and payment",
      blocks: [
        {
          n: "5.1",
          text: "Prices are quoted per programme. They depend on the number and response of donor animals, embryo type, whether embryos are fresh or frozen, whether you or we supply recipient animals, whether pregnancy confirmation is included, and the distance to your farm.",
        },
        { n: "5.2", lead: "Minimum order.", text: "Embryo supply is subject to a minimum order of ten (10) embryos." },
        {
          n: "5.3",
          text: "Quotations are valid for 60 days unless stated otherwise, and are subject to animal availability and laboratory scheduling at the time of acceptance.",
        },
        { n: "5.4", text: "Travel and logistics costs are payable by you, and will be estimated in the quotation." },
        {
          n: "5.5",
          text: "Payment terms, including any instalment structure linked to programme stages, are set out in the service agreement.",
        },
        { n: "5.6", text: "All amounts are exclusive of GST and other applicable taxes unless stated otherwise." },
      ],
    },
    {
      id: "no-guarantee",
      n: "6",
      title: "No guarantee of outcome",
      blocks: [
        {
          n: "6.1",
          text: "Assisted reproduction in cattle is a biological process. It improves the probability of a successful outcome. It does not guarantee one.",
        },
        { n: "6.2", text: "We do not warrant or guarantee:" },
        {
          list: [
            "that any donor animal will yield oocytes, or any particular number or grade of oocytes;",
            "that fertilisation, cleavage or blastocyst development will occur, or occur at any particular rate;",
            "that any embryo will result in a pregnancy;",
            "that any pregnancy will be carried to term;",
            "that any calf will be of a particular sex, achieve a particular milk yield, or exhibit any particular trait.",
          ],
        },
        {
          n: "6.3",
          lead: "Conception rates.",
          text: "Where we publish or quote a conception rate, it describes outcomes across our own historical programmes, measured at the 60-day pregnancy check. It is a historical average, not a prediction, and not a term of your contract. Your result will depend on your animals, your recipients, your husbandry and factors outside anyone's control.",
        },
        {
          n: "6.4",
          text: "Sex-sorted embryo technology improves the probability of a calf of the intended sex. It is not absolute.",
        },
        {
          n: "6.5",
          text: 'Where a service is contracted as "transfer with confirmation", the specific outcome we undertake to achieve, and what follows if it is not achieved, are stated in your service agreement. Where a service is contracted as transfer only, our obligation ends on completion of the transfer.',
        },
        {
          n: "6.6",
          text: "Nothing in this section limits any right you have as a consumer under the Consumer Protection Act, 2019, which cannot be excluded by contract.",
        },
      ],
    },
    {
      id: "your-responsibilities",
      n: "7",
      title: "Your responsibilities",
      blocks: [
        { text: "To allow us to perform a service, you agree to:" },
        {
          list: [
            "provide accurate and complete information about your animals, including identification, age, pedigree, breeding history, milk records, health status and vaccination history;",
            "make animals available at the times agreed, in the condition agreed, and provide safe working access, restraint facilities, water and power as reasonably required;",
            "ensure recipient animals you supply meet the body condition, health, age and post-calving criteria we specify;",
            "maintain appropriate nutrition, housing and herd health management throughout a programme and any resulting pregnancy;",
            "follow the veterinary and management instructions we give you, including synchronisation schedules and pregnancy check timing;",
            "hold all permits, registrations and consents required for keeping and moving your animals.",
          ],
        },
        {
          text: "Where an outcome is affected by incomplete or inaccurate information, by animals not meeting the agreed criteria, or by a failure to follow instructions, we are not responsible for that outcome.",
        },
      ],
    },
    {
      id: "biosecurity",
      n: "8",
      title: "Animal health, biosecurity and quarantine",
      blocks: [
        {
          n: "8.1",
          text: "Our facility operates to the health, testing and biosecurity standards set out in the Minimum Standards for Production and Transfer of Bovine Embryos issued by the Department of Animal Husbandry and Dairying, Government of India.",
        },
        {
          n: "8.2",
          text: "Animals entering our facility are subject to quarantine of not less than 60 days and to testing for the diseases prescribed under those standards, including tuberculosis, Johne's disease, brucellosis, bovine genital campylobacteriosis, trichomoniasis, IBR, BVD and FMD.",
        },
        {
          n: "8.3",
          text: "We may refuse to accept, or may remove, any animal that does not meet those standards, tests positive for a prescribed disease, or presents a biosecurity risk. Where an animal is refused or removed, charges already incurred remain payable; the consequences are set out in your service agreement.",
        },
        {
          n: "8.4",
          text: "You are responsible for the health status of animals you present to us, and for any cost of transport, quarantine or treatment relating to them.",
        },
        {
          n: "8.5",
          text: "All procedures are performed under the Prevention of Cruelty to Animals Act, 1960 and applicable veterinary regulation. We will not perform any procedure we consider contrary to animal welfare.",
        },
      ],
    },
    {
      id: "records",
      n: "9",
      title: "Records, traceability and confidentiality",
      blocks: [
        {
          n: "9.1",
          text: "We maintain records of ovum pick-up, embryo production, transfer, freezing, storage and sale, and report them as required on the Bharat Pashudhan platform and to the Department of Animal Husbandry and Dairying. Milk records may be registered on NDLM where applicable.",
        },
        {
          n: "9.2",
          text: "You acknowledge that these statutory reporting obligations exist and consent to your programme data being recorded and reported accordingly.",
        },
        {
          n: "9.3",
          text: "Information you give us about your herd is treated as confidential and used only to deliver your programme and meet our statutory obligations. We may use anonymised, aggregated outcome data to analyse and improve our protocols and to report performance generally. Such data will not identify you or your farm.",
        },
        { n: "9.4", text: "Embryos are graded using IETS stage and quality codes and labelled in accordance with the applicable standards." },
      ],
    },
    {
      id: "germplasm",
      n: "10",
      title: "Import and export of germplasm",
      blocks: [
        {
          n: "10.1",
          text: "Any movement of bovine germplasm into or out of India is governed by the Guidelines for Export/Import of Bovine Germplasm issued by the Department of Animal Husbandry and Dairying, and by the Livestock Importation (Amended) Act, 2001.",
        },
        {
          n: "10.2",
          text: "Export requires, among other things, a No Objection Certificate from the state government of origin and a health certificate from a veterinarian authorised by DAHD, and must comply with the applicable WOAH (OIE) Terrestrial Animal Health Code. Import is on the restricted list and requires a licence from the Directorate General of Foreign Trade issued on DAHD's recommendation.",
        },
        {
          n: "10.3",
          text: "You acknowledge that statutory restrictions apply to the export of indigenous genetics, including restrictions on the export of elite animals and of breeds classified as threatened or endangered.",
        },
        {
          n: "10.4",
          lead: "We make no representation that any particular export or import will be permitted.",
          text: "Where we assist with an international transaction, our role is limited to what is set out in the relevant written agreement, and all approvals remain subject to the decision of the competent authorities.",
        },
      ],
    },
    {
      id: "scheduling",
      n: "11",
      title: "Scheduling, postponement and cancellation",
      blocks: [
        {
          n: "11.1",
          text: "Programmes run to biological timetables (synchronisation protocols, laboratory cycles and pregnancy check windows), which cannot be rescheduled at will.",
        },
        {
          n: "11.2",
          text: "We may postpone or reschedule where an animal is unfit, where a protocol has not been followed, on veterinary advice, or on account of disease outbreak or movement restriction.",
        },
        { n: "11.3", text: "Cancellation rights, notice periods and charges are set out in your service agreement." },
      ],
    },
    {
      id: "intellectual-property",
      n: "12",
      title: "Intellectual property",
      blocks: [
        {
          n: "12.1",
          text: "The Website, together with all Content made available therein, including but not limited to text, product descriptions, technical literature, scientific publications, research papers, laboratory data, formulations, manufacturing processes, fermentation technologies, microbial information, graphics, photographs, illustrations, videos, software, databases, source code, trade names, logos, trademarks, service marks, domain names, designs, layouts, brochures, catalogues, downloadable materials and all other proprietary information, is the exclusive property of the Company or its licensors and is protected under the applicable intellectual property laws of India and international conventions.",
        },
        {
          n: "12.2",
          text: "Nothing contained on the Website shall be construed as granting, whether expressly, impliedly or otherwise, any licence, right, title or interest in or to any patent, copyright, trademark, trade secret, know-how, industrial design or any other intellectual property belonging to the Company. All rights not expressly granted herein are reserved by the Company.",
        },
        {
          n: "12.3",
          text: "No User shall copy, reproduce, modify, publish, transmit, distribute, sell, licence, translate, reverse engineer, decompile, create derivative works from, commercially exploit or otherwise use any Content available on the Website without the Company's prior written consent. Any unauthorised use shall constitute an infringement of the Company's intellectual property rights and may result in civil and criminal proceedings under applicable law.",
        },
      ],
    },
    {
      id: "third-party-links",
      n: "13",
      title: "Third-party links",
      blocks: [
        {
          n: "13.1",
          text: "The Website may contain hyperlinks to third-party websites, portals or online resources solely for the convenience of Users. Such hyperlinks do not constitute any endorsement, sponsorship, recommendation or approval by the Company of the products, services, information or opinions available on such third-party websites.",
        },
        {
          n: "13.2",
          text: "The Company exercises no control over the content, security, privacy practices or availability of third-party websites and shall not be responsible or liable for any loss, damage or liability arising from the User's access to or reliance upon such websites.",
        },
      ],
    },
    {
      id: "indemnification",
      n: "14",
      title: "Indemnification",
      blocks: [
        {
          n: "14.1",
          text: "The User irrevocably agrees to indemnify, defend and hold harmless the Company, its holding companies, subsidiaries, affiliates, directors, officers, employees, consultants, agents, successors and assigns from and against any and all claims, actions, proceedings, demands, liabilities, losses, damages, penalties, fines, costs and expenses, including reasonable legal fees and litigation costs, arising directly or indirectly out of or in connection with the User's access to or use of the Website, breach of these Terms, violation of any applicable law, infringement of any intellectual property rights, misuse of any information obtained through the Website, submission of false or misleading information, or violation of the rights of any third party. The User further agrees to cooperate fully with the Company in the defence of any such claim and acknowledges that the Company shall have the exclusive right to control the defence and settlement of any matter for which indemnification is sought under this Clause. The obligations contained herein shall survive the termination or expiry of these Terms and the User's access to the Website.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      n: "15",
      title: "Limitation of liability",
      blocks: [
        {
          n: "15.1",
          text: "To the maximum extent permitted under applicable law, the Company, its directors, officers, employees, affiliates, consultants, agents and licensors shall not be liable for any direct, indirect, incidental, consequential, punitive, exemplary or special damages, including loss of profits, loss of revenue, loss of business opportunity, business interruption, loss of goodwill, loss of data or any other commercial loss arising out of or in connection with the use of, inability to use or reliance upon the Website or its Content, irrespective of whether such liability arises in contract, tort, negligence, strict liability or otherwise.",
        },
        {
          n: "15.2",
          text: "The Company shall not be liable for any interruption of services, cyber-attacks, unauthorised access, system failures, transmission errors, software defects, communication failures or events beyond its reasonable control affecting the operation of the Website.",
        },
      ],
    },
    {
      id: "force-majeure",
      n: "16",
      title: "Force majeure",
      blocks: [
        {
          text: "We are not liable for any failure or delay caused by events beyond our reasonable control, including disease outbreak, government-imposed movement or quarantine restrictions, failure of power or liquid nitrogen supply arising from events beyond our control, natural disaster, civil disturbance, or changes in law.",
        },
      ],
    },
    {
      id: "governing-law",
      n: "17",
      title: "Governing law and jurisdiction",
      blocks: [
        {
          text: "These terms are governed by the laws of India. The courts at Penukonda, Andhra Pradesh have exclusive jurisdiction, subject to any right you have as a consumer to approach a consumer commission with jurisdiction over your place of residence.",
        },
      ],
    },
    {
      id: "amendment",
      n: "18",
      title: "Amendment",
      blocks: [
        {
          text: "We may amend these terms. The version on this page at the time you use the site applies. Changes do not affect an engagement already agreed in writing, which continues under the terms accepted at the time.",
        },
      ],
    },
  ] satisfies LegalSection[],
  contactSection: {
    id: "contact",
    n: "19",
    title: "Contact",
    privacyNote: "For privacy matters, see our",
    privacyLink: { label: "Privacy Policy", href: "/legal/privacy" },
    privacyNoteEnd: "and contact the Grievance Officer named there.",
  },
  cta: {
    heading: "Questions about these terms or a programme?",
    primary: { label: "Contact us", href: "/contact" },
  },
};
