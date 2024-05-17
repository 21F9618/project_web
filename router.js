const express = require('express')
const router = express.Router()

const pageController = require('./controllers/pageController');
const { verifyOtp, confirmLogin, registerUser, changePass,addproduct,uproduct ,sproduct } = require('./models/mongodb.js');

//middleware
// const isAuthenticated = (req, res, next) => {
//     let currentUrl = req.url;  //my current url in the request
//     let protectedPages = ['/home','/products'];   //an array for storing the protected pages(not exactly the names of the routes)
//     let adminProtectedPages=['/admin']
//     if(req.session.isLoggedIn && protectedPages.includes(currentUrl) && req.session.isAdmin==false)  //if the user is logged in and the request he is making includes my protected pages
//     {
//         next();  //then complete the actions u intended to
//     }
//     else{
//         res.redirect('/');  //redirect to the login page
//     }
//     if(req.session.isLoggedIn && adminProtectedPages.includes(currentUrl) && req.session.isAdmin==true)  //if the user is logged in and the request he is making includes my protected pages
//     {
//         console.log("in admin true if")
//         next();  //then complete the actions u intended to
//     }
//     else{
//         console.log("in admin false if")
//         res.redirect('/');  //redirect to the login page
//     }
    
// }

const isAuthenticated = (req, res, next) => {
    const currentUrl = req.url;
    const protectedPages = ['/home','/cart', '/products' , '/women_collection', '/men_collection','/makeup','/accessories','/shoes','/sale','/blog','/about','/coming','/contact'];
    const adminProtectedPages = ['/admin' , '/Aproduct'];

    // Check if the user is logged in
    if (!req.session.isLoggedIn) {
        return res.redirect('/'); // Redirect to login page if not logged in
    }

    // Check if the accessed route is a protected route for either regular users or admins
    if (protectedPages.includes(currentUrl) && !req.session.isAdmin) {
        console.log("print");
        // Grant access for regular users
        return next();
    } else if (adminProtectedPages.includes(currentUrl) && req.session.isAdmin) {
        // console.log("in admin true if")
        // Grant access for admins
        console.log("admin if......")
        return next();
    } else {
        console.log("in admin false if")
        // Redirect to the login page for unauthorized access
        return next();
    }
};



// Routes
router.get('/', pageController.getDecisionPage);   //decision page

router.get('/login/:role', pageController.getLoginPage);  //login form 

router.get('/admin' ,isAuthenticated ,  pageController.getAdminPage);  //admin dashboard

router.get('/Aproduct' ,isAuthenticated ,  pageController.getAdminProduct);  //admin dashboard

router.get('/women_collection', isAuthenticated, pageController.getWomenCollectionPage);  ///Collection

router.get('/men_collection', isAuthenticated, pageController.getMenCollectionPage);  ///Collection

router.get('/makeup', isAuthenticated, pageController.getMakeupPage);  /// make up Collection

router.get('/accessories', isAuthenticated, pageController.getAccessoriesPage);  /// accessories Collection

router.get('/shoes', isAuthenticated, pageController.getShoesPage);  /// shoes Collection

router.get('/sale', isAuthenticated, pageController.getSalePage);  /// sale Collection


router.get('/coming', isAuthenticated, pageController.getComingPage);  /// coming

router.get('/blog', isAuthenticated, pageController.getBlogPage);  /// blog Collection

router.get('/about', isAuthenticated, pageController.getAboutPage);  /// about

router.get('/contact', isAuthenticated, pageController.getContactPage);  /// contact

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

router.post('/Aproduct',async(req,res) => {
    console.log("in a product post function");
    console.log(req.body)
    try {
        await addproduct(req , res);
        res.status(200).send("Product added successfully");
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Failed to add product");
    }
});



router.post('/uproduct',async(req,res) => {
    console.log("in a product update function");
    console.log(req.body)
    try {
        await uproduct(req , res);
        res.status(200).send("Product updated successfully");
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Failed to update product");
    }
});

// router.get('/sproduct',async(req,res) => {
//     console.log("in a product search function");
//     console.log(req.body)
//     try {
//         await sproduct(req , res);
//         res.status(200).send("Product serached successfully");
//     } catch (error) {
//         console.error("Error searching product:", error);
//         res.status(500).send("Failed to search product");
//     }
// });

router.get('/sproduct', async (req, res) => {
    console.log("in a product search function");
    try {
        const productHtml = await sproduct(req , res); // Call the sproduct function
        if (productHtml) {
            res.status(200).send(productHtml); // Send the product HTML response
        } else {
            res.status(404).send('<p>Product not found</p>'); // Send a 404 response if product not found
        }
    } catch (error) {
        console.error("Error searching product:", error);
        res.status(500).send("Failed to search product");
    }
});



module.exports = router