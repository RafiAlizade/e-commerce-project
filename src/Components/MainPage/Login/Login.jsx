import './Login.css'
import LoginImg from '../../../assets/register/dl.beatsnoop 1.svg'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="app__login">
        <div className="container">
                <div className="login__inner">
                    <div className="login__left">
                        <div className="login__img">
                            <img src={LoginImg} />
                        </div>
                    </div>

                    <div className="login__right">
                         <div className="login__texts">
                            <h5 className="login__h5">Log in to Exclusive</h5>
                            <span className="login__desc">Enter your details below</span>
                         </div>

                         <form action="#" className='login__form'>
                            <div className="login__labels">
                            <label htmlFor="loginName">
                                <input type="text" name="loginName" className='login__input' placeholder='Email or Phone Number' required />
                            </label>

                            <label htmlFor="loginPassword">
                                <input type="password" name="loginPassword"  className='login__input' placeholder='Password' required />
                            </label>
                            </div>

                            <div className="login__buttons">
                                <button type="submit" className='login__button'>Log In</button>
                                <Link to='/forgetpassword' className='login__href'>Forget Password</Link>
                            </div>
                         </form>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Login