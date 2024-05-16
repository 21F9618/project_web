const { addproduct } = require('./models/mongodb.js');

document.getElementById("add-product").addEventListener("click", function () {
    document.getElementById("product-form").style.display = "block";
    document.getElementById("delete-product-form").style.display = "none";
    document.getElementById("update-product-form").style.display = "none";
    document.getElementById("search-product-form").style.display = "none";
});

document.getElementById("delete-product").addEventListener("click", function () {
    document.getElementById("delete-product-form").style.display = "block";
    document.getElementById("product-form").style.display = "none";
    document.getElementById("update-product-form").style.display = "none";
    document.getElementById("search-product-form").style.display = "none";
});

document.getElementById("update-product").addEventListener("click", function () {
    document.getElementById("update-product-form").style.display = "block";
    document.getElementById("product-form").style.display = "none";
    document.getElementById("delete-product-form").style.display = "none";
    document.getElementById("search-product-form").style.display = "none";
});

document.getElementById("search-product").addEventListener("click", function () {
    document.getElementById("search-product-form").style.display = "block";
    document.getElementById("product-form").style.display = "none";
    document.getElementById("delete-product-form").style.display = "none";
    document.getElementById("update-product-form").style.display = "none";
});

document.getElementById("add-product-form").addEventListener("submit", function (event) {

    console.log("in submit of product add")
    var priceInput = document.getElementById("price");
    var quantityInput = document.getElementById("quantity");
    var price = parseFloat(priceInput.value);
    var quantity = parseInt(quantityInput.value);
    var name = document.getElementById("name").value;
    var description= document.getElementById("description").value;
    var category= document.getElementById("category").value;
    var image=document.getElementById("image").value

    // Check if any field is empty
    if (!priceInput.value || !quantityInput.value) {
        alert("All fields must be filled out.");
        event.preventDefault(); // Prevent form submission
    }

    // Check if price is negative or zero
    if (price <= 0 || isNaN(price)) {
        alert("Price must be a positive number greater than 0.");
        event.preventDefault(); // Prevent form submission
    }

    // Check if quantity is negative
    if (quantity < 0 || isNaN(quantity)) {
        alert("Quantity must be a non-negative integer.");
        event.preventDefault(); // Prevent form submission
    }
});

document.getElementById("delete-product-form-element").addEventListener("submit", function (event) {
    var productIdInput = document.getElementById("product-id");

    // Check if product ID field is empty
    if (!productIdInput.value) {
        alert("Product ID must be filled out.");
        event.preventDefault(); // Prevent form submission
    }
});

document.getElementById("update-product-form-element").addEventListener("submit", function (event) {
    var priceInput = document.getElementById("update-price");
    var quantityInput = document.getElementById("update-quantity");
    var price = parseFloat(priceInput.value);
    var quantity = parseInt(quantityInput.value);

    // Check if price is negative or zero
    if (price <= 0 || isNaN(price)) {
        alert("Price must be a positive number greater than 0.");
        event.preventDefault(); // Prevent form submission
    }

    // Check if quantity is negative
    if (quantity < 0 || isNaN(quantity)) {
        alert("Quantity must be a non-negative integer.");
        event.preventDefault(); // Prevent form submission
    }
});

document.getElementById("search-product-form-element").addEventListener("submit", function (event) {
    var searchProductIdInput = document.getElementById("search-product-id");

    // Check if product ID field is empty
    if (!searchProductIdInput.value) {
        alert("Product ID must be filled out.");
        event.preventDefault(); // Prevent form submission
    }
});