const nodemailer=require("nodemailer");
const {AUTH_EMAIL,AUTH_PASS}=process.env;


let transporter=nodemailer.createTransport({

    service:"gmail",
    auth:{
        user:AUTH_EMAIL,
        pass:AUTH_PASS,

    },


});


//////testing the transporter

transporter.verify((error,success)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Ready for messages");
        console.log(success);

    }


});



/////sending the actual email



const sendEmail= async(mailOptions)=>{
    try {
        await transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }
            else{
                console.log('email sent' + info.response);
            }
        });
        return;

        
    } catch (error) {

        throw error;
        
    }

};





module.exports=sendEmail;

