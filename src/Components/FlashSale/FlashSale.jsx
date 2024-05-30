import "./FlashSale.css";
import { useState, useEffect, useRef } from "react";
import CountDown from "count-down-react";
import { ArrowRightShort, ArrowLeftShort, StarFill, Heart, Eye } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addToWishlist, removeFromWishlist, getWishlist, getCardItems, addToCard , removeFromCard  } from './../../utils/wishlistUtils';

const CountdownRenderer = ({ days, hours, minutes, seconds }) => {
    return (
        <ul>
            <li>
                <span className="timer_text">Days</span>
                <span id="days">0{days}</span>
            </li>
            <span className="timer_blank">:</span>
            <li>
                <span className="timer_text">Hours</span>
                <span id="hours">{hours}</span>
            </li>
            <span className="timer_blank">:</span>
            <li>
                <span className="timer_text">Minutes</span>
                <span id="minutes">{minutes}</span>
            </li>
            <span className="timer_blank">:</span>
            <li>
                <span className="timer_text">Seconds</span>
                <span id="seconds">{seconds}</span>
            </li>
        </ul>
    );
};

function FlashSale() {
    const date1 = Date.now() + 37 * 60 * 60 * 1000;
    const [products, setProducts] = useState([]);
    const [randomProducts, setRandomProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedColors, setSelectedColors] = useState({});

    const sliderRef = useRef(null);

    useEffect(() => {
        const getFlashProduct = async () => {
            const response = await axios.get('http://localhost:3000/products');
            setProducts(response.data);
        };

        getFlashProduct();
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
        if (products.length > 0) {
            const flashSaleProducts = products.filter(product => product.flashsale);
            const shuffledProducts = flashSaleProducts.sort(() => 0.3 - Math.random());
            setRandomProducts(shuffledProducts.slice(0, products.length));
        }
    }, [products]);

    useEffect(() => {
        setWishlist(getWishlist());
        setCart(getCardItems());
    }, [products]);

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

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

      const handleColorSelect = (e, productId, colorIndex) => {
        e.stopPropagation();
        setSelectedColors({ ...selectedColors, [productId]: colorIndex });
      };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="app_flashsale">
            <div className="container">
                <div className="flashsale__inner">
                    <div className="flashsale__top">
                        <div className="flashsale__daytext">
                            <div className="redline"></div>
                            <span className="flashale__dayname">Today's</span>
                        </div>
                        <div className="flashsale__timer">
                            <h2 className="flashale__h2">Flash Sales</h2>
                            <div className="flashsale__timer_box">
                                <CountDown date={date1} renderer={CountdownRenderer} />
                            </div>
                            <div className="flashale__buttons">
                                <button className="flashasale__prev" onClick={prevSlide}>
                                    <ArrowLeftShort />
                                </button>
                                <button className="flashasale__next" onClick={nextSlide}>
                                    <ArrowRightShort />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flashsale__bottom">
                        <div className="flashsale__products">
                            <Slider ref={sliderRef} {...settings}>
                                {randomProducts.map((product, index) => {
                const selectedColorIndex = selectedColors[product.id] || 0;
                                    return (
                                        <div className="flashsale__box" key={index}>
                                            <div className="flashsale__discountprice">
                                                -{product.discountRate}%
                                            </div>
                                            <div className="flashsale__buttons_abs">
                                                <button className="flashsale__wishlist_btn" style={{ backgroundColor: isInWishlist(product) ? 'rgb(219, 68, 68)' : 'rgb(255, 255, 255)', color: isInWishlist(product) ? '#fff' : '#000' , transition: 'ease-in-out .2s'  }} onClick={(e) => handleAddToWishlist(e, product)}>
                                                    <Heart />
                                                </button>
                                                <button className="flashsale__show_btn">
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
                          className="flashsale__addcard"
                          onClick={(e) => handleAddToCard(e, product)}
                        >
                          {isInCartlist(product, selectedColorIndex)
                            ? "Remove from Card"
                            : "Add to Card"}
                        </button>
                      </div>
                                            <div className="product__description">
                                                <h5 className="product__name">{product.name}</h5>
                                                <div className="product__prices">
                                                    <span className="product_newprice">${product.discountedPrice}</span>
                                                    <span className="product_oldprice">${product.price}</span>
                                                </div>
                                                <div className="product_feedbacks">
                                                    <div className="product__star">
                                                        {[...Array(5)].map((_, starIndex) => (
                                                            <StarFill
                                                                key={starIndex}
                                                                className={starIndex < product.starCount ? 'star-yellow' : 'star-gray'}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="product__feedcount">
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
                            </Slider>
                        </div>
                        <Link to="/link" className="flashsale__allbutton">View all products</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FlashSale;
