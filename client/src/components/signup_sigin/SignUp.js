import { Divider } from '@mui/material';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    // console.log(udata);

    const adddata = (e) => {
        const { name, value } = e.target;
        // console.log(name,value);

        setUdata(() => {
            return {
                ...udata,
                [name]: value
            }
        })
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { fname, email, mobile, password, cpassword } = udata;
        // if(fname === ""){
        //     toast.warn("fname provide",{
        //         position: "top-center",
        //     })
        // }else if(email === ""){
        //     toast.warn("email provide",{
        //         position: "top-center",
        //     })
        // }else{

        // }
        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, mobile, password, cpassword
                }) // es tarh se body requst ki help se client data ko server per send karte hai 
            });

            const data = await res.json(); // esko server ne response diya hai, json data ko javascript object me convert karke , yaha per ham data ko check kar rahe hai ki data server per gya hai ki nahi , yadi server per data gaya hoga to server ki body se ye data javascript object  me convert hokar response me aa jayega
            // console.log(data);

            if (res.status === 422 || !data) {
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setUdata({
                    ...udata, fname: "", email: "",
                    mobile: "", password: "", cpassword: ""
                });
                toast.success("Registration Successfully done 😃!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log("front end ka catch error hai" + error.message);
        }
    }

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Sign-Up</h1>
                        <div className="form_data">
                            <label htmlFor="name">Your name</label>
                            <input type="text" name="fname"
                                onChange={adddata}
                                value={udata.fname}
                                id="name" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="email">email</label>
                            <input type="email" name="email"
                                onChange={adddata}
                                value={udata.email}
                                id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="mobile">Mobile number</label>
                            <input type="number" name="mobile"
                                onChange={adddata}
                                value={udata.mobile}
                                id="mobile" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                onChange={adddata}
                                value={udata.password}
                                id="password" placeholder="At least 6 characters" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="passwordg">Password again</label>
                            <input type="cpassword" name="cpassword"
                                onChange={adddata}
                                value={udata.cpassword}
                                id="cpasswordg" />
                        </div>
                        <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>

                        <Divider />

                        <div className="signin_info">
                            <p>Already have an account?</p>
                            <NavLink to="/login">Sign in</NavLink>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    )
}

export default Signup;







/*

res ek HTTP response object hai, jise server dwara bheja gaya response represent karta hai.

res.json() ek method hai jo response body ko JSON format se JavaScript objects mein parse karta hai. Is method ka upayog response body ko padhne aur usse JavaScript objects mein convert karne ke liye hota hai.

await keyword ka upayog kiya gaya hai, jisse ye line code asynchronous tarike se execute ho sake jab tak response data available na ho.

Jab await res.json() execute hota hai, toh ye server dwara bheje gaye JSON data ko parse karke ek JavaScript object mein convert kar deta hai, aur data variable mein store kar deta hai. Isse aap response data ko aasani se JavaScript mein istemal kar sakte hain.

*/



/*

res.status ek property hai jo HTTP response object mein hoti hai, aur iska upayog server dwara bheje gaye response ka HTTP status code ko represent karne ke liye hota hai.

HTTP status code ek three-digit numeric code hota hai, jo server dwara request ko process karne ke baad response mein include kiya jata hai. Ye code batata hai ki request successful rahi hai ya nahi, ya fir koi error ya issue hua hai. Kuch common HTTP status codes hain:

200: OK - Is status code ka matlab hai ki request successful tha aur server ne sahi se response diya hai.
201: Created - Iska matlab hai ki server ne kuch naya resource banaya hai aur response mein uska URL provide kiya hai.
400: Bad Request - Ye status code request me koi invalid data ya syntax error hone par use hota hai.
401: Unauthorized - Iska matlab hai ki user authentication ki jarurat hai aur request unauthorized hai.
403: Forbidden - Request server dwara mana gaya hai, kisi specific reason ke liye.
404: Not Found - Requested resource server par nahi paya gaya.
500: Internal Server Error - Server par koi unexpected error aaya hai.
Inme se ek status code hai 422, jo typically "Unprocessable Entity" ko represent karta hai. Iska matlab hai ki server request ko process nahi kar saka kyunki request me kuch data invalid ya unprocessable hai. Ye status code aksar validation errors ya data ki unacceptable format ko darust karne ke liye use hota hai.

Jab code mein res.status === 422 likha hota hai, toh yeh condition check kar raha hai ki server dwara bheje gaye response ka status code 422 hai ya nahi. Agar 422 hai toh typically yeh indicate karta hai ki request me kuch invalid data ya issue tha


*/
