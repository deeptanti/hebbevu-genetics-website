import { conventionalPage as page } from "@/content/pages/services";
import { conventional, sexSorted } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { EmbryoProductPage } from "../../_components/EmbryoProduct";

export const metadata = pageMeta({ ...page.meta, path: conventional.href });

export default function Page() {
  return <EmbryoProductPage svc={conventional} other={sexSorted} service="normal-embryos" page={page} />;
}
