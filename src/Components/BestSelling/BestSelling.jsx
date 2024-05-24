import React from 'react'
import "./BestSelling.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { StarFill, Heart, Eye } from 'react-bootstrap-icons';
import { addToWishlist, removeFromWishlist, getWishlist } from './../../utils/wishlistUtils';


function BestSelling() {
    const [bestSelling, setGetBestSelling] = useState([]);
    const [randomProducts, setRandomProducts] = useState([]);
    const [selected, setSelected] = useState(false);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const getBestSelling = async () => {
            const database = await axios.get('http://localhost:3000/products')
            setGetBestSelling(database.data)
        }

        getBestSelling()
    }, [])

    useEffect(() => {
        if (bestSelling.length > 0) {
            const flashSaleProducts = bestSelling.filter(product => product.flashsale);
            const shuffledProducts = flashSaleProducts.sort(() => 0.3 - Math.random());
            setRandomProducts(shuffledProducts.slice(0, 4));
        }
    }, [bestSelling]);

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
    }, [bestSelling]);


  return (
    <section className="app__bestselling">
        <div className="container">
            <div className="bestselling__inner">
                <div className="bestselling__top">
                    <div className="bestselling__text">
                        <div className="redline">

                        </div>

                        <span className="bestselling__span">This Month</span>
                    </div>

                    <div className="bestselling__browse">
                        <h5 className="bestselling__h5">
                            Best Selling Products
                        </h5>

                        <Link to='/bestselling' className='bestselling__viewbtn'>View All</Link>
                    </div>
                </div>

                <div className="bestselling__bottom">
                    <div className="bestselling__container">
                    {randomProducts.map((product, index) => {

const isInWishlist = wishlist.some(item => item.id === product.id);

return (
                        
                            <div className="bestselling__box" key={index}>
                                        <div className="bestselling__discountprice">
                                            -{product.discountRate}%
                                        </div>
                                        <div className="bestselling__buttons_abs">
                                            <button className="bestselling__wishlist_btn" style={{ backgroundColor: isInWishlist ? 'rgb(219, 68, 68)' : 'rgb(255, 255, 255)', color: isInWishlist ? '#fff' : '#000' , transition: 'ease-in-out .2s'  }} onClick={() => handleAddToWishlist(product)}>
                                                <Heart />
                                            </button>
                                            <button className="bestselling__show_btn">
                                                <Eye />
                                            </button>
                                        </div>
                                        <div className="product__image">
                                            <img src={product.image} />
                                            <button className="bestselling__addcard">Add To Cart</button>
                                        </div>
                                        <div className="bestselling__description">
                                            <h5 className="bestselling__name">{product.name}</h5>
                                            <div className="bestselling__prices">
                                                <span className="bestselling_newprice">${product.discountedPrice}</span>
                                                <span className="bestselling_oldprice">${product.price}</span>
                                            </div>
                                            <div className="bestselling_feedbacks">
                                                <div className="bestselling__star">
                                                    {[...Array(5)].map((_, starIndex) => (
                                                        <StarFill
                                                            key={starIndex}
                                                            className={starIndex < product.starCount ? 'star-yellow' : 'star-gray'}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="bestselling__feedcount">
                                                    ({product.feedbackCount})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                    )})}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default BestSelling