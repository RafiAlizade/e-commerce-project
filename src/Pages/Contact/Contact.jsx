import React from 'react'
import Header from './../../Components/Header/Header'
import Footer from './../../Components/Footer/Footer'
import ContactUs from './../../Components/ContactUs/ContactUs'

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