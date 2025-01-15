import { ObjectId } from "mongodb";

export class TokenIdea {
  constructor(
    public name: string,
    public symbol: string,
    public description: string,
    public newsUrl: string,
    public createdTime: Date,
    public _id?: ObjectId
  ) {}
}
