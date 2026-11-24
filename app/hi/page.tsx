import { hiCopy, hiPages } from "@/content/pages/hi";
import { pageMeta } from "@/lib/metadata";
import { HiPending } from "./_components/HiPending";

const page = hiPages.home;

export const metadata = {
  ...pageMeta({ title: page.title, description: hiCopy.explainer, path: page.path }),
  // Thin placeholder until the translation exists — keep it out of the index.
  robots: { index: false, follow: true },
};

export default function HiHomePage() {
  return <HiPending title={page.title} english={page.english} />;
}
