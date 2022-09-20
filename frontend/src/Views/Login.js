/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-computed-key */
import React, { useEffect, useState } from "react"
import './LoginRegister.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loginAction } from "../Actions/Actions"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const msg = useSelector((state) => state.Auth.l_data.msg)
    const err = useSelector((state) => state.Auth.l_error.msg)

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(loginAction(data))
        setData({ ...data, ['password']: "" })

    }

    useEffect(() => {
        if (msg !== null && msg !== "" && msg !== undefined && typeof (msg) === 'string') {
            toast.success(msg, {
                theme: "dark"
            });
            navigate('/')
        }
        if (err !== null && err !== "" && err !== undefined && typeof (err) === 'string') {
            toast.error(err, {
                theme: "dark"
            });
        }
    }, [msg, err])

    return (
        <>
            <div className="login-page">
                <form className="form-fill" onSubmit={handleLogin}>
                    <h2 className="form-heading heading">Login Now</h2>
                    <div className="form-group">
                        <input type="email" name="email" className="" value={data.email} placeholder="Email" onChange={handleInput} required/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="" value={data.password} placeholder="Password" onChange={handleInput} required/>
                    </div>
                    <div className="account-present"><h5>Don't have an account? <span onClick={() => { navigate('/register') }}> Register</span></h5></div>
                    <div className="grocify-button-container login-register-btn">
                        <button type="submit" className="grocify-button grocify-button-primary heading">
                            <span>Login</span>
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false} />
        </>
    )

}

export default Login