import React from 'react'
import './ContactUs.css'
import { Telephone , Envelope } from 'react-bootstrap-icons'

function ContactUs() {
  return (
    <div className="app__contact">
        <div className="container">
            <div className="contact__inner">
                <div className="contact__top">
                <span className="contact__pageline">
                            Home &nbsp; / &nbsp;  <span className="contact__bold">Contact</span>
                        </span>
                </div>

                <div className="contact__bottom">
                    <div className="contact__left">
                            <div className="contact__call">
                                    <div className="call__top">
                                        <div className="call__icon">
                                            <Telephone />
                                        </div>

                                        <h5 className="call__h5">Call To Us</h5>
                                    </div>

                                    <div className="call__bottom">
                                        <span className="call__avaible">
                                        We are available 24/7, 7 days a week.
                                        </span>

                                        <div className="call__phone">
                                        Phone: +8801611112222
                                        </div>
                                    </div>
                            </div>

                            <div className="contact__line">

                            </div>

                            <div className="contact__write">
                                    <div className="write__top">
                                    <div className="write__icon">
                                            <Envelope />
                                        </div>

                                        <h5 className="write__h5">Write To Us</h5>
                                    </div>

                                    <div className="write__bottom">
                                        <span className="write__contact">
                                        Fill out our form and we will contact you within 24 hours.
                                        </span>

                                        <span className="write__c_email">
                                        Emails: customer@exclusive.com
                                        </span>

                                        <span className="write__s_email">
                                        Emails: support@exclusive.com
                                        </span>
                                    </div>
                            </div>
                    </div>

                    <div className="contact__right">
                            <form action="#" className="contact__form">
                                <div className="contact__labels">
                                    <label htmlFor="contactName">
                                        <input type="text" name="contactName" placeholder='Your Name *' required />
                                    </label>

                                    <label htmlFor="contactEmail">
                                        <input type="email" name="contactEmail" placeholder='Your Email *' required />
                                    </label>

                                    <label htmlFor="contactPhone">
                                        <input type="text" name="contactEmail" placeholder='Your Phone *' required />
                                    </label>
                                </div>

                                <textarea className='contact__textarea' placeholder='Your Message' required></textarea>

                                <button type="submit" className='contact__button'>Send Message</button>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactUs