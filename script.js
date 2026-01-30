document.addEventListener('DOMContentLoaded', () => {

    const products = [
        { id: 1, name: "Wireless Headphones", price: 59.99, rating: 4.2, category: "Electronics" },
        { id: 2, name: "Smart Watch", price: 79.49, rating: 4.5, category: "Electronics" },
        { id: 3, name: "Bluetooth Speaker", price: 45.00, rating: 4.0, category: "Electronics" },
        { id: 4, name: "Gaming Mouse", price: 35.25, rating: 4.1, category: "Electronics" },
        { id: 5, name: "Mechanical Keyboard", price: 65.00, rating: 4.6, category: "Electronics" },

        { id: 6, name: "T-Shirt", price: 15.00, rating: 3.9, category: "Clothing" },
        { id: 7, name: "Jeans", price: 40.00, rating: 4.3, category: "Clothing" },
        { id: 8, name: "Jacket", price: 90.00, rating: 4.7, category: "Clothing" },
        { id: 9, name: "Sneakers", price: 60.00, rating: 4.4, category: "Clothing" },
        { id: 10, name: "Cap", price: 12.00, rating: 3.8, category: "Clothing" },

        { id: 11, name: "Novel", price: 18.00, rating: 4.8, category: "Books" },
        { id: 12, name: "Biography", price: 25.00, rating: 4.2, category: "Books" },
        { id: 13, name: "Comics", price: 14.00, rating: 4.0, category: "Books" },
        { id: 14, name: "Textbook", price: 55.00, rating: 4.6, category: "Books" },
        { id: 15, name: "Notebook", price: 8.00, rating: 3.9, category: "Books" },

        { id: 16, name: "Chair", price: 70.00, rating: 4.3, category: "Home" },
        { id: 17, name: "Table Lamp", price: 35.00, rating: 4.1, category: "Home" },
        { id: 18, name: "Study Table", price: 120.00, rating: 4.5, category: "Home" },
        { id: 19, name: "Sofa", price: 450.00, rating: 4.6, category: "Home" },
        { id: 20, name: "Curtains", price: 50.00, rating: 4.0, category: "Home" }
    ];

    const cart = [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalSection = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortOption = document.getElementById("sortOption");

    function renderProducts(list) {
        productList.innerHTML = "";
        list.forEach(p => {
            const div = document.createElement("div");
            div.className = "product";
            div.innerHTML = `
                <h3>${p.name}</h3>
                <p>Category: ${p.category}</p>
                <p>Price: $${p.price.toFixed(2)}</p>
                <p>Rating: ⭐ ${p.rating}</p>
                <button data-id="${p.id}">Add to Cart</button>
            `;
            productList.appendChild(div);
        });
    }

    function applyFilterAndSort() {
        let list = [...products];

        if (categoryFilter.value !== "all") {
            list = list.filter(p => p.category === categoryFilter.value);
        }

        switch (sortOption.value) {
            case "price-asc": list.sort((a,b)=>a.price-b.price); break;
            case "price-desc": list.sort((a,b)=>b.price-a.price); break;
            case "name-asc": list.sort((a,b)=>a.name.localeCompare(b.name)); break;
            case "name-desc": list.sort((a,b)=>b.name.localeCompare(a.name)); break;
            case "rating-asc": list.sort((a,b)=>a.rating-b.rating); break;
            case "rating-desc": list.sort((a,b)=>b.rating-a.rating); break;
        }

        renderProducts(list);
    }

    productList.addEventListener("click", e => {
        if (e.target.tagName === "BUTTON") {
            const id = +e.target.dataset.id;
            const product = products.find(p => p.id === id);
            cart.push(product);
            updateCart();
        }
    });

    function updateCart() {
        cartItems.innerHTML = "";

        if (cart.length === 0) {
            cartItems.appendChild(emptyCartMessage);
            cartTotalSection.classList.add("hidden");
            totalPriceDisplay.textContent = "$0.00";
            return;
        }

        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(div);
        });

        const total = cart.reduce((sum, p) => sum + p.price, 0);
        totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
        cartTotalSection.classList.remove("hidden");
    }

    cartItems.addEventListener("click", e => {
        if (e.target.classList.contains("remove-btn")) {
            cart.splice(e.target.dataset.index, 1);
            updateCart();
        }
    });

    checkoutButton.addEventListener("click", () => {
        if (!cart.length) return alert("Cart is empty!");
        alert(`Thank you for shopping!\nTotal: ${totalPriceDisplay.textContent}`);
        cart.length = 0;
        updateCart();
    });

    categoryFilter.addEventListener("change", applyFilterAndSort);
    sortOption.addEventListener("change", applyFilterAndSort);

    renderProducts(products);
});