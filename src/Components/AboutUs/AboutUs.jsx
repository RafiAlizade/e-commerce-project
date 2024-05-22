import { useState, useEffect } from 'react'
import './AboutUs.css'
import OurStoryImage from './../../assets/aboutus/aboutus_side.svg'
import { Link } from 'react-router-dom';
import { Shop, Coin, Handbag, Collection, Twitter, Instagram, Linkedin  } from 'react-bootstrap-icons'
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AboutUs() {

    const [personals, setPersonals] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:3000/personals')
            setPersonals(response.data)
        }

        getData();
    }, [])

    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 5000,
        cssEase: "linear"
      };

  return (
    <div className="app__aboutus">
        <div className="container">
            <div className="aboutus__inner">
                <div className="aboutous__top">
                        <span className="aboutus__pageline">
                            Home &nbsp; / &nbsp;  <span className="aboutus__bold">About</span>
                        </span>
                </div>

                <div className="aboutus__bottom">
                    <div className="ourstory__inner">
                        <div className="ourstory__left">
                            <h5 className="ourstory__h5">
                            Our Story
                            </h5>
                            
                            <span className="ourstory__desc">
                            Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. 

                            <br></br>
                            <br></br>

                            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
                            </span>
                        </div>

                        <div className="ourstory__right">
                            <div className="ourstory__img">
                                    <img src={OurStoryImage} />
                            </div>
                        </div>
                    </div>

                    <div className="ourstory__advantages">
                        <div className="osadvantages__container">
                            <div className="osadvantages__box">
                                <div className="osadvantages__iconbox">
                                <span className="osadvantages__icon">
                                    <Shop />
                                </span>
                                </div>

                                <div className="osadvantages__texts">
                                        <span className="osadvantages__count">10.5k</span>
                                        <span className="osadvantages__description">Sallers active our site</span>
                                </div>
                            </div>

                            <div className="osadvantages__box">
                                <div className="osadvantages__iconbox">
                                <span className="osadvantages__icon">
                                    <Coin />
                                </span>
                                </div>

                                <div className="osadvantages__texts">
                                        <span className="osadvantages__count">10.5k</span>
                                        <span className="osadvantages__description">Sallers active our site</span>
                                </div>
                            </div>

                            <div className="osadvantages__box">
                                <div className="osadvantages__iconbox">
                                <span className="osadvantages__icon">
                                    <Handbag />
                                </span>
                                </div>

                                <div className="osadvantages__texts">
                                        <span className="osadvantages__count">10.5k</span>
                                        <span className="osadvantages__description">Sallers active our site</span>
                                </div>
                            </div>

                            <div className="osadvantages__box">
                                <div className="osadvantages__iconbox">
                                <span className="osadvantages__icon">
                                    <Collection />
                                </span>
                                </div>

                                <div className="osadvantages__texts">
                                        <span className="osadvantages__count">10.5k</span>
                                        <span className="osadvantages__description">Sallers active our site</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ourstory__personal">
                        <div className="personal__container">
                            <Slider {...settings}>
                            {personals.map((personal, index) => (
                                <div className="personal__box" key={index}>
                                        <div className="personal__img">
                                                <img src={personal.photo} alt="" />
                                        </div>

                                        <div className="personal__text">
                                            <span className="personal__name">{personal.name}</span>
                                            <span className="personal__job">{personal.job}</span>
                                        </div>

                                        <div className="personal__links">
                                            <Link to={personal.linkTwitter}><Twitter /></Link>
                                            <Link to={personal.linkInstagram}><Instagram /></Link>
                                            <Link to={personal.linkLinkedin}><Linkedin /></Link>
                                        
                                        </div>
                                </div>
                            ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutUs