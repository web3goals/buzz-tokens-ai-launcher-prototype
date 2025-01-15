import { ObjectId } from "mongodb";
import { News } from "../../types/news";

export class TokenIdea {
  constructor(
    public name: string,
    public symbol: string,
    public description: string,
    public newsUrl: string,
    public _id?: ObjectId
  ) {}
}
