export type Response = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export interface Product extends Response {
  compare: boolean;
  price: number;
  inBasket: boolean;
  brand: string;
  colors: string[];
}
