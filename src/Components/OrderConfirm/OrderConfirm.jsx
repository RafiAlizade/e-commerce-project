import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderConfirm.css'

function OrderConfirm() {
  const orderNumber = useParams().ordernumber;
  const [database, setDatabase] = useState([])
  const [indatabase, setInDatabase] = useState(false)

  useEffect(() => {
      const getData = async () => {
        const response = await axios.get('http://localhost:3000/completedOrders')
        setDatabase(response.data)
      }

      getData()
  }, [])

  useEffect(() => {
      const checkFromDatabase = () => {
        if(database.some((data) => data.orderNumber ==  orderNumber)) {
          setInDatabase(true)
        } else {
          setInDatabase(false)
        }
      }

      checkFromDatabase()
  },[database])
  return (
    <>
    <Header />
    <main className="app__main">
        <section className="app__confirm">
          <div className="container">
          <div className="confirm__inner">
                <div className="confirm__top">
                      <span className="confirm__pageline">
                          Account / My Account / Product / View Cart / Checkout / <span className="confirm__bold">Order Completed</span>
                      </span>
                </div>

                <div className="confirm__bottom">
                    {indatabase ? 
                      <div className="confirm__texts">

                        <h5 className="confirm__h5">Your order has been accepted</h5>
                        <span className="confirm__span">Your order <span className="confirm__bold">{orderNumber}</span> has been accepted, after verification, the product will be directed to the address you wrote by the sender, thank you for choosing us</span>
                      </div>
                    : 
                    
                    <div className="confirm__texts">

                        <h5 className="confirm__h5">No order found with this number</h5>
                        <span className="confirm__span">No order was found for this order number, if you haven't placed an order yet, you can start placing an order by <Link to='/' className='confirm__href'>clicking</Link> on it.</span>
                      </div>}
                </div>
          </div>
          </div>
        </section>
    </main>

    <Footer />
    </>
  )
}

export default OrderConfirm