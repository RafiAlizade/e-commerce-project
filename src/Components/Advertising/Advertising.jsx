import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Advertising.css"
import CountDown from "count-down-react";

function Advertising() {
    const date1 = Date.now() + 37 * 60 * 60 * 1000;

    const [advertising, getAdvertising] = useState([])

    useEffect(() => {
        const getAdverts = async () => {
            const getData = await axios.get('http://localhost:3000/advertising')
            getAdvertising(getData.data)
        }

        getAdverts()
        
    },[])

    const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
        return (
            <ul>
                <li>
                    <span id="hours">{hours}</span>
                    <span className="timer_text">Hours</span>
                </li>
                <li>
                    <span id="days">0{days}</span>
                    <span className="timer_text">Days</span>
                </li>
                <li>
                    <span id="minutes">{minutes}</span>
                    <span className="timer_text">Minutes</span>
                </li>
                <li>
                    <span id="seconds">{seconds}</span>
                    <span className="timer_text">Seconds</span>
                </li>
            </ul>
        );
    };

  return (
    <section className="app_advertising">
        <div className="container">
            <div className="advertising__inner">
                {advertising.map((adv, index) => (
                    <div className="advertising__box" key={index}>
                        <div className="advertising__left">
                            <div className="advertising__top_box">
                                <h5 className="advertising_h5">Categories</h5>
                                <span className="advertising__name">{adv.adTitle}</span>
                            </div>

                            <div className="advertising__bottom_box">
                                <div className="advertising__timer">
                                <CountDown date={date1} renderer={CountdownRenderer} />
                                </div>

                                <Link to={adv.adLink} className="advertising_buybtn">Buy Now</Link>
                            </div>
                        </div>

                        <div className="advertising__right">
                            <div className="advertising__image">
                                <img src={adv.adImage} alt="" />
                            </div>

                            <div className="advertising_bgblur">
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="flashsale__timer_box">
                                <CountDown date={date1} renderer={CountdownRenderer} />
                            </div> */}
        </div>
    </section>
  )
}

export default Advertising