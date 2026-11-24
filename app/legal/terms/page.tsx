import { legalPages } from "@/content/pages/legal";
import { pageMeta } from "@/lib/metadata";
import { LegalPending } from "../_components/LegalPending";

const page = legalPages.terms;

export const metadata = {
  ...pageMeta({ title: page.title, description: page.metaDescription, path: "/legal/terms" }),
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <LegalPending title={page.title} body={page.body} />;
}
