import getFetchUrl from "./getFetchUrl";

const getFetchRequest = (q: string) =>
  new Request(getFetchUrl(q), {
    headers: {
      "x-api-key": process.env.NEWS_API_KEY,
    },
  });

export default getFetchRequest;
