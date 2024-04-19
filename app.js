const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MongoDB connection URL and database name
const mongoUrl = "mongodb+srv://almasaina2003:M3uRVDGKe09vpNd4@project.z3ptxtw.mongodb.net/?retryWrites=true&w=majority&appName=project";
const dbName = 'test'; // Name of your MongoDB database
const collectionName = 'users'; // Collection name for users

// Connect to MongoDB
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define a user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a user model
const User = mongoose.model('User', userSchema, collectionName);

// Middleware to parse incoming form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to handle CORS
app.use(cors({
    origin: 'http://127.0.0.1:5501', // Update with your client URL if needed
    methods: ['POST'], // Allow only POST method or other methods as needed
}));

// Signup POST route
app.post('/signup', async (req, res) => {
    try {
        // Extract data from the request body
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }

        // Create a new user document
        const newUser = new User({ username, email, password });

        // Save the user document to the database
        await newUser.save();

        // Send a success response
        res.status(201).send('User created successfully');
    } catch (error) {
        // Handle any errors during user creation
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Error creating user' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Login POST route
app.post('/login', async (req, res) => {
    try {
        // Extract data from the request body
        const { name, password } = req.body;

        // Find the user by username or email
        const user = await User.findOne({
            $or: [{ username: name }, { email: name }]
        });

        // Check if user exists
        if (!user) {
            return res.status(400).send({ error: 'Invalid user' });
        }

        // Check if the password is correct
        if (user.password !== password) {
            return res.status(400).send({ error: 'Invalid password' });
        }

        // If credentials are valid, return success response
        res.status(200).send({ message: 'Login successful' });
    } catch (error) {
        // Handle any errors during login
        console.error('Error during login:', error);
        res.status(500).send({ error: 'Error during login' });
    }
});
