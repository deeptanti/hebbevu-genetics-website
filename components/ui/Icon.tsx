import {
  Baby, CalendarCheck, Check, ClipboardText, Cow, Dna, Drop, Eyedropper, Flask, GlobeHemisphereEast, Heart, Envelope,
  MapPin, Microscope, Package, Phone, Plant, Scales, ShieldCheck, Snowflake, Sparkle, Syringe, Target, TestTube,
  Thermometer, TrendUp, Truck, UsersThree, WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Icon set: Phosphor, DUOTONE weight (replaces Lucide in the visual pass).
 * The duotone fill is currentColor at 20% opacity, so one colour token drives both layers:
 * brown on light grounds, mist on dark. 24px default.
 */
const icons: Record<IconName, PhosphorIcon> = {
  lab: Flask, dna: Dna, globe: GlobeHemisphereEast, shield: ShieldCheck, leaf: Plant, target: Target,
  users: UsersThree, clipboard: ClipboardText, thermometer: Thermometer, droplet: Drop, snowflake: Snowflake,
  microscope: Microscope, calendar: CalendarCheck, truck: Truck, package: Package, baby: Baby, check: Check,
  phone: Phone, mail: Envelope, map: MapPin, whatsapp: WhatsappLogo, sparkles: Sparkle, trending: TrendUp,
  heart: Heart, scale: Scales, cow: Cow, syringe: Syringe, testtube: TestTube, plant: Plant, eyedropper: Eyedropper,
};

/** Kept for Lucide UI glyphs (chevrons, arrows) still used in controls. */
export const ICON_STROKE = 1.5;

export function Icon({ name, className, weight = "duotone" }: { name: IconName; className?: string; weight?: "duotone" | "regular" | "bold" | "fill" }) {
  const Cmp = icons[name];
  return <Cmp aria-hidden="true" focusable="false" weight={weight} className={cn("size-5 shrink-0", className)} />;
}

/**
 * IconTile - a 48px clay square holding a duotone icon. Used for feature claims,
 * service points and facility areas. Inside a linked card (`group`), it fills brown on hover.
 */
export function IconTile({ name, ground = "light", className }: { name: IconName; ground?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "transition-move inline-flex size-7 shrink-0 items-center justify-center rounded-lg",
        ground === "dark"
          ? "bg-bark text-mist ring-1 ring-graphite"
          : "bg-clay text-brown group-hover:bg-brown group-hover:text-white",
        className,
      )}
    >
      <Icon name={name} className="size-5" />
    </span>
  );
}
