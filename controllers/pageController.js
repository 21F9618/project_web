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

const addToCart = async (req, res) => {
    try {
        const userId = req.session.user_id;
        const productName = req.body.productname;
        const quantity = parseInt(req.body.quantity); // Parse the quantity to ensure it's a number

        const product = await Product.findOne({ name: productName });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart;

        if (userId) {
            cart = await Cart.findOne({ user: userId });
            if (!cart) {
                // cart = await Cart.create({ user: userId, items: [{ product: product._id, quantity }] });
                cart = await Cart.create({ user: userId, items: [{ product: product._id, name: product.name, price: product.price, quantity }], totalAmount: product.price * quantity });

            } else {
                const existingItem = cart.items.find(item => item.product.equals(product._id));
                if (existingItem) {
                    existingItem.quantity += quantity;
                    cart.totalAmount += product.price * quantity;
                } else {
                    cart.items.push({ product: product._id, name: product.name, price: product.price, quantity });
                    cart.totalAmount += product.price * quantity; // Update totalAmount

                }
                await cart.save();
            }
        } else {
            req.session.cart = req.session.cart || { items: [],totalAmount:0 };
            const existingProductIndex = req.session.cart.items.findIndex(item => item.product.toString() === product._id.toString());
            if (existingProductIndex !== -1) {
                req.session.cart.items[existingProductIndex].quantity += quantity;
            } else {
                req.session.cart.items.push({ product: product._id, name: product.name, price: product.price, quantity });

            }
            req.session.cart.totalAmount += product.price * quantity; // Update totalAmount

            console.log(req.session.cart)
        }

        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const viewCart = async (req, res) => {
    try {
        const userId = req.session.user_id;

        if (userId) {
            // If user is logged in, fetch cart details from the database
            const cart = await Cart.findOne({ user: userId }).populate('items.product');
            res.render('cart', { cart });
        } else {
            // If user is not logged in, retrieve cart contents from session
            console.log(req.session.cart)
            const cart = req.session.cart ;
            res.render('cart', { cart });
        }
    } catch (error) {
        console.error('Error viewing cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};