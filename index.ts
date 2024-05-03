import getNews from "./src/getNews";

const articles = await getNews("ai");
console.log(articles);
