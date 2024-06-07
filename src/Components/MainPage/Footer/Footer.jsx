import { Link } from 'react-router-dom'
import './Footer.css'
import { ArrowRightCircle, Facebook, Twitter, Instagram, Linkedin } from 'react-bootstrap-icons'
import QRCode from './../../../assets/links/Qrcode1.svg'
import Googleplay from './../../../assets/links/googleplay.svg'
import Applestore from './../../../assets/links/appstore.svg'


function Footer() {
  return (
    <footer className="app__footer">
        <div className="container">
            <div className="footer__inner">
                <div className="footer__top">
                <div className="footer__main">
                    <h3 className="footer__main_h3">Exclusive</h3>
                    <Link to='./subscire' className='footer__main_href'>Subscribe</Link>

                        <span className="footer__main_offtext">Get 10% off your first order</span>
                        <div className="footer__main__mailbox">
                            <input type="text" placeholder='Enter your mail' className='mailbox__input'/>
                            <button type='submit' className='mailbox__href'><ArrowRightCircle /></button>
                        </div>
                </div>

                <div className="footer__support">
                    <h5 className="support_h5">Support</h5>
                    <ul className="support__ul">
                        <li className="support__li">111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</li>
                        <li className="support__li">exclusive@gmail.com</li>
                        <li className="support__li">+88015-88888-9999</li>
                    </ul>
                </div>

                <div className="footer__account">
                    <h5 className="account__h5">Account</h5>
                    <ul className="account__ul">
                        <Link className="account__href" to='/myaccount'>My Account</Link>
                        <Link className="account__href" to='/login'>Login / Register</Link>
                        <Link className="account__href" to='/cart'>Cart</Link>
                        <Link className="account__href" to='/wishlist'>Wishlist</Link>
                        <Link className="account__href" to='/products'>Shop</Link>
                    </ul>
                </div>

                <div className="footer__quicklink">
                    <h5 className="quicklink__h5">Quick Link</h5>
                    <ul className="quicklink__ul">
                        <Link className="quicklink__href" to='/privacy'>Privacy Policy</Link>
                        <Link className="quicklink__href" to='/terms'>Terms Of Use</Link>
                        <Link className="quicklink__href" to='/faq'>FAQ</Link>
                        <Link className="quicklink__href" to='/contact'>Contact</Link>
                    </ul>
                </div>

                <div className="footer__links">
                    <h5 className="links__h5">Download App</h5>

                    <div className="links__box">
                        <span className="links__desc">Save $3 with App New User Only</span>
                        <div className="links__download">
                            <div className="download__left">
                                <Link to='./downlaod'><img src={QRCode} /></Link>
                            </div>

                            <div className="download__right">
                                <Link to='./downloadgoogle'><img src={Googleplay}/></Link>
                                <Link to='./downloadgoogle'><img src={Applestore} /></Link>
                            </div>
                        </div>

                        <div className="links__social">
                                <Link to='/facebook'><Facebook /></Link>
                                <Link to='/twitter'><Twitter /></Link>
                                <Link to='/instagram'><Instagram /></Link>
                                <Link to='/linkedin'><Linkedin /></Link>
                        </div>
                    </div>
                </div>
                </div>

                <div className="footer__bottom">
                    <span className="footer__copyright">
                      © Copyright Rimel 2022. All right reserved
                    </span>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer