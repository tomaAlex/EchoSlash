import getArticlePreview from "./getArticlePreview";

const getArticlesPreview = (articles: Article[]): string =>
  articles.map(getArticlePreview).join("\n\n");

export default getArticlesPreview;
