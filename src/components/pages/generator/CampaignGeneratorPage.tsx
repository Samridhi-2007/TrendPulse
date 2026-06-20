"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Clock3,
  Copy,
  Download,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
  Users,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Calendar,
  MessageSquare,
  Film,
  Music,
  Share2,
  Zap,
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
      `"My 5-minute glass skin routine, no 10-step nonsense"`,
      `This ${trend.name} trend is peaking faster than most creators realize.`,
      `If you create content in ${industry}, use this angle before the window closes.`,
      `Here is the simple version of ${trend.name} everyone is overcomplicating.`,
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
      `[0-2s] Hook: "Glass skin is moving fast, but most creators are using it the wrong way."\n` +
      `[2-6s] Data cue: show 92% growth + 72h half-life remaining.\n` +
      "[6-15s] Explain the creator angle in one sentence, then show the simplest useful example.\n" +
      "[15-24s] Give viewers a repeatable 3-step framework they can save.\n" +
      "[24-32s] Show Mamaearth as the tool, product, or expert shortcut.\n" +
      "[32-38s] CTA: invite viewers to try the angle today and tag/save for their next post.\n\n" +
      "CAPTION:\n" +
      "The glass skin trend is peaking, but most creators are overcomplicating it.\n" +
      "Here's my 5-minute routine that actually works (no 10-step nonsense).\n" +
      "Save this for your next post and try it before the trend window closes! ✨\n\n" +
      "#GlassSkin #GlowRoutine #Mamaearth #BeautyTips #SkincareRoutine",
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
  const [showDetails, setShowDetails] = React.useState(false);
  const [showStrategy, setShowStrategy] = React.useState(false);

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
              Converts trend signals into a creator-ready strategy in seconds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {selectedTrend && (
              <Badge className="bg-white/5 text-white/70 ring-1 ring-white/10">Trend: {selectedTrend.name}</Badge>
            )}
            <Button variant="primary" onClick={() => runGenerate(false)} disabled={working || !selectedTrend}>
              {working ? "Generating..." : "Generate Strategy"}
            </Button>
          </div>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="glass-strong overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="text-sm font-semibold text-white/70">Generated Output</div>
                  <div className="mt-2 text-2xl font-semibold">Campaign Brief</div>
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
                <div className="mt-5">
                  {/* Compact Intelligence Card */}
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 space-y-5">
                    {/* Header with Score & Urgency */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30">
                            Campaign Brief
                          </Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white/70">Score:</span>
                            <span className="text-lg font-bold text-emerald-400">
                              {selectedTrend?.score || 92}/100
                            </span>
                          </div>
                        </div>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                          {selectedTrend?.name || "Glass Skin"}
                        </h2>
                        <div className="mt-2 flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1.5 text-amber-400">
                            <Clock3 className="h-4 w-4" />
                            <span>Peaks in {selectedTrend?.halfLifeHours || 3} days</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-rose-400">
                            <AlertCircle className="h-4 w-4" />
                            <span>Act now</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {selectedCreators.slice(0, 3).map((creator) => (
                            <div
                              key={creator.id}
                              className="h-8 w-8 rounded-full border-2 border-black/20 bg-gradient-to-br from-violet-400 to-indigo-400 ring-1 ring-white/10"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Objective - One Sentence */}
                    <div className="border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                        <Target className="h-3.5 w-3.5" />
                        Objective
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/90">
                        {brief.objective || "Promote Glow Serum to first-time buyers riding the glass-skin wave"}
                      </p>
                    </div>

                    {/* Best Hook */}
                    <div className="border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5" />
                        Best Hook
                      </div>
                      <blockquote className="mt-1.5 text-base font-medium text-white/90 italic">
                        "{brief.hooks[0] || 'My 5-minute glass skin routine, no 10-step nonsense'}"
                      </blockquote>
                    </div>

                    {/* Key Tags */}
                    <div className="border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                        <Lightbulb className="h-3.5 w-3.5" />
                        Key Tags
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {brief.hashtags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="text-xs text-white/30">+{brief.hashtags.length - 3} more</span>
                      </div>
                    </div>

                    {/* Primary Action + Expand */}
                    <div className="border-t border-white/5 pt-4 flex items-center gap-3">
                      <Button 
                        variant="primary" 
                        className="flex-1 rounded-2xl"
                        onClick={() => setShowStrategy(true)}
                      >
                        View Full Strategy <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setShowDetails(!showDetails)}
                        className="rounded-2xl"
                      >
                        {showDetails ? "Hide" : "Details"}
                        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                      </Button>
                    </div>

                    {/* Expandable Details */}
                    {showDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/5 pt-4 space-y-4"
                      >
                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Audience</div>
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              {brief.audience.slice(0, 3).map((item) => (
                                <span key={item} className="text-sm text-white/70">{item}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Format</div>
                            <div className="mt-1 text-sm text-white/70">{brief.formats[0]?.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Strategy generated in seconds • {brief.contentPillars.length} pillars • {brief.formats.length} formats</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-3 text-xs text-white/20 text-center">
                    4 fields · zero scrolling · fits in one viewport
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

        {/* Strategy Details Modal */}
        <AnimatePresence>
          {showStrategy && brief && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowStrategy(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0a0a0f] border border-white/10 p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowStrategy(false)}
                  className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-white/50 hover:text-white/80 transition-colors"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>

                <div className="space-y-8">
                  {/* Header */}
                  <div>
                    <Badge className="bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30">
                      Full Strategy
                    </Badge>
                    <h2 className="mt-3 text-3xl font-semibold text-white">
                      {selectedTrend?.name || "Glass Skin"} Campaign
                    </h2>
                    <p className="mt-1 text-sm text-white/50">
                      Complete creator strategy package
                    </p>
                  </div>

                  {/* 1. Strategic Summary */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-sky-400" />
                      <h3 className="text-lg font-semibold text-white">Strategic Summary</h3>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-white/80">{brief.contentStrategy}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {brief.contentPillars.map((pillar) => (
                          <div key={pillar} className="flex items-center gap-2 text-xs text-white/60">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            <span>{pillar}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. Creator Angle */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-400" />
                      <h3 className="text-lg font-semibold text-white">Creator Angle</h3>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-white/80">{brief.creatorAngle}</p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-white/50">
                        <span>🎯 Target: {brief.audience[0]}</span>
                        <span>•</span>
                        <span>📈 Trend: {selectedTrend?.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Full Reel Script */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Film className="h-5 w-5 text-violet-400" />
                      <h3 className="text-lg font-semibold text-white">Full Reel Script</h3>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <pre className="whitespace-pre-wrap text-sm text-white/70 font-mono">
                        {brief.reelScript}
                      </pre>
                    </div>
                  </div>

                  {/* 4. Creator Handoff Package */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Send className="h-5 w-5 text-emerald-400" />
                      <h3 className="text-lg font-semibold text-white">Creator Handoff Package</h3>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Deliverables</div>
                          <ul className="mt-1 space-y-1.5 text-sm text-white/70">
                            {brief.formats.map((format) => (
                              <li key={format.name} className="flex items-center gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                <span>{format.name}: {format.reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Success Metrics</div>
                          <ul className="mt-1 space-y-1.5 text-sm text-white/70">
                            {brief.successMetrics.map((metric) => (
                              <li key={metric} className="flex items-center gap-2">
                                <Target className="h-3.5 w-3.5 text-violet-400" />
                                <span>{metric}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 border-t border-white/5 pt-4">
                        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Posting Plan</div>
                        <ol className="mt-1 space-y-1.5 text-sm text-white/70">
                          {brief.postingPlan.map((step, index) => (
                            <li key={step} className="flex items-start gap-2">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs font-semibold text-white/40">
                                {index + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {brief.hashtags.map((tag) => (
                          <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 p-3 rounded-2xl border border-violet-400/20 bg-violet-500/10 text-sm font-semibold text-violet-200">
                        {brief.cta}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-white/5">
                    <Button variant="primary" className="flex-1 rounded-2xl">
                      Export Creator Package <Download className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="secondary" onClick={() => setShowStrategy(false)} className="rounded-2xl">
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}