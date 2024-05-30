import React from "react";
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
    const isProductInWishlist = wishlist.some((item) => item.id === product.id);

    if (isProductInWishlist) {
      removeFromWishlist(product.id);
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      addToWishlist(product);
      setWishlist([...wishlist, product]);
    }
  };

  const handleAddToCard = (e, product) => {
    e.stopPropagation();
    const carditems = getCardItems();
    const isProductInCard = carditems.some((item) => item.id === product.id);

    if (isProductInCard) {
      removeFromCard(product.id);
      setCart(carditems.filter((item) => item.id !== product.id));
    } else {
      addToCard(product);
      setCart([...cart, product]);
    }
  };

  useEffect(() => {
    setWishlist(getWishlist());
    setCart(getCardItems());
  }, [bestSelling]);

  const isInCartlist = (product) => {
    return cart.some(item => item.id === product.id);
  };
  
  const isInWishlist = (product) => {
    return wishlist.some(item => item.id === product.id);
  };

  const navigate = useNavigate();

  const clickToShow = (product) => {
    return navigate(product.id)
  }

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
                return (
                  <div className="bestselling__box" key={index} onClick={() => clickToShow(product)}>
                    {product.discount && <div className="bestselling__discountprice">
                      -{product.discountRate}%
                    </div>}
                    <div className="bestselling__buttons_abs">
                      <button
                        className="bestselling__wishlist_btn"
                        style={{ backgroundColor: isInWishlist ? 'rgb(219, 68, 68)' : 'rgb(255, 255, 255)', color: isInWishlist ? '#fff' : '#000' , transition: 'ease-in-out .2s'  }} onClick={() => handleAddToWishlist(product)}
                      >
                        <Heart />
                      </button>
                      <button className="bestselling__show_btn">
                        <Eye />
                      </button>
                    </div>
                    <div className="product__image">
                      <img src={product.image} />
                      <button
                        className="bestselling__addcard"
                        onClick={(e) => handleAddToCard(e, product)}
                      >
                       {isInCartlist(product) ? 'Remove from Card' : 'Add to Card'}
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
