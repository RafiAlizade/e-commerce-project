import {useEffect, useState } from 'react'
import './WishPage.css'
import axios from 'axios'
import { addToWishlist, removeFromWishlist, getWishlist, getCardItems, addToCard , removeFromCard  } from './../../utils/wishlistUtils';
import { Trash , Shop , Eye } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function WishPage() {
    const [products, setProducts] = useState([])
    const [wishlist, setWishlist] = useState([]);
    const [card, setCard] = useState([]);
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios.get('http://localhost:3000/products')
            setProducts(response.data)
        }

        getProducts()
    }, [])

    useEffect(() => {
        if(products.length > 0) {
            const shuffledProducts = products.sort(() => 0.3 - Math.random());
            setRandomProducts(shuffledProducts.slice(0,4));
        }
    }, [products])


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

    const handleAddToCard = (product) => {
        const carditems = getCardItems();
        const isProductInCard = carditems.some(item => item.id === product.id);

        if (isProductInCard) {
            removeFromCard(product.id);
            setCard(carditems.filter(item => item.id !== product.id));
        } else {
            addToCard(product);
            setCard([...card, product]);
        }
    };

    const wishlistCount = getWishlist();

    useEffect(() => {
        setWishlist(getWishlist());
    }, [products]);
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
                                    <Link to='/cart' className='wishlist__bagtext'>Move All To Bag</Link>
                            </div>
                        </div>

                        <div className="wishlist__container">
                            {wishlist.map((wishs, index) => (
                                <div className="wishlist__box" key={index}>
                                <div className="wishlist__buttons_abs">
                                    <button className="wishlist__remove_btn" onClick={() => handleAddToWishlist(wishs)}>
                                        <Trash />
                                    </button>
                                </div>
                                <div className="product__image">
                                    <img src={wishs.image} />
                                    <button className="wishlist__addcard">Add To Cart</button>
                                </div>
                                <div className="product__description">
                                    <h5 className="product__name">{wishs.name}</h5>
                
                                    <div className="wishlist__price_name">
                                    <span className="product_price">${wishs.price}</span>
                                    {wishs.discount && (
                                        <span className='wishlist__discounted_price'>${wishs.discountedPrice}</span>
                                    )}
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className="wishlist__bottom">
                                <div className="wishlist__products_text">
                                        <div className="wishlist__products__left">
                                                 <div className="redline"></div>
                                                 <span className="wishlist__products_span">Just For You</span>
                                        </div>

                                        <Link to='/products' className='wishlist__products_href'>See All</Link>
                                </div>

                                <div className="wishlist__products__container">
                                {randomProducts.map((products, index) => {
                                return (
                                <div className="wishlist__box" key={index}>
                                <div className="wishlist__buttons_abs">
                                    <button className="wishlist__remove_btn">
                                        <Eye />
                                    </button>
                                </div>
                                <div className="product__image">
                                    <img src={products.image} />
                                    <button className="wishlist__addcard" onClick={() => handleAddToCard(products)}>Add To Card</button>
                                </div>
                                <div className="product__description">
                                    <h5 className="product__name">{products.name}</h5>
                
                                    <div className="wishlist__price_name">
                                    <span className="product_price">${products.price}</span>
                                    {products.discount && (
                                        <span className='wishlist__discounted_price'>${products.discountedPrice}</span>
                                    )}
                                    </div>
                                </div>
                            </div>
                            )})}
                                </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default WishPage