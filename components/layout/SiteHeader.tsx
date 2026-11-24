"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryCta, primaryNav } from "@/content/site";
import type { NavItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { Button } from "../ui/Button";
import { ICON_STROKE } from "../ui/Icon";
import { Container } from "./Container";
import { Logo } from "./Logo";

/**
 * Header on a LIGHT ground (brief §7: the logo can't sit on a dark bar until a reversed
 * version is drawn). Stone hairline at rest; shadow-md once scrolled. Mobile drawer uses shadow-lg.
 */
const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

function DesktopItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href);
  const linkCls = cn(
    "transition-ui type-small inline-flex min-h-7 items-center gap-1 px-3 font-semibold underline-offset-8",
    active ? "text-brown underline" : "text-ink hover:text-brown",
  );
  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={linkCls} aria-current={active ? "page" : undefined}>
          {item.label}
        </Link>
      </li>
    );
  }
  return (
    <li className="group relative">
      <Link href={item.href} className={linkCls} aria-current={active ? "page" : undefined}>
        {item.label}
        <ChevronDown aria-hidden="true" strokeWidth={ICON_STROKE} className="size-4" />
      </Link>
      <div className="invisible absolute top-full left-0 z-50 pt-2 group-focus-within:visible group-hover:visible">
        <ul className="flex w-max flex-col rounded-lg border border-stone bg-white p-2 shadow-md">
          {item.children.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className={cn(
                  "transition-ui type-small flex min-h-7 items-center rounded-sm px-4",
                  pathname === c.href ? "bg-mist text-brown" : "text-ink hover:bg-mist hover:text-brown",
                )}
                aria-current={pathname === c.href ? "page" : undefined}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The drawer is "open for this path" — navigating anywhere closes it without an effect.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (v: boolean) => setOpenPath(v ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenPath(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "transition-ui sticky top-0 z-40 border-b bg-white",
        scrolled ? "border-transparent shadow-md" : "border-stone",
      )}
    >
      <a
        href="#main"
        className="type-small sr-only bg-white px-4 py-2 text-brown focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <Container className="flex items-center justify-between gap-5 py-3">
        <Logo priority />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <DesktopItem key={item.href} item={item} pathname={pathname} />
            ))}
          </ul>
        </nav>
        <div className="hidden lg:block">
          <Button href={primaryCta.href}>{primaryCta.label}</Button>
        </div>
        <button
          type="button"
          className="transition-ui inline-flex size-7 items-center justify-center rounded-md border border-graphite text-ink hover:text-brown lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(true)}
        >
          <Menu aria-hidden="true" strokeWidth={ICON_STROKE} className="size-5" />
          <span className="sr-only">Open menu</span>
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 overflow-y-auto bg-white shadow-lg lg:hidden">
          <Container className="flex items-center justify-between gap-5 border-b border-stone py-3">
            <Logo />
            <button
              type="button"
              autoFocus
              className="transition-ui inline-flex size-7 items-center justify-center rounded-md border border-graphite text-ink hover:text-brown"
              onClick={() => setOpen(false)}
            >
              <X aria-hidden="true" strokeWidth={ICON_STROKE} className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </Container>
          <Container className="py-5">
            <nav aria-label="Primary mobile">
              <ul className="flex flex-col">
                {primaryNav.map((item) => (
                  <li key={item.href} className="border-b border-stone py-4">
                    <Link
                      href={item.href}
                      className={cn("type-h3 transition-ui", isActive(pathname, item.href) ? "text-brown" : "text-ink hover:text-brown")}
                    >
                      {item.label}
                    </Link>
                    {item.description && <p className="type-small mt-1 text-graphite">{item.description}</p>}
                    {item.children && (
                      <ul className="mt-3 flex flex-col">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className={cn(
                                "transition-ui type-body flex min-h-7 items-center",
                                pathname === c.href ? "text-brown" : "text-ink hover:text-brown",
                              )}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6">
              <Button href={primaryCta.href} className="w-full">
                {primaryCta.label}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
