import { StringLiteral } from "typescript";

export class ReviewModel {
  id?: number;
  userEmail: string;
  date?: string;
  rating: number;
  shirtId: number;
  description: string;

  constructor(userEmail: string, rating: number, shirtId: number, description: string) {
    this.userEmail = userEmail;
    this.rating = rating;
    this.shirtId = shirtId;
    this.description = description;
  }
}