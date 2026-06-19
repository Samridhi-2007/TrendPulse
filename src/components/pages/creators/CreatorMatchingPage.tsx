"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import AppShell from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDemoStore } from "@/lib/state/demoStore";
import { creators, trends } from "@/lib/mock/data";
import { getBestTrendForBrand, getCreatorsForTrend } from "@/lib/mock/matching";
import { useRouter } from "next/navigation";

export function CreatorMatchingPage() {
  const router = useRouter();
  const { brand, selectedTrend, selectedCreators, setSelectedCreators } =
    useDemoStore();
  const effectiveTrend = selectedTrend ?? getBestTrendForBrand(brand, trends);
  const matchedCreators = React.useMemo(
    () =>
      effectiveTrend
        ? getCreatorsForTrend(effectiveTrend, creators)
        : creators.slice(0, 3),
    [effectiveTrend],
  );

  const [selected, setSelected] = React.useState<string[]>(
    selectedCreators.length
      ? selectedCreators.map((c) => c.id)
      : matchedCreators.map((c) => c.id),
  );

  const top = matchedCreators[0] ?? creators[0];

  React.useEffect(() => {
    setSelectedCreators(creators.filter((c) => selected.includes(c.id)).slice(0, 3));
  }, [selected, setSelectedCreators]);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-semibold text-white/70">Creator Matching</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Best Creator Matches</h1>
            <p className="mt-3 text-white/70">
              Pick 3 creators for {effectiveTrend?.name ?? "the selected trend"}. Fit bars animate; top match is highlighted.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-white/5 text-white/70 ring-1 ring-white/10">Top match: {top.name}</Badge>
            <Button
              variant="primary"
              onClick={() => router.push("/launch")}
              className="rounded-2xl"
            >
              Continue to Launch
            </Button>
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {creators.map((c) => {
            const isTop = c.id === top.id;
            const isSelected = selected.includes(c.id);
            return (
              <motion.button
                key={c.id}
                type="button"
                whileHover={{ scale: 1.01 }}
                onClick={() => {
                  if (!isSelected && selected.length >= 3) return;
                  setSelected((prev) =>
                    prev.includes(c.id) ? prev.filter((x) => x !== c.id) : [...prev, c.id],
                  );
                }}
                className={
                  "text-left rounded-2xl border p-0 transition " +
                  (isTop
                    ? "border-violet-400/35 bg-violet-500/10"
                    : isSelected
                      ? "border-violet-400/25 bg-white/5"
                      : "border-white/10 bg-white/5 hover:brightness-110")
                }
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500/25 to-indigo-500/25 ring-1 ring-white/10" />
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">{c.name}</div>
                          {isTop && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/15 px-2 py-1 text-xs font-semibold text-violet-200 ring-1 ring-violet-400/25">
                              <Star className="h-3.5 w-3.5" />
                              Top
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-white/60">{c.niche}</div>
                      </div>
                    </div>

                    <div className={"rounded-full px-3 py-1 text-xs font-semibold " + (isSelected ? "bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/25" : "bg-white/5 text-white/60 ring-1 ring-white/10")}>
                      {isSelected ? "Selected" : "Tap to select"}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/70">
                    <div>
                      <div className="text-xs text-white/55">Followers</div>
                      <div className="font-semibold text-white/85">{(c.followers / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/55">Engagement</div>
                      <div className="font-semibold text-white/85">{c.engagementRate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/55">City</div>
                      <div className="font-semibold text-white/85">{c.city}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/55">Fit Score</div>
                      <div className="font-semibold text-white/85">{c.fitScore}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-white/60">
                      <span>Fit score</span>
                      <span>{c.fitScore}/100</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.fitScore}%` }}
                        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                        className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-6">
          <Card className="glass-strong p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-white/70">Selected creators</div>
                <div className="mt-2 text-xl font-semibold">{selected.length} / 3</div>
              </div>
              <Button
                variant="primary"
                onClick={() => router.push("/launch")}
                disabled={selected.length !== 3}
                className="rounded-2xl"
              >
                Launch Campaign
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

