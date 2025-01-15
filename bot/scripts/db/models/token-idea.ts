import { ObjectId } from "mongodb";

export class TokenIdea {
  constructor(
    public name: string,
    public symbol: string,
    public description: string,
    public news: {
      url: string;
      description: string;
    },
    public _id?: ObjectId
  ) {}
}
