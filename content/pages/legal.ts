/**
 * Shared shape for the legal pages (terms, privacy). Text in any block may carry inline
 * links written as [label](href): internal paths, #anchors, mailto: and tel: all work.
 * `#cookie-settings` opens the cookie consent panel.
 */

/** A paragraph or clause: optional number, optional bold lead-in, then text. */
export interface LegalClause {
  n?: string;
  lead?: string;
  text: string;
}

export type LegalListItem = string | { lead: string; text: string };

export type LegalBlock =
  | LegalClause
  | { list: LegalListItem[] }
  /** `head` omitted: a two-column key/value table whose first column is the row header. */
  | { table: { caption: string; head?: string[]; rows: string[][] } };

export interface LegalSection {
  id: string;
  n?: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  metaDescription: string;
  path: string;
  lede: string;
  /** Effective / last-updated line, shown in the hero. */
  updated: string;
  sections: LegalSection[];
  /** The closing contact section: intro/outro blocks around the shared email, phone and post block. */
  contact: { id: string; n: string; title: string; before?: LegalBlock[]; after?: LegalBlock[] };
  cta: { heading: string; primary: { label: string; href: string } };
}

export const legalCompany = "Hebbevu Genetics Farms Private Limited";
export const legalTocHeading = "Contents";
