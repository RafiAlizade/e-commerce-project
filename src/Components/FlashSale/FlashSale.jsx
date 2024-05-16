import "./FlashSale.css"
import { useState, useEffect } from "react";
import CountDown from "count-down-react";
import { ArrowRightShort, ArrowLeftShort, StarFill , Heart, Eye} from 'react-bootstrap-icons'
import { Link } from "react-router-dom";
import axios from "axios";

const CoundownRenderer = ({ days, hours, minutes, seconds, completed }) => {
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

    useEffect(() => {
        const getFlashProduct = async () => {
            const response = await axios.get('http://localhost:3000/products')
            setProducts(response.data)
        };

        getFlashProduct();
    }, [])
  return (
    <section className="app_flashsale">
        <div className="container">
            <div className="flashsale__inner">
                <div className="flashsale__top">
                        <div className="flashsale__daytext">
                            <div className="redline">

                            </div>

                            <span className="flashale__dayname">
                                Today's
                            </span>
                        </div>

                        <div className="flashsale__timer">
                            <h2 className="flashale__h2">Flash Sales</h2>
                            <div className="flashsale__timer_box">
                                <CountDown date={date1} renderer={CoundownRenderer} />
                            </div>

                            <div className="flashale__buttons">
                                <button className="flashasale__prev">
                                    <ArrowLeftShort />
                                </button>

                                <button className="flashasale__next">
                                    <ArrowRightShort />
                                    </button>
                            </div>
                        </div>
                </div>

                <div className="flashsale__bottom">
                        <div className="flashsale__products">
                            {products.map((product, index) => (
                                product.flashsale ? 
                                <div className="flashsale__box" key={index}>
                                  <div className="flashsale__discountprice">
                                      -{product.discountRate}%
                                  </div>

                                  <div className="flashsale__buttons_abs">
                                  <button className="flashsale__wishlist_btn">
                                    <Heart />
                                  </button>
                                  <button className="flashsale__show_btn">
                                    <Eye />
                                  </button>
                                  </div>

                                    <div className="product__image">
                                      <img src={product.image} />
                                      <button className="flashsale__addcard">
                                      Add To Cart
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
                                    </div>
                                </div>
                                : ''
                            ))}
                        </div>

                        <Link to="/link" className="flashsale__allbutton">View all products</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default FlashSale