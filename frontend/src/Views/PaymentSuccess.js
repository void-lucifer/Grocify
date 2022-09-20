import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../Actions/config"
import { useSelector, useDispatch } from 'react-redux'
import { getCartItems } from '../Actions/Actions'
import axios from "axios";

function PaymentSuccess() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.Auth.l_data && state.Auth.l_data.id ? state.Auth.l_data.id : null)

    const clearCart = async (u_id) => {
        await axios(base_url + `/order/clear-cart/${u_id}`)
    }

    useEffect(() => {
        clearCart(userId)
        dispatch(getCartItems(userId))
        
    })
    return (
        <div className="payment-page">
            <div className="payment-msg">
                <button className="item-remove-button success-sign">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                </button>
                <h1 className="heading">Payment Successful</h1>
                <div className="grocify-button-container">
                    <button className="grocify-button grocify-button-primary" style={{ width: "18rem", padding: "1rem 1.5rem" }} onClick={() => navigate("/home")}>
                        <span className="heading" style={{ fontSize: "1.2rem" }}>Go to Homepage</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess