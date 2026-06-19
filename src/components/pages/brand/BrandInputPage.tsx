"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Building2,
  Briefcase,
  Users,
  IndianRupee,
  MapPin,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { trends } from "@/lib/mock/data";
import { getBestTrendForBrand } from "@/lib/mock/matching";
import { useDemoStore } from "@/lib/state/demoStore";

const toOpt = (v: string) => ({ value: v, label: v });

const industries = [
  "Skincare",
  "Fitness",
  "Food & Beverage",
  "Wellness",
  "EdTech",
  "Lifestyle",
  "Fashion",
  "Tech",
  "Gaming",
  "Finance",
];

const audiences = [
  "Women 18–34",
  "Men 18–34",
  "Gen Z (13–24)",
  "Millennials (25–40)",
  "Gen X (41–56)",
  "Parents & Families",
  "College Students",
  "Young Professionals",
  "Luxury Buyers",
  "Budget Shoppers",
];

const budgets = [
  "$5k–$15k",
  "$15k–$40k",
  "$40k–$100k",
  "$100k–$250k",
  "$250k–$500k",
  "$500k+",
];

const locations = [
  "National (India)",
  "Metro Cities (Top 8)",
  "Tier 1 Cities",
  "Tier 2 Cities",
  "International – US",
  "International – UK",
  "International – UAE",
  "International – EU",
  "Global",
];

/* ─── Staggered reveal wrapper ─── */
function StaggerReveal({
  children,
  index = 0,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.075,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Field icon map ─── */
const fieldIcons: Record<string, React.ElementType> = {
  "Brand Name": Building2,
  Industry: Briefcase,
  "Target Audience": Users,
  "Budget Range": IndianRupee,
  "Target Location": MapPin,
};

/* ─── Glowing input wrapper ─── */
function GlassInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const Icon = fieldIcons[label];
  return (
    <StaggerReveal index={Object.keys(fieldIcons).indexOf(label)}>
      <div className="group relative">
        <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-white/70">
          {Icon && <Icon className="h-3.5 w-3.5 text-violet-300/70" />}
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/[0.07] focus:shadow-[0_0_20px_rgba(139,92,246,0.15)] focus:ring-2 focus:ring-violet-400/20 group-hover:border-white/20"
        />
      </div>
    </StaggerReveal>
  );
}

/* ─── Glowing select wrapper ─── */
function GlassSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const Icon = fieldIcons[label];
  return (
    <StaggerReveal index={Object.keys(fieldIcons).indexOf(label)}>
      <div className="group relative">
        <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-white/70">
          {Icon && <Icon className="h-3.5 w-3.5 text-violet-300/70" />}
          {label}
        </label>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-10 text-sm text-white outline-none backdrop-blur-sm transition-all duration-300 focus:border-violet-400/60 focus:bg-white/[0.07] focus:shadow-[0_0_20px_rgba(139,92,246,0.15)] focus:ring-2 focus:ring-violet-400/20 group-hover:border-white/20"
          >
            {options.map((o) => (
              <option
                key={o.value}
                value={o.value}
                className="bg-[#0c0c1a] text-white"
              >
                {o.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5L6 8L9 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </StaggerReveal>
  );
}

/* ─── Glowing textarea ─── */
function GlassTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <StaggerReveal index={5}>
      <div className="group relative">
        <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-white/70">
          <Building2 className="h-3.5 w-3.5 text-violet-300/70" />
          {label}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/[0.07] focus:shadow-[0_0_20px_rgba(139,92,246,0.15)] focus:ring-2 focus:ring-violet-400/20 group-hover:border-white/20"
        />
      </div>
    </StaggerReveal>
  );
}

/* ─── Label & value row for side panel ─── */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-2 text-sm last:border-0">
      <span className="text-white/50">{label}</span>
      <span className="font-medium text-white/90">{value}</span>
    </div>
  );
}

/* ─── Main component ─── */
export function BrandInputPage() {
  const router = useRouter();
  const { setBrand, setSelectedCreators, setGeneratedBrief, setSelectedTrend } =
    useDemoStore();

  const [brandName, setBrandName] = React.useState("GlowNest Skincare");
  const [industry, setIndustry] = React.useState("Skincare");
  const [audience, setAudience] = React.useState("Women 18–34");
  const [budgetRange, setBudgetRange] = React.useState("$15k–$40k");
  const [location, setLocation] = React.useState("National (India)");
  const [notes, setNotes] = React.useState(
    "New drop launch next month. We want creator-led routines + limited-time urgency."
  );

  const [progress, setProgress] = React.useState(0);
  const [working, setWorking] = React.useState(false);

  async function onAnalyze() {
    setSelectedCreators([]);
    setGeneratedBrief(null);

    const nextBrand = {
      name: brandName,
      industry,
      audience,
      budgetRange,
      location,
      notes,
    };

    setBrand(nextBrand);
    setSelectedTrend(getBestTrendForBrand(nextBrand, trends));

    setWorking(true);
    setProgress(0);

    const steps = [15, 35, 55, 72, 88, 100];
    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 450));
      setProgress(steps[i]);
    }

    setWorking(false);
    router.push("/dashboard");
  }

  const isFormValid =
    brandName.trim().length > 0 &&
    industry.length > 0 &&
    audience.length > 0 &&
    budgetRange.length > 0 &&
    location.length > 0;

  return (
    <div className="mx-auto max-w-6xl">
      {/* ─── Hero header ─── */}
      <div className="relative mb-10">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-violet-300/80 backdrop-blur-sm">
            <Sparkles className="h-3 w-3" />
            AI-Powered Analysis
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.35rem]">
            <span className="bg-gradient-to-r from-white via-white to-violet-200 bg-clip-text text-transparent">
              Analyze Your
            </span>{" "}
            <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Next Opportunity
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:mx-0">
            Fill in your brand context and let our AI engine scan real-time
            signals, predict trend velocity, and match you with the perfect
            creator partnerships — all in under a minute.
          </p>
        </motion.div>
      </div>

      {/* ─── Main grid: Form card + Side panel ─── */}
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* ─── Glassmorphism form card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-2xl shadow-violet-500/5 backdrop-blur-xl sm:p-8"
        >
          {/* Glass highlight */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/8 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white/90">
                  Brand Profile
                </h2>
                <p className="mt-0.5 text-sm text-white/40">
                  Define your campaign parameters
                </p>
              </div>
              <div className="hidden rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50 sm:block">
                <span className="text-violet-300">5</span> fields
              </div>
            </div>

            {/* Fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <GlassInput
                label="Brand Name"
                value={brandName}
                onChange={setBrandName}
                placeholder="e.g. GlowNest"
              />
              <GlassSelect
                label="Industry"
                value={industry}
                onChange={setIndustry}
                options={industries.map(toOpt)}
              />
              <GlassSelect
                label="Target Audience"
                value={audience}
                onChange={setAudience}
                options={audiences.map(toOpt)}
              />
              <GlassSelect
                label="Budget Range"
                value={budgetRange}
                onChange={setBudgetRange}
                options={budgets.map(toOpt)}
              />
              <div className="sm:col-span-2">
                <GlassSelect
                  label="Target Location"
                  value={location}
                  onChange={setLocation}
                  options={locations.map(toOpt)}
                />
              </div>
              <div className="sm:col-span-2">
                <GlassTextarea
                  label="Campaign Notes (optional)"
                  value={notes}
                  onChange={setNotes}
                  placeholder="Describe your campaign goals, timeline, or any special requirements..."
                  rows={3}
                />
              </div>
            </div>

            {/* ─── CTA button anchored bottom-right ─── */}
            <div className="mt-8 flex flex-col items-end gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={onAnalyze}
                disabled={working || !isFormValid}
                className="group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.35)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(124,58,237,0.5)] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Hover glow ring */}
                <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-2 ring-violet-400/40 transition-opacity duration-300 group-hover:opacity-100" />

                {working ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing Trends…
                  </>
                ) : (
                  <>
                    Analyze Trends
                    <motion.span
                      className="inline-flex"
                      initial={{ x: -4, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
              <span className="text-xs text-white/30">
                Demo only &middot; No API calls
              </span>
            </div>
          </div>
        </motion.div>

        {/* ─── Side panel ─── */}
        <div className="space-y-5">
          {/* Progress card */}
          <StaggerReveal index={0}>
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white/50">
                    Analysis Progress
                  </div>
                  <div className="mt-0.5 text-base font-semibold text-white/90">
                    Trend Scanning
                  </div>
                </div>
                <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-sm font-semibold text-violet-200">
                  {progress}%
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                />
              </div>

              {/* Pipeline steps */}
              <div className="mt-4 space-y-2">
                {[
                  "Signal normalization",
                  "Half-life prediction",
                  "Opportunity score",
                  "Creator relevance",
                ].map((step, idx) => {
                  const active = progress > idx * 25;
                  return (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: active ? 1 : 0.35, x: 0 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      <span
                        className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                          active
                            ? "bg-violet-300 shadow-[0_0_8px_rgba(196,181,253,0.5)]"
                            : "bg-white/20"
                        }`}
                      />
                      <span className={active ? "text-white/80" : "text-white/35"}>
                        {step}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </StaggerReveal>

          {/* Summary card */}
          <StaggerReveal index={1}>
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-300" />
                <h3 className="text-sm font-medium text-white/70">
                  Current Selection
                </h3>
              </div>

              <div className="mt-4 divide-y divide-white/5">
                <InfoRow label="Brand" value={brandName || "—"} />
                <InfoRow label="Industry" value={industry} />
                <InfoRow label="Audience" value={audience} />
                <InfoRow label="Budget" value={budgetRange} />
                <InfoRow label="Location" value={location} />
              </div>
            </div>
          </StaggerReveal>

              {/* Output preview card */}
              <StaggerReveal index={2}>
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
                  <h3 className="text-sm font-medium text-white/50">
                What you&apos;ll get
              </h3>
              <ul className="mt-3 space-y-2.5">
                {[
                  "Trend velocity graph + urgency badge",
                  "AI campaign brief (objective, script, hashtags)",
                  "Creator matches with animated fit scores",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerReveal>
        </div>
      </div>
    </div>
  );
}
