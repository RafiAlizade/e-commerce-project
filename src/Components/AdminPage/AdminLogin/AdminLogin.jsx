import './AdminLogin.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import Swal from 'sweetalert2'

function AdminLogin() {
    const [admin, setAdmin] = useState([])
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [containers, setContainers] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:3000/admin')
            setAdmin(response.data)
        }

        getData()
    }, [])

    const navigate = useNavigate();

    const handleLogin = () => {
       const user = admin.find(user => user.email === email && user.password === password)
    
        if(user) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Successfully logged in"
              });
              setTimeout(() => {
                navigate('./dashboard')
              }, 2000)
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "Unsuccessful login",
              });
        }
    }

    const showEye = () => {
        const passInput = document.querySelector('.a_login__passinput')
        if (passInput.type === 'password') {
            passInput.type = 'text'
            setShowPassword(true)
        } else if (passInput.type === 'text') {
            passInput.type = 'password'
            setShowPassword(false)
        }
    }

    const changeBorder = () => {
        const container = document.querySelector('.a_login__password')
        if(containers) {
            container.style.border = '0.19rem solid rgb(209, 233, 255)'
        } else {
            container.style.border = '0.06rem solid rgb(208, 213, 221)'
        }
    }


  return (
    <main className="app__main">
        <section className="admin__login">
            <div className="a_login__inner">
            <div className="a_login__container">
                <form action="#" className="a_login__form">
                        <h2 className="a_login__h2">
                            Login to your admin account
                        </h2>

                        <label htmlFor="adminEmail">
                            <span className="a__login_label">
                                Email
                            </span>

                            <input className='a_login__email' placeholder='Enter your email address' type="email" name="adminEmail" onChange={(e) => setEmail(e.target.value)} required />
                        </label>

                        <label htmlFor="adminPassword">
                        <span className="a__login_label">
                                Password
                            </span>

                           <div className="a_login__password" style={ { border: containers ? '0.15rem solid rgb(209, 233, 255)' : '0.06rem solid rgb(208, 213, 221)' }}>
                                 <input type="password" placeholder='Enter your password' onFocus={() => setContainers(true)}  onBlur={() => setContainers(false)} className='a_login__passinput' name="adminPassword" onChange={(e) => setPassword(e.target.value)} required />
                                <button type='button' className='a_login__showpass' onClick={showEye}>{showPassword ? < EyeSlash /> : < Eye />}</button>
                           </div>
                        </label>

                        <button type='button' onClick={handleLogin} className='a_login__loginbtn'>Login now</button>
                </form>
            </div>
            </div>
        </section>
    </main>
  )
}

export default AdminLogin