"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
import { Card, CardContent } from "@/components/ui/card";
import { useDemoStore } from "@/lib/state/demoStore";
import {
  creators,
  sampleBriefs,
  type CampaignBrief,
  type Creator,
  type Trend,
} from "@/lib/mock/data";

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

function pickCreatorsForTrend(trend: Trend): Creator[] {
  const categoryTerms = [trend.category.toLowerCase(), trend.name.toLowerCase().split(" ")[0]];
  return creators
    .slice()
    .sort((a, b) => {
      const aMatch = categoryTerms.some((term) => a.niche.toLowerCase().includes(term)) ? 12 : 0;
      const bMatch = categoryTerms.some((term) => b.niche.toLowerCase().includes(term)) ? 12 : 0;
      return b.fitScore + bMatch - (a.fitScore + aMatch);
    })
    .slice(0, 3);
}

export function CampaignGeneratorPage() {
  const router = useRouter();
  const {
    brand,
    selectedTrend,
    generatedBrief,
    setGeneratedBrief,
    selectedCreators,
    setSelectedCreators,
  } = useDemoStore();

  const [working, setWorking] = React.useState(false);

  const brief: RichCampaignBrief | null =
    (generatedBrief as RichCampaignBrief | null) ??
    (selectedTrend ? buildCreatorBrief(selectedTrend, brand) : null);

  async function runGenerate(regenerate?: boolean) {
    if (!selectedTrend) return;
    setWorking(true);

    for (const ms of [450, 420, 380]) {
      await sleep(ms);
    }

    const nextBrief = {
      ...(sampleBriefs[selectedTrend.id] ?? {}),
      ...buildCreatorBrief(selectedTrend, brand),
    };

    setGeneratedBrief(nextBrief);

    if (selectedCreators.length === 0 || regenerate) {
      setSelectedCreators(pickCreatorsForTrend(selectedTrend));
    }

    setWorking(false);
  }

  function onCopy(text: string) {
    navigator.clipboard?.writeText(text);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-semibold text-white/70">Creator Trend Generator</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">AI Generated Trend Brief</h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Converts trend signals into a creator-ready summary, content angles, hooks, and posting plan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {selectedTrend && (
              <Badge className="bg-white/5 text-white/70 ring-1 ring-white/10">Trend: {selectedTrend.name}</Badge>
            )}
            <Button variant="primary" onClick={() => runGenerate(false)} disabled={working || !selectedTrend}>
              {working ? "Generating..." : "Generate Creator Brief"}
            </Button>
          </div>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="glass-strong overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="text-sm font-semibold text-white/70">Generated Output</div>
                  <div className="mt-2 text-2xl font-semibold">Creator-ready trend brief</div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="secondary" size="sm" onClick={() => onCopy(JSON.stringify(brief, null, 2))}>
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => runGenerate(true)} disabled={working || !selectedTrend}>
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
              </div>

              {!brief ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                  Select a trend in the Dashboard to generate a creator brief.
                </div>
              ) : (
                <div className="mt-5 space-y-5">
                  <SectionCard title="Trend Summary" icon={<BarChart3 className="h-4 w-4 text-sky-200" />}>
                    <div className="text-sm leading-6 text-white/80">{brief.trendSummary}</div>
                  </SectionCard>

                  <div className="grid gap-5 md:grid-cols-2">
                    <SectionCard title="Urgency Signal" icon={<Clock3 className="h-4 w-4 text-amber-200" />}>
                      <div className="text-sm leading-6 text-white/80">{brief.urgencySignal}</div>
                    </SectionCard>

                    <SectionCard title="Best Audience" icon={<Users className="h-4 w-4 text-teal-200" />}>
                      <div className="flex flex-wrap gap-2">
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

                  <SectionCard title="Campaign Objective" icon={<Target className="h-4 w-4 text-violet-200" />}>
                    <div className="text-sm leading-6 text-white/80">{brief.objective}</div>
                  </SectionCard>

                  <SectionCard title="Creator Angle" icon={<Lightbulb className="h-4 w-4 text-yellow-200" />}>
                    <div className="text-sm leading-6 text-white/80">{brief.creatorAngle}</div>
                  </SectionCard>

                  <SectionCard title="Content Strategy" icon={<ListChecks className="h-4 w-4 text-emerald-200" />}>
                    <div className="text-sm leading-6 text-white/80">{brief.contentStrategy}</div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {brief.contentPillars.map((pillar) => (
                        <div key={pillar} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/75">
                          {pillar}
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  <SectionCard title="Hook Bank" icon={<Sparkles className="h-4 w-4 text-fuchsia-200" />}>
                    <div className="space-y-2">
                      {brief.hooks.map((hook) => (
                        <div key={hook} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white/80">
                          {hook}
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  <SectionCard title="Reel Script" icon={<Sparkles className="h-4 w-4 text-violet-200" />}>
                    <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
                      {brief.reelScript}
                    </pre>
                  </SectionCard>

                  <div className="grid gap-5 md:grid-cols-3">
                    {brief.formats.map((format) => (
                      <SectionCard key={format.name} title={format.name} icon={<Sparkles className="h-4 w-4 text-cyan-200" />}>
                        <div className="text-sm leading-6 text-white/75">{format.reason}</div>
                      </SectionCard>
                    ))}
                  </div>

                  <SectionCard title="Posting Plan" icon={<Clock3 className="h-4 w-4 text-amber-200" />}>
                    <ol className="space-y-3">
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

                  <div className="grid gap-5 md:grid-cols-3">
                    <SectionCard title="Proof Points" icon={<BarChart3 className="h-4 w-4 text-sky-200" />}>
                      <CompactList items={brief.proofPoints} />
                    </SectionCard>

                    <SectionCard title="Avoid" icon={<ListChecks className="h-4 w-4 text-rose-200" />}>
                      <CompactList items={brief.avoid} />
                    </SectionCard>

                    <SectionCard title="Success Metrics" icon={<Target className="h-4 w-4 text-emerald-200" />}>
                      <CompactList items={brief.successMetrics} />
                    </SectionCard>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <SectionCard title="Hashtags" icon={<Sparkles className="h-4 w-4 text-violet-200" />}>
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
                    </SectionCard>

                    <SectionCard title="CTA" icon={<Sparkles className="h-4 w-4 text-violet-200" />}>
                      <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4 text-sm font-semibold text-violet-200">
                        {brief.cta}
                      </div>
                    </SectionCard>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Card className="glass-strong p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white/70">Creator handoff</div>
                    <div className="mt-2 text-2xl font-semibold">Brief explains what to make</div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500/25 to-indigo-500/25 ring-1 ring-white/10" />
                </div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {["Trend reason summarized", "Urgency window included", "Creator hooks ready", "Posting plan mapped"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-violet-300/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <Card className="glass-strong p-6">
              <div className="text-sm font-semibold text-white/70">Next</div>
              <div className="mt-2 text-xl font-semibold">Match creators</div>
              <p className="mt-2 text-sm text-white/70">
                {selectedCreators.length
                  ? `Suggested creators: ${selectedCreators
                      .map((creator) => `${creator.name} (${formatNumber(creator.followers)})`)
                      .join(", ")}.`
                  : "Generate the brief to auto-pick best-fit demo creators."}
              </p>
              <Button
                variant="primary"
                className="mt-4 w-full rounded-2xl"
                onClick={() => router.push("/creators")}
              >
                Go to Creator Matching
              </Button>
            </Card>
          </div>
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-3">
        {icon}
        <div className="text-sm font-semibold text-white/70">{title}</div>
      </div>
      <div className="mt-3">{children}</div>
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
