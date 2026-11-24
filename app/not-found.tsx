import { PageHero } from "@/components/layout/PageHero";
import { photos } from "@/content/media";
import { notFoundPage as page } from "@/content/pages/services";

export default function NotFound() {
  return <PageHero photo={photos[page.heroPhoto]} title={page.title} lede={page.lede} actions={page.actions} />;
}
