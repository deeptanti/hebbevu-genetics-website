import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type Ground = "light" | "dark";

/**
 * RULE (brief §6): ONE `primary` per section. Pair it with `secondary` or `ghost`.
 * Control boundaries are `graphite` (light) or `mist` (dark) - never `stone`.
 * Hit target ≥ 48px (min-h-7). Hover changes colour only; nothing moves.
 */
const styles: Record<Ground, Record<ButtonVariant, string>> = {
  light: {
    primary: "border-brown bg-brown text-white hover:border-brown-dark hover:bg-brown-dark",
    secondary: "border-graphite bg-white text-brown hover:border-brown-dark hover:text-brown-dark",
    ghost: "border-transparent text-brown underline-offset-4 hover:text-brown-dark hover:underline",
  },
  dark: {
    primary: "border-mist bg-mist text-deep hover:border-white hover:bg-white",
    secondary: "border-mist bg-transparent text-mist hover:border-white hover:text-white",
    ghost: "border-transparent text-mist underline-offset-4 hover:text-white hover:underline",
  },
};

const base =
  "transition-move group type-body inline-flex min-h-7 items-center justify-center gap-2 rounded-md border font-semibold";

interface CommonProps {
  variant?: ButtonVariant;
  ground?: Ground;
  /** Show a trailing arrow. */
  arrow?: boolean;
  /** Optional leading icon node (e.g. <Icon name="phone" />). */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export type ButtonProps = CommonProps &
  (
    | ({ href: string; external?: boolean } & { type?: never; disabled?: never; onClick?: never })
    | ({ href?: undefined; external?: never } & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled" | "onClick">)
  );

export function buttonClass(variant: ButtonVariant = "primary", ground: Ground = "light", className?: string) {
  return cn(base, variant === "ghost" ? "px-1" : "px-5", styles[ground][variant], className);
}

export function Button(props: ButtonProps) {
  const { variant = "primary", ground = "light", arrow, icon, className, children } = props;
  const cls = buttonClass(variant, ground, className);
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden="true" weight="bold" className="transition-move size-4 group-hover:translate-x-1" />}
    </>
  );

  if (props.href !== undefined) {
    const isExternal = props.external ?? /^(https?:|tel:|mailto:)/.test(props.href);
    if (isExternal) {
      const newTab = props.href.startsWith("http");
      return (
        <a href={props.href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={props.type ?? "button"} disabled={props.disabled} onClick={props.onClick} className={cn(cls, "disabled:cursor-not-allowed")}>
      {inner}
    </button>
  );
}

/** Lays out a button row. Put at most one `primary` inside. */
export function ButtonGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap items-center gap-4", className)}>{children}</div>;
}
