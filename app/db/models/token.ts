import { ObjectId } from "mongodb";

export class Token {
  constructor(
    public name: string,
    public symbol: string,
    public description: string,
    public address: string,
    public creator: string,
    public _id?: ObjectId
  ) {}
}
