/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react"
import CategorySlider from "./CategorySlider"
import "./Home.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, addToCart, getCartItems } from '../Actions/Actions'

function Home(props) {
    const dispatch = useDispatch()

    // uid
    const userId = useSelector((state) => state.Auth.l_data && state.Auth.l_data.id ? state.Auth.l_data.id : null)

    // add to cart
    const handleAddToCart = (data) => {
        dispatch(addToCart({ u_id: userId, p_data: data }))
    }

    // On page load
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getCartItems(userId))
    }, [])


    return (

        <div className="home-component">

            <CategorySlider categoryHandler={props.categoryHandler} />
            {/* Items Mapping */}
            <div className="item-showcase">
                    <div className="explore-heading heading text-left"><span>Explore</span></div>

                {/* Data Map */}
                {Array.isArray(props.pData) && props.pData.length > 0 ?
                    
                    <div className="product-collection">
                        {props.pData.map((row) => (
                            <div className="grocery-card" key={row._id}>
                                <div className="item-image">
                                    <img src={row.p_image} />
                                </div>
                                <div className="item-details">
                                    <div className="item-name">{row.p_name}</div>
                                    <div className="stock-and-price">
                                        <div className="item-price"><strong>&#8377;{row.p_price}</strong></div>
                                        <div className="stock-remaining">Stock : {row.p_stock}</div>
                                    </div>
                                    <div className="grocify-button-container">
                                        <button className="grocify-button grocify-button-primary" onClick={() => { handleAddToCart(row) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM272 180H316V224C316 235 324.1 244 336 244C347 244 356 235 356 224V180H400C411 180 420 171 420 160C420 148.1 411 140 400 140H356V96C356 84.95 347 76 336 76C324.1 76 316 84.95 316 96V140H272C260.1 140 252 148.1 252 160C252 171 260.1 180 272 180zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                                            </svg>
                                            <span className="heading" style={{ marginLeft: '0.6rem' }}>Add to Cart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* <div className="extra-block"></div> */}
                    </div>
                    :
                    <div className="explore-message">
                        <h1 className="text-center heading">No search results found</h1>
                        <h3 className="text-center heading sub-text">Please check the spelling or try searching for something else</h3>
                    </div>
                }
                {/* Map End */}
            </div>
        </div>
    )
}

export default Home