"use client";

import { create } from "zustand";
import type { CampaignBrief, Creator, Trend } from "../mock/data";

type DemoState = {
  brand: {
    name: string;
    industry: string;
    audience: string;
    budgetRange: string;
    location: string;
    notes?: string;
  } | null;
  selectedTrend: Trend | null;
  selectedCreators: Creator[];
  generatedBrief: CampaignBrief | null;
  setBrand: (b: DemoState["brand"]) => void;
  setSelectedTrend: (t: Trend | null) => void;
  setSelectedCreators: (c: Creator[]) => void;
  setGeneratedBrief: (b: CampaignBrief | null) => void;
};

export const useDemoStore = create<DemoState>((set) => ({
  brand: null,
  selectedTrend: null,
  selectedCreators: [],
  generatedBrief: null,
  setBrand: (b) => set({ brand: b }),
  setSelectedTrend: (t) => set({ selectedTrend: t }),
  setSelectedCreators: (c) => set({ selectedCreators: c }),
  setGeneratedBrief: (b) => set({ generatedBrief: b }),
}));

