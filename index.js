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



// Removed duplicate event listener and functions
