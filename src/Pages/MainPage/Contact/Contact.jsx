import React from 'react'
import Header from '../../../Components/MainPage/Header/Header'
import Footer from '../../../Components/MainPage/Footer/Footer'
import ContactUs from '../../../Components/MainPage/ContactUs/ContactUs'

function Contact() {
  return (
    <>
    <Header />
    <main className="app__main">
        <ContactUs />
    </main>

    <Footer />
    </>
  )
}

export default Contact