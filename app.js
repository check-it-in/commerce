// Retrieve cart from localStorage or initialize as empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, price) {
    // Add item to the cart array
    cart.push({ name: productName, price: price });

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Notify user
    alert(`${productName} has been added to your cart.`);
}

// Function to display cart items on the cart.html page
function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");
    
    if (!cartItemsContainer || !totalPriceElement) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    totalPriceElement.textContent = total.toFixed(2);

    // Show checkout button if there are items in the cart
    if (checkoutButton) {
        checkoutButton.style.display = cart.length > 0 ? "block" : "none";
    }
}


// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from array
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    displayCart(); // Refresh cart display
}

// Function to clear the cart
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    displayCart();
}

// Call displayCart on page load for cart.html
window.onload = displayCart;

// Display total in the checkout form
function displayOrderTotal() {
    const totalElement = document.getElementById("order-total");
    if (totalElement) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalElement.textContent = total.toFixed(2);
    }
}

// Handle form submission for checkout
function handleCheckout(event) {
    event.preventDefault(); // Prevent form from actually submitting

    // Simulate order placement
    document.getElementById("checkout-form").style.display = "none";
    document.getElementById("confirmation-message").style.display = "block";

    // Clear the cart and update localStorage
    cart = [];
    localStorage.removeItem("cart");
}

// Initialize displayOrderTotal on checkout page load
window.onload = function() {
    displayCart(); // For cart.html
    displayOrderTotal(); // For checkout.html

    // Attach checkout form handler
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", handleCheckout);
    }
};

