import { useEffect, useState } from "react";
import "./WishPage.css";
import axios from "axios";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getCardItems,
  addToCard,
  removeFromCard,
} from "./../../utils/wishlistUtils";
import { Trash, Shop, Eye } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function WishPage() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [card, setCard] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const shuffledProducts = products.sort(() => 0.3 - Math.random());
      setRandomProducts(shuffledProducts.slice(0, 4));
    }
  }, [products]);

  const handleAddToWishlist = (e, product, selectedColorIndex) => {
    e.stopPropagation();
    const wishlist = getWishlist();
    const colorIndex = selectedColorIndex || 0;
    const color = product.colors ? product.colors[colorIndex] : null;
    const differentColor = product.colors ? true : false;
    const isProductInWishlist = wishlist.some(
      (item) =>
        item.id === product.id &&
        (!item.selectedColorIndex || item.selectedColorIndex === colorIndex)
    );

    if (isProductInWishlist) {
      removeFromWishlist(product.id, colorIndex);
      setWishlist(
        wishlist.filter(
          (item) =>
            !(
              item.id === product.id &&
              (!item.selectedColorIndex ||
                item.selectedColorIndex === colorIndex)
            )
        )
      );
    } else {
      const productToAdd = color
        ? {
            ...product,
            differentColor,
            selectedColorIndex: colorIndex,
            selectedColor: color,
          }
        : { ...product };
      addToWishlist(productToAdd);
      setWishlist([...wishlist, productToAdd]);
    }
  };

  const handleAddToCard = (e, product, selectedColorIndex) => {
    e.stopPropagation();
    const cardItems = getCardItems();
    const colorIndex = selectedColorIndex || 0;
    const color = product.colors ? product.colors[colorIndex] : null;
    const differentColor = product.colors ? true : false;
    const isProductInCard = cardItems.some(
      (item) =>
        item.id === product.id &&
        (!item.selectedColorIndex || item.selectedColorIndex === colorIndex)
    );

    if (isProductInCard) {
      removeFromCard(product.id, colorIndex);
      setCard(
        cardItems.filter(
          (item) =>
            !(
              item.id === product.id &&
              (!item.selectedColorIndex ||
                item.selectedColorIndex === colorIndex)
            )
        )
      );
    } else {
      const productToAdd = color
        ? {
            ...product,
            differentColor,
            selectedColorIndex: colorIndex,
            selectedColor: color,
          }
        : { ...product };
      addToCard(productToAdd);
      setCard([...card, productToAdd]);
    }
  };


  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    setWishlist(getWishlist());
    setCard(getCardItems());
  }, [products]);

  const isInCartlist = (product, selectedColorIndex) => {
    return card.some(
      (item) =>
        item.id === product.id &&
        (!item.selectedColorIndex ||
          item.selectedColorIndex === selectedColorIndex)
    );
  };

  const handleColorSelect = (e, productId, colorIndex) => {
    e.stopPropagation();
    setSelectedColors({ ...selectedColors, [productId]: colorIndex });
  };
  return (
    <div className="app__wishlist">
      <div className="container">
        <div className="wishlist__inner">
          <div className="wishlist__top">
            <div className="wishlist__texts">
              <div className="wishlist__count">
                Wishlist ({wishlist.length})
              </div>

              <div className="wishlist__tobag">
                <Link to="/cart" className="wishlist__bagtext">
                  Move All To Bag
                </Link>
              </div>
            </div>

            <div className="wishlist__container">
              {wishlist.map((wishs, index) => {
                const multipleColorType = wishs.multipleColors;
                const colorName = multipleColorType ? wishs.selectedColor : null;
                return (
                  <div className="wishlist__box" key={index}>
                    <div className="wishlist__buttons_abs">
                      <button
                        className="wishlist__remove_btn"
                        onClick={(e) =>
                          handleAddToWishlist(
                            e,
                            wishs,
                            multipleColorType ? wishs.selectedColor : ""
                          )
                        }
                      >
                        <Trash />
                      </button>
                    </div>
                    <div className="product__image">
                      {multipleColorType ? (
                        wishs.selectedColor && (
                          <img
                            src={wishs.selectedColor.coloredImage}
                            alt={wishs.selectedColor.name}
                          />
                        )
                      ) : (
                        <img src={wishs.image} />
                      )}
                      <button
                        className="wishlist__addcard"
                        onClick={(e) =>
                          handleAddToCard(
                            e,
                            wishs,
                            multipleColorType ? wishs.selectedColorIndex : 0
                          )
                        }
                      >
                        {isInCartlist(
                          wishs,
                          multipleColorType ? wishs.selectedColorIndex : 0
                        )
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                    <div className="product__description">
                      <h5 className="product__name">
                        {multipleColorType
                          ? wishs.selectedColor &&
                            `${wishs.name} ${capitalizeFirstLetter(
                              wishs.selectedColor.name
                            )}`
                          : wishs.name}
                      </h5>

                      <div className="wishlist__price_name">
                        <span className="product_price">${wishs.price}</span>
                        {wishs.discount && (
                          <span className="wishlist__discounted_price">
                            ${wishs.discountedPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="wishlist__bottom">
            <div className="wishlist__products_text">
              <div className="wishlist__products__left">
                <div className="redline"></div>
                <span className="wishlist__products_span">Just For You</span>
              </div>

              <Link to="/products" className="wishlist__products_href">
                See All
              </Link>
            </div>

            <div className="wishlist__products__container">
              {randomProducts.map((products, index) => {
                const multipleColorType = products.multipleColors;
                const selectedColorIndex = selectedColors[products.id] || 0;

                return (
                  <div className="wishlist__box" key={index}>
                    <div className="wishlist__buttons_abs">
                      <button className="wishlist__remove_btn">
                        <Eye />
                      </button>
                    </div>
                    <div className="product__image">
                      {products.multipleColors && products.colors.length > 0 ? (
                        <img
                          src={products.colors[selectedColorIndex].coloredImage}
                          alt={products.colors[selectedColorIndex].name}
                        />
                      ) : (
                        <img src={products.image} alt={products.name} />
                      )}
                      <button
                        className="wishlist__addcard"
                        onClick={(e) =>
                          handleAddToCard(
                            e,
                            products,
                            multipleColorType ? products.selectedColor : ""
                          )
                        }
                      >
                        {isInCartlist(products, selectedColorIndex)
                          ? "Remove from Card"
                          : "Add to Card"}
                      </button>
                    </div>
                    <div className="product__description">
                      <h5 className="product__name">{products.name}</h5>

                      <div className="wishlist__price_name">
                        <span className="product_price">${products.price}</span>
                        {products.discount && (
                          <span className="wishlist__discounted_price">
                            ${products.discountedPrice}
                          </span>
                        )}
                      </div>

                      {products.multipleColors && products.colors.length > 0 ? (
                        <div className="product__colorselect">
                          {products.colors &&
                            products.colors.length > 0 &&
                            products.colors.map((color, index) => (
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
                                onClick={(e) =>
                                  handleColorSelect(e, products.id, index)
                                }
                              ></span>
                            ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishPage;
