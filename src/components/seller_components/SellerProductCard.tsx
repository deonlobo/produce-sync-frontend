import "./css/SellerProductCard.css";

interface prop {
  image: string;
  productName: string;
  description: string;
}

const SellerProductCard = ({ image, productName, description }: prop) => {
  return (
    <div className="card seller-product-card" style={{ width: "18rem" }}>
      <img src={image} className="card-img-top fix-prod-card-img" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text fix-prod-card-description">{description}</p>
      </div>
      <div className="my-2 text-center">
        <a href="#" className="btn btn-primary">
          See Details
        </a>
      </div>
    </div>
  );
};

export default SellerProductCard;
