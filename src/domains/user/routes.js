const express =require("express");
const router=express.Router();
const {createNewUser, authenticateUser}=require("./controller");

////sign in 
router.post("/signIn",async(req,res)=>{
    try {
        let {email,password}=req.body;
        email=email.trim();
        password=password.trim();


        ////////validation

        if(!(email && password )){
            throw Error("Empty credentials supplied");

        }
        const authenticateU= await authenticateUser ({email,password});

        res.status(200).json(authenticateU);

        
    } catch (error) {


        res.status(400).send(error.message);
        
    }
});




///////signup 

router.post("/signup",async (req,res)=>{
    try {
        let{name,email,password}=req.body;
        name=name.trim();
        email=email.trim();
        password=password.trim();




        //////validation stuff



        if(!name&&email&&password){
            throw Error ("Empty input fields");

        }else if (!/^[a-zA-Z]*$/.test(name)){
            throw Error ("Invalid name entered");
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            throw Error ("invalid email entered");
        }else if(password.length<8){
            throw Error("Password is less than 8 characters");
            
        }
        else{
            ///all good

            const newUser=await createNewUser({
                name,
                email,
                password,
            });

            res.status(200).json(newUser);

        }

        
    } catch (error) {


        res.status(400).send(error.message);
        
    }
});




module.exports=router;
