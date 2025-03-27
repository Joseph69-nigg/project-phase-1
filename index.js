document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetchProducts");
    const productList = document.getElementById("productList");

    fetchButton.addEventListener("click", () => {
        fetch("https://fakestoreapi.com/products") 
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = ""; 
                data.forEach(product => {
                    const productItem = document.createElement("div");
                    productItem.classList.add("product-item");
                    productItem.innerHTML = `
                        <img src="${product.image}" alt="${product.title}" width="100">
                        <p><strong>${product.title}</strong></p>
                        <p>Price: $${product.price}</p>
                        <button class="delete-btn" data-id="${product.id}">Delete</button>
                    `;
                    productList.appendChild(productItem);
                });
            })
            .catch(error => console.error("Error fetching products:", error));
    });

    productList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const productId = event.target.getAttribute("data-id");
            fetch(`https://fakestoreapi.com/products/${productId}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(() => {
                event.target.parentElement.remove();
                alert("Product deleted successfully!");
            })
            .catch(error => console.error("Error deleting product:", error));
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    fetch("bd.json")
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
        })
        .catch(error => console.error("Error loading products:", error));
});

function displayProducts(products) {
    const productContainer = document.querySelector(".pro-container");
    productContainer.innerHTML = ""; 

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("pro");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <span>${product.brand}</span>
            <h5>${product.name}</h5>
            <h4>$${product.price}</h4>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;

        productContainer.appendChild(productCard);
    });

    setupCartButtons();
}

function setupCartButtons() {
    const cartButtons = document.querySelectorAll(".add-to-cart");
    cartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("bd.json")
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
        })
        .catch(error => console.error("Error loading products:", error));
});

function displayProducts(products) {
    const productContainer = document.querySelector(".pro-container");
    productContainer.innerHTML = ""; 

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("pro");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <span>${product.brand}</span>
            <h5>${product.name}</h5>
            <h4>$${product.price}</h4>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;

        productContainer.appendChild(productCard);
    });

    setupCartButtons(products);
}

function setupCartButtons(products) {
    const cartButtons = document.querySelectorAll(".add-to-cart");
    cartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            const product = products.find(p => p.id == productId);
            addToCart(product);
        });
    });
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}
