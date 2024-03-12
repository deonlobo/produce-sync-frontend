interface Product {
  productId: string;
  sellerId: string;
  productName: string;
  productDescription: string;
  productImages: string[];
  quantity: number;
  perUnitPrice: number;
  unit: string;
  total: number;
}

interface Order {
  orderId: string;
  buyerId: string;
  sellerId: string;
  brandName: string;
  productList: Product[];
  orderTotal: number;
  status: string;
  createdTs: number;
  updatedTs: number;
}

export default Order;
