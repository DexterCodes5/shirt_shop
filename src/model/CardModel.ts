export class CardModel {
  cardNumber: string;
  cardholder: string;
  exparation: string;
  cvv: string;

  constructor(cardNumber: string, cardholder: string, exparation: string, cvv: string) {
    this.cardNumber = cardNumber;
    this.cardholder = cardholder;
    this.exparation = exparation;
    this.cvv = cvv;
  }
}