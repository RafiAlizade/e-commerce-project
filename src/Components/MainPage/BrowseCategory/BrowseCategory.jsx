import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./BrowseCategory.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { ArrowRightShort, ArrowLeftShort, Phone, Laptop, Smartwatch, Camera, Headphones, Controller, Mouse, Tv, Webcam } from 'react-bootstrap-icons';

function BrowseCategory() {
    const [categories, setCategories] = useState([]);
    const sliderRef = useRef(null);

    const iconMap = {
        Phone: Phone,
        Laptop: Laptop,
        Smartwatch: Smartwatch,
        Camera: Camera,
        Headphones: Headphones,
        Controller: Controller,
        Mouse: Mouse,
        TV: Tv,
        Webcam: Webcam
      };


    useEffect(() => {
        const getCategory = async () => {
            const response = await axios.get('http://localhost:3000/browsecategory')
            setCategories(response.data)
        }

        getCategory();
    }, [])

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    var settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };

    return (
        <section className="app_categories">
            <div className="container">
                <div className="categories__inner">
                    <div className="categories__top">
                        <div className="categories__text">
                            <div className="redline">

                            </div>

                            <span className="categories__span">Categories</span>
                        </div>

                        <div className="categories__browse">
                            <span className="categories__h5">Browse By Category</span>
                            <div className="categories__buttons">
                                <button className="categories__prev" onClick={prevSlide}>
                                    <ArrowLeftShort />
                                </button>
                                <button className="categories__next" onClick={nextSlide}>
                                    <ArrowRightShort />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="categories__bottom">
                        <div className="categories__container">
                        <Slider ref={sliderRef} {...settings}>
                            {categories.map((category, index) => {
                                const CategoryIcon = iconMap[category.categoryBootstrapName];
                                return (

                                    <Link to={category.linkTo} className="categories__href" key={index}>
                                        <div className="categories__box" key={index}>
                                                <div className="categories__main">
                                                <CategoryIcon className="bcategories__icon" />
                                        <span className="categories__name">
                                            {category.categoryName}
                                        </span>
                                                </div>
                                    </div>
                                    </Link>
                                );
                            })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BrowseCategory