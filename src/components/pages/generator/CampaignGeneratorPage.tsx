"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Clock3,
  Copy,
  Download,
  Lightbulb,
  ListChecks,
  RotateCcw,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import AppShell from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDemoStore } from "@/lib/state/demoStore";
import {
  creators,
  sampleBriefs,
  trends,
  type CampaignBrief,
  type Trend,
} from "@/lib/mock/data";
import { getBestTrendForBrand, getCreatorsForTrend } from "@/lib/mock/matching";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type BrandContext = ReturnType<typeof useDemoStore.getState>["brand"];

type RichCampaignBrief = CampaignBrief & {
  trendSummary: string;
  urgencySignal: string;
  audience: string[];
  creatorAngle: string;
  contentPillars: string[];
  hooks: string[];
  formats: { name: string; reason: string }[];
  postingPlan: string[];
  proofPoints: string[];
  avoid: string[];
  successMetrics: string[];
};

function trendTone(trend: Trend) {
  if (trend.urgency === "High") {
    return "Move fast while discovery feeds are still rewarding this topic.";
  }
  if (trend.urgency === "Medium") {
    return "Build a useful angle before the trend becomes too crowded.";
  }
  return "Use this as a steady content theme with evergreen education.";
}

function formatNumber(n: number) {
  return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : `${Math.round(n / 1000)}K`;
}

function compactTrendName(name: string) {
  return name.replace(/\s+/g, "");
}

function buildCreatorBrief(trend: Trend, brand: BrandContext): RichCampaignBrief {
  const audience = brand?.audience
    ? [brand.audience, "curious first-time buyers", "trend-aware creators"]
    : ["Students", "Young Professionals", "Startup Founders"];
  const industry = brand?.industry || trend.category;
  const brandName = brand?.name || "your brand";
  const growthWindow = trend.halfLifeHours <= 36 ? "next 6-8 hours" : "next 24 hours";

  return {
    trendSummary: `${trend.name} is a ${trend.category} trend with ${trend.growthPct}% recent growth, a ${trend.score}/100 trend score, and roughly ${trend.halfLifeHours} hours of half-life left. The creator opportunity is to explain why it matters now, then give viewers one easy action they can copy today.`,
    urgencySignal: `${trendTone(trend)} Best publishing window: ${growthWindow}. Predicted peak: about 18 hours if velocity keeps compounding.`,
    audience,
    creatorAngle: `Position ${brandName} as the practical translator of this trend for ${audience[0]}. The creator should make the trend feel useful, not just viral.`,
    objective: `Turn ${trend.name} into a creator-led education moment for ${brandName}, driving saves, shares, and qualified clicks from ${audience[0]}.`,
    contentStrategy: `Lead with the trend insight, prove it with a quick data cue, then show a simple creator workflow. Keep the video useful enough to save and specific enough to make ${industry} audiences feel seen.`,
    contentPillars: [
      "Trend context: what changed and why people care now",
      "Practical use case: one repeatable tip, routine, or framework",
      "Creator proof: screen recording, demo, before/after, or mini case study",
      "Conversion bridge: soft CTA tied to the viewer's next action",
    ],
    hooks: [
      `This ${trend.name} trend is peaking faster than most creators realize.`,
      `If you create content in ${industry}, use this angle before the window closes.`,
      `Here is the simple version of ${trend.name} everyone is overcomplicating.`,
      `The next ${trend.halfLifeHours} hours matter more than the next ${trend.halfLifeHours * 2}.`,
    ],
    formats: [
      { name: "Instagram Reels", reason: "Fastest format for trend discovery and remixable hooks." },
      { name: "LinkedIn Carousel", reason: "Best for turning the trend into a saved educational framework." },
      { name: "X Thread", reason: "Useful for real-time commentary and quick audience testing." },
    ],
    postingPlan: [
      "Publish the first Reel within 4 hours using a direct trend hook.",
      "Post a carousel within 12 hours that breaks the trend into 3 creator lessons.",
      "Follow with a short thread that shares the data signal and asks for examples.",
      "Repost the best-performing creator response within 24 hours.",
    ],
    proofPoints: [
      `${trend.growthPct}% growth in the last 24h`,
      `${trend.opportunityScore}/100 opportunity score`,
      `Half-life estimate: ${trend.halfLifeHours}h`,
      "Velocity curve is still rising across recent data points",
    ],
    avoid: [
      "Do not explain the trend too broadly; anchor it to one creator use case.",
      "Avoid generic viral wording without a concrete demo.",
      "Do not wait for polished production if the trend is already accelerating.",
    ],
    successMetrics: [
      "Save rate above baseline",
      "Comment quality from target audience",
      "Creator profile taps",
      "CTR from soft CTA",
    ],
    reelScript:
      `[0-2s] Hook: "${trend.name} is moving fast, but most creators are using it the wrong way."\n` +
      `[2-6s] Data cue: show ${trend.growthPct}% growth + ${trend.halfLifeHours}h half-life remaining.\n` +
      "[6-15s] Explain the creator angle in one sentence, then show the simplest useful example.\n" +
      "[15-24s] Give viewers a repeatable 3-step framework they can save.\n" +
      `[24-32s] Show ${brandName} as the tool, product, or expert shortcut.\n` +
      "[32-38s] CTA: invite viewers to try the angle today and tag/save for their next post.",
    hashtags: [
      `#${compactTrendName(trend.name)}`,
      "#CreatorStrategy",
      "#TrendMarketing",
      `#${compactTrendName(trend.category)}`,
      "#ContentIdeas",
    ],
    cta: `Save this ${trend.name} playbook and publish your first version before the trend window closes.`,
  };
}

export function CampaignGeneratorPage() {
  const router = useRouter();
  const {
    brand,
    selectedTrend,
    setSelectedTrend,
    generatedBrief,
    setGeneratedBrief,
    selectedCreators,
    setSelectedCreators,
  } = useDemoStore();

  const [working, setWorking] = React.useState(false);
  const effectiveTrend = selectedTrend ?? getBestTrendForBrand(brand, trends);

  const brief: RichCampaignBrief | null =
    (generatedBrief as RichCampaignBrief | null) ??
    (effectiveTrend ? buildCreatorBrief(effectiveTrend, brand) : null);

  async function runGenerate(regenerate?: boolean) {
    if (!effectiveTrend) return;
    setWorking(true);
    setSelectedTrend(effectiveTrend);

    for (const ms of [450, 420, 380]) {
      await sleep(ms);
    }

    const nextBrief = {
      ...(sampleBriefs[effectiveTrend.id] ?? {}),
      ...buildCreatorBrief(effectiveTrend, brand),
    };

    setGeneratedBrief(nextBrief);

    if (selectedCreators.length === 0 || regenerate) {
      setSelectedCreators(getCreatorsForTrend(effectiveTrend, creators));
    }

    setWorking(false);
  }

  function onCopy(text: string) {
    navigator.clipboard?.writeText(text);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-5">
          <section className="glass-strong overflow-hidden rounded-2xl">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white/70">
                      Creator Trend Generator
                    </div>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                      AI Generated Trend Brief
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {effectiveTrend && (
                        <Badge className="bg-white/5 text-white/70 ring-1 ring-white/10">
                          Trend: {effectiveTrend.name}
                        </Badge>
                      )}
                      {brand?.name && (
                        <Badge className="bg-white/5 text-white/70 ring-1 ring-white/10">
                          Brand: {brand.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => runGenerate(false)}
                    disabled={working || !effectiveTrend}
                    className="rounded-2xl"
                  >
                    {working ? "Generating..." : "Generate Creator Brief"}
                  </Button>
                </div>

                {!brief ? (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
                    Select a trend in the Dashboard to generate a creator brief.
                  </div>
                ) : (
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <MetricTile label="Trend Score" value={`${effectiveTrend?.score ?? 0}/100`} />
                    <MetricTile label="Velocity" value={`+${effectiveTrend?.growthPct ?? 0}%`} />
                    <MetricTile label="Half-Life" value={`${effectiveTrend?.halfLifeHours ?? 0}h`} />
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 bg-black/15 p-5 sm:p-6 lg:border-l lg:border-t-0">
                <div>
                  <div className="text-sm font-semibold text-white/70">
                    Export Actions
                  </div>
                  <div className="mt-2 text-xl font-semibold">
                    Creator-ready output
                  </div>
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onCopy(JSON.stringify(brief, null, 2))}
                    disabled={!brief}
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => runGenerate(true)}
                    disabled={working || !effectiveTrend}
                  >
                    <RotateCcw className="h-4 w-4" />
                    Regenerate
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (!brief) return;
                      const blob = new Blob([JSON.stringify(brief, null, 2)], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "trendpulse-creator-brief.json";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    disabled={!brief}
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>

                <Button
                  variant="primary"
                  className="mt-4 w-full rounded-2xl"
                  onClick={() => router.push("/creators")}
                >
                  Go to Creator Matching
                </Button>
              </div>
            </div>
          </section>

          {brief && (
            <>
              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <SectionCard
                  title="Executive Brief"
                  icon={<BarChart3 className="h-4 w-4 text-sky-200" />}
                >
                  <p className="text-sm leading-6 text-white/80">
                    {brief.trendSummary}
                  </p>
                  <div className="mt-4 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4 text-sm font-semibold leading-6 text-violet-100">
                    {brief.cta}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Urgency + Audience"
                  icon={<Clock3 className="h-4 w-4 text-amber-200" />}
                >
                  <p className="text-sm leading-6 text-white/78">
                    {brief.urgencySignal}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {brief.audience.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </SectionCard>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                <SectionCard
                  title="Objective"
                  icon={<Target className="h-4 w-4 text-violet-200" />}
                >
                  <p className="text-sm leading-6 text-white/78">
                    {brief.objective}
                  </p>
                </SectionCard>

                <SectionCard
                  title="Creator Angle"
                  icon={<Lightbulb className="h-4 w-4 text-yellow-200" />}
                >
                  <p className="text-sm leading-6 text-white/78">
                    {brief.creatorAngle}
                  </p>
                </SectionCard>

                <SectionCard
                  title="Next Handoff"
                  icon={<Users className="h-4 w-4 text-teal-200" />}
                >
                  <p className="text-sm leading-6 text-white/78">
                    {selectedCreators.length
                      ? `Suggested creators: ${selectedCreators
                          .map(
                            (creator) =>
                              `${creator.name} (${formatNumber(creator.followers)})`,
                          )
                          .join(", ")}.`
                      : "Generate the brief to auto-pick best-fit demo creators."}
                  </p>
                </SectionCard>
              </div>

              <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <SectionCard
                  title="Hook Bank"
                  icon={<Sparkles className="h-4 w-4 text-fuchsia-200" />}
                >
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {brief.hooks.map((hook) => (
                      <div
                        key={hook}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm leading-5 text-white/80"
                      >
                        {hook}
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Reel Script"
                  icon={<Sparkles className="h-4 w-4 text-violet-200" />}
                >
                  <pre className="max-h-[260px] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
                    {brief.reelScript}
                  </pre>
                </SectionCard>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <SectionCard
                  title="Content Strategy"
                  icon={<ListChecks className="h-4 w-4 text-emerald-200" />}
                >
                  <p className="text-sm leading-6 text-white/78">
                    {brief.contentStrategy}
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {brief.contentPillars.map((pillar) => (
                      <div
                        key={pillar}
                        className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm leading-5 text-white/75"
                      >
                        {pillar}
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Posting Plan"
                  icon={<Clock3 className="h-4 w-4 text-amber-200" />}
                >
                  <ol className="grid gap-3 sm:grid-cols-2">
                    {brief.postingPlan.map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm text-white/75">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white/70">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </SectionCard>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <SectionCard
                  title="Formats"
                  icon={<Sparkles className="h-4 w-4 text-cyan-200" />}
                >
                  <div className="space-y-3">
                    {brief.formats.map((format) => (
                      <div key={format.name}>
                        <div className="text-sm font-semibold text-white/85">
                          {format.name}
                        </div>
                        <div className="mt-1 text-xs leading-5 text-white/60">
                          {format.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Proof + Metrics"
                  icon={<BarChart3 className="h-4 w-4 text-sky-200" />}
                >
                  <CompactList items={[...brief.proofPoints, ...brief.successMetrics]} />
                </SectionCard>

                <SectionCard
                  title="Hashtags + Avoid"
                  icon={<ListChecks className="h-4 w-4 text-rose-200" />}
                >
                  <div className="flex flex-wrap gap-2">
                    {brief.hashtags.map((hashtag) => (
                      <span
                        key={hashtag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
                      >
                        {hashtag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <CompactList items={brief.avoid} />
                  </div>
                </SectionCard>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center gap-3">
        {icon}
        <div className="text-sm font-semibold text-white/70">{title}</div>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs font-semibold uppercase text-white/50">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function CompactList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-white/75">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/45" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
