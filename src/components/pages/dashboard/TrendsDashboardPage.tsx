"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Check,
  CircleHelp,
  Clock3,
  Flame,
  Gauge,
  Rocket,
  Smartphone,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import AppShell from "@/components/shell/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trends } from "@/lib/mock/data";
import { getBestTrendForBrand, getDashboardContent } from "@/lib/mock/matching";
import { useDemoStore } from "@/lib/state/demoStore";

function toVelocityPoints(v: number[]) {
  return v.map((value, i) => ({ x: i + 1, value }));
}

const lifecycleStages = ["Meme", "Cultural", "Seasonal"];

const trendSources = [
  { label: "Google Trends", value: 72 },
  { label: "Instagram Reels", value: 18 },
  { label: "X/Twitter", value: 10 },
];

function DashboardCard({
  icon,
  title,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={`glass-strong overflow-hidden rounded-2xl ${className}`}>
      <CardContent className="p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/10">
            {icon}
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            {title}
          </h2>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

export function TrendsDashboardPage() {
  const router = useRouter();
  const { brand, selectedTrend, setSelectedTrend } = useDemoStore();

  const featuredTrend =
    selectedTrend ?? getBestTrendForBrand(brand, trends) ?? trends[0];
  const dashboardContent = getDashboardContent(featuredTrend, brand);

  const peakExpectedHours = 8;
  const lifecycleProgress = 54;
  const kpis = [
    { label: "Trend Score", value: featuredTrend.score },
    { label: "Velocity", value: `+${featuredTrend.growthPct}%` },
    { label: "Opportunity", value: featuredTrend.opportunityScore },
    { label: "Half-Life", value: `${featuredTrend.halfLifeHours}h` },
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-5">
          <section className="glass-strong overflow-hidden rounded-2xl">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/60">
                      {brand?.name
                        ? `Scored for ${brand.name}`
                        : "Scored for your brand context"}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <h1 className="text-3xl font-semibold tracking-tight text-white">
                        {featuredTrend.name}
                      </h1>
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/25">
                        Score {featuredTrend.score}
                      </span>
                      <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200 ring-1 ring-sky-400/20">
                        {featuredTrend.category}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedTrend(featuredTrend);
                      router.push("/generator");
                    }}
                    className="rounded-2xl"
                  >
                    Generate Campaign Brief
                  </Button>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.95fr]">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <Flame className="h-4 w-4 text-orange-200" />
                      AI Executive Summary
                    </div>
                    <p className="text-sm leading-6 text-white/72">
                      {dashboardContent.summary}
                    </p>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <Rocket className="h-4 w-4 text-sky-200" />
                      AI Recommendation
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {dashboardContent.recommendations.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-sm font-medium text-white/80"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/20">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 bg-black/15 p-5 sm:p-6 lg:border-l lg:border-t-0">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                  <Clock3 className="h-4 w-4 text-cyan-200" />
                  Trend Lifecycle
                </div>
                <div className="grid grid-cols-3 text-xs font-semibold text-white/55">
                  {lifecycleStages.map((stage) => (
                    <div key={stage}>{stage}</div>
                  ))}
                </div>
                <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400"
                    style={{ width: `${lifecycleProgress}%` }}
                  />
                </div>
                <div className="mt-4 grid gap-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-white/60">Peak expected</span>
                    <span className="font-semibold text-white">
                      in {peakExpectedHours} hours
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-white/60">Expires</span>
                    <span className="font-semibold text-white">
                      in ~{featuredTrend.halfLifeHours} hours
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-white/55">
                  {dashboardContent.lifecycleNote}
                </p>
              </div>
            </div>
          </section>

          <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-4">
            {kpis.map((metric, index) => (
              <div
                key={metric.label}
                className={`p-4 sm:p-5 ${index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}
              >
                <div className="text-xs font-semibold uppercase text-white/50">
                  {metric.label}
                </div>
                <div className="mt-2 text-3xl font-semibold text-white">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <DashboardCard
              icon={<BarChart3 className="h-5 w-5 text-violet-200" />}
              title="Trend Velocity"
            >
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <LineChart data={toVelocityPoints(featuredTrend.velocity)}>
                    <XAxis dataKey="x" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(0,0,0,0.72)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 12,
                        color: "white",
                      }}
                      labelFormatter={() => ""}
                      formatter={(value) => [String(value ?? ""), "Velocity"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="url(#velocityGradient)"
                      strokeWidth={3}
                      dot={false}
                      isAnimationActive
                      animationDuration={900}
                    />
                    <defs>
                      <linearGradient
                        id="velocityGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="55%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>

            <DashboardCard
              icon={<BarChart3 className="h-5 w-5 text-blue-200" />}
              title="Trend Sources"
            >
              <div className="space-y-4">
                {trendSources.map((source) => (
                  <div key={source.label}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm font-medium">
                      <span className="text-white/75">{source.label}</span>
                      <span className="text-white">{source.value}%</span>
                    </div>
                    <Progress
                      value={source.value}
                      className="h-2 bg-white/10"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                  <Gauge className="h-4 w-4 text-emerald-200" />
                  Velocity Change
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: "6h", value: "+12%" },
                    { label: "24h", value: `+${featuredTrend.growthPct}%` },
                    { label: "Peak", value: `${peakExpectedHours}h` },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-xs font-semibold text-white/45">
                        {stat.label}
                      </div>
                      <div className="mt-1 text-lg font-semibold text-white">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DashboardCard>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <DashboardCard
              icon={<Users className="h-5 w-5 text-teal-200" />}
              title="Best Audience"
            >
              <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                {dashboardContent.audiences.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard
              icon={<Smartphone className="h-5 w-5 text-rose-200" />}
              title="Recommended Formats"
            >
              <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                {dashboardContent.formats.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/80"
                  >
                    <span className="text-white/45">#{index + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard
              icon={<CircleHelp className="h-5 w-5 text-lime-200" />}
              title="Why Trending"
            >
              <p className="text-sm leading-6 text-white/70">
                {dashboardContent.why}
              </p>
            </DashboardCard>

            <DashboardCard
              icon={<Clock3 className="h-5 w-5 text-amber-200" />}
              title="Opportunity Window"
            >
              <Progress value={80} className="h-3 bg-white/12" />
              <div className="mt-3 flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="font-medium text-white/70">
                  Best time remaining
                </span>
                <span className="font-semibold text-white">
                  {peakExpectedHours} hours
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {dashboardContent.opportunity}
              </p>
            </DashboardCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
