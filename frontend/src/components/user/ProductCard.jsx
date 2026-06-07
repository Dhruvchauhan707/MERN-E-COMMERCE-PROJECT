import "../../styles/user/product.css";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useCart } from "../../Hooks/useCart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const ProductCard = ({ product }) => {

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const quantity = 1;
  const { requireLogin } = useAuth();


  const addToCartHandler = async () => {
    requireLogin ( async () => {
      try {
        await addToCart(product._id, quantity);
        toast.success("Product Added to Cart");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    });
  };
  

  return (
    <div className="product-card"
      onClick={() =>
        navigate(`/product/${product._id}`)
      }
    >

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>

        <div className="rating">
          ⭐⭐⭐⭐⭐ <span>(3k Reviews)</span>
        </div>

        <h2 className="price">Rs.{product.price}</h2>

        <div className="card-buttons">
          <button
            className="cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCartHandler();
            }}
          >
            Add To Cart
          </button>

          <Link to="/wishlist" className="icon-btn">
            <FaHeart size={30} color="#e74c3c" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;