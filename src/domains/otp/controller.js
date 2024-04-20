////for sending and generation 
const OTP=require("./model");

const generateOTP = require("./../../util/generateOTP");

const sendEmail=require("./../../util/sendEmail");

const {hashData}=require("./../../util/hashData");


const {AUTH_EMAIL}=process.env;



const sendOTP=async(email,subject,message,duration=1)=>{



    console.log("in sendOTP");

    console.log(email);
    console.log(subject);
    console.log(message);
    console.log(duration);

    try {


    console.log(email);
    console.log(subject);
    console.log(message);
    console.log(duration);

        if(!(email&&subject&&message)){
            throw Error("provide values for email,subject,message");
        }

        ////clear any old records of otp

        await OTP.deleteOne({email});


        /////generate the otp pin 
        const generatedOTP= await generateOTP();

        ///send the email

        const mailOptions={
            from: AUTH_EMAIL,
            to:email,
            subject,
            // text: 'this is the message for now',
            html:`<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>
            ${generatedOTP}</b></p><p><This code expires in ${duration} hours(s)</b>.</p>`,


        };
        await sendEmail(mailOptions);

        /////save the OTP record in our database

        const hashedOTP=await hashData(generatedOTP);
        const newOTP= await new OTP({
            email,
            otp:hashedOTP,
            createdAt:Date.now(),
            expiresAt:Date.now()+3600000* +duration,
        });

        const createdOTPRecord=await newOTP.save();
        return createdOTPRecord;



        
    } catch (error) {
        throw error;
        
    }
};
module.exports={sendOTP};

