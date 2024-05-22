import {useEffect, useState} from 'react'
import './Featured.css'
import axios  from 'axios'
import {Link} from 'react-router-dom'

function Featured() {

  const [featured, setFeatured] = useState([])

  useEffect(() => {
    const getFeatured = async () => {
      const database = await axios.get('http://localhost:3000/featured')
      setFeatured(database.data)
    }

    getFeatured()
  }, [])

  return (
    <section className="app__feature">
        <div className="container">
            <div className="feature__inner">
                <div className="featured__top">
                        <div className="featured__text">
                            <div className="redline">

                            </div>

                            <span className="featured__span">Featured</span>
                        </div>

                        <h5 className="featured__h5">New Arrival</h5>
                </div>

                <div className="featured__bottom">
                        <div className="featured__container">
                        {featured.map((featured, index) => (
                          <div className="featured__box" key={index}>
                              <img src={featured.adImage} alt={featured.name} />
                              <div className="featured__texts">
                                <span className="featured__name">{featured.name}</span>
                                <span className="featured__description">{featured.description}</span>
                                <Link to={featured.linkTo} className='featured__href'>Shop now</Link>
                              </div>

                              <div className="featured__bgfilter">
                                
                              </div>
                          </div>
                        ))}
                        </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Featured