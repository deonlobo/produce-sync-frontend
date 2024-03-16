interface Product {
  productId: string;
  sellerId: string;
  brandName: string;
  productName: string;
  productDescription: string;
  productImages: string[];
  quantity: number;
  perUnitPrice: number;
  unit: string;
  availableQuantity: number;
  total: number;
}

export default Product;
