document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `
                <p>${item.name} - ${item.price} <button onclick="removeFromCart(${index})">Remove</button></p>
            `;
            cartContainer.appendChild(itemElement);
        });
    }
});

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1); // Remove item
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // Refresh page to update cart
}
