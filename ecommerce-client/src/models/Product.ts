export interface IProduct {
    id: string,
    name: string;
    description: string;
    price: number;
    stock: number,
    category: string,
    image: string;
}
export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public description: string,
    public image: string,
    public category: string,
    public stock: number
  ) {}
}