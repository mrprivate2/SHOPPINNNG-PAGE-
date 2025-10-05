document.addEventListener('DOMContentLoaded', () => {
    // Product list (available in the store)
    const products = [
        { id: 1, name: "Wireless Headphones", price: 59.99 },
        { id: 2, name: "Smart Watch", price: 79.49 },
        { id: 3, name: "Bluetooth Speaker", price: 45.00 },
        { id: 4, name: "Gaming Mouse", price: 35.25 },
        { id: 5, name: "Mechanical Keyboard", price: 65.00 },
    ];

    // 🛒 Predefined cart (use product objects from the products array)
    const cart = [
        products.find(p => p.id === 2),
        products.find(p => p.id === 3),
    ].filter(Boolean); // filter just in case an id didn't match

    // DOM elements
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalSection = document.getElementById('cart-total');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-btn');

    // Render product list
    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(div);
    });

    // Handle Add to Cart
    productList.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const id = parseInt(e.target.dataset.id, 10);
            const product = products.find(p => p.id === id);
            if (product) {
                cart.push(product);
                updateCart();
            }
        }
    });

    // Update Cart display (sums in cents to avoid float precision issues)
    function updateCart() {
        cartItems.innerHTML = ''; // clear container

        if (cart.length === 0) {
            // Re-append the empty message element so it shows correctly
            emptyCartMessage.textContent = 'Your cart is empty.';
            cartItems.appendChild(emptyCartMessage);
            cartTotalSection.classList.add('hidden');
            totalPriceDisplay.textContent = '$0.00';
            return;
        }

        // Build cart items
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <span>${item.name} - $${Number(item.price).toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(div);
        });

        // Sum in cents (integers) then convert back
        const totalCents = cart.reduce((sum, item) => {
            const cents = Math.round(Number(item.price) * 100);
            return sum + cents;
        }, 0);

        totalPriceDisplay.textContent = `$${(totalCents / 100).toFixed(2)}`;
        cartTotalSection.classList.remove('hidden');
    }

    // Remove from cart
    cartItems.addEventListener('click', e => {
        if (e.target.classList.contains('remove-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            if (!Number.isNaN(index) && index >= 0 && index < cart.length) {
                cart.splice(index, 1);
                updateCart();
            }
        }
    });

    // Checkout
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) return alert("Your cart is empty!");
        alert(`Thank you for your purchase!\nTotal: ${totalPriceDisplay.textContent}`);
        cart.length = 0;
        updateCart();
    });

    // Initialize with predefined items
    updateCart();
});
