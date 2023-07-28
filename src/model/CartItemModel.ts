import { ShirtModel } from "./ShirtModel";

export class CartItemModel {
  shirt: ShirtModel;
  quantity: number;

  constructor(shirt: ShirtModel, quantity: number) {
    this.shirt = shirt;
    this.quantity = quantity;
  }
}