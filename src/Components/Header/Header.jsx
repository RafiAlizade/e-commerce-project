import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import {
  ChevronDown,
  Search,
  Heart,
  Cart,
  Person,
  BagDash,
  XCircle,
  Star,
  BoxArrowLeft,
} from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { getWishlist , getCardItems } from './../../utils/wishlistUtils';
import axios from "axios";

function Header() {
  const [navLink, setNavLink] = useState([]);
  const [account, setAccount] = useState([]);
  const [statusAccount, setStatusAccount] = useState(true);
  const [wishlistTable, setWishlistTable] = useState([]);
  const [cardTable, setCardTable] = useState([]);

  const changeStatusAccount = () => {
    const menuContainer = document.querySelector(".header__account_menu");
    if (statusAccount == true) {
      setStatusAccount(false);
      menuContainer.classList.toggle("close");
    } else {
      setStatusAccount(true);
      menuContainer.classList.toggle("opened");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3000/navlinks");
      setNavLink(response.data);
    };

    const getAccount = async () => {
      const response = await axios.get("http://localhost:3000/accounts");
      setAccount(response.data);
    };

    getData();
    getAccount();
  }, []);

  useEffect(() => {
    const updateWishlist = () => {
      setWishlistTable(getWishlist());
    };

    updateWishlist();
    const intervalWishlist = setInterval(updateWishlist, 100);

    return () => clearInterval(intervalWishlist);
}, []);

useEffect(() => {
    const updateCardList = () => {
      setCardTable(getCardItems());
    };

    updateCardList();

    const intervalCardList = setInterval(updateCardList, 100);

    return () => clearInterval(intervalCardList);
}, []);


  return (
    <header className="main__header">
      <div className="header__inner">
        <div className="header__top">
          <div className="header__top_contained">
            <div className="header__top_left">
              <p className="header__shoptext">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF
                50%! <Link to="./">Shop Now</Link>
              </p>
            </div>

            <div className="header__top_right">
              <div className="header__change_btn">
                <span className="header__top_language">English</span>
                <ChevronDown />
              </div>
            </div>
          </div>
        </div>

        <div className="header__bottom">
          <div className="header__bottom_contained">
            <Link to="/" className="header__href">
              <h1 className="header__h1">Exlucisve</h1>
            </Link>
            <nav className="header__nav">
              <ul className="header__navlist">
                {navLink.map(({ name, url, active }, key) => (
                  <li key={key}>
                    <NavLink
                      to={url}
                      className={({ isActive }) =>
                        isActive ? "active" : "inactive"
                      }
                    >
                      {active ? name : ""}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="header__bottom_right">
              <div className="header__buttons_container">
                <div className="header__input_box">
                  <input
                    type="text"
                    className="header__input_search"
                    placeholder="What are you looking for?"
                  />
                  <button className="header__search_btn">
                    <Search />
                  </button>
                </div>

                <button className="header__wishlist_btn">
                  <Link to="/wishlist">
                    <Heart />
                    <span className={wishlistTable.length > 0 ? 'count__wish' : '' }>
                      {wishlistTable.length > 0 ? wishlistTable.length : ''}
                    </span>
                  </Link>
                </button>

                <button className="header__cart_btn">
                  <Link to="/cart">
                    <Cart />
                    <span className={cardTable.length > 0 ? 'count__cart' : '' }>
                      {cardTable.length > 0 ? cardTable.length : ''}
                    </span>
                  </Link>
                </button>

                <div className="header__acount_container">
                  {account.map(({ isLoggedIn }, key) => (
                    <button
                      className="header__account_btn"
                      onClick={changeStatusAccount}
                      key={key}
                    >
                      {isLoggedIn ? <Person /> : ""}
                    </button>
                  ))}

                  <div
                    className="header__account_menu"
                    style={{ display: statusAccount ? "none" : "flex" }}
                  >
                    <ul className="header__account_list">
                      <li>
                        <a href="#">
                          <Person />
                          <span>Manage My Account</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <BagDash />
                          <span>My Order</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <XCircle />
                          <span>My Cancellations</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Star />
                          <span>My Reviews</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <BoxArrowLeft />
                          <span>Logout</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
