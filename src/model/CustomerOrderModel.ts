import { AddressModel } from "./AddressModel";
import { CardModel } from "./CardModel";

export class CustomerOrderModel {
  address: AddressModel;
  billingAddress?: AddressModel;
  payment: string;
  voucher?: string;
  phoneNumber: string;

  constructor(address: AddressModel, payment: string, phoneNumber: string, billingAddress?: AddressModel,
     voucher?: string) {
    this.address = address;
    this.payment = payment;
    this.phoneNumber = phoneNumber;
    this.billingAddress = billingAddress;
    this.voucher = voucher;
  }
}