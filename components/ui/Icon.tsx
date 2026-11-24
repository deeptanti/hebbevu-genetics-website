import {
  Baby, CalendarDays, Check, ClipboardList, Dna, Droplet, FlaskConical, Globe, Heart, Leaf, Mail, MapPin,
  MessageCircle, Microscope, Package, Phone, Scale, ShieldCheck, Snowflake, Sparkles, Target, Thermometer,
  TrendingUp, Truck, Users, type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Icon set: Lucide (open line icons), single 1.5 stroke, 24px, currentColor.
 * Brief §6 left this open — this is the recorded choice.
 * Colour comes from the parent: brown on light grounds, mist on dark.
 */
const icons: Record<IconName, LucideIcon> = {
  lab: FlaskConical, dna: Dna, globe: Globe, shield: ShieldCheck, leaf: Leaf, target: Target, users: Users,
  clipboard: ClipboardList, thermometer: Thermometer, droplet: Droplet, snowflake: Snowflake,
  microscope: Microscope, calendar: CalendarDays, truck: Truck, package: Package, baby: Baby, check: Check,
  phone: Phone, mail: Mail, map: MapPin, whatsapp: MessageCircle, sparkles: Sparkles, trending: TrendingUp,
  heart: Heart, scale: Scale,
};

export const ICON_STROKE = 1.5;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Cmp = icons[name];
  return <Cmp aria-hidden="true" focusable="false" strokeWidth={ICON_STROKE} className={cn("size-5 shrink-0", className)} />;
}
