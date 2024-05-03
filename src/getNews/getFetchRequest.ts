import getFetchUrl from "./getFetchUrl";

const getFetchRequest = (q: string, from?: Date) =>
  new Request(getFetchUrl(q, from), {
    headers: {
      "x-api-key": process.env.NEWS_API_KEY,
    },
  });

export default getFetchRequest;
