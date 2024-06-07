import './PageNotFound.css'
import { Link  } from 'react-router-dom'

function PageNotFound() {
  return (
    <section className="app__404">
        <div className="container">
            <div className="notfound__inner">
                <div className="notfound__top">
                <span className="notfound__pageline">
                            Home &nbsp; / &nbsp;  <span className="notfound__bold">404 Error</span>
                        </span>
                </div>

                <div className="notfound__bottom">
                        <div className="notfound__texts">
                            <span className="notfound__text">404 Not Found</span>
                            <span className="notfound__description">Your visited page not found. You may go home page.</span>
                        </div>

                        <Link to='/' className='notfound__href'>Back to home page</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default PageNotFound