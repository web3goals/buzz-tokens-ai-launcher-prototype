import { News } from "../types/news";

// TODO: Implement
export async function fetchNews(): Promise<News | undefined> {
  // const { data } = await axios.get("https://newsapi.org/v2/top-headlines", {
  //   params: {
  //     apiKey: "YOUR_NEWSAPI_KEY",
  //     country: "us",
  //     category: "business",
  //   },
  // });
  // console.log(data);
  return { url: "https://42", description: "42" };
}
