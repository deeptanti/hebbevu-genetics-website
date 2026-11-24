import type { StatItem } from "@/content/types";
import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Stat, StatGrid } from "../ui/Stat";

/** Stat band on `bark` (brief §6: bark = stat bands). Not the page's CTABand — that is `deep`. */
export function StatsBand({ title, kicker, stats, footnote }: { title: string; kicker?: string; stats: StatItem[]; footnote?: string }) {
  return (
    <Section tone="bark">
      <SectionHeader kicker={kicker} title={title} ground="dark" />
      <StatGrid>
        {stats.map((s) => (
          <Stat key={s.id} value={s.value} label={s.label} note={s.note} ground="dark" />
        ))}
      </StatGrid>
      {footnote && <p className="type-small mt-6 max-w-prose text-mist">{footnote}</p>}
    </Section>
  );
}
