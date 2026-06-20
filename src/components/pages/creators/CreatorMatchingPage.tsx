"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Users, MapPin, DollarSign, Target, Briefcase, Globe, Filter, Search, X, Sparkles, ChevronDown } from "lucide-react";

import AppShell from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDemoStore } from "@/lib/state/demoStore";
import { useRouter } from "next/navigation";

// Brand Profile Fields
interface BrandProfile {
  brandName: string;
  industry: string;
  targetAudience: string;
  budgetRange: string;
  targetLocation: string;
}

// 15 diverse creators with various categories and detailed attributes
const allCreators = [
  // Beauty & Skincare (3 creators)
  {
    id: "neha",
    name: "Neha Sharma",
    niche: "Beauty & Skincare",
    followers: 245000,
    engagementRate: 4.8,
    city: "Mumbai",
    fitScore: 0,
    category: "Beauty",
    language: "Hindi, English",
    postingFrequency: 4.5,
    audienceDemographic: "Women 18-34"
  },
  {
    id: "priya",
    name: "Priya Patel",
    niche: "Beauty & Makeup",
    followers: 189000,
    engagementRate: 5.2,
    city: "Delhi",
    fitScore: 0,
    category: "Beauty",
    language: "Hindi, English",
    postingFrequency: 5.0,
    audienceDemographic: "Women 18-30"
  },
  {
    id: "riya",
    name: "Riya Mehta",
    niche: "Skincare & Wellness",
    followers: 156000,
    engagementRate: 4.5,
    city: "Bangalore",
    fitScore: 0,
    category: "Beauty",
    language: "English, Tamil",
    postingFrequency: 3.8,
    audienceDemographic: "Women 25-40"
  },
  
  // Fashion & Lifestyle (3 creators)
  {
    id: "rahul",
    name: "Rahul Singh",
    niche: "Fashion & Lifestyle",
    followers: 312000,
    engagementRate: 4.2,
    city: "Mumbai",
    fitScore: 0,
    category: "Fashion",
    language: "Hindi, English",
    postingFrequency: 4.0,
    audienceDemographic: "Men & Women 18-35"
  },
  {
    id: "ananya",
    name: "Ananya Reddy",
    niche: "Fashion & Style",
    followers: 278000,
    engagementRate: 4.9,
    city: "Hyderabad",
    fitScore: 0,
    category: "Fashion",
    language: "Telugu, English",
    postingFrequency: 4.2,
    audienceDemographic: "Women 18-30"
  },
  {
    id: "karan",
    name: "Karan Joshi",
    niche: "Street Fashion",
    followers: 134000,
    engagementRate: 3.8,
    city: "Delhi",
    fitScore: 0,
    category: "Fashion",
    language: "Hindi, English",
    postingFrequency: 3.5,
    audienceDemographic: "Men 18-25"
  },
  
  // Tech & Gaming (3 creators)
  {
    id: "vikram",
    name: "Vikram Shah",
    niche: "Tech & Gadgets",
    followers: 423000,
    engagementRate: 3.5,
    city: "Bangalore",
    fitScore: 0,
    category: "Tech",
    language: "English, Kannada",
    postingFrequency: 3.0,
    audienceDemographic: "Men 18-40"
  },
  {
    id: "nikhil",
    name: "Nikhil Rao",
    niche: "Gaming & Esports",
    followers: 567000,
    engagementRate: 4.1,
    city: "Pune",
    fitScore: 0,
    category: "Tech",
    language: "English, Marathi",
    postingFrequency: 4.8,
    audienceDemographic: "Men & Women 16-30"
  },
  {
    id: "sneha",
    name: "Sneha Iyer",
    niche: "AI & Future Tech",
    followers: 89000,
    engagementRate: 5.8,
    city: "Chennai",
    fitScore: 0,
    category: "Tech",
    language: "English, Tamil",
    postingFrequency: 2.5,
    audienceDemographic: "Men & Women 25-45"
  },
  
  // Food & Travel (3 creators)
  {
    id: "amit",
    name: "Amit Kumar",
    niche: "Food & Cuisine",
    followers: 345000,
    engagementRate: 4.7,
    city: "Delhi",
    fitScore: 0,
    category: "Food",
    language: "Hindi, English",
    postingFrequency: 4.3,
    audienceDemographic: "Men & Women 18-45"
  },
  {
    id: "sonal",
    name: "Sonal Desai",
    niche: "Travel & Adventure",
    followers: 198000,
    engagementRate: 5.1,
    city: "Goa",
    fitScore: 0,
    category: "Travel",
    language: "English, Gujarati",
    postingFrequency: 3.2,
    audienceDemographic: "Men & Women 20-40"
  },
  {
    id: "raj",
    name: "Raj Malhotra",
    niche: "Food & Lifestyle",
    followers: 167000,
    engagementRate: 4.3,
    city: "Mumbai",
    fitScore: 0,
    category: "Food",
    language: "Hindi, English",
    postingFrequency: 3.8,
    audienceDemographic: "Men & Women 25-50"
  },
  
  // Fitness & Health (3 creators)
  {
    id: "aditi",
    name: "Aditi Sharma",
    niche: "Fitness & Wellness",
    followers: 456000,
    engagementRate: 5.6,
    city: "Bangalore",
    fitScore: 0,
    category: "Fitness",
    language: "English, Hindi",
    postingFrequency: 4.7,
    audienceDemographic: "Women 18-40"
  },
  {
    id: "arjun",
    name: "Arjun Nair",
    niche: "Health & Nutrition",
    followers: 234000,
    engagementRate: 4.4,
    city: "Chennai",
    fitScore: 0,
    category: "Fitness",
    language: "English, Tamil",
    postingFrequency: 3.9,
    audienceDemographic: "Men & Women 25-50"
  },
  {
    id: "meera",
    name: "Meera Krishnan",
    niche: "Yoga & Mindfulness",
    followers: 123000,
    engagementRate: 6.2,
    city: "Kochi",
    fitScore: 0,
    category: "Fitness",
    language: "English, Malayalam",
    postingFrequency: 4.1,
    audienceDemographic: "Women 25-55"
  }
];

export function CreatorMatchingPage() {
  const router = useRouter();
  const { selectedCreators, setSelectedCreators } = useDemoStore();

  const [selected, setSelected] = React.useState<string[]>([]);
  const [showBrandProfile, setShowBrandProfile] = React.useState(false);
  const [brandProfile, setBrandProfile] = React.useState<BrandProfile>({
    brandName: "",
    industry: "",
    targetAudience: "",
    budgetRange: "",
    targetLocation: "",
  });

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState<string>("");

  // Get unique categories for filters
  const categories = Array.from(new Set(allCreators.map(c => c.category)));

  // Weighted fit score calculation
  const calculateFitScore = (creator: typeof allCreators[0], brand: BrandProfile) => {
    // Weight: 0.35 niche + 0.30 engagement + 0.20 audience + 0.10 language + 0.05 frequency
    
    // 1. Niche match (0.35)
    let nicheScore = 0;
    if (brand.industry) {
      const brandIndustry = brand.industry.toLowerCase();
      const creatorNiche = creator.niche.toLowerCase();
      const creatorCategory = creator.category.toLowerCase();
      
      if (creatorNiche.includes(brandIndustry) || creatorCategory.includes(brandIndustry)) {
        nicheScore = 1.0;
      } else if (brandIndustry.includes(creatorCategory)) {
        nicheScore = 0.7;
      } else if (creatorCategory.includes(brandIndustry.split(' ')[0])) {
        nicheScore = 0.5;
      } else {
        nicheScore = 0.3;
      }
    } else {
      nicheScore = 0.5; // Default if no industry specified
    }
    
    // 2. Engagement rate (0.30) - normalized to 0-1 scale
    const maxEngagement = 6.2; // Max engagement rate among creators
    const engagementScore = Math.min(creator.engagementRate / maxEngagement, 1.0);
    
    // 3. Audience match (0.20)
    let audienceScore = 0;
    if (brand.targetAudience) {
      const brandAudience = brand.targetAudience.toLowerCase();
      const creatorAudience = creator.audienceDemographic.toLowerCase();
      
      if (creatorAudience.includes(brandAudience) || brandAudience.includes(creatorAudience.split(' ')[0])) {
        audienceScore = 1.0;
      } else if (brandAudience.includes('women') && creatorAudience.includes('women')) {
        audienceScore = 0.8;
      } else if (brandAudience.includes('men') && creatorAudience.includes('men')) {
        audienceScore = 0.8;
      } else if (brandAudience.includes('all') || brandAudience.includes('everyone')) {
        audienceScore = 1.0;
      } else {
        audienceScore = 0.4;
      }
    } else {
      audienceScore = 0.5;
    }
    
    // 4. Language match (0.10)
    let languageScore = 0;
    if (brand.targetLocation) {
      const brandLocation = brand.targetLocation.toLowerCase();
      const creatorLanguages = creator.language.toLowerCase();
      
      if (brandLocation === 'national' || brandLocation === 'international') {
        languageScore = 0.8;
      } else {
        // Check if creator speaks the local language
        const locationLanguageMap: {[key: string]: string} = {
          'mumbai': 'hindi',
          'delhi': 'hindi',
          'bangalore': 'kannada',
          'hyderabad': 'telugu',
          'chennai': 'tamil',
          'pune': 'marathi',
          'goa': 'konkani',
          'kochi': 'malayalam'
        };
        
        const localLanguage = locationLanguageMap[brandLocation];
        if (localLanguage && creatorLanguages.includes(localLanguage)) {
          languageScore = 1.0;
        } else if (creatorLanguages.includes('english')) {
          languageScore = 0.7;
        } else {
          languageScore = 0.3;
        }
      }
    } else {
      languageScore = 0.5;
    }
    
    // 5. Posting frequency (0.05) - normalized
    const maxFrequency = 5.0;
    const frequencyScore = Math.min(creator.postingFrequency / maxFrequency, 1.0);
    
    // Calculate weighted score
    const weightedScore = (nicheScore * 0.35) + 
                         (engagementScore * 0.30) + 
                         (audienceScore * 0.20) + 
                         (languageScore * 0.10) + 
                         (frequencyScore * 0.05);
    
    return Math.round(weightedScore * 100);
  };

  // Get top 3 creators based on weighted fit score
  const getTopCreators = (brand: BrandProfile, categoryFilter?: string, search?: string) => {
    let creators = allCreators;
    
    // Apply category filter
    if (categoryFilter) {
      creators = creators.filter(c => c.category === categoryFilter);
    }
    
    // Apply search filter
    if (search) {
      creators = creators.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.niche.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Calculate fit scores
    const scoredCreators = creators.map(creator => ({
      ...creator,
      fitScore: calculateFitScore(creator, brand)
    }));
    
    // Sort by fit score descending and return top 3
    return scoredCreators.sort((a, b) => b.fitScore - a.fitScore).slice(0, 3);
  };

  // Get the top 3 creators based on current filters
  const displayCreators = getTopCreators(brandProfile, filterCategory, searchTerm);
  
  // If no creators match filters, show top 3 overall
  const finalCreators = displayCreators.length === 0 
    ? getTopCreators(brandProfile, undefined, undefined)
    : displayCreators;

  const top = finalCreators[0];

  React.useEffect(() => {
    // Auto-select top 3 creators when page loads
    const topThree = getTopCreators(brandProfile);
    setSelected(topThree.map(c => c.id));
    setSelectedCreators(topThree);
  }, []);

  const handleBrandProfileSubmit = () => {
    const matchedCreators = getTopCreators(brandProfile);
    setSelected(matchedCreators.map(c => c.id));
    setSelectedCreators(matchedCreators);
    setShowBrandProfile(false);
  };

  const getCategoryEmoji = (category: string) => {
    switch(category) {
      case 'Beauty': return '💄';
      case 'Fashion': return '👗';
      case 'Tech': return '💻';
      case 'Food': return '🍳';
      case 'Travel': return '✈️';
      case 'Fitness': return '💪';
      default: return '✨';
    }
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-semibold text-white/70">Creator Matching</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Best Creator Matches</h1>
            <p className="mt-3 text-white/70">Top 3 creators ranked by weighted fit score</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-white/5 text-white/70 ring-1 ring-white/10">
              {finalCreators.length} creators matched
            </Badge>
            <Button
              variant="primary"
              onClick={() => setShowBrandProfile(true)}
              className="rounded-2xl"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Brand Profile
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/launch")}
              className="rounded-2xl"
            >
              Continue to Launch
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search creators by name, niche, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-10 py-2.5 text-sm text-white/80 placeholder:text-white/30 focus:border-white/20 focus:outline-none"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 focus:border-white/20 focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {getCategoryEmoji(category)} {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Show fit score legend */}
        <div className="mt-4 flex items-center gap-4 text-xs text-white/50">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            Excellent (80-100)
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400"></span>
            Good (60-79)
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-rose-400"></span>
            Needs Review (0-59)
          </span>
        </div>

        {/* Show only top 3 creators */}
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {finalCreators.map((c) => {
            const isTop = c.id === top?.id;
            const isSelected = selected.includes(c.id);
            const rank = finalCreators.indexOf(c) + 1;
            
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
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500/25 to-indigo-500/25 ring-1 ring-white/10 flex items-center justify-center text-xl">
                        {getCategoryEmoji(c.category)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">{c.name}</div>
                          {isTop && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/15 px-2 py-1 text-xs font-semibold text-violet-200 ring-1 ring-violet-400/25">
                              <Star className="h-3.5 w-3.5" />
                              #1 Match
                            </span>
                          )}
                          {rank <= 3 && !isTop && (
                            <Badge className="bg-white/5 text-white/50 ring-1 ring-white/10 text-xs">
                              #{rank}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-white/60">{c.niche}</div>
                        <div className="text-xs text-white/40">{c.category}</div>
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
                      <div className="text-xs text-white/55">Location</div>
                      <div className="font-semibold text-white/85">{c.city}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/55">Frequency</div>
                      <div className="font-semibold text-white/85">{c.postingFrequency}/wk</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-white/60">
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Weighted Fit Score
                      </span>
                      <span className={`font-bold ${getFitScoreColor(c.fitScore)}`}>
                        {c.fitScore}/100
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.fitScore}%` }}
                        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                        className={`h-2 rounded-full ${
                          c.fitScore >= 80 ? 'bg-emerald-400' :
                          c.fitScore >= 60 ? 'bg-amber-400' :
                          'bg-rose-400'
                        }`}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-white/30">
                      <span>Niche: 35%</span>
                      <span>Engagement: 30%</span>
                      <span>Audience: 20%</span>
                      <span>Language: 10%</span>
                      <span>Frequency: 5%</span>
                    </div>
                  </div>

                  {/* Show detailed match breakdown */}
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <div className="grid grid-cols-5 gap-1 text-[10px] text-white/40">
                      <div className="text-center">
                        <div className="font-semibold text-white/60">
                          {Math.round((c.fitScore / 100) * 35)}%
                        </div>
                        <div>Niche</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-white/60">
                          {Math.round((c.fitScore / 100) * 30)}%
                        </div>
                        <div>Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-white/60">
                          {Math.round((c.fitScore / 100) * 20)}%
                        </div>
                        <div>Audience</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-white/60">
                          {Math.round((c.fitScore / 100) * 10)}%
                        </div>
                        <div>Language</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-white/60">
                          {Math.round((c.fitScore / 100) * 5)}%
                        </div>
                        <div>Frequency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Show message if no creators match */}
        {finalCreators.length === 0 && (
          <div className="mt-7 text-center text-white/50">
            No creators match your filters. Showing top 3 creators instead.
          </div>
        )}

        <div className="mt-6">
          <Card className="glass-strong p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-white/70">Selected creators</div>
                <div className="mt-2 text-xl font-semibold">{selected.length} / 3</div>
                <div className="mt-1 text-xs text-white/40">
                  {selected.map(id => allCreators.find(c => c.id === id)?.name).join(', ')}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => {
                    const topThree = getTopCreators(brandProfile);
                    setSelected(topThree.map(c => c.id));
                    setSelectedCreators(topThree);
                  }}
                  className="rounded-2xl"
                >
                  Auto-select Top 3
                </Button>
                <Button
                  variant="primary"
                  onClick={() => router.push("/launch")}
                  disabled={selected.length !== 3}
                  className="rounded-2xl"
                >
                  Launch Campaign
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Brand Profile Modal */}
      {showBrandProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="relative w-full max-w-2xl rounded-3xl bg-[#0a0a0f] border border-white/10 p-8"
          >
            <button
              onClick={() => setShowBrandProfile(false)}
              className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-white/50 hover:text-white/80"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div>
                <Badge className="bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30">
                  Brand Profile
                </Badge>
                <h2 className="mt-3 text-2xl font-semibold text-white">Define Your Campaign Parameters</h2>
                <p className="mt-1 text-sm text-white/50">5 fields to match with the perfect creators</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-white/70">Brand Name</label>
                  <input
                    type="text"
                    value={brandProfile.brandName}
                    onChange={(e) => setBrandProfile({ ...brandProfile, brandName: e.target.value })}
                    placeholder="Your brand name"
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 placeholder:text-white/30 focus:border-white/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white/70">Industry / Category</label>
                  <select
                    value={brandProfile.industry}
                    onChange={(e) => setBrandProfile({ ...brandProfile, industry: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 focus:border-white/20 focus:outline-none"
                  >
                    <option value="">Select industry</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {getCategoryEmoji(category)} {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-white/70">Target Audience</label>
                  <input
                    type="text"
                    value={brandProfile.targetAudience}
                    onChange={(e) => setBrandProfile({ ...brandProfile, targetAudience: e.target.value })}
                    placeholder="e.g., Women 18-34, Millennials, Gen Z"
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 placeholder:text-white/30 focus:border-white/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white/70">Budget Range</label>
                  <select
                    value={brandProfile.budgetRange}
                    onChange={(e) => setBrandProfile({ ...brandProfile, budgetRange: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 focus:border-white/20 focus:outline-none"
                  >
                    <option value="">Select budget range</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-white/70">Target Location</label>
                  <select
                    value={brandProfile.targetLocation}
                    onChange={(e) => setBrandProfile({ ...brandProfile, targetLocation: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 focus:border-white/20 focus:outline-none"
                  >
                    <option value="">Select location</option>
                    <option value="National">National (All locations)</option>
                    <option value="International">International</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pune">Pune</option>
                    <option value="Goa">Goa</option>
                    <option value="Kochi">Kochi</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/5">
                <Button 
                  variant="primary" 
                  className="flex-1 rounded-2xl"
                  onClick={handleBrandProfileSubmit}
                >
                  Apply Profile & Match Creators
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowBrandProfile(false)}
                  className="rounded-2xl"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AppShell>
  );
}