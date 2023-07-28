import { CartItemModel } from "./CartItemModel";
import { CustomerOrderModel } from "./CustomerOrderModel";

export class CustomerOrderRequest {
  customerOrder: CustomerOrderModel;
  cart: CartItemModel[];

  constructor(customerOrder: CustomerOrderModel, cart: CartItemModel[]) {
    this.customerOrder = customerOrder;
    this.cart = cart;
  }
}