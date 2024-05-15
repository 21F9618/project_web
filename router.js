const express = require('express')
const router = express.Router()

const pageController = require('./controllers/pageController');
const { verifyOtp, confirmLogin, registerUser, changePass } = require('./models/mongodb.js');

//middleware
const isAuthenticated = (req, res, next) => {
    let currentUrl = req.url;  //my current url in the request
    let protectedPages = ['/home','/products'];   //an array for storing the protected pages(not exactly the names of the routes)
    if(req.session.isLoggedIn && protectedPages.includes(currentUrl))  //if the user is logged in and the request he is making includes my protected pages
    {
        next();  //then complete the actions u intended to
    }
    else{
        res.redirect('/');  //redirect to the login page
    }
}

// Routes
router.get('/', pageController.getDecisionPage);   //decision page

router.get('/login/:role', pageController.getLoginPage);  //login form 

router.get('/home', isAuthenticated, pageController.getHomePage);   // first execute the isAuthenticated function 

router.get('/products',isAuthenticated,pageController.getProductsPage);  // first execute the isAuthenticated function and then render the products page

router.get('/cart',isAuthenticated,pageController.getCartPage);  // first execute the isAuthenticated function and then render the cart page

router.post('/signup', async (req, res) => {
    await registerUser(req, res);
});

router.post('/otp',async(req,res) => {
    await verifyOtp(req,res);
});

router.post('/login',async(req,res) => {
    await confirmLogin(req,res);
});

router.post('/forgotPass',async(req,res) => {
    await changePass(req,res);
});

router.get('/logout',async(req,res) => {
    req.session.user = null;
    req.session.isLoggedIn = false;
    res.redirect('/');
    // delete req.session.user;
});

module.exports = router