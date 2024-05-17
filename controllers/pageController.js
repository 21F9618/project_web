// / controllers/pageController.js
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

exports.getWomenCollectionPage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/women_collection'), { sessionInfo: sessionData }); 
};

exports.getMenCollectionPage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/men_collection'), { sessionInfo: sessionData }); 
};

exports.getMakeupPage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/makeup'), { sessionInfo: sessionData }); 
};

exports.getAccessoriesPage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/accessories'), { sessionInfo: sessionData }); 
};

exports.getShoesPage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/shoes'), { sessionInfo: sessionData }); 
};

exports.getSalePage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/sale'), { sessionInfo: sessionData }); 
};

exports.getBlogPage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/blog'), { sessionInfo: sessionData }); 
};

exports.getAboutPage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/about'), { sessionInfo: sessionData }); 
};

exports.getComingPage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/coming'), { sessionInfo: sessionData }); 
};

exports.getContactPage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/contact'), { sessionInfo: sessionData }); 
};

exports.getAdminPage = (req, res) => {
    console.log("admin page")
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/admin'), { sessionInfo: sessionData }); 
};


exports.getAdminProduct = (req, res) => {
    console.log("in a admin product page controller")
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/Aproduct'), { sessionInfo: sessionData }); 
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
