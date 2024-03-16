import ProductInterface from "../ProductInterface";

interface prop {
  product: ProductInterface;
  brandName: String;
  onDeleteProduct: (productId: string) => void;
}

const CartProductComp = ({ product, brandName, onDeleteProduct }: prop) => {
  const handleDeleteClick = () => {
    // Call the onDeleteProduct function with the product's productId
    onDeleteProduct(product.productId);
  };

  return (
    <div className="cart-product">
      <div className="row g-0">
        <div className="col-md-3">
          <img
            src={`https://storage.googleapis.com/productsync_product/${product.productImages[0]}`}
            className="img-fluid rounded-start"
            alt={product.productName}
          />
        </div>
        <div className="col-md-9">
          <div className="card-body" style={{ marginLeft: "0.8em" }}>
            <h5 className="card-title">{product.productName}</h5>
            <p className="card-text" style={{ marginBottom: "0.5em" }}>
              Brand Name: {brandName}
            </p>
            <p className="card-text" style={{ marginBottom: "0.5em" }}>
              Quantity: {product.quantity}
            </p>
            <p className="card-text" style={{ marginBottom: "0.5em" }}>
              Price: {product.perUnitPrice} / {product.unit}
            </p>
            <p className="card-text" style={{ marginBottom: "0.5em" }}>
              Total: ${product.total}
            </p>
            <button
              className="btn btn-primary mb-3"
              onClick={handleDeleteClick}
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductComp;
