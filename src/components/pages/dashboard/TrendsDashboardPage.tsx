"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Check,
  CircleHelp,
  Clock3,
  Flame,
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
import { useDemoStore } from "@/lib/state/demoStore";
import { trends } from "@/lib/mock/data";

function toVelocityPoints(v: number[]) {
  return v.map((value, i) => ({ x: i + 1, value }));
}

const recommendationItems = [
  "Create Instagram Reels",
  "Publish within 4 hours",
  "Target Gen-Z audience",
  "Use educational hooks",
];

const audienceItems = ["Students", "Young Professionals", "Startup Founders"];

const formatItems = ["Instagram Reels", "LinkedIn Carousel", "X Thread"];

const lifecycleStages = ["Meme", "Cultural", "Seasonal"];

const velocityStats = [
  { label: "Last 6h", value: "+12%" },
  { label: "Last 24h", value: "+38%" },
  { label: "Predicted Peak", value: "18h" },
];

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
  const { brand, setSelectedTrend } = useDemoStore();

  const featuredTrend =
    trends.find((trend) => trend.id === "ai-study-reels") ?? trends[0];

  const metrics = [
    { label: "Reach", value: "92%" },
    { label: "Engagement", value: "84%" },
    { label: "Conversion", value: "63%" },
  ];
  const halfLifeRemainingHours = 26;
  const lifecyclePosition = 34;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white/60">
              {brand?.name
                ? `Scored for ${brand.name}`
                : "Scored for your brand context"}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Trend Intelligence Dashboard
            </h1>
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

        <div className="space-y-5">
          <DashboardCard
            icon={<Flame className="h-5 w-5 text-orange-200" />}
            title="AI Agents"
          >
            <div className="text-sm font-semibold text-white/65">
              Score 89 <span className="px-1 text-white/35">•</span> AI Category
            </div>
            <div className="mt-6">
              <h3 className="text-base font-semibold text-white">
                Executive Summary
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                Trend is accelerating rapidly. Best window to publish content is
                within next 6 hours.
              </p>
            </div>
          </DashboardCard>

          <DashboardCard
            icon={<Rocket className="h-5 w-5 text-sky-200" />}
            title="AI Recommendation"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {recommendationItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-white/80"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/20">
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard
            icon={<BarChart3 className="h-5 w-5 text-violet-200" />}
            title="Trend Velocity"
          >
            <div className="h-[260px]">
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
            icon={<Clock3 className="h-5 w-5 text-cyan-200" />}
            title="Trend Lifecycle / Half-Life"
          >
            <div className="grid grid-cols-3 text-xs font-semibold text-white/55">
              {lifecycleStages.map((stage) => (
                <div key={stage}>{stage}</div>
              ))}
            </div>
            <div className="relative mt-4 h-4 rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-0 w-1/3 rounded-l-full bg-emerald-400/70" />
              <div className="absolute inset-y-0 left-1/3 w-1/3 bg-sky-400/45" />
              <div className="absolute inset-y-0 left-2/3 w-1/3 rounded-r-full bg-violet-400/35" />
              <div className="absolute inset-y-0 left-1/3 w-px bg-black/30" />
              <div className="absolute inset-y-0 left-2/3 w-px bg-black/30" />
              <div
                className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.55)]"
                style={{ left: `${lifecyclePosition}%` }}
              />
            </div>
            <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-semibold text-white">
                {halfLifeRemainingHours}h remaining
              </div>
              <div className="text-sm text-white/60">
                Currently crossing from meme burst into cultural adoption.
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            icon={<BarChart3 className="h-5 w-5 text-emerald-200" />}
            title="Velocity Change Indicator"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {velocityStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="text-xs font-semibold text-white/55">
                    {stat.label}
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-white">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 h-[86px] rounded-2xl border border-white/10 bg-black/20 p-3">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart data={toVelocityPoints(featuredTrend.velocity)}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#34d399"
                    strokeWidth={3}
                    dot={false}
                    isAnimationActive
                    animationDuration={700}
                  />
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
                  <Progress value={source.value} className="h-2 bg-white/10" />
                </div>
              ))}
            </div>
          </DashboardCard>

          <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-3">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`p-5 ${index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}
              >
                <div className="text-sm font-semibold text-white/60">
                  {metric.label}
                </div>
                <div className="mt-3 text-3xl font-semibold text-white">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          <DashboardCard
            icon={<Clock3 className="h-5 w-5 text-amber-200" />}
            title="Opportunity Window"
          >
            <Progress value={80} className="h-3 bg-white/12" />
            <div className="mt-3 text-sm font-medium text-white/70">
              Best time remaining: 8 hours
            </div>
          </DashboardCard>

          <DashboardCard
            icon={<Users className="h-5 w-5 text-teal-200" />}
            title="Best Audience"
          >
            <div className="space-y-2">
              {audienceItems.map((item) => (
                <div key={item} className="text-sm font-medium text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard
            icon={<Smartphone className="h-5 w-5 text-rose-200" />}
            title="Recommended Formats"
          >
            <div className="space-y-3">
              {formatItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-white/80"
                >
                  <span className="w-8 shrink-0 text-white/45">
                    #{index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard
            icon={<CircleHelp className="h-5 w-5 text-lime-200" />}
            title="Why Is This Trending?"
          >
            <p className="max-w-2xl text-sm leading-6 text-white/70">
              Creator discussions around AI tools have surged after recent
              launches and viral demos.
            </p>
          </DashboardCard>
        </div>
      </div>
    </AppShell>
  );
}

// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { TrendingUp } from "lucide-react";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// import AppShell from "@/components/shell/AppShell";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { useDemoStore } from "@/lib/state/demoStore";
// import { trends, type Trend } from "@/lib/mock/data";

// function urgencyToBadge(urgency: Trend["urgency"]) {
//   if (urgency === "High")
//     return {
//       className: "bg-red-500/15 text-red-200 ring-1 ring-red-400/25",
//       label: "Urgent",
//     };
//   if (urgency === "Medium")
//     return {
//       className: "bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/25",
//       label: "Rising",
//     };
//   return {
//     className: "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/25",
//     label: "Stable",
//   };
// }

// function toVelocityPoints(v: number[]) {
//   return v.map((value, i) => ({ x: i + 1, value }));
// }

// export function TrendsDashboardPage() {
//   const router = useRouter();
//   const { brand, setSelectedTrend } = useDemoStore();

//   const [selectedId, setSelectedId] = React.useState<string | null>(
//     trends[0]?.id ?? null,
//   );

//   const displayed = trends.slice(0, 5);
//   const selected = displayed.find((t) => t.id === selectedId) ?? displayed[0];

//   return (
//     <AppShell>
//       <div className="mx-auto max-w-6xl">
//         <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
//           <div>
//             <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
//               <TrendingUp className="h-4 w-4 text-violet-200" />
//               Trending Opportunities
//             </div>
//             <h1 className="mt-2 text-3xl font-semibold tracking-tight">
//               Trending Opportunities
//             </h1>
//             <p className="mt-3 text-white/70">
//               {brand?.name ? (
//                 <>
//                   Scored for{" "}
//                   <span className="font-semibold text-white/85">
//                     {brand.name}
//                   </span>{" "}
//                   •
//                 </>
//               ) : (
//                 <>Scored for your brand context •</>
//               )}{" "}
//               pick a trend to generate a campaign.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <Badge className="bg-white/5 text-white/70 ring-1 ring-white/10">
//               5 trends • 10s preview
//             </Badge>
//             <Button
//               variant="primary"
//               onClick={() => {
//                 setSelectedTrend(selected);
//                 router.push("/generator");
//               }}
//               className="rounded-2xl"
//             >
//               Generate Campaign Brief
//             </Button>
//           </div>
//         </div>

//         <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
//           <div className="space-y-4">
//             {displayed.map((t) => {
//               const active = t.id === selected.id;
//               const badge = urgencyToBadge(t.urgency);
//               return (
//                 <motion.button
//                   type="button"
//                   key={t.id}
//                   onClick={() => setSelectedId(t.id)}
//                   initial={false}
//                   animate={{ scale: active ? 1.01 : 1 }}
//                   whileHover={{ scale: active ? 1.01 : 1.01 }}
//                   className={
//                     "w-full text-left glass-strong rounded-2xl p-5 transition " +
//                     (active
//                       ? "ring-1 ring-violet-400/35 bg-white/5"
//                       : "hover:brightness-110")
//                   }
//                 >
//                   <div className="flex items-start justify-between gap-3">
//                     <div>
//                       <div className="flex items-center gap-3">
//                         <div className="text-base font-semibold text-white/90">
//                           {t.name}
//                         </div>
//                         <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200 ring-1 ring-violet-400/25">
//                           Score {t.score}
//                         </span>
//                       </div>
//                       <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/70">
//                         <span>{t.growthPct}% growth</span>
//                         <span>•</span>
//                         <span>{t.category}</span>
//                         <span>•</span>
//                         <span>Half-life ~{t.halfLifeHours}h</span>
//                       </div>
//                     </div>
//                     <div
//                       className={
//                         "rounded-full px-3 py-1 text-xs font-semibold " +
//                         badge.className
//                       }
//                     >
//                       {badge.label}
//                     </div>
//                   </div>

//                   <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
//                     <div className="flex items-center justify-between">
//                       <div className="text-xs font-semibold text-white/60">
//                         Opportunity
//                       </div>
//                       <div className="text-xs font-semibold text-white/75">
//                         {t.opportunityScore}
//                       </div>
//                     </div>
//                     <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
//                       <motion.div
//                         initial={{ width: 5 }}
//                         animate={{
//                           width: `${Math.min(100, t.opportunityScore)}%`,
//                         }}
//                         transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
//                         className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
//                       />
//                     </div>
//                   </div>
//                 </motion.button>
//               );
//             })}
//           </div>

//           <Card className="glass-strong overflow-hidden">
//             <CardContent className="p-6">
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <div className="text-sm font-semibold text-white/70">
//                     Selected Trend
//                   </div>
//                   <div className="mt-1 text-2xl font-semibold">
//                     {selected.name}
//                   </div>
//                   <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/70">
//                     <Badge className="bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/25">
//                       Velocity
//                     </Badge>
//                     <span className="font-semibold text-white/85">
//                       {selected.growthPct}%
//                     </span>
//                     <span>growth</span>
//                     <span>•</span>
//                     <span>Half-life ~{selected.halfLifeHours}h</span>
//                   </div>
//                 </div>
//                 <div className="rounded-2xl bg-gradient-to-br from-violet-500/15 to-indigo-500/10 px-4 py-3 text-right">
//                   <div className="text-xs font-semibold text-white/60">
//                     Trend Score
//                   </div>
//                   <div className="mt-1 text-3xl font-semibold text-white/90">
//                     {selected.score}
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-5 h-[280px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={toVelocityPoints(selected.velocity)}>
//                     <XAxis dataKey="x" hide />
//                     <YAxis hide />
//                     <Tooltip
//                       contentStyle={{
//                         background: "rgba(0,0,0,0.6)",
//                         border: "1px solid rgba(255,255,255,0.12)",
//                         borderRadius: 12,
//                         color: "white",
//                       }}
//                       labelFormatter={() => ""}
//                       formatter={(v: any) => [`${v}`, "Velocity"]}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="value"
//                       stroke="url(#grad)"
//                       strokeWidth={3}
//                       dot={false}
//                       isAnimationActive
//                       animationDuration={900}
//                     />
//                     <defs>
//                       <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
//                         <stop offset="0%" stopColor="#8b5cf6" />
//                         <stop offset="100%" stopColor="#4f46e5" />
//                       </linearGradient>
//                     </defs>
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="mt-4 grid gap-3 sm:grid-cols-3">
//                 {[
//                   { k: "Opportunity", v: selected.opportunityScore },
//                   { k: "Category", v: selected.category },
//                   { k: "Urgency", v: selected.urgency },
//                 ].map((x) => (
//                   <div
//                     key={x.k}
//                     className="rounded-2xl border border-white/10 bg-white/5 p-4"
//                   >
//                     <div className="text-xs font-semibold text-white/60">
//                       {x.k}
//                     </div>
//                     <div className="mt-2 text-sm font-semibold text-white/85">
//                       {String(x.v)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </AppShell>
//   );
// }
