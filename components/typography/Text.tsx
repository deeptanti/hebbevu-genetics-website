import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TextVariant = "stat" | "subheading" | "body" | "label" | "small";
export type TextTone = "ink" | "graphite" | "deep" | "brown" | "mist" | "danger";

const variantClass: Record<TextVariant, string> = {
  stat: "type-stat",
  subheading: "type-subheading",
  body: "type-body",
  label: "type-label",
  small: "type-small",
};

/** Defaults per brief §6: body in ink, label in graphite. */
const defaultTone: Record<TextVariant, TextTone> = {
  stat: "deep",
  subheading: "ink",
  body: "ink",
  label: "graphite",
  small: "graphite",
};

const toneClass: Record<TextTone, string> = {
  ink: "text-ink",
  graphite: "text-graphite",
  deep: "text-deep",
  brown: "text-brown",
  mist: "text-mist",
  danger: "text-danger",
};

export interface TextProps {
  variant?: TextVariant;
  /** Override colour. On dark grounds use `mist` — graphite fails contrast there. */
  tone?: TextTone;
  as?: ElementType;
  className?: string;
  id?: string;
  children: ReactNode;
}

export function Text({ variant = "body", tone, as: Tag = "p", className, id, children }: TextProps) {
  return (
    <Tag id={id} className={cn(variantClass[variant], toneClass[tone ?? defaultTone[variant]], className)}>
      {children}
    </Tag>
  );
}

/** Inline marker for figures the client has not supplied. Never replace with an estimate. */
export function Pending({ children = "[ TO BE SUPPLIED ]" }: { children?: ReactNode }) {
  return (
    <span className="type-label rounded-sm border border-dashed border-graphite px-2 py-1 text-graphite">
      {children}
    </span>
  );
}
