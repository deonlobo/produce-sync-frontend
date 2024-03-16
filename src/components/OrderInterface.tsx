import Address from "./AddressInterface";
import Product from "./ProductInterface";

interface Order {
  orderId: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  brandName: string;
  productList: Product[];
  orderTotal: number;
  status: string;
  createdTs: number;
  updatedTs: number;
  address: Address;
}

export default Order;
