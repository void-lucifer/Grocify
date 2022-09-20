import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
    const navigate = useNavigate()

    return (
        <div className="payment-page">
            <div className="payment-msg">
                <button className="grocify-button-remove item-remove-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                    </svg>
                </button>
                <h1 className="heading">Payment Failed</h1>
                <div className="grocify-button-container">
                    <button className="grocify-button grocify-button-payment" style={{ padding: "1rem 1.5rem" }} onClick={() => navigate('/payment')}>
                        <span className="heading" style={{ fontSize: "1.2rem" }}>Try Again</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentFailed