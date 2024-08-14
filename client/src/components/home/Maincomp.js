import React, { useEffect } from 'react'
// import React from 'react'
import Banner from './Banner'
import "./home.css";
import Slide from './Slide';
import { Divider } from '@mui/material';
import { getProducts } from '../redux/actions/action';
import { useSelector, useDispatch } from "react-redux";



const Maincomp = () => {

    const { products } = useSelector(state => state.getproductsdata);
    console.log(products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    return (
        <>
            <div className="home_section">
                <div className="banner_part">
                    <Banner />
                </div>
                <div className="slide_part">
                    <div className="left_slide">
                        <Slide title="Deal Of The Day" products={products} />
                    </div>
                    <div className="right_slide">
                        <h4>Festive latest launches</h4>
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="rightimg" />
                        <a href="#">see more</a>
                    </div>
                </div>

                <Slide title="Today's Deal" products={products} />

                <div className="center_img">
                    <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />
                </div>

                <Slide title="Best Seller" products={products} />
                <Slide title="Upto 80% off" products={products} />
            </div>

            <Divider />

        </>
    )
}

export default Maincomp;









/*

{
  getproductsdata: {
    products: [
      {
        id: 1,
        name: "Product 1",
        price: 25.99,
        description: "This is the first product.",
      },
      {
        id: 2,
        name: "Product 2",
        price: 19.99,
        description: "A description for the second product.",
      },
      {
        id: 3,
        name: "Product 3",
        price: 34.99,
        description: "Description for the third product.",
      },
      // ...more product objects
    ],
    // other properties related to product data
  },
  // other Redux slices or properties
}




*/