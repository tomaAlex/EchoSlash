import OpenAI from "openai";

export const NEWS_API_URL = "https://newsapi.org/v2/everything";
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
