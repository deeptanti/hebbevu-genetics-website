import { sexSortedPage as page } from "@/content/pages/services";
import { conventional, sexSorted } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { EmbryoProductPage } from "../../_components/EmbryoProduct";

export const metadata = pageMeta({ ...page.meta, path: sexSorted.href });

export default function Page() {
  return <EmbryoProductPage svc={sexSorted} other={conventional} service="sex-sorted-embryos" page={page} />;
}
