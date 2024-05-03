const getArticlePreview = ({ title, content }: Article): string => `
Title: ${title},
Content: ${content}
`;

export default getArticlePreview;
