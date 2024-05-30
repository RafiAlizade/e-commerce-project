import { useState, useEffect, useRef } from "react";
import "./ExploreProducts.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ArrowRightShort,
  ArrowLeftShort,
  StarFill,
  Heart,
  Eye,
} from "react-bootstrap-icons";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getCardItems,
  addToCard,
  removeFromCard,
} from "./../../utils/wishlistUtils";

function ExploreProducts() {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});

  const sliderRef = useRef(null);
  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  useEffect(() => {
    const getProducts = async () => {
      const database = await axios.get("http://localhost:3000/products");
      setProducts(database.data);
    };

    getProducts();
  }, []);

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    const wishlist = getWishlist();
    const selectedColorIndex = selectedColors[product.id] || 0;
    const color = product.colors ? product.colors[selectedColorIndex] : null;
    const differentColor = product.colors ? true : false;
    const isProductInWishlist = wishlist.some(
      (item) =>
        item.id === product.id &&
        (!item.selectedColorIndex ||
          item.selectedColorIndex === selectedColorIndex)
    );

    if (isProductInWishlist) {
      removeFromWishlist(product.id, selectedColorIndex);
      setWishlist(
        
        wishlist.filter((item) => !(item.id === product.id && (!item.selectedColorIndex || item.selectedColorIndex === selectedColorIndex))))
    } else {
      const productToAdd = color
        ? {
            ...product,
            differentColor,
            selectedColorIndex,
            selectedColor: color,
          }
        : { ...product };
      addToWishlist(productToAdd);
      setWishlist([...wishlist, productToAdd]);
    }
  };

  const handleAddToCard = (e, product) => {
    e.stopPropagation();
    const cardItems = getCardItems();
    const selectedColorIndex = selectedColors[product.id] || 0;
    const color = product.colors ? product.colors[selectedColorIndex] : null;
    const differentColor = product.colors ? true : false;
    const isProductInCard = cardItems.some(
      (item) =>
        item.id === product.id &&
        (!item.selectedColorIndex ||
          item.selectedColorIndex === selectedColorIndex)
    );

    if (isProductInCard) {
      console.log(product.id, selectedColorIndex);
      removeFromCard(product.id, selectedColorIndex);
      setCart(cardItems.filter((item) => !(item.id === product.id && (!item.selectedColorIndex || item.selectedColorIndex === selectedColorIndex))));
    } else {
      const productToAdd = color
        ? {
            ...product,
            differentColor,
            selectedColorIndex,
            selectedColor: color,
          }
        : { ...product };
      addToCard(productToAdd);
      setCart([...cart, productToAdd]);
    }
  };

  useEffect(() => {
    setWishlist(getWishlist());
    setCart(getCardItems());
  }, [products]);

  const isInCartlist = (product, selectedColorIndex) => {
    return cart.some(
      (item) =>
        item.id === product.id &&
        (!item.selectedColorIndex ||
          item.selectedColorIndex === selectedColorIndex)
    );
  };

  const isInWishlist = (product, selectedColorIndex) => {
    return wishlist.some(
      (item) =>
        item.id === product.id &&
        (!item.selectedColorIndex ||
          item.selectedColorIndex === selectedColorIndex)
    );
  };

  const handleColorSelect = (productId, colorIndex) => {
    setSelectedColors({ ...selectedColors, [productId]: colorIndex });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesPerRow: 2,
    slidesToShow: 2,
    rows: 2,
    adaptiveHeight: true,
  };

  return (
    <section className="app_explore">
      <div className="container">
        <div className="explore__inner">
          <div className="explore__top">
            <div className="explore__maintext">
              <div className="redline"></div>

              <span className="explore__span">Our Products</span>
            </div>

            <div className="explore__btnsection">
              <h5 className="explore__h5">Explore Our Prodcts</h5>
              <div className="explore__buttons">
                <button className="explore__prev" onClick={prevSlide}>
                  <ArrowLeftShort />
                </button>
                <button className="explore__next" onClick={nextSlide}>
                  <ArrowRightShort />
                </button>
              </div>
            </div>
          </div>

          <div className="explore__bottom">
            <div className="explore__products">
              <Slider ref={sliderRef} {...settings}>
                {products.map((product, index) => {
                  const selectedColorIndex = selectedColors[product.id] || 0;
                  return (
                    <div className="explore__box" key={index}>
                      <div
                        className="explore__isnew"
                        style={
                          product.isNew ? { padding: "0.25rem 0.75rem" } : {}
                        }
                      >
                        <span>{product.isNew ? "NEW" : ""}</span>
                      </div>
                      <div className="explore__buttons_abs">
                        <button
                          className="explore__wishlist_btn"
                          style={{
                            backgroundColor: isInWishlist(
                              product,
                              selectedColorIndex
                            )
                              ? "rgb(219, 68, 68)"
                              : "rgb(255, 255, 255)",
                            color: isInWishlist(product, selectedColorIndex)
                              ? "#fff"
                              : "#000",
                            transition: "ease-in-out .2s",
                          }}
                          onClick={(e) => handleAddToWishlist(e, product)}
                        >
                          <Heart />
                        </button>
                        <button className="explore__show_btn">
                          <Eye />
                        </button>
                      </div>
                      <div className="product__image">
                        {product.multipleColors && product.colors.length > 0 ? (
                          <img
                            src={
                              product.colors[selectedColorIndex].coloredImage
                            }
                            alt={product.colors[selectedColorIndex].name}
                          />
                        ) : (
                          <img src={product.image} alt={product.name} />
                        )}
                        <button
                          className="explore__addcard"
                          onClick={(e) => handleAddToCard(e, product)}
                        >
                          {isInCartlist(product, selectedColorIndex)
                            ? "Remove from Card"
                            : "Add to Card"}
                        </button>
                      </div>
                      <div className="product__description">
                        <h5 className="product__name">{product.name}</h5>

                        <div className="explore__price_name">
                          <span className="product_price">
                            ${product.price}
                          </span>
                          <div className="product_feedbacks">
                            <div className="product__star">
                              {[...Array(5)].map((_, starIndex) => (
                                <StarFill
                                  key={starIndex}
                                  className={
                                    starIndex < product.starCount
                                      ? "star-yellow"
                                      : "star-gray"
                                  }
                                />
                              ))}
                            </div>
                            <span className="product__feedcount">
                              ({product.feedbackCount})
                            </span>
                          </div>
                        </div>
                        {product.multipleColors && product.colors.length > 0 ? (
                          <div className="product__colorselect">
                            {product.colors &&
                              product.colors.length > 0 &&
                              product.colors.map((color, index) => (
                                <span
                                  key={index}
                                  className={`product__color ${color.name}`}
                                  style={{
                                    backgroundColor: `${color.name}`,
                                    width: "1rem",
                                    height: "1rem",
                                    borderRadius: "50%",
                                    border:
                                      selectedColorIndex === index
                                        ? "0.13rem solid rgb(0, 0, 0)"
                                        : "none",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleColorSelect(product.id, index)
                                  }
                                ></span>
                              ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>

            <Link to="./products" className="explore__href">
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExploreProducts;
