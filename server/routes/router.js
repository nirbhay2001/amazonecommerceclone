const express = require("express");
const router = new express.Router(); // esi router ki help se sare api ko call karenge
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const athenticate = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");




// get productsdata api
router.get("/getproducts",async(req,res)=>{
    try{
        // console.log(req);
        const productsdata = await Products.find();
        // console.log("console the data" + productsdata);
        res.status(201).json(productsdata);
    }catch(error){
        // console.log("error" + error.message);
    }
})



// get individual data
router.get("/getproductsone/:id",async(req,res)=>{
    try{
        // const {id} = req.params; // es tarah se bhi kar sakte hai
        const id = req.params.id;
        // console.log(id);
        const individualdata = await Products.findOne({id:id});
        // console.log(individualdata + "individual");
        res.status(201).json(individualdata);
    }catch(error){
        res.status(400).json(individualdata);
        // console.log("error" + error.message);
    }
})



// register data
router.post("/register",async(req,res)=>{
    // console.log(req.body);

    const {fname,email,mobile,password,cpassword} = req.body;
    if(!fname || !email || !mobile || !password || !cpassword){
        res.status(422).json({error:"fill the all data"});
        // console.log("not data available");
    };

    try{
        const preuser = await USER.findOne({email:email});
        if(preuser){
            res.status(422).json({error:"this user is already present"}); // ye error /register route per chala jayega
        }else if(password !== cpassword){
            res.status(422).json({error:"password and cpassword not match"}); // // ye error /register route per chala jayega
        }else{
            const finalUser = new USER({
                fname,email,mobile,password,cpassword
            });

            // harsh --> encrypt hujug --> decrypt --> harsh
            // bcrypt.js

            // password hashing process

            const storedata = await finalUser.save();
            // console.log(storedata);
            res.status(201).json(storedata); // ye data /register per chala jayega
        }
    }catch(error){
        // console.log("error the bhai catch ma for registratoin time" + error.message);
        res.status(422).send(error);
    }
})


// login api user
router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }

    try {

        const userlogin = await USER.findOne({ email: email });
        // console.log(userlogin + "user value");
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            // console.log(isMatch);

          //  password --> jo user logintime dega 
          // userlogin.password --> ye database wala password hai


          // token generate
          const token = await userlogin.generatAuthtoken();
        //   console.log(token);

            res.cookie("Amazonweb",token,{
                expires:new Date(Date.now() + 900000),
                httpOnly:true
            }) // es line of code se cookie generate hoga jo client ke browser me store hoga


            if (!isMatch) {
                res.status(400).json({ error: "invalid details" });
            } else {

                res.status(201).json(userlogin);
                
                // const token = await userlogin.generatAuthtoken();
                // console.log(token);

                // res.cookie("eccomerce", token, {
                //     expires: new Date(Date.now() + 2589000),
                //     httpOnly: true
                // });
                // res.status(201).json(userlogin);
            }

        } else {
            res.status(400).json({ error: "user not exist" });
        }

    } catch (error) {

        res.status(400).json({ error: "invalid details" });

        // res.status(400).json({ error: "invalid crediential pass" });
        // console.log("error the bhai catch ma for login time" + error.message);
    }
});



// adding the data into cart
router.post("/addcart/:id",athenticate,async(req,res)=>{
    try{
        const {id} = req.params;
        const cart = await Products.findOne({id:id}); // es item ko user ke cart ke ander store karna hai o bhi login user ho i.e authetic user ho
        // console.log(cart + "cart value");

        const UserContact = await USER.findOne({_id:req.userID});
        // console.log(UserContact);

        if(UserContact){
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            // console.log(cartData);
            res.status(201).json(UserContact);
        }else{
            res.status(400).json({error:"invalid user"});
        }

    }catch(error){
        res.status(400).json({error:"invalid user"});
    }
})



// get cart details
router.get("/cartdetails", athenticate, async(req,res)=>{
    try{
        const buyuser = await USER.findOne({_id:req.userID});
        res.status(201).json(buyuser);
    }catch(error){
        // console.log("error" + error);
    }
})


// get valid user
router.get("/validuser",  async(req,res)=>{
    try{
        const validuserone = await USER.findOne({_id:req.userID});
        res.status(201).json(validuserone);
    }catch(error){
        // console.log("error" + error);
    }
})


// remove item from cart
router.delete("/remove/:id",athenticate,async(req,res)=>{
    try{
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curel) => {
            // athenticate ke bad jo user milega to uske carts me filter karenge , aur jis product ko remove karna hai us id ko chhodkar baki sare id ke product ko return kara denge
            // filter se ak new array generate hota hai
            return curel.id != id
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        // console.log("iteam remove");
    }catch(error){
        // console.log(error + "jwt provide then remove");
        res.status(400).json(error);
    }
})


// for user Logout
router.get("/lougout",athenticate,(req,res)=>{
    try{
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("Amazonweb",{path:"/"});
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        // console.log("user logout");
    }catch(error){
        // console.log("error for user logout");
    }
})


module.exports = router;