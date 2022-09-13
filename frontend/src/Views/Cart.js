/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react"
import "./Cart.css"
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems } from "../Actions/Actions"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { base_url } from "../Actions/config"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [discount, setDiscount] = useState(0)
    const deliveryCharges = 99

    const userId = useSelector((state) => state.Auth.l_data && state.Auth.l_data.id ? state.Auth.l_data.id : null)
    const cartData = useSelector((state) => state.Cart.cart_data && state.Cart.cart_data.data && Array.isArray(state.Cart.cart_data.data) && state.Cart.cart_data.data.length ? state.Cart.cart_data.data : [])
    const billPrice = useSelector((state) => state.Cart.cart_data && state.Cart.cart_data.cartTotal ? state.Cart.cart_data.cartTotal : 0)

    const delItem = (id) => {
        axios.get(base_url + "/user/del-cart-item", { params: { item_id: id } }).then((result) => {
            toast.success(result.data.msg, {
                theme: "dark"
            });
            dispatch(getCartItems(userId))
            
        }).catch((err) => {
            toast.error(err.message, {
                theme: "dark",
                });
        })
    }

    useEffect(() => {
        document.body.scrollTop = 0
        dispatch(getCartItems(userId))
        billPrice > 349 ? setDiscount(deliveryCharges) : setDiscount(0)
    }, [])

    return (
        <>
            <div className="cart-page">
                {(cartData.length === 0)
                    ? <div>
                        <h1 className="cart-message text-center heading">Your cart is Empty.</h1>
                        <h3 className="text-center heading sub-text">Add items to cart to see them here.</h3>
                        <div className="explore">
                            <button className="explore-button grocify-button-primary" onClick={() => navigate("/")}><span>Explore</span></button>
                        </div>
                    </div>
                    :
                    <div className="cart-container">
                        <div className="cart-items">
                            {cartData.map((row) => (
                                <div className="cart-card" key={row._id}>
                                    <div className="cart-item-image">
                                        <img src={row.p_data.p_image} />
                                    </div>
                                    <div className="cart-item-details text-left">
                                        <div className="cart-item-name">{row.p_data.p_name}</div>
                                        <div className="cart-item-price"><strong>&#8377;{row.p_data.p_price}</strong></div>
                                    </div>
                                    <div className="remove-button-container">
                                        <button className="grocify-button-remove item-remove-button" onClick={() => { delItem(row._id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bill-details-container">
                            <div className="bill-details">
                                <div className="receipt"><h2 className="heading text-center">Receipt Details</h2></div>
                                <div className="bill-calculation"><div className="text-left">MRP</div><div className="text-right">&#8377;{billPrice}</div></div>
                                <div className="bill-calculation"><div className="text-left">Delivery Charges</div><div className="text-right">&#8377;{deliveryCharges}</div></div>
                                <div className="bill-calculation"><div className="text-left">Discount</div><div className="text-right">&#8377;{discount}</div></div>
                                <div className="free-delivery text-left">*Free delivery on orders above &#8377;349</div>
                                <div className="bill-calculation"><h3 className="heading">Total Amount</h3><h3 className="text-right">&#8377;{billPrice + deliveryCharges - discount}</h3></div>
                                <div className="place-order-btn-container">
                                    <button className="grocify-button grocify-button-primary place-order-btn" onClick={() => navigate("/place-order")}><h3 className="heading">PLACE ORDER</h3></button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div >
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

export default Cart