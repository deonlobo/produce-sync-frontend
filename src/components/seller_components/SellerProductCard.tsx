import { Link } from "react-router-dom";
import "./css/SellerProductCard.css";

interface prop {
  productId: string;
  image: string;
  brandName: string;
  productName: string;
  description: string;
  perUnitPrice: number;
}

const SellerProductCard = ({
  productId,
  image,
  brandName,
  productName,
  description,
  perUnitPrice,
}: prop) => {
  return (
    <div className="card buyer-product-card" style={{ width: "18rem" }}>
      <img
        src={image}
        className="card-img-top fix-prod-card-img-buyer"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text mb-prod small">
          <em>Seller: {brandName}</em>
        </p>
        <p className="card-text fix-prod-card-description-buyer mb-prod">
          {description}
        </p>
        <p className="card-text">Price: ${perUnitPrice.toFixed(2)}</p>
      </div>
      <div className="my-2 text-center">
        {/* Use Link to navigate to the product details page */}
        <Link to={`/seller/product/${productId}`} className="btn btn-primary">
          See Details
        </Link>
      </div>
    </div>
  );
};

export default SellerProductCard;
