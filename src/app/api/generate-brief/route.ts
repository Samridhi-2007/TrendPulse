import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

type GenerateBriefRequest = {
  trendName: string;
  trendCategory: string;
  trendScore: number;
};

type CampaignBrief = {
  objective: string;
  contentStrategy: string;
  reelScript: string;
  hashtags: string[];
  cta: string;
};

function isCampaignBrief(value: unknown): value is CampaignBrief {
  if (!value || typeof value !== "object") return false;

  const brief = value as Record<string, unknown>;

  return (
    typeof brief.objective === "string" &&
    typeof brief.contentStrategy === "string" &&
    typeof brief.reelScript === "string" &&
    Array.isArray(brief.hashtags) &&
    brief.hashtags.every((tag) => typeof tag === "string") &&
    typeof brief.cta === "string"
  );
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error("Gemini request timed out")), ms);
    }),
  ]);
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const body = (await request.json()) as Partial<GenerateBriefRequest>;

    if (
      typeof body.trendName !== "string" ||
      typeof body.trendCategory !== "string" ||
      typeof body.trendScore !== "number"
    ) {
      throw new Error("Invalid request body");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `Generate a campaign brief for this trend.

Trend name: ${body.trendName}
Trend category: ${body.trendCategory}
Trend score: ${body.trendScore}

Return JSON only in this exact shape:
{
  "objective": "",
  "contentStrategy": "",
  "reelScript": "",
  "hashtags": [],
  "cta": ""
}`;

    const result = await withTimeout(model.generateContent(prompt), 10000);
    const text = result.response.text().trim();
    const brief = JSON.parse(text) as unknown;

    if (!isCampaignBrief(brief)) {
      throw new Error("Invalid Gemini JSON shape");
    }

    return NextResponse.json(brief);
  } catch {
    return NextResponse.json(
      {
        error: "Gemini brief generation failed",
      },
      { status: 500 },
    );
  }
}
