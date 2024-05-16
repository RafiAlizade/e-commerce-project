import React from 'react'
import './Categories.css'
import { ChevronRight } from 'react-bootstrap-icons'
import { useState, useEffect } from "react";
import axios from "axios";



function Categories() {
    const [categories, setCategories] = useState([]);
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState(null);

    const setCategory = (subname) => {
        setActiveCategory(subname);

        if (activeCategory) {
        setActiveCategory(null);
        }
    }

    setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        if (currentIndex >= slides.length - 1) {
            setCurrentIndex(0);
        }
    }, 5000);

    useEffect(() => {
        const getCategories = async () => {
            const response = await axios.get('http://localhost:3000/categories')
            setCategories(response.data)
        }

        const getSlides = async () => {
            const response = await axios.get('http://localhost:3000/slides')
            setSlides(response.data)
        };

        

        getCategories();
        getSlides();
    }, []);

    return (
        <section className="hero">
            <div className="container">
                <div className="hero__inner">
                    <div className="hero__left">
                        <ul className="categories__list">
                            {categories.map((category, key) => (
                                <li key={key}>
                                    <a href={category.subname}>{category.name}</a>
                                    {category.multipleCategory && (
                                        <ChevronRight className='categories__icon' onClick={() => setCategory(category)} />
                                    )}
                                </li>
                            ))}
                        </ul>

                        {activeCategory && (
                            <div className="categories__deatails">
                                <h2>{activeCategory.name}</h2>
                                <ul className='details__list'>
                                    {activeCategory.multipleCategories.map((item, index) => (
                                        <li key={index}><a href={`/${activeCategory.subname}/${item.toLowerCase()}`}>{item}</a></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="hero__right">
                        <div className="slides__container">
                            <div className="slides__box">
                                {slides.length > 0 ? (
                                    <a href={slides[currentIndex].textURL}>
                                        <img src={slides[currentIndex].image} alt="" />
                                    </a>
                                ) : (
                                    <p>Slides are loading...</p>
                                )}
                                <div className="slides__number">
                                    {slides.map((_, index) => (
                                        <span key={index} className={currentIndex === index ? 'active_span' : ''}>&nbsp;</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Categories