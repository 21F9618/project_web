
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
// const mongoose=require('mongoose')
let Name, Username, Email, Password, Contact;

// Connection URI
const uri = 'mongodb+srv://f219618:123@cluster0.hrmhene.mongodb.net/';
// Create a new MongoClient
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();          // Connect to the MongoDB cluster
        console.log('Connected to MongoDB Atlas');
        return { client, database: client.db('Felecity') };       // Return the connected client and database
    }
    catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

async function registerUser(req, res) {
    try {

        console.log('Received signup request:', req.body);
        const { fname_Signup, username_Signup, emailsignup, signupPass, pn } = req.body;
        const { database } = await connectToMongoDB();          // Connect to MongoDB

        const collection = database.collection('users');          // Access the Users collection
        const user = await collection.findOne({ Email: req.body.emailsignup });
        if (user) {
            // User already exists, send response with error message
            return res.status(400).send('User already exists');
        } else {
            // User does not exist, insert data into the database
            const hashedPassword = await bcrypt.hash(signupPass, 10); // Hash the password

            Name = fname_Signup;
            Username = username_Signup;
            Email = emailsignup;
            Password = hashedPassword;
            Contact = pn;
        }
    }
    catch (error) {
        console.error('Error inserting user data:', error);
        res.status(500).send('Error inserting user data');
    }
}

async function verifyOtp(req, res) {
    try {
        const { database } = await connectToMongoDB(); // Connect to MongoDB
        const collection = database.collection('users'); // Access the Users collection
        // Inserting the extracted values into the database
        await collection.insertOne({
            Name: Name,
            Username: Username,
            Email: Email,
            Password: Password,
            Contact: Contact,
            IsAdmin: false // Set default value for IsAdmin
        });

        const user = await collection.findOne({ Email: Email });

        // Creating session
        req.session.user = user;
        req.session.isLoggedIn = true;
        // ----------------

        res.redirect('/home');

    }
    catch (error) {
        console.error('Error in redirecting to Home Page from Verification Form', error);
        res.status(500).send('Error handling /otp Post request');
    }
}

async function confirmLogin(req, res) {
    try {
        const { database } = await connectToMongoDB();          // Connect to MongoDB
        const collection = database.collection('users');          // Access the Users collection
        const user = await collection.findOne({ Email: req.body.emaillogin });

        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not Found');
        }
        const passwordMatch = await bcrypt.compare(req.body.loginPass, user.Password);
        if (passwordMatch) {
            console.log("Login Successful");

            // Creating session
            req.session.user = user;
            req.session.isLoggedIn = true;
            // ----------------

            if(user.IsAdmin === false){
                res.redirect('/home');
            }else{
                res.redirect('/admin')
            }

        } else {
            console.log("Invalid password");
            res.status(401).send('Invalid password');
        }
    } catch (error) {
        console.error('Error in Confirm Login Request', error);
        res.status(500).send('Error handling /login Post request');
    }
}


async function addproduct(name, description, price, category, quantity, image) {
    try {
        const { database } = await connectToMongoDB();
        const collection = database.collection('products');

        // Insert product into the collection
        await collection.insertOne({
            name: name,
            description: description,
            price: price,
            category: category,
            quantity: quantity,
            image: image
        });
    } catch (error) {
        console.error('Error adding product:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}



async function changePass(req, res) {
    try {
        const { database } = await connectToMongoDB();
        const collection = database.collection('users');

        const user = await collection.findOne({ Email: req.body.emailForgot });

        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not Found');
        }
        else {
            const hashedPassword = await bcrypt.hash(req.body.newPass, 10); // Hash the password

            await collection.updateOne({ _id: user._id }, { $set: { Password: hashedPassword } });
            console.log("Password Reset Successfully");
            res.status(200).send('Success: Request completed successfully');
        }
    }
    catch (error) {
        console.error('Error in Reset Password Request', error);
        return res.status(500).send('Error handling /forgotPass Post request');
    }
}

async function getProducts(req, res) {
    try {
        const { database } = await connectToMongoDB();          
        const collection = database.collection('products'); 
        const products = await collection.find({}).toArray();
        // const products = await cursor.toArray(); // Convert cursor to array of documents
        // console.log("Products:", products);
        // console.log("Products:", products[0]);
        // console.log("Products:", products[1]);

        return products;

    } catch (error) {
        console.error('Error in Get Product Request', error);
        res.status(500).send('Error handling /products Post request');
    }
}



module.exports = { verifyOtp, confirmLogin, registerUser, changePass, getProducts , addproduct };
