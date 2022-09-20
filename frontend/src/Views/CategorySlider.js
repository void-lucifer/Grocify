import React, { useState } from "react";
import Slider from "react-slick"
import "./CategorySlider.css"

function CategorySlider(props) {
    // slick slider settings
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        variableWidth: false,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 7,
                    variableWidth: false,
                    slidesToScroll: 4,
                    dots: false,
                    infinite: false,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 6,
                    variableWidth: false,
                    slidesToScroll: 4,
                    dots: false,
                    infinite: false,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    variableWidth: false,
                    slidesToScroll: 3,
                    dots: false,
                    infinite: false,
                }
            },
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: 4,
                    variableWidth: false,
                    slidesToScroll: 3,
                    dots: false,
                    infinite: false,
                }
            },
            {
                breakpoint: 940,
                settings: {
                    slidesToShow: 3,
                    variableWidth: false,
                    slidesToScroll: 3,
                    dots: false,
                    infinite: false,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    variableWidth: false,
                    slidesToScroll: 2,
                    dots: false,
                    infinite: false,
                }
            },
            {
                breakpoint: 455,
                settings: {
                    slidesToShow: 1.6,
                    variableWidth: false,
                    slidesToScroll: 1,
                    dots: false,
                    infinite: false,
                }
            }
        ]
    };

    const categories = [
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/e57a1c93-dd1b-4eea-b67a-084ded9f78a4.png",
            "imgAlt": "Drinks",
            "catName": "Juices & Drinks"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/09/06/2017/ffad029d-5b1e-4de7-a91f-0bbe1803e197.png",
            "imgAlt": "Snacks",
            "catName": "Biscuits & Snacks"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/09/06/2017/38deea34-44ce-4650-a1fb-60f1c0172feb.png",
            "imgAlt": "Pulses",
            "catName": "Dals & Pulses"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/cd819684-9369-468b-895c-ef9b57b6b059.png",
            "imgAlt": "Flour",
            "catName": "Flour"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/bfa60d5d-23d8-4a61-8586-560e8f822f50.png",
            "imgAlt": "Ghee and Oils",
            "catName": "Ghee & Oils"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/09/06/2017/3c16fdbc-a8a9-457d-9cbf-d684bb0be82d.png",
            "imgAlt": "Spices",
            "catName": "Sugar & Spices"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/09/06/2017/728e9a37-6dbf-42c8-8a88-8d0cd31baaf2.png",
            "imgAlt": "Rice",
            "catName": "Rice Products"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/272c0e46-a4e8-4b4b-bbaf-8d5c39aeca50.png",
            "imgAlt": "Dry Fruits",
            "catName": "Dry Fruits & Nuts"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/7e21f00a-d35a-4ba9-9da7-962a2fc0820b.png",
            "imgAlt": "Sauce",
            "catName": "Sauce & Syrup"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/efdaaeef-e510-4e96-954c-4197dd550128.png",
            "imgAlt": "Body Wash",
            "catName": "Soaps & Body Wash"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/c39f438a-5d76-4df9-8365-39d8586621ec.png",
            "imgAlt": "Hair Care",
            "catName": "Hair Care"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/754dfdc0-e836-4665-9174-061ba5ac5406.png",
            "imgAlt": "Oral Care",
            "catName": "Oral Care"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/8cb8b10f-ab6d-423f-aacb-69009a2ee951.png",
            "imgAlt": "Skin Care",
            "catName": "Skin Care"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/1d73e80a-46e2-4232-b5db-0d6587773f7b.png",
            "imgAlt": "Body Spray",
            "catName": "Body Spray & Talc"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/a3480939-48ee-4ca0-9820-069744970846.png",
            "imgAlt": "Baby Care",
            "catName": "Baby Care"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/ce0472bf-8e5e-42dd-bcb1-0f2ff32425a5.png",
            "imgAlt": "Detergents",
            "catName": "Detergents & Laundry"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/be73f0b1-951d-47b6-8299-9e340833a7c5.png",
            "imgAlt": "Freshners",
            "catName": "Repellents & Freshners"
        },
        {
            "catImg": "https://rukminim1.flixcart.com/www/100/100/promos/05/07/2017/91ea0939-828d-4a06-bd40-b97c62daa4b7.png",
            "imgAlt": "Sanitation",
            "catName": "Sanitation & Cleaners"
        },
    ]

    // const [categorySelected, setCategorySelected] = useState(false)
    const [selectedCategoryName,setSelectedCategoryName] = useState('')

    

    const categorySelect =(catName,cat)=>{
        setSelectedCategoryName(prev=>{
            if(prev === catName){
                props.categoryHandler()
                return ''
            }
            else{            
                props.categoryHandler(catName,cat)}
                return catName
        })
    }

    return (
        <>
            {/* Category */}
            <div className="category-tab">
                <Slider {...settings}>
                    {categories.map((row) => (
                        <div className={selectedCategoryName === row.catName? "category-items active": "category-items"} key={row.toString()} onClick={()=>categorySelect(row.catName,"p_category")}>
                            <div className="category-image">
                                <img src={row.catImg} alt={row.imgAlt} />
                            </div>
                            <div className="category-image-name">{row.catName}</div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default CategorySlider