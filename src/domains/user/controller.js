const User=require("./model");

const {hashData,verfiyHashedData}=require("./../../util/hashData");
const { verify } = require("jsonwebtoken");


const createToken =require("./../../util/createtoken");




const authenticateUser=async (data)=>{

    try {
        const {email,password}=data;


        const fetchedUser=await User.findOne({
            email
        });

        if(!fetchedUser){
            throw Error("Invalid email Credentials entered");

        }
    

        const hashedPassword=fetchedUser.password;
        const passwordMatch=await verfiyHashedData(password,hashedPassword);

        if(!passwordMatch){
            throw Error("Invalid password enterd");
        }



        /////create a token if matached for things that only logged in users can do 

        ///prepare data for the token 
        const tokenData={userId:fetchedUser._id,email};
        const token=await createToken(tokenData);


        ///assign the genrated token to the fetched user


        fetchedUser.token=token;
        return fetchedUser;


        
    } catch (error) {
        throw error;

        
    }

};







const createNewUser=async (data)=>{




    try {
        const {name , email , password}=data;
        ///checking if the user already exsits


        const existingUser=await User.findOne({email});
        if(existingUser){
            throw Error("User already exists");

        }

        //////hash password
        const hashPassword=await hashData(password);
        const newUser=new User({
            name,
            email,
            password:hashPassword,
        });


        const createdUser=await newUser.save();

        return createdUser;




    } catch (error) {

        throw error ;

        
    }



};



/////allows us to export more functions later

module.exports={createNewUser,authenticateUser};

