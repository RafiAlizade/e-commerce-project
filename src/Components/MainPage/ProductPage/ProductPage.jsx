import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { StarFill, Heart, Truck, ArrowRepeat, Eye } from "react-bootstrap-icons";
import {
  getCardItems,
  removeFromCard,
  addToCard,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "./../../../utils/wishlistUtils";
import "./ProductPage.css";

function ProductPage() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { id, colorIndex } = useParams();
  const productID = id;
  const selectedColorInd = colorIndex ? parseInt(colorIndex) : 0;
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColors, setSelectedColors] = useState({
    [productID]: selectedColorInd,
  });
  const [randomProducts, setRandomProducts] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `http://localhost:3000/products/${productID}`
      );
      setProduct(response.data);
    };

    getData();
  }, [productID]);

  useEffect(() => {
    setWishlist(getWishlist());
    setCartItems(getCardItems());
  }, [products]);

  useEffect(() => {
    const getProdcuts = async () => {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    };

    getProdcuts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
        const shuffledProducts = products.sort(() => 0.3 - Math.random());
        setRandomProducts(shuffledProducts.slice(0, 4));
    }
}, [products]);

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
    setCartItems(cardItems.filter((item) => !(item.id === product.id && (!item.selectedColorIndex || item.selectedColorIndex === selectedColorIndex))));
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
    setCartItems([...cartItems, productToAdd]);
  }
};

const isInCartlist = (product, selectedColorIndex) => {
  return cartItems.some(
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


  const productName = product.name || "";
  const color =
    product.colors && product.colors[selectedColors[productID]]
      ? product.colors[selectedColors[productID]].name
      : "";
  const categoryName = product.category
    ? product.category[0].toUpperCase() + product.category.slice(1)
    : "";

  const handleColorSelectProduct = (e, productId, colorIndex) => {
    e.stopPropagation();
    setSelectedColors({ ...selectedColors, [productId]: colorIndex });
  };

  const handleColorSelect = (e, productId, colorIndex) => {
    e.stopPropagation();
    setSelectedColors({ ...selectedColors, [productId]: colorIndex });
  };

  const capitalizeFirstLetter = (string) => {
    return string ? string[0].toUpperCase() + string.slice(1) : "";
  };

  const addQuantity = () => {
    if (quantity >= 10) {
      setQuantity(10);
    } else if (quantity == 0) {
      setQuantity(1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const navigate = useNavigate();

  const clickToShow = (product) => {
    const selectedColorIndex = selectedColors[product.id] || 0;
    if (product.multipleColors) {
      return navigate(`./../../../product/${product.id}/${selectedColorIndex}`);
    } else {
      return navigate(`./../../../product/${product.id}`);
    }
  };

  const removeQuantity = () => {
    setQuantity(quantity - 1);

    if (quantity <= 1) setQuantity(1);
  };

  const handleAddToCardProduct = (e) => {
    e.stopPropagation();
    const currentCartItems = getCardItems();
    const productID = product.id;
    const selectedColor =
      product.colors && product.colors[selectedColors[productID]]
        ? product.colors[selectedColors[productID]].name
        : "";
    const isProductInCard = currentCartItems.some(
      (item) =>
        item.id === productID &&
        (!item.selectedColorIndex ||
          item.selectedColorIndex === selectedColors[productID])
    );

    if (isProductInCard) {
      removeFromCard(productID, selectedColors[productID]);
      setCartItems(
        currentCartItems.filter(
          (item) =>
            !(
              item.id === productID &&
              (!item.selectedColorIndex ||
                item.selectedColorIndex === selectedColors[productID])
            )
        )
      );
    } else {
      const productToAdd = {
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        category: product.category,
        multipleColors: product.multipleColors,
        colors: product.colors,
        price: product.price,
        related: product.related,
        multipleSize: product.multipleSize,
        flashsale: product.flashsale,
        discount: product.discount,
        discountedPrice: product.discountedPrice,
        discountRateDisplay: product.discountRateDisplay,
        discountRate: product.discountRate,
        starCount: product.starCount,
        isNew: product.isNew,
        inStock: product.inStock,
        feedbackCount: product.feedbackCount,
        subtotal: product.discount ? product.discountedPrice * quantity : product.price * quantity,
        quantity: quantity,
        ...(product.multipleColors && {
          differentColor: true,
          selectedColor: product.colors[selectedColors[product.id]],
          selectedColorIndex: selectedColors[productID],
        }),
      };
      setCartItems([...currentCartItems, productToAdd]);
      addToCard(productToAdd);
    }
  };

  const handleAddToWishlistProduct = (e) => {
    e.stopPropagation();
    const currentWishItems = getWishlist();
    const productID = product.id;
    const selectedColor =
      product.colors && product.colors[selectedColors[productID]]
        ? product.colors[selectedColors[productID]].name
        : "";
    const isProductInWishlist = wishlist.some(
      (item) =>
        item.id === productID &&
        (!item.selectedColorIndex ||
          item.selectedColorIndex === selectedColors[productID])
    );

    if (isProductInWishlist) {
      removeFromWishlist(productID, selectedColors[productID]);
      setWishlist(
        wishlist.filter(
          (item) =>
            !(
              item.id === productID &&
              (!item.selectedColorIndex ||
                item.selectedColorIndex === selectedColors[productID])
            )
        )
      );
    } else {
      const productToAdd = {
        id: product.id,
        name: product.name,
        image: product.multipleColors ? product.colors[selectedColors[productID]].coloredImage : product.image,
        description: product.description,
        category: product.category,
        multipleColors: product.multipleColors,
        colors: product.colors,
        price: product.price,
        related: product.related,
        multipleSize: product.multipleSize,
        flashsale: product.flashsale,
        discount: product.discount,
        discountedPrice: product.discountedPrice,
        discountRateDisplay: product.discountRateDisplay,
        discountRate: product.discountRate,
        starCount: product.starCount,
        isNew: product.isNew,
        inStock: product.inStock,
        feedbackCount: product.feedbackCount,
        subtotal: product.discount ? product.discountedPrice * quantity : product.price * quantity,
        quantity: quantity,
        ...(product.multipleColors && {
          differentColor: true,
          selectedColor: product.colors[selectedColorInd],
          selectedColorIndex: selectedColorInd,
        }),
      };
      addToWishlist(productToAdd);
      setWishlist([...wishlist, productToAdd]);
    }
  };

  const isInCartlistProduct = () => {
    return cartItems.some(
      (item) =>
        item.id === product.id &&
        (!item.selectedColorIndex ||
          item.selectedColorIndex === selectedColors[productID])
    );
  };

  const isInWishlistProduct = () => {
    return wishlist.some(
      (item) =>
        item.id === product.id &&
        (!item.selectedColorIndex ||
          item.selectedColorIndex === selectedColors[productID])
    );
  };

  return (
    <>
      <Header />
      <main className="app__main">
        <section className="app__preview">
          <div className="container">
            <div className="preview__inner">
              <div className="preview__top">
                <span className="preview__pageline">
                  Categories / {categoryName} /{" "}
                  <span className="preview__bold">{productName}</span>
                </span>
              </div>
              <div className="preview__bottom">
                <div className="preview__product">
                  <div className="preview__mainphoto">
                    <div className="preview__img">
                      {product.multipleColors &&
                      product.colors &&
                      product.colors[selectedColors[productID]] ? (
                        <img
                          src={
                            product.colors[selectedColors[productID]]
                              .coloredImage
                          }
                          alt={`${product.name} ${capitalizeFirstLetter(
                            color
                          )}`}
                        />
                      ) : (
                        <img src={product.image} alt={product.name} />
                      )}
                    </div>
                  </div>
                  <div className="preview__informations">
                    <div className="informations__top">
                      <h5 className="preview__name">
                        {`${productName} ${capitalizeFirstLetter(color)}`}
                      </h5>
                      <div className="preview__reviews">
                        <div className="reviews__left">
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
                        <span className="product__line">|</span>
                        <span
                          className="product__stock"
                          style={{
                            color: product.inStock
                              ? "rgb(0, 255, 102)"
                              : "rgb(219, 68, 68)",
                          }}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <h5 className="preview__price">
                        $
                        {product.discount
                          ? product.discountedPrice
                          : product.price}
                      </h5>
                      <span className="preview__description">
                        {product.description}
                      </span>
                    </div>
                    <div className="informations__line"></div>
                    <div className="informations__bottom">
                      <div className="informations__colors">
                        {product.multipleColors ? (
                          <div className="informations__cselect">
                            <span className="informations__colors_span">
                              Colours :
                            </span>
                            <div className="informations__color">
                              {product.colors.map((color, index) => (
                                <span
                                  key={index}
                                  className={`product__color ${color.name}`}
                                  style={{
                                    backgroundColor: `${color.name}`,
                                    width: "1rem",
                                    height: "1rem",
                                    borderRadius: "50%",
                                    border:
                                      selectedColors[productID] === index
                                        ? "0.13rem solid rgb(0, 0, 0)"
                                        : "none",
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) =>
                                    handleColorSelectProduct(e, product.id, index)
                                  }
                                ></span>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="informations__buttons">
                        <div className="informations__quantity">
                          <button
                            className="quantity__decrease"
                            onClick={removeQuantity}
                          >
                            -
                          </button>
                          <span className="informations__quantity_span">
                            {quantity}
                          </span>
                          <button
                            className="quantity__increase"
                            onClick={addQuantity}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="informations__buybtn"
                          onClick={(e) => handleAddToCardProduct(e)}
                        >
                          {isInCartlistProduct(product)
                            ? "Remove from Card"
                            : "Buy Now"}
                        </button>

                        <button
                          className="informations__addwishlist"
                          style={{
                            backgroundColor: isInWishlistProduct()
                              ? "rgb(219, 68, 68)"
                              : "transparent",
                            color: isInWishlistProduct()
                              ? "rgb(255, 255, 255)"
                              : "rgb(0, 0, 0)",
                          }}
                          onClick={handleAddToWishlistProduct}
                        >
                          <Heart />
                        </button>
                      </div>
                      <div className="informations__info">
                        <div className="informations__delivery">
                          <Truck />
                          <div className="delivery__texts">
                            <h5 className="delivery__h5">Free Delivery</h5>
                            <span className="delivery__description">
                              Enter your postal code for Delivery Availability
                            </span>
                          </div>
                        </div>

                        <div className="informations__return">
                          <ArrowRepeat />
                          <div className="return__texts">
                            <h5 className="return__h5">Return Delivery</h5>
                            <span className="return__description">
                              Free 30 Days Delivery Returns.{" "}
                              <Link to="/contact">Details</Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="preview__related">
                <div className="related__top">
            <div className="related__text">
              <div className="redline"></div>

              <span className="related__span">Related Item</span>
            </div>
          </div>

          <div className="related__bottom">
            <div className="related__container">
              {randomProducts.map((product, index) => {
                const selectedColorIndex = selectedColors[product.id] || 0;
                return (
                  <div className="related__box" key={index} onClick={() => clickToShow(product)}>
                    {product.discount && <div className="related__discountprice">
                      -{product.discountRate}%
                    </div>}
                    <div className="related__buttons_abs">
                      <button
                        className="related__wishlist_btn"
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
                      <button className="related__show_btn">
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
                          className="related__addcard"
                          onClick={(e) => handleAddToCard(e, product)}
                        >
                          {isInCartlist(product, selectedColorIndex)
                            ? "Remove from Card"
                            : "Add to Card"}
                        </button>
                      </div>
                    <div className="related__description">
                      <h5 className="related__name">{product.name}</h5>
                      <div className="related__prices">
                      <span className="related_newprice">${product.price}</span>
                                    {product.discount && (
                                        <span className='related_oldprice'>${product.discountedPrice}</span>
                                    )}
                      </div>
                      <div className="related_feedbacks">
                        <div className="related__star">
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
                        <span className="related__feedcount">
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProductPage;
