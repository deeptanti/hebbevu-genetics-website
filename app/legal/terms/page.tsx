import { LegalDocument } from "@/components/blocks/LegalDocument";
import { termsPage } from "@/content/pages/terms";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: termsPage.title, description: termsPage.metaDescription, path: termsPage.path });

export default function TermsPage() {
  return <LegalDocument doc={termsPage} />;
}
