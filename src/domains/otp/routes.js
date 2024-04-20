///for requests

const express=require("express");
const router=express.Router();
const {sendOTP}=require("./controller");



////request new verfication OTP
router.post("/otp",async(req,res)=>{
    try {
        const {email,subject,message,duration}=req.body;
        console.log(email);
        console.log(subject);
        console.log(message);
        console.log(duration);


        createdOTP= await sendOTP(
            email,
            subject,
            message,
            duration,
        );



        res.status(200).json(createdOTP);



        
    } catch (error) {

        res.status(400).send(error.message);

        
    }

});


module.exports=router;





