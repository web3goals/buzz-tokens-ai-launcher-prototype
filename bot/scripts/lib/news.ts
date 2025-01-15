import axios from "axios";
import { News } from "../types/news";

export async function fetchNews(): Promise<News[] | null> {
  const { data } = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWAPI_API_KEY}&pageSize=10`
  );
  const articles = data.articles;
  if (!articles) {
    return null;
  }
  const news: News[] = articles.map((article: any) => {
    const articleNews: News = {
      url: article.url,
      title: article.title,
      description: article.description,
    };
    return articleNews;
  });
  return news;
}
