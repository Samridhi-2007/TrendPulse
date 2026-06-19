"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";

import AppShell from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDemoStore } from "@/lib/state/demoStore";
import { trends } from "@/lib/mock/data";
import { getBestTrendForBrand } from "@/lib/mock/matching";
import { useRouter } from "next/navigation";

export function CampaignLaunchPage() {
  const router = useRouter();
  const { brand, selectedTrend, selectedCreators } = useDemoStore();
  const effectiveTrend = selectedTrend ?? getBestTrendForBrand(brand, trends);

  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const estimatedReach = "1.4M+";
  const estimatedEngagement = "62K+";

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-semibold text-white/70">Campaign Launch</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Campaign Ready</h1>
            <p className="mt-3 text-white/70">Demo simulates launch confirmation and success animation.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-white/5 text-white/70 ring-1 ring-white/10">No backend</Badge>
            <Button variant="secondary" onClick={() => router.push("/dashboard")}>
              Back to Trends
            </Button>
          </div>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="glass-strong overflow-hidden">
            <CardContent className="p-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="relative">
                  <motion.div
                    animate={done ? { scale: 1, rotate: 0 } : { scale: 0.9, rotate: -6 }}
                    transition={{ duration: 0.4 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 ring-1 ring-violet-400/30"
                  >
                    {done ? (
                      <CheckCircle2 className="h-7 w-7 text-violet-200" />
                    ) : (
                      <Zap className="h-7 w-7 text-violet-200" />
                    )}
                  </motion.div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-white/60">Campaign Status</div>
                  <div className="mt-1 text-2xl font-semibold">
                    {done ? "Campaign Activated Successfully" : "Activating…"}
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    Launch time: <span className="font-semibold text-white/85">Under 95 Minutes</span>
                  </div>
                </div>
              </motion.div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <MetricCard k="Selected Trend" v={effectiveTrend?.name ?? "Glass Skin"} />
                <MetricCard k="Selected Creators" v={`${Math.max(1, selectedCreators.length)} Creators`} />
                <MetricCard k="Estimated Reach" v={estimatedReach} />
                <MetricCard k="Estimated Engagement" v={estimatedEngagement} />
                <MetricCard k="Status" v={done ? "Live" : "Queued"} />
                <MetricCard k="Mode" v="Creator-led" />
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white/70">Success timeline</div>
                    <div className="mt-2 text-sm text-white/70">Deploy → Brief sent → Creator activation</div>
                  </div>
                  <div className="text-xs font-semibold text-white/60">Demo</div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { t: "Queued", d: done ? "Done" : "" },
                    { t: "Brief sent", d: done ? "Done" : "" },
                    { t: "Creators live", d: done ? "Done" : "" },
                  ].map((x, i) => (
                    <div key={x.t} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <div className="text-xs font-semibold text-white/60">Step {i + 1}</div>
                      <div className="mt-2 text-sm font-semibold text-white/85">{x.t}</div>
                      <div className="mt-2 text-xs text-violet-200">{done ? x.d : ""}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: done ? 1 : 0.7, y: done ? 0 : 10 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-strong p-6">
                <div className="text-sm font-semibold text-white/70">Next actions</div>
                <div className="mt-2 text-2xl font-semibold">Measure momentum</div>
                <p className="mt-2 text-sm text-white/70">
                  In the real product, you’d see reach & engagement updates per creator.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Button variant="primary" onClick={() => router.push("/dashboard")}>
                    View Dashboard
                  </Button>
                  <Button variant="secondary" onClick={() => router.push("/generator")}>
                    Generate another brief
                  </Button>
                </div>
              </Card>
            </motion.div>

            <Card className="glass-strong p-6">
              <div className="text-sm font-semibold text-white/70">Launch summary</div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-violet-300/80" />
                  <span>1 trend selected • {selectedCreators.length || 3} creators</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-violet-300/80" />
                  <span>Estimated reach: {estimatedReach}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-violet-300/80" />
                  <span>Estimated engagement: {estimatedEngagement}</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function MetricCard({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-semibold text-white/60">{k}</div>
      <div className="mt-2 text-sm font-semibold text-white/85">{v}</div>
    </div>
  );
}

