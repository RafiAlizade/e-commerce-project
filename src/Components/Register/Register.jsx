import React from 'react'
import './Register.css'
import RegisterImg from './../../assets/register/dl.beatsnoop 1.svg'
import { Link } from 'react-router-dom'
import Googlelogo from './../../assets/register/Google_Icons-09-512.webp'

function Register() {
  return (
    <div className="app__signup">
        <div className="container">
                <div className="signup__inner">
                    <div className="signup__left">
                        <div className="signup__img">
                            <img src={RegisterImg} />
                        </div>
                    </div>

                    <div className="signup__right">
                          <div className="signup__texts">
                              <h5 className="signup__h5">Create an account</h5>
                              <span className="signup__details">Enter your details below</span>
                          </div>

                          <form action="#" className='signup__form'>
                            <div className="signup__labels">
                            <label htmlFor="userName">
                                <input type="text" name="userName" className='signup__input' placeholder='Name' required />
                            </label>

                            <label htmlFor="userMail">
                                <input type="text" name="userMail" className='signup__input' placeholder='Email or Phone Number' required />
                            </label>

                            <label htmlFor="userPassword">
                                <input type="password" name="userPassword" className='signup__input' placeholder='Password' required />
                            </label>
                            </div>

                            <div className="signup__buttons">
                            <button type="submit" className='signup__submitbtn'>Create Account</button>
                            <Link className='signup__googlebtn'>
                                <img src={Googlelogo} className='signup__googleicon' style={ { width: '1.5rem', height: '1.5rem'}} />
                                <span className="signup__href_desc">Sign up with Google</span>
                            </Link>
                            
                            </div>

                            </form>

                            
                            

                            <span className="signup__login">
                              Already have account? <Link to='/login' className='signup_loginhref'>Log in</Link>
                            </span>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Register