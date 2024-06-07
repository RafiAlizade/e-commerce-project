import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp } from 'react-bootstrap-icons'
import Delivery from "../../../assets/advantages/delivery.svg"
import Customer from "../../../assets/advantages/customer.svg"
import Verifed from "../../../assets/advantages/verifed.svg"
import "./Advantages.css"

function Advantages() {

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };


  return (
    <div className="app__advantages">
        <div className="container">
            <div className="advantages__inner">
                <div className="advantages__container">
                    <div className="advantages__box">
                        <div className="advantages__img">
                             <img src={Delivery} alt="" />
                        </div>
                        <div className="advantages__text">
                        <h5 className="advantages__h5">
                            FREE AND FAST DELIVERY
                        </h5>

                        <span className="advantages__description">
                        Free delivery for all orders over $140
                        </span>
                        </div>
                    </div>

                    <div className="advantages__box">
                        <div className="advantages__img">
                             <img src={Customer} alt="" />
                        </div>
                        <div className="advantages__text">
                        <h5 className="advantages__h5">
                        24/7 CUSTOMER SERVICE
                        </h5>

                        <span className="advantages__description">
                        Friendly 24/7 customer support
                        </span>
                        </div>
                    </div>

                    <div className="advantages__box">
                        <div className="advantages__img">
                             <img src={Verifed} alt="" />
                        </div>
                        <div className="advantages__text">
                        <h5 className="advantages__h5">
                        MONEY BACK GUARANTEE
                        </h5>

                        <span className="advantages__description">
                        We reurn money within 30 days
                        </span>
                        </div>
                    </div>
                </div>

                <div className="advantages__button">
                    <span className="advantages__topbtn" onClick={scrollToTop}><ArrowUp /></span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Advantages