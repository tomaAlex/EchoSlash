import OpenAI from "openai";

export const WORDS_PER_MINUTE = 150;
export const MAXIMUM_MINUTES_TIMELINE = 10;
export const MAXIMUM_WORDS_PER_GENERATION =
  MAXIMUM_MINUTES_TIMELINE * WORDS_PER_MINUTE;
export const AVERAGE_CHARACTERS_PER_WORD = 4.7;
export const CHARACTERS_PER_TOKEN = 4;
export const AVERAGE_TOKENS_PER_WORD =
  AVERAGE_CHARACTERS_PER_WORD / CHARACTERS_PER_TOKEN;
export const MAXIMUM_TOKENS_PER_GENERATION = Math.ceil(
  MAXIMUM_WORDS_PER_GENERATION * AVERAGE_TOKENS_PER_WORD
);

export const NEWS_API_URL = "https://newsapi.org/v2/everything";
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
