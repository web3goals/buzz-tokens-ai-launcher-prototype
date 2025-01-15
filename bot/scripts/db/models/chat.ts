import { ObjectId } from "mongodb";

export class Chat {
  constructor(
    public id: string,
    public createdTime: Date,
    public _id?: ObjectId
  ) {}
}
