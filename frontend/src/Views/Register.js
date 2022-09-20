/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-computed-key */
import React, { useState, useEffect } from "react"
import './LoginRegister.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { registerAction } from "../Actions/Actions"
import { cleanAuth } from '../Actions/ActionCreators'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const msg = useSelector((state) => state.Auth.r_data.msg)
    const err = useSelector((state) => state.Auth.r_error.msg)

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(registerAction(data))
        setData({...data, ['name'] : "", ['email'] : "", ['password'] : ""})
    }

    useEffect(() => {
        if (msg !== null && msg !== "" && msg !== undefined && typeof (msg) === 'string') {
            toast.success(msg, {
                theme: "dark"
            });
            dispatch(cleanAuth())
            navigate('/login')
        }
        if (err !== null && err !== "" && err !== undefined && typeof (err) === 'string') {
            toast.error(err, {
                theme: "dark"
            });
            dispatch(cleanAuth())
        }

    }, [msg])
    return (
        <>
        <div className="register-page">
            <form className="form-fill" onSubmit={handleRegister}>
                <h2 className="form-heading heading">Register Here</h2>
                <div className="form-group">
                    <input type="text" name="name" className="" value={data.name} placeholder="Enter Name" onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <input type="email" name="email" className="" value={data.email} placeholder="Enter email" onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="" value={data.password} placeholder="Enter Password" onChange={handleInput} required />
                </div>
                <div className="account-present">
                    <h5>Already have an account?&nbsp; <span onClick={() => { navigate('/login') }}>Login</span></h5>
                </div>
                <div className="grocify-button-container login-register-btn">
                    <button type="submit" className="grocify-button grocify-button-primary">
                        <span className="heading">Register</span>
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

export default Register