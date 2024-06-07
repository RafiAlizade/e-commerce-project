import { useState, useEffect } from "react";
import { getCardItems } from "../../../utils/wishlistUtils";
import cardPhotos from '../../../assets/checkpage/Frame834.svg'
import './CheckPage.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CheckPage() {
  const [cartitems, setCartitems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);


  useEffect(() => {
    const getItems = async () => {
      const cartItems = await getCardItems();
      setCartitems(cartItems);
    };


    getItems();
  }, []);

  useEffect(() => {
    const calculateSubtotal = () => {
        const total = cartitems.reduce((acc, item) => acc + (item.subtotal || (item.discount ? item.discountedPrice : item.price)),
        0 )

        setSubtotal(total)
    }

    calculateSubtotal()
  }, [cartitems])

  const generateOrderNumber = () => {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
  };

  const navigate = useNavigate();

  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };


  const postInfo = () => {
    const firstname = document.querySelector('.billing_firstname_input').value;
    const company = document.querySelector('.billing_company_input').value;
    const street = document.querySelector('.billing_address_input').value;
    const apartament = document.querySelector('.billing_apartament_input').value;
    const town = document.querySelector('.billing_town_input').value;
    const phone = document.querySelector('.billing_phone_input').value;
    const email = document.querySelector('.billing_email_input').value;
    const status = "Order Confirmed"
    const orderNumber = generateOrderNumber();
    
    const itemsProperties = cartitems.map(item => ({
      name: item.name,
      image: item.image,
      category: item.category,
      price: item.price,
      subtotal: item.subtotal,
      quantity: item.quantity,
      selectedColorName: item.selectedColor ? item.selectedColor.name : null,
      selectedColorImage: item.selectedColor ? item.selectedColor.coloredImage : null,
    }));

    axios.post('http://localhost:3000/completedOrders', { firstname, company, street, apartament, town, phone, email, orderNumber, itemsProperties, status } )
    localStorage.removeItem('carditems')
    navigate(`/completed-order/${orderNumber}`)
  }

  return (
    <div className="app__checkpage">
      <div className="container">
        <div className="checkpage__inner">
        <div className="checkpage__top">
          <span className="checkpage__pageline">
            Account / My Account / Product / View Cart / 
            <span className="checkpage__bold"> Checkout</span>
          </span>
        </div>

        <div className="checkpage__bottom">
          <h5 className="checkpage__h5">Billing Details</h5>

          <form className="checkpage__billing" action="#" onSubmit={postInfo}>
            <div className="billing__left" >
              <label htmlFor="billingFirstname" className="billing__labels">
                <span className="billing__span">First Name <span className="billing__required">*</span></span>
                <input type="text" name="billingFirstname" className="billing_firstname_input" required />
              </label>

              <label htmlFor="billingCompany" className="billing__labels" >
              <span className="billing__span">Company Name</span>
                <input type="text" name="billingCompany" className="billing_company_input" />
              </label>

              <label htmlFor="billingStreet" className="billing__labels">
              <span className="billing__span">Street Address <span className="billing__required">*</span></span>
                <input type="text" name="billingStreet" className="billing_address_input" required />
              </label>

              <label htmlFor="billingApartament" className="billing__labels">
              <span className="billing__span">Apartment, floor, etc. (optional)</span>
                <input type="text" name="billingApartament" className="billing_apartament_input" />
              </label>

              <label htmlFor="billingTown" className="billing__labels">
              <span className="billing__span">Town / City <span className="billing__required">*</span></span>
                <input type="text" name="billingTown" className="billing_town_input" required />
              </label>

              <label htmlFor="billingPhone" className="billing__labels">
              <span className="billing__span">Phone Number <span className="billing__required">*</span></span>
                <input type="text" name="billingPhone" className="billing_phone_input" required />
              </label>

              <label htmlFor="billingEmail" className="billing__labels">
              <span className="billing__span">Email Address <span className="billing__required">*</span></span>
                <input type="email" name="billingEmail" className="billing_email_input" required />
              </label>

              <label htmlFor="billingCheck" className="billing__check">
                <input type="checkbox" name="billingCheck" className="billing__check_box" required />
                <span className="billing__check_span">Save this information for faster check-out next time</span>
              </label>
            </div>

            <div className="billing__right">
              <div className="billing__products">
                {cartitems.map((item, index) => {
                const multipleColorType = item.multipleColors;

                return (
                  <div className="billing__products_box" key={index}>
                    <div className="billing__product_left">
                        <div className="billing__pruduct_imgbox">
                        {item.multipleColors && item.colors.length > 0 ? (
                          <img
                            src={
                              item.colors[item.selectedColorIndex].coloredImage
                            }
                            alt={item.colors[item.selectedColorIndex].name}
                          />
                        ) : (
                          <img src={item.image} alt={item.name} />
                        )}
                        </div>
                      <span className="billing__product_name">
                      {multipleColorType
                          ? item.selectedColor &&
                            `${item.name} ${capitalizeFirstLetter(
                              item.selectedColor.name
                            )}`
                          : item.name}
                      </span>
                    </div>

                    <span className="billing__product_total">
                      ${item.subtotal == 0
                        ? item.discount
                          ? item.discountedPrice
                          : item.price
                        : item.subtotal}
                    </span>
                  </div>
                                  )})}
              </div>

              <div className="billing__total_box">
                <div className="billing__subtotal">
                    <span className="billing__subtotal_span">Subtotal:</span>
                    <span className="billing__subtotal_price">
                        ${subtotal}
                    </span>
                </div>

                <div className="billing__shipping">
                    <span className="billing__shipping_span">Shipping: </span>
                    <span className="billing__shipping_price">Free</span>
                </div>

                <div className="billing__total">
                    <span className="billing__total_span">Total: </span>
                    <span className="billing__total_price">
                            ${subtotal}
                    </span>
                </div>
              </div>

              <div className="billing__payment">
                <label htmlFor="billingPayment">
                    <div className="billing__bank">
                        <div className="billing__bank_left">
                        <input type="radio" name="billingPayment" id="" required />
                        <span className="billing__bank_span">Bank</span>
                        </div>

                        <img src={cardPhotos} alt="payment_methods" />
                    </div>

                    <div className="billing__cash">
                        <input type="radio" name="billingPayment" required />
                        <span className="billing__cash_span">Cash on delivery</span>
                    </div>

                </label>
              </div>

              <div className="billing__coupon">
                <div className="billing__coupon_label">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="billing__coupon_input"
                  />
                </div>

                <button className="billing__coupon_applybtn" type="button">Apply Coupon</button>
              </div>

              <button type="submit" className="billing__placeorder">Place Order</button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default CheckPage;
