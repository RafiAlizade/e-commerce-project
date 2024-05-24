import {useEffect, useState } from 'react'
import './WishPage.css'
import axios from 'axios'
import { addToWishlist, removeFromWishlist, getWishlist } from './../../utils/wishlistUtils';
import { Trash } from 'react-bootstrap-icons';

function WishPage() {
    const [products, setProducts] = useState([])
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios.get('http://localhost:3000/products')
            setProducts(response.data)
        }

        getProducts()
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
                                Wishlist {wishlist.length}
                            </div>

                            <div className="wishlist__tobag">
                                    <span className="wishlist__bagtext">Move All To Bag</span>
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

                    </div>
            </div>
        </div>
    </div>
  )
}

export default WishPage