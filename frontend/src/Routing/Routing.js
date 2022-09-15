import React, {useState} from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from 'react-router-dom'

import Navbar from "../Navbar/Navbar"
import Home from '../Views/Home'
import Cart from "../Views/Cart"
import Login from "../Views/Login"
import Register from "../Views/Register"
import PlaceOrder from "../Views/PlaceOrder"
import Payment from "../Views/Payment"
import PaymentSuccess from "../Views/PaymentSuccess"
import PaymentFailed from "../Views/PaymentFailed"
import Footer from "../Footer/Footer"

function Routing(){

    // Realtime searching
    const productData = useSelector((state) => state.Products.p_data && Array.isArray(state.Products.p_data) && state.Products.p_data.length ? state.Products.p_data : [])
    const [pData, setPdata] = useState(productData)

    // handle Search
    const handleSearch = (e,criteria) => {
        let temp = productData
        if(e!=="" && e!==null && e!==undefined){
            var filterData = temp.filter((filter) => {
                if(criteria==="p_name") return String(filter[criteria]).toLowerCase().includes(e.toLowerCase())
                if(criteria==="p_category") return String(filter[criteria]).includes(e)
                else return filter
        
            })
            setPdata(filterData)
        }
        else{
            setPdata(temp)
        }
    }

    return(
        <>
        <Navbar handleSearch={handleSearch} />
        <Routes>
            <Route path="/" element={<Home pData={pData} categoryHandler={handleSearch}/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            
            {/* Wildcard route */}
            <Route path="*" element={<Home pData={pData} categoryHandler={handleSearch}/>} />
        </Routes>
        <Footer />
        </>
    )
}

export default Routing