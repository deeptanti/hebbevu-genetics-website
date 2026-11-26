import { LegalDocument } from "@/components/blocks/LegalDocument";
import { privacyPage } from "@/content/pages/privacy";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: privacyPage.title, description: privacyPage.metaDescription, path: privacyPage.path });

export default function PrivacyPage() {
  return <LegalDocument doc={privacyPage} />;
}
