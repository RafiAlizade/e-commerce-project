import { useState, useEffect, useRef} from "react";
import "./ExploreProducts.css"
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRightShort, ArrowLeftShort, StarFill, Heart, Eye, Columns } from 'react-bootstrap-icons';
import { addToWishlist, removeFromWishlist, getWishlist } from './../../utils/wishlistUtils';

function ExploreProducts() {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const sliderRef = useRef(null);
  const nextSlide = () => {
    sliderRef.current.slickNext();
};

const prevSlide = () => {
    sliderRef.current.slickPrev();
};

useEffect(() => {
  const getProducts = async () => {
    const database = await axios.get('http://localhost:3000/products');
    setProducts(database.data)
  }

  getProducts();
}, [])

const handleAddToWishlist = (product) => {
  const wishlist = getWishlist();
  const isProductInWishlist = wishlist.some(item => item.id === product.id);

  if (isProductInWishlist) {
      removeFromWishlist(product.id);
      setWishlist(wishlist.filter(item => item.id !== product.id));
  } else {
      addToWishlist(product);
      setWishlist([...wishlist, product]);
  }
};

useEffect(() => {
  setWishlist(getWishlist());
}, [products]);

const settings = {
  dots: false
  , infinite: true
  , speed: 500
  , slidesPerRow: 2
  , slidesToShow: 2
  , rows: 2
  , adaptiveHeight: true
};

  return (
    <section className="app_explore">
      <div className="container">
        <div className="explore__inner">
          <div className="explore__top">
                <div className="explore__maintext">
                  <div className="redline">

                  </div>

                  <span className="explore__span">
                    Our Products
                  </span>
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

const isInWishlist = wishlist.some(item => item.id === product.id); return (
                <div className="explore__box" key={index}>
                <div className="explore__isnew" style={product.isNew ? { padding: '0.25rem 0.75rem' } : {}}>
                    <span>
                    {product.isNew ? "NEW" : ''}
                    </span>
                </div>
                <div className="explore__buttons_abs">
                    <button className="explore__wishlist_btn" style={{ backgroundColor: isInWishlist ? 'rgb(219, 68, 68)' : 'rgb(255, 255, 255)', color: isInWishlist ? '#fff' : '#000' , transition: 'ease-in-out .2s'  }} onClick={() => handleAddToWishlist(product)}>
                        <Heart />
                    </button>
                    <button className="explore__show_btn">
                        <Eye />
                    </button>
                </div>
                <div className="product__image">
                    <img src={product.image} />
                    <button className="explore__addcard">Add To Cart</button>
                </div>
                <div className="product__description">
                    <h5 className="product__name">{product.name}</h5>

                    <div className="explore__price_name">
                    <span className="product_price">${product.price}</span>
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
            </div>
              )})}
              </Slider>
            </div>

            <Link to='./products' className="explore__href">View All Products</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExploreProducts