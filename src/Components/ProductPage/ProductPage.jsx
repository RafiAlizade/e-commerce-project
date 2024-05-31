import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { StarFill } from 'react-bootstrap-icons';
import './ProductPage.css';

function ProductPage() {
    const { id, colorIndex } = useParams();
    const productID = id;
    const selectedColorIndex = colorIndex ? parseInt(colorIndex) : 0;
    const [product, setProduct] = useState({});
    // const [defaultProduct, setdefaultProduct] = useState([])
    const [selectedColors, setSelectedColors] = useState({ [productID]: selectedColorIndex });

    useEffect(() => {
        const getData = async () => {
                const response = await axios.get(`http://localhost:3000/products/${productID}`);
                setProduct(response.data);
        };

        getData();
    }, [productID]);

    const productName = product.name || '';
    const color = product.colors && product.colors[selectedColors[productID]] ? product.colors[selectedColors[productID]].name : '';
    const categoryName = product.category ? product.category[0].toUpperCase() + product.category.slice(1) : '';

    const handleColorSelect = (e, productId, colorIndex) => {
        e.stopPropagation();
        setSelectedColors({ ...selectedColors, [productId]: colorIndex });
    };

    

    const capitalizeFirstLetter = (string) => {
        return string ? string[0].toUpperCase() + string.slice(1) : '';
    };

    return (
        <>
            <Header />
            <main className="app__main">
                <section className="app__preview">
                    <div className="container">
                        <div className="preview__inner">
                            <div className="preview__top">
                                <span className="preview__pageline">Categories /  {categoryName} /  <span className="preview__bold">{productName}</span></span>
                            </div>
                            <div className="preview__bottom">
                                <div className="preview__product">
                                    <div className="preview__mainphoto">
                                        <div className="preview__img">
                                            {product.multipleColors && product.colors && product.colors[selectedColors[productID]] ? (
                                                <img
                                                    src={product.colors[selectedColors[productID]].coloredImage}
                                                    alt={`${product.name} ${capitalizeFirstLetter(color)}`}
                                                />
                                            ) : (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                />
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
                                                                className={starIndex < product.starCount ? 'star-yellow' : 'star-gray'}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="product__feedcount">
                                                        ({product.feedbackCount})
                                                    </span>
                                                </div>
                                                <span className="product__line">|</span>
                                                <span className="product__stock" style={ { color : product.inStock ? 'rgb(0, 255, 102)' : 'rgb(219, 68, 68)' }}>
                                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </div>
                                            <h5 className="preview__price">
                                                ${product.discount ? product.discountedPrice : product.price}
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
                                                        <span className="informations__colors_span">Colours :</span>
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
                                                                        handleColorSelect(e, product.id, index)
                                                                    }
                                                                ></span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
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
