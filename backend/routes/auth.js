const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
// ROUTE 1 : Create a user using: POST "/api/auth/createuser". Doesnt require auth
const JWT_SECRET = "sakshamisagoodboy";
router.post('/createuser', [

    //u can put custom mssg after "email" in below method    
    body('email', 'Enter valid email').isEmail(),
    body('name', 'Enter valid name').isLength({ min: 3 }),

    // password must be at least 5 chars long    
    body('password', 'pasword shoould be min 8 characters').isLength({ min: 8 }),
], async(req, res) => {

   //if the there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check if user with email already exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "sorry user already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //await cuz it is a promise
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data ={
            user : {
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        // res.send(user);
        res.json({authToken});

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2 : Authenticate a user using: POST "/api/auth/login". No login req
router.post('/login', [

    //u can put custom mssg after "email" in below method    
    body('email', 'Enter valid email').isEmail(),
    // password exists    
    body('password', 'password cannot be blank').exists(),
], async(req, res) => {
    //if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //destructure email and password from the req body
    const {email,password} = req.body;
    try {
        //find a user with the email
        let user = await User.findOne({email});
        //if no user is found
        if(!user){
            return res.status(400).json({
                error:"Login with correct credentials"
            });
        }
        //here user with the enail is found
        //so compare the passwords
        const passwordCompare =await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(400).json({
                error:"Login with correct credentials"
            });
        }
        //passwords match
        const data ={
            user : {
                id:user.id
            }
        }
        // sign auth token with data(user id) and the JWT_SECRET
        const authToken = jwt.sign(data,JWT_SECRET);
        res.json({authToken});
    } catch (error) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 3 : Get logged in user details using: POST "/api/auth/getuser". login req 
router.post('/getuser',fetchuser, async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
    
});
module.exports = router;