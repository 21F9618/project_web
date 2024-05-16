document.getElementById("add-product").addEventListener("click", function () {
    document.getElementById("product-form").style.display = "block";
    document.getElementById("update-product-form").style.display = "none";
    document.getElementById("search-product-form").style.display = "none";
});

document.getElementById("update-product").addEventListener("click", function () {
    document.getElementById("update-product-form").style.display = "block";
    document.getElementById("product-form").style.display = "none";
    document.getElementById("search-product-form").style.display = "none";
});

document.getElementById("search-product").addEventListener("click", function () {
    document.getElementById("search-product-form").style.display = "block";
    document.getElementById("product-form").style.display = "none";
    document.getElementById("update-product-form").style.display = "none";
});

document.getElementById("add-product-form").addEventListener("submit", function (event) {

    console.log("in submit of product add")
    var priceInput = document.getElementById("price");
    var quantityInput = document.getElementById("quantity");
    var price = parseFloat(priceInput.value);
    var quantity = parseInt(quantityInput.value);

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

document.getElementById("delete-product").addEventListener("click", function () {
    document.getElementById("delete-product-form").style.display = "block";
    document.getElementById("product-form").style.display = "none";
    document.getElementById("update-product-form").style.display = "none";
    document.getElementById("search-product-form").style.display = "none";

    // Simulated list of products
    const products = [
        { id: 1, name: "Product 1", description: "Description 1", price: 10, category: "Category 1", quantity: 5, image: "image1.jpg" },
        { id: 2, name: "Product 2", description: "Description 2", price: 20, category: "Category 2", quantity: 10, image: "image2.jpg" },
        { id: 3, name: "Product 3", description: "Description 3", price: 30, category: "Category 3", quantity: 15, image: "image3.jpg" },
        { id: 4, name: "Product 4", description: "Description 4", price: 40, category: "Category 4", quantity: 20, image: "image4.jpg" },
        { id: 5, name: "Product 5", description: "Description 5", price: 50, category: "Category 5", quantity: 25, image: "image5.jpg" }
    ];

    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear previous content

    // Create rows for each product
    products.forEach(product => {
        const row = document.createElement("tr");

        // Add product details
        const fields = ["id", "name", "description", "price", "category", "quantity", "image"];
        fields.forEach(field => {
            const cell = document.createElement("td");
            cell.textContent = product[field];
            row.appendChild(cell);
        });

        // Add delete icon
        const deleteCell = document.createElement("td");
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("material-icons-outlined", "delete-icon");
        deleteIcon.textContent = "delete";
        deleteIcon.setAttribute("data-product-id", product.id);
        deleteIcon.addEventListener("click", function () {
            // Handle delete functionality
            const productId = this.getAttribute("data-product-id");
            // Implement your delete logic here
            console.log("Delete product with ID:", productId);
        });
        deleteCell.appendChild(deleteIcon);
        row.appendChild(deleteCell);

        // Append row to table
        productList.appendChild(row);
    });
});