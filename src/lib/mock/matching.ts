import type { Creator, Trend } from "./data";

export type BrandContext = {
  name: string;
  industry: string;
  audience: string;
  budgetRange: string;
  location: string;
  notes?: string;
} | null;

const industryCategoryAliases: Record<string, string[]> = {
  beauty: ["skincare", "beauty", "cosmetic", "skin"],
  edtech: ["edtech", "education", "study", "student", "learning"],
  food: ["food", "beverage", "snack", "drink", "restaurant"],
  wellness: ["wellness", "fitness", "health", "nutrition"],
  lifestyle: ["lifestyle", "travel", "fashion"],
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function scoreTrendForBrand(trend: Trend, brand: BrandContext) {
  if (!brand) return trend.score;

  const industry = normalize(brand.industry);
  const audience = normalize(brand.audience);
  const notes = normalize(brand.notes ?? "");
  const category = normalize(trend.category);
  const trendName = normalize(trend.name);
  const aliases = industryCategoryAliases[category] ?? [category];

  let score = trend.score;

  if (aliases.some((alias) => industry.includes(alias))) score += 120;
  if (trendName.split(" ").some((term) => term && industry.includes(term))) {
    score += 40;
  }
  if (aliases.some((alias) => notes.includes(alias))) score += 25;

  if (category === "beauty" && /women|luxury|buyer/.test(audience)) score += 16;
  if (category === "edtech" && /student|gen z|college/.test(audience)) score += 16;
  if (category === "wellness" && /men|professional|millennial/.test(audience)) {
    score += 10;
  }

  return score;
}

export function getBestTrendForBrand(brand: BrandContext, trends: Trend[]) {
  return (
    trends
      .slice()
      .sort(
        (a, b) => scoreTrendForBrand(b, brand) - scoreTrendForBrand(a, brand),
      )[0] ?? trends[0]
  );
}

export function getDashboardContent(trend: Trend, brand: BrandContext) {
  const brandName = brand?.name || "your brand";
  const audience = brand?.audience || "trend-aware buyers";

  if (trend.id === "glass-skin") {
    return {
      summary:
        "Glass-skin content is accelerating across beauty routines. The strongest move is a quick creator-led routine with a visible texture payoff.",
      recommendations: [
        "Create routine Reels",
        "Publish within 6 hours",
        `Target ${audience}`,
        "Use before/after hooks",
      ],
      audiences: [audience, "Skincare Enthusiasts", "Beauty Creators"],
      formats: ["Instagram Reels", "Routine Carousel", "Creator Story"],
      why:
        "Beauty creators are turning glow routines into saveable before/after content, giving skincare brands a clear product-demo angle.",
      lifecycleNote:
        "Lifecycle is moving from creator niche into mainstream beauty feeds, so visible proof matters more than broad education right now.",
      opportunity:
        `${brandName} can use the trend as a fast product trial moment before the feed gets crowded with similar routines.`,
    };
  }

  if (trend.id === "protein-snacks") {
    return {
      summary:
        "Protein snack content is rising as creators compare convenience, taste, and macro-friendly swaps.",
      recommendations: [
        "Create snack test Reels",
        "Publish within 12 hours",
        `Target ${audience}`,
        "Use taste-test hooks",
      ],
      audiences: [audience, "Fitness Buyers", "Busy Professionals"],
      formats: ["Instagram Reels", "Comparison Carousel", "Creator Review"],
      why:
        "Food and fitness creators are making snack choices feel practical, measurable, and easy to copy.",
      lifecycleNote:
        "Lifecycle is in practical adoption, so comparison content can still win attention without heavy production.",
      opportunity:
        `${brandName} can own a useful snack-choice angle while search and social interest are still climbing.`,
    };
  }

  return {
    summary:
      "AI study content is accelerating rapidly. The best window is to publish a useful creator explanation while the topic is still compounding.",
    recommendations: [
      "Create Instagram Reels",
      "Publish within 4 hours",
      `Target ${audience}`,
      "Use educational hooks",
    ],
    audiences: [audience, "Students", "Young Professionals"],
    formats: ["Instagram Reels", "LinkedIn Carousel", "X Thread"],
    why:
      "Creator discussions around AI tools have surged after recent launches and viral demos, making practical study content easier to understand and share.",
    lifecycleNote:
      "Lifecycle is moving from early traction into mainstream adoption, so speed matters more than polish right now.",
    opportunity:
      `${brandName} can translate the trend into one useful creator workflow before the window narrows.`,
  };
}

export function getCreatorsForTrend(trend: Trend, creators: Creator[]) {
  const categoryTerms = [
    trend.category.toLowerCase(),
    trend.name.toLowerCase().split(" ")[0],
  ];

  return creators
    .slice()
    .sort((a, b) => {
      const aMatch = categoryTerms.some((term) =>
        a.niche.toLowerCase().includes(term),
      )
        ? 12
        : 0;
      const bMatch = categoryTerms.some((term) =>
        b.niche.toLowerCase().includes(term),
      )
        ? 12
        : 0;
      return b.fitScore + bMatch - (a.fitScore + aMatch);
    })
    .slice(0, 3);
}
