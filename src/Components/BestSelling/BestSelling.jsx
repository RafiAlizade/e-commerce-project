import "./BestSelling.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { StarFill, Heart, Eye } from "react-bootstrap-icons";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getCardItems,
  addToCard,
  removeFromCard,
} from "./../../utils/wishlistUtils";

function BestSelling() {
  const [bestSelling, setGetBestSelling] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    const getBestSelling = async () => {
      const database = await axios.get("http://localhost:3000/products");
      setGetBestSelling(database.data);
    };

    getBestSelling();
  }, []);

  useEffect(() => {
    if (bestSelling.length > 0) {
      const flashSaleProducts = bestSelling.filter(
        (product) => product.bestselling
      );
      const shuffledProducts = flashSaleProducts.sort(
        () => 0.3 - Math.random()
      );
      setRandomProducts(shuffledProducts.slice(0, 4));
    }
  }, [bestSelling]);

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
  }, [bestSelling]);

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

  const navigate = useNavigate();

  const clickToShow = (product) => {
    const selectedColorIndex = selectedColors[product.id] || 0;
    if (product.multipleColors) {
      return navigate(`product/${product.id}/${selectedColorIndex}`);
    } else {
      return navigate(`product/${product.id}`);
    }
  };

  const handleColorSelect = (e, productId, colorIndex) => {
    e.stopPropagation();
    setSelectedColors({ ...selectedColors, [productId]: colorIndex });
  };

  return (
    <section className="app__bestselling">
      <div className="container">
        <div className="bestselling__inner">
          <div className="bestselling__top">
            <div className="bestselling__text">
              <div className="redline"></div>

              <span className="bestselling__span">This Month</span>
            </div>

            <div className="bestselling__browse">
              <h5 className="bestselling__h5">Best Selling Products</h5>

              <Link to="/bestselling" className="bestselling__viewbtn">
                View All
              </Link>
            </div>
          </div>

          <div className="bestselling__bottom">
            <div className="bestselling__container">
              {randomProducts.map((product, index) => {
                const selectedColorIndex = selectedColors[product.id] || 0;
                return (
                  <div className="bestselling__box" key={index} onClick={() => clickToShow(product)}>
                    {product.discount && <div className="bestselling__discountprice">
                      -{product.discountRate}%
                    </div>}
                    <div className="bestselling__buttons_abs">
                      <button
                        className="bestselling__wishlist_btn"
                        style={{ backgroundColor: isInWishlist(
                          product,
                          selectedColorIndex
                        ) ? 'rgb(219, 68, 68)' : 'rgb(255, 255, 255)', color: isInWishlist(
                          product,
                          selectedColorIndex
                        ) ? '#fff' : '#000' , transition: 'ease-in-out .2s'  }} onClick={(e) => handleAddToWishlist(e, product)}
                      >
                        <Heart />
                      </button>
                      <button className="bestselling__show_btn">
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
                          className="bestselling__addcard"
                          onClick={(e) => handleAddToCard(e, product)}
                        >
                          {isInCartlist(product, selectedColorIndex)
                            ? "Remove from Card"
                            : "Add to Card"}
                        </button>
                      </div>
                    <div className="bestselling__description">
                      <h5 className="bestselling__name">{product.name}</h5>
                      <div className="bestselling__prices">
                      <span className="bestselling_newprice">${product.price}</span>
                                    {product.discount && (
                                        <span className='bestselling_oldprice'>${product.discountedPrice}</span>
                                    )}
                      </div>
                      <div className="bestselling_feedbacks">
                        <div className="bestselling__star">
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
                        <span className="bestselling__feedcount">
                          ({product.feedbackCount})
                        </span>
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
                                  onClick={(e) =>
                                    handleColorSelect(e, product.id, index)
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
    </section>
  );
}

export default BestSelling;
