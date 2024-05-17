// add_to_cart.js
console.log("nside js file")
document.getElementById("addtocart").addEventListener("onclick", function () {
    // Get the product name from the product content
    var productName = document.querySelector(".product-content h3 a").innerText;

    console.log("in function");
    
    // Call the function to add the product to the cart, passing the product name as a parameter
    cart(productName);
});


async function add_to_cart() {
    try {
        // Log the product name received as parameter
        console.log('Product name:', productName);
        
        // Create a product object with the provided details
        const product = {
            name: productName,
            description: productDescription,
            price: productPrice,
            category: productCategory,
            quantity: productQuantity,
            image: productImage
        };
        console.log(product)

        // Log the retrieved product details
        console.log('Product details:', product);

        // Display the product in the cart section next to the navbar
        displayProductInCart(product);

        return true;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return false;
    }
}

function displayProductInCart(product) {
    console.log("is display");
    // Create a new <div> element to hold the product details
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-item');
    
    
    // Construct the HTML for the product details
    const productHtml = `
        <img src="${product.image}" alt="${product.name}" class="product-image img-fluid">
        <div class="product-content">
            <h5 class="element-title text-uppercase fs-5 mt-3">${product.name}</h5>
            <p>Description: ${product.description}</p>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
            <p>Quantity: ${product.quantity}</p>
        </div>
    `;
    
    // Set the innerHTML of the <div> element to the constructed HTML
    productDiv.innerHTML = productHtml;
    
    // Get the cart section in the cart.ejs page
    const cartSection = document.getElementById('cart-section');
    
    // Append the product <div> to the cart section
    cartSection.appendChild(productDiv);
}
