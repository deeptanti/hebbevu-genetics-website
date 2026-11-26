import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { featuredOutlets } from "@/content/press";

/** "As featured in" row of outlet names, linking to /about/news. Outlet names are set as text, not logos. */
export function PressStrip() {
  return (
    <div className="mb-8 flex flex-col items-center gap-4 border-b border-stone pb-7 text-center">
      <p className="type-label text-graphite">As featured in</p>
      <ul aria-label="Publications that have covered Hebbevu Genetics" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {featuredOutlets.map((o) => (
          <li key={o} className="type-subheading text-ink">
            {o}
          </li>
        ))}
      </ul>
      <Link href="/about/news" className="transition-ui group type-small inline-flex items-center gap-2 font-semibold text-brown hover:text-brown-dark">
        Read the coverage
        <ArrowRight aria-hidden="true" weight="bold" className="transition-move size-4 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
