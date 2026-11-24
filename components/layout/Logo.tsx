import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * INTERIM lockup (brief §7): the supplied logo is a stacked, dark-on-transparent PNG.
 * We crop the mark and set it beside a text wordmark. Replace with the drawn horizontal
 * lockup when supplied. On dark grounds, wrap in <LogoPlate> — never put the PNG straight on deep/bark.
 */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex min-h-7 items-center gap-3", className)} aria-label="Hebbevu Genetics — home">
      <Image src="/brand/mark.png" alt="" width={72} height={48} priority={priority} className="h-7 w-auto" />
      <span className="flex flex-col">
        <span className="type-wordmark text-deep">HEBBEVU</span>
        <span className="type-label text-brown">Genetics</span>
      </span>
    </Link>
  );
}

/** Light plate so the logo can appear on a dark ground (brief §7 workaround). */
export function LogoPlate({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex rounded-lg bg-white px-4 py-2", className)}>
      <Logo />
    </div>
  );
}
