import "./css/BuyerProductCard.css";

interface prop {
  image: string;
  productName: string;
  description: string;
}

const BuyerProductCard = ({ image, productName, description }: prop) => {
  return (
    <div className="card buyer-product-card" style={{ width: "18rem" }}>
      <img
        src={image}
        className="card-img-top fix-prod-card-img-buyer"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text fix-prod-card-description-buyer">
          {description}
        </p>
      </div>
      <div className="my-2 text-center">
        <a href="#" className="btn btn-primary">
          See Details
        </a>
      </div>
    </div>
  );
};

export default BuyerProductCard;
