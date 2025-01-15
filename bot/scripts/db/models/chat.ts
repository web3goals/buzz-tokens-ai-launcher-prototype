import { ObjectId } from "mongodb";

export class Chat {
  constructor(public id: number, public _id?: ObjectId) {}
}
