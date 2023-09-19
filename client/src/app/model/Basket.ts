
export interface BasketItem {
  productId: number;
  name: string;
  pictureUrl: string;
  price: number;
  brand: string;
  type: string;
  quantity: number;
}
export interface Basket {
  id: number;
  buyerId: string;
  items: BasketItem[];
}
