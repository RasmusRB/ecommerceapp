type Product = {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: Rating;
  quantity?: number;
};

type Rating = {
  rate: number;
  count: number;
};

type cartState = {
  cartItems: any[];
  totalPrice: number;
  productAdded?: boolean;
  productRemoved?: boolean;
  cartCleared?: boolean;
  loggedIn?: boolean;
  quantity?: number;
}
