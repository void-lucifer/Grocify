/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import "./Navbar.css"
import { useDispatch, useSelector } from 'react-redux'
import { cleanAuth } from '../Actions/ActionCreators'
import { getCartItems } from "../Actions/Actions"
import { cleanCart } from "../Actions/ActionCreators"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Navbar(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // userId
    const userId = useSelector((state) => state.Auth.l_data && state.Auth.l_data.id ? state.Auth.l_data.id : null)
    const userName = useSelector((state) => state.Auth.l_data && state.Auth.l_data.name ? state.Auth.l_data.name : "")

    // Logout function
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(cleanAuth())
        navigate("/")
    }

    // remove top border-radius on scroll
    function removeBorderRadius() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar')
            let scrollpos = window.scrollY
            if (scrollpos > 50) {
                navbar.classList.remove('border-radius-top-3')
            }
            else {
                navbar.classList.add('border-radius-top-3')
            }
        })
    }

    // search toggle in responsive
    const [width, setWidth] = useState(window.innerwidth);
    const [searchVisible, setSearchVisible] = useState(false)

    const toggleSearchVisibility = () => {
        setSearchVisible(prev => !prev);
    };

    const handleWidth = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWidth)
    })


    // handle cart
    const cart_msg = useSelector((state) => state.Cart.add_data && state.Cart.add_data.msg ? state.Cart.add_data.msg : "")
    const cart_err = useSelector((state) => state.Cart.add_error && state.Cart.add_error.msg ? state.Cart.add_error.msg : "")
    const cartBadgeCount = useSelector((state) => state.Cart.cart_data && state.Cart.cart_data.count ? state.Cart.cart_data.count : 0)

    // Cart Toasts
    useEffect(() => {
        if (cart_msg !== 'undefined' && cart_msg !== "" && typeof (cart_msg) === 'string') {
            toast.success(cart_msg, {
                theme: "dark"
            });
            dispatch(cleanCart())
            dispatch(getCartItems(userId))
        }
        else if (cart_err !== 'undefined' && cart_err !== "" && typeof (cart_err) === 'string') {
            toast.warn(cart_err, {
                theme: "dark"
            });
        }
        removeBorderRadius()
    }, [cart_msg, cart_err])

    // Search-group visibility
    const grocifyUrl = window.location.href
    useEffect(() => {
        const search = document.querySelector('.search-group')
        if (grocifyUrl.includes("/login") || grocifyUrl.includes("/register") || grocifyUrl.includes("/cart") || grocifyUrl.includes("/place-order") || grocifyUrl.includes("/payment") || grocifyUrl.includes("/payment-success") || grocifyUrl.includes("/payment-failed")) {
            search.style.display = "none"
        }
        else {
            search.style.display = "flex"
        }
    })

    useEffect(() => {
        const search = document.querySelector('.search-group')
        if (searchVisible === false && width <= 996) {
            search.style.display = "none"
        }
        else {
            search.style.display = "flex"
        }

    }, [searchVisible, width])

    // handleToTop
    window.onscroll = () => {
        const topBtn = document.querySelector("#click-to-top")
        if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
            topBtn.style.display = "block"
        }
        else {
            topBtn.style.display = "none"
        }

    }
    const handleToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <>
            <div className="navbar border-radius-top-3">
                <div className="logo animate-character"><a onClick={() => { navigate("/") }}>Grocify</a></div>
                {/* Search */}
                <div className="search-group">
                    <div className="search-bar">
                        <input id="search-input" type="text" placeholder="Search Items" onChange={(e) => props.handleSearch(e.target.value, "p_name")} />
                    </div>
                    <div className="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" /></svg>
                    </div>
                </div>

                <div className="nav-items" id="nav-item">
                    <div className="search-icon-small" onClick={toggleSearchVisibility}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" /></svg>
                    </div>
                    {userId !== null
                        ? <>
                            <div className="cart" onClick={() => { navigate("/cart") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                                </svg>
                                {/* cart badge count */}
                                {cartBadgeCount === 0 ? <div className="cart-badge heading hidden"></div> : <div className="cart-badge heading">{cartBadgeCount}</div>}

                            </div>
                            <div className="user-info drop-menu">
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                        <path d="M224 256c-70.7 0-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128s-57.3 128-128 128zm-45.7 48h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1 .7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-24.9-14.3c-6.9 5.1-14.3 9.4-22.3 12.8l0 30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8V454.8c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3 .7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9V218.2zm92.1 133.5c0-26.5-21.5-48-48.1-48s-48.1 21.5-48.1 48s21.5 48 48.1 48s48.1-21.5 48.1-48z" />
                                    </svg>
                                </a>
                                {/* dropdown */}
                                <div className="dropdown" style={{ listStyle: "none" }}>
                                    <li className="dropdown-uname">
                                        <span className="for-svg">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                            </svg>
                                        </span>
                                        <span className="heading" style={{ marginLeft: "0.6rem" }}>{userName}</span>
                                    </li>
                                    <li className="dropdown-logout" onClick={handleLogout}>
                                        <span className="for-svg">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                <path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                                            </svg>
                                        </span>
                                        <span className="heading" style={{ marginLeft: "0.6rem" }}>Logout</span>

                                    </li>
                                </div>
                            </div>
                        </>
                        :
                        <div className="grocify-button-container login-btn">
                            <button className="grocify-button grocify-button-primary" onClick={() => { navigate('/login') }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H392.6c-5.4-9.4-8.6-20.3-8.6-32V352c0-2.1 .1-4.2 .3-6.3c-31-26-71-41.7-114.6-41.7H178.3zM528 240c17.7 0 32 14.3 32 32v48H496V272c0-17.7 14.3-32 32-32zm-80 32v48c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32V272c0-44.2-35.8-80-80-80s-80 35.8-80 80z" />
                                </svg>
                                <span className="heading" style={{ marginLeft: '0.6rem' }}>Login</span>
                            </button>
                        </div>
                    }
                </div>
            </div>
            <a id="click-to-top" style={{ cursor: "pointer" }} onClick={handleToTop}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z" />
                </svg>
            </a>
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

export default Navbar;