/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./PlaceOrder.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function PlaceOrder() {
    const navigate = useNavigate()

    // slot function
    const [selectedSlot, setSelectedSlot] = useState({"morning": false, "noon":false, "evening":false})
    const selectSlot = (element) => {
        const slot = document.querySelector(`#${element}`)
        if (slot.classList.contains("active")) {
            slot.classList.remove("active")
            setSelectedSlot({...selectedSlot, [element]:false})
        }
        else {
            slot.classList.add("active")
            setSelectedSlot({...selectedSlot, [element]:true})
        }
    }

    // username
    const userName = useSelector((state) => state.Auth.l_data && state.Auth.l_data.name && state.Auth.l_data.name.length ? state.Auth.l_data.name : "")

    // handle input
    const [address, setAddress] = useState({name:String(userName), phone:"", streetAddress:"", city:"Jaipur", state:"Rajasthan", pincode:""})

    const handleInput = (e) => {
        setAddress({...address, [e.target.name]:e.target.value})
    }

    const continueBtn = () => {
        localStorage.setItem('recepient',JSON.stringify(address))
        localStorage.setItem('deliverySlot', JSON.stringify(selectedSlot))
        navigate("/payment")
    }

    return (
        <div className="order-component">
            <div className="delivery-slot-selection">
                <div className="heading text-center delivery-heading"><span>Select Preferred Delivery Slot(s)</span></div>
                <div className="delivery-slot-cards">
                    <div className="slot-card heading grocify-button-primary text-center" id="morning" onClick={() => selectSlot("morning")}>
                        <span>Morning</span>
                        <br />
                        <span>08:00 AM - 11:30 AM</span>
                    </div>
                    <div className="slot-card heading grocify-button-primary text-center" id="noon" onClick={() => selectSlot("noon")}>
                        <span>Noon</span>
                        <br />
                        <span>12:00 PM - 03:30 PM</span>
                    </div>
                    <div className="slot-card heading grocify-button-primary text-center" id="evening" onClick={() => selectSlot("evening")}>
                        <span>Evening</span>
                        <br />
                        <span>04:00 PM - 07:30 PM</span>
                    </div>
                </div>
                <div className="text-center heading" style={{ marginTop: "1rem" }}>*You can select multiple delivery slots.<br />Delivery will be made within 12hrs. of order.</div>
            </div>
            <hr align="center" width='80%' style={{ background: 'var(--main-color)', margin: "0 auto" }} />
            <div className="address-details">
                <div className="heading text-center delivery-heading form-heading"><span>Delivery Address</span></div>
                <form className="form-fill delivery-form">
                    <div className="form-group name-num" >
                        <input type="text" name="name" placeholder="Name" defaultValue={userName} readOnly />
                        <input type="phone" name="phone" placeholder="Phone Number" maxLength={10} minLength={10} onChange={handleInput} value={address.phone}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="streetAddress" placeholder="Street address" onChange={handleInput} value={address.streetAddress}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="city" placeholder="City" value={"Jaipur"} readOnly />
                        <input type="text" name="state" placeholder="State/Province" value={"Rajasthan"} readOnly />
                        <input type="text" name="pincode" placeholder="Pincode" maxLength={6} minLength={6} onChange={handleInput} value={address.pincode}/>
                    </div>
                </form>
            </div>
            <div className="grocify-button-container">
                <button className="grocify-button grocify-button-success continue-btn" onClick={continueBtn}><span>CONTINUE</span></button>
            </div>
        </div>
    )
}

export default PlaceOrder