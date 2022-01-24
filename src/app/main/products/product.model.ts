export class Product {
  public id: number;
  public title: string;
  public description: string;
  public price: number;

  constructor(id: number, title: string, description: string, price: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
