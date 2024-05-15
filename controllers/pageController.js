// controllers/pageController.js
const path = require('path');
const { param } = require('../router');

const { getProducts } = require('../models/mongodb.js');


// Render landing page
exports.getDecisionPage = (req, res) => {
    res.render(path.join(__dirname, '../views/decision')); 
};

// Render login page
exports.getLoginPage = (req, res) => {  
    let params = req.params;
    let role = "";
    if(params.role){
        role = params.role;
    }
    res.render(path.join(__dirname, '../views/login'),{ role : role});
};

// Render home page
exports.getHomePage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/home'), { sessionInfo: sessionData }); 
};

//Render Products page
exports.getProductsPage = async (req,res)=>{
    const sessionData = req.session;
    const products = await getProducts();
    console.log(products,"products");
    res.render(path.join(__dirname, '../views/products'),{ sessionInfo: sessionData,products:products });
};

//get cart page
exports.getCartPage = async (req,res)=>{
    const sessionData = req.session;
    // const products = await getProducts();
    // console.log(products,"products");
    res.render(path.join(__dirname, '../views/cart'),{ sessionInfo: sessionData });
};