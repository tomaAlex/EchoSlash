declare module "bun" {
  interface Env {
    NEWS_API_KEY: string;
    OPENAI_API_KEY: string;
    NODEMAILER_HOST: string;
    NODEMAILER_USER: string;
    NODEMAILER_PASS: string;
    SESSION_SECRET: string;
    PORT: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    DOMAIN: string;
  }
}

type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type SpeechPhrasesBatch = String[];
