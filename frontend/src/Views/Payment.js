import React from "react";
import "./Payment.css"
import { base_url } from "../Actions/config"
import { useSelector } from 'react-redux'
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"

function Payment() {

    const userId = useSelector((state) => state.Auth.l_data && state.Auth.l_data.id ? state.Auth.l_data.id : null)
    const cartTotal = useSelector((state) => state.Cart.cart_data && state.Cart.cart_data.cartTotal && state.Cart.cart_data.data.length ? state.Cart.cart_data.cartTotal : 0)
    const billItems = useSelector((state) => state.Cart.cart_data && state.Cart.cart_data.data && Array.isArray(state.Cart.cart_data.data) && state.Cart.cart_data.data.length ? state.Cart.cart_data.data : [])
    const recepient = JSON.parse(localStorage.getItem('recepient'))
    const deliverySlot = JSON.parse(localStorage.getItem('deliverySlot'))

    // payment using stripe
    const proceedToPay = async (u_id) => {
        try {
            document.getElementById("pay").classList.remove("continue-btn")
            document.getElementById("pay-btn").innerText = "Processing"
            const sessionCheckout = await axios(base_url + `/order/checkout/${u_id}`)
            
            // create checkout
            const stripe = await loadStripe("pk_test_51LgYSySI0mdREWu1HRblcZT9pfPVCxjcz10DBYeCz8PgV3UJvIS6IJA7gGMjci0783nyHaMi0JXpIY4Qj3BYMBmK002Xhzx0UK")
            await stripe.redirectToCheckout({sessionId: sessionCheckout.data.session.id})
        } catch (err) {
           console.log("Error: ", err)
        }
        document.getElementById("pay-btn").innerText = "Proceed to Pay"
        document.getElementById("pay").classList.add("continue-btn")
    }

    return (
        <div className="payment-page">
            <div className="order-summary">
                <h2 className="heading text-center delivery-heading"><span>Order Summary</span></h2>
                <div className="bill-address-container">
                    <table className="bill-address" align="center" cellSpacing={0}>
                        <tbody>
                            <tr>
                                <th>Recepient Name</th>
                                <td>{recepient.name}</td>
                            </tr>
                            <tr>
                                <th>Recepient Address</th>
                                <td>{recepient.streetAddress}, {recepient.city}, {recepient.state} - {recepient.pincode}</td>
                            </tr>
                            <tr>
                                <th>Preferred Delivery</th>
                                <td>
                                    {deliverySlot.morning ? <li>Morning</li> : ""}
                                    {deliverySlot.noon ? <li>Noon</li> : ""}
                                    {deliverySlot.evening ? <li>Evening</li> : ""}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="bill-items-container">
                    <table className="bill-items" align="center" cellSpacing={0}>
                        <thead>
                            <tr>
                                <th className="text-center">Sr.</th>
                                <th className="text-center">Product Name</th>
                                <th className="text-center">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billItems.map((row, index) => (
                                <tr key={index}>
                                    <td className="text-center">{index + 1}.</td>
                                    <td>{row.p_data.p_name}</td>
                                    <td className="text-center">&#8377;{row.p_data.p_price}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th className="text-right" colSpan={2}>Total</th>
                                <th className="text-center">&#8377;{cartTotal}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div className="grocify-button-container">
                <button id="pay" className="grocify-button grocify-button-payment payment-btn continue-btn" onClick={() => proceedToPay(userId)}>
                    <span className="heading" id="pay-btn">Proceed to Pay</span>
                </button>
            </div>
        </div>
    )
}

export default Payment;
