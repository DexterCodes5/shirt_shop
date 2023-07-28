export class ShirtModel {
  id: number;
  title: string;
  brand: string;
  price: number;
  inStock: number;
  color: string;
  description: string;
  img: string;

  constructor(id: number, title: string, brand: string, price: number, inStock: number,
     color: string, description: string, img: string) {
    this.id = id;
    this.title = title;
    this.brand = brand;
    this.price = price;
    this.inStock = inStock;
    this.color = color;
    this.description = description;
    this.img = img;
  }
}