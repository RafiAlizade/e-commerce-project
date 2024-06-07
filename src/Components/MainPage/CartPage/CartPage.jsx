import { useEffect, useState } from "react";
import { getCardItems, removeFromCard } from "./../../../utils/wishlistUtils";
import { Link } from "react-router-dom";
import { XLg } from "react-bootstrap-icons";
import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const getItems = () => {
      setCartItems(getCardItems());
    };

    getItems();
  }, []);

  const handleQuantityChange = (index, quantity) => {
    const newCardItems = [...cartItems];
    const item = newCardItems[index];
    item.quantity = quantity;
    item.subtotal =
      (item.discount ? item.discountedPrice : item.price) * quantity;
    setCartItems(newCardItems);

    localStorage.setItem("carditems", JSON.stringify(newCardItems));
  };

  useEffect(() => {
    const calculateSubtotal = () => {
      const total = cartItems.reduce(
        (sum, item) =>
          sum +
          (item.subtotal ||
            (item.discount ? item.discountedPrice : item.price)),
        0
      );
      setSubtotal(total);
    };

    calculateSubtotal();
  }, [cartItems]);

  const removeFromCards = (productId, selectedColorIndex) => {
    removeFromCard(productId.id, selectedColorIndex);
    const refreshedItems = getCardItems();
    setCartItems(refreshedItems);
  };

  const capitalizeFirstLetter = (string) => {
    return string ? string[0].toUpperCase() + string.slice(1) : '';
};


  return (
    <div className="app__cart">
      <div className="container">
        <div className="cart__inner">
          <div className="cart__top">
            <span className="cart__page">
              Home / <span className="cart__bold">Cart</span>
            </span>
          </div>

          <div className="cart__bottom">
            <div className="cart__list">
              <div className="cart__list_top">
                <div className="cart__list_texts">
                  <span className="cart__list_text">Product</span>

                  <span className="cart__list_text">Price</span>

                  <span className="cart__list_text">Quantity</span>

                  <span className="cart__list_text">Subtotal</span>
                </div>

                <div className="cart__list_container">
                  {cartItems.map((cartitem, index) => {
                const multipleColorType = cartitem.multipleColors;

                    return (
                  
                    <div className="cart__list_box" key={index}>
                      <div className="cart__list_product">
                        <div className="cart__list_img">
                        {cartitem.multipleColors && cartitem.colors.length > 0 ? (
                          <img
                            src={
                              cartitem.colors[cartitem.selectedColorIndex].coloredImage
                            }
                            alt={cartitem.colors[cartitem.selectedColorIndex].name}
                          />
                        ) : (
                          <img src={cartitem.image} alt={cartitem.name} />
                        )}
                        </div>

                        <button
                          className="cart__list_remove"
                          onClick={() => removeFromCards(cartitem, cartitem.selectedColorIndex )}
                        >
                          <XLg />
                        </button>

                        <h5 className="cart__list_name">
                        {multipleColorType
                          ? cartitem.selectedColor &&
                            `${cartitem.name} ${capitalizeFirstLetter(
                              cartitem.selectedColor.name
                            )}`
                          : cartitem.name}
                        </h5>
                      </div>

                      <span className="cart__list_price">
                        $
                        {cartitem.discount
                          ? `${cartitem.discountedPrice}`
                          : `${cartitem.price}`}
                      </span>

                      <div className="cart__list_quantuty">
                        <input
                          type="number"
                          defaultValue={cartitem.quantity}
                          min="1"
                          max="10"
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>

                      <span className="cart__list_subtotal">
                        $
                        {cartitem.subtotal
                          ? cartitem.subtotal
                          : cartitem.discount
                          ? cartitem.discountedPrice
                          : cartitem.price}
                      </span>
                    </div>
                  )})}
                </div>
              </div>

              <div className="cart__list_bottom">
                <Link className="cart__list_return" to="/">
                  Return To Shop
                </Link>
                <Link className="cart__list_updatecart">Update Cart</Link>
              </div>
            </div>

            <div className="cart__payment">
              <div className="cart__payment_left">
                <div className="cart__payment_label">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="cart__payment_coupon"
                  />
                </div>

                <button className="cart__payment_applybtn">Apply Coupon</button>
              </div>

              <div className="cart__payment_right">
                <div className="cart__payment_check">
                  <h5 className="cart__payment_h5">Cart Total</h5>

                  <div className="cart__payment_prices">
                    <div className="cart__payment_subtotal">
                      <span className="subtotal__span">Subtotal:</span>
                      <span className="subtotal__total">${subtotal}</span>
                    </div>

                    <div className="cart__payment_shipping">
                      <span className="shipping__span">Shipping:</span>
                      <div className="shipping__free">Free</div>
                    </div>

                    <div className="cart__payment_total">
                      <span className="total__span">Total:</span>
                      <span className="total__price">${subtotal}</span>
                    </div>
                  </div>

                  <div className="cart__payment_checkout">
                    <Link to="/checkout" className="cart__payment_checkoutbtn">
                      Procees to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
