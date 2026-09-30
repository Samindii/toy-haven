// Toy Haven product data
const products = [
    {
        id: 1,
        name: "Classic Teddy Bear",
        category: "Toys",
        price: 24.99,
        image: "🧸"
    },
    {
        id: 2,
        name: "Adventure Board Game",
        category: "Board Games",
        price: 34.99,
        image: "🎲"
    },
    {
        id: 3,
        name: "Classic Diecast Car",
        category: "Diecast Cars",
        price: 19.99,
        image: "🚗"
    },
    {
        id: 4,
        name: "Superhero Figurine",
        category: "Figurines",
        price: 29.99,
        image: "🦸"
    },
    {
        id: 5,
        name: "Building Blocks Set",
        category: "Toys",
        price: 27.99,
        image: "🧱"
    },
    {
        id: 6,
        name: "Family Strategy Game",
        category: "Board Games",
        price: 39.99,
        image: "♟️"
    },
    {
        id: 7,
        name: "Sports Car Model",
        category: "Diecast Cars",
        price: 22.99,
        image: "🏎️"
    },
    {
        id: 8,
        name: "Fantasy Character Figure",
        category: "Figurines",
        price: 32.99,
        image: "🧙"
    }
];


// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}


// Display products
function displayProducts(productList) {

    const productGrid = document.getElementById("productGrid");
    const productCount = document.getElementById("productCount");

    if (!productGrid) {
        return;
    }

    productGrid.innerHTML = "";

    productList.forEach(function (product) {

        const productCard = document.createElement("article");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>

            <h3>${product.name}</h3>

            <p>Category: ${product.category}</p>

            <p class="price">$${product.price.toFixed(2)}</p>

            <button class="btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>

            <button class="btn" onclick="addToWishlist(${product.id})">
                ♡ Wishlist
            </button>
            <button class="btn" onclick="openProductModal(${product.id})">
              View Details
            </button>
        `;

        productGrid.appendChild(productCard);
    });

    if (productCount) {
        productCount.textContent =
            productList.length + " products found";
    }
}


// Search products
function searchProducts() {

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    if (!searchInput || !categoryFilter) {
        return;
    }

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(function (product) {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}


// Search event
const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", searchProducts);
}


// Category filter event
const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {
    categoryFilter.addEventListener("change", searchProducts);
}


// Add product to cart
function addToCart(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (product) {

        const existingProduct = cart.find(function (item) {
            return item.id === productId;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(product.name + " added to cart!");
    }
}


// Add product to wishlist
function addToWishlist(productId) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (product) {

        const alreadyAdded = wishlist.some(function (item) {
            return item.id === productId;
        });

        if (!alreadyAdded) {

            wishlist.push(product);

            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );

            alert(product.name + " added to wishlist!");

        } else {

            alert("This product is already in your wishlist.");
        }
    }
}


// Newsletter
const newsletterForm =
    document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("newsletterEmail").value;

        localStorage.setItem("newsletterEmail", email);

        document.getElementById("newsletterMessage").textContent =
            "Thank you for subscribing!";

        newsletterForm.reset();
    });
}


// Display products when products page loads
if (document.getElementById("productGrid")) {
    displayProducts(products);
}// Display shopping cart
function displayCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems) {
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        if (cartTotal) {
            cartTotal.textContent = "$0.00";
        }

        return;
    }

    cart.forEach(function (item) {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        const cartItem = document.createElement("article");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-product-image">
                ${item.image}
            </div>

            <div class="cart-product-details">
                <h3>${item.name}</h3>

                <p>Price: $${item.price.toFixed(2)}</p>

                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${item.id})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">
                        +
                    </button>

                </div>

                <p>
                    Subtotal:
                    $${subtotal.toFixed(2)}
                </p>

                <button
                    class="btn"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>

            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    if (cartTotal) {
        cartTotal.textContent =
            "$" + total.toFixed(2);
    }
}


// Increase quantity
function increaseQuantity(productId) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const item = cart.find(function (product) {
        return product.id === productId;
    });

    if (item) {
        item.quantity++;
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// Decrease quantity
function decreaseQuantity(productId) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const item = cart.find(function (product) {
        return product.id === productId;
    });

    if (item) {

        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter(function (product) {
                return product.id !== productId;
            });
        }
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// Remove product from cart
function removeFromCart(productId) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(function (product) {
        return product.id !== productId;
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// Clear entire cart
const clearCartButton =
    document.getElementById("clearCart");

if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem("cart");

            displayCart();

            alert("Your cart has been cleared.");
        }
    );
}


// Display cart when cart page loads
if (document.getElementById("cartItems")) {
    displayCart();
}// Display wishlist
function displayWishlist() {

    const wishlistItems =
        document.getElementById("wishlistItems");

    if (!wishlistItems) {
        return;
    }

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML =
            "<p>Your wishlist is empty.</p>";

        return;
    }

    wishlist.forEach(function(item) {

        if (!item.status) {
            item.status = "Interested";
        }

        const wishlistItem =
            document.createElement("article");

        wishlistItem.className =
            "wishlist-item";

        wishlistItem.innerHTML = `

            <div class="wishlist-product-image">
                ${item.image}
            </div>

            <div class="wishlist-product-details">

                <h3>${item.name}</h3>

                <p>Category: ${item.category}</p>

                <p class="price">
                    $${item.price.toFixed(2)}
                </p>

                <label>Status:</label>

                <select
                    onchange="updateWishlistStatus(${item.id}, this.value)"
                >

                    <option value="Interested"
                        ${item.status === "Interested" ? "selected" : ""}>
                        Interested
                    </option>

                    <option value="Owned"
                        ${item.status === "Owned" ? "selected" : ""}>
                        Owned
                    </option>

                    <option value="Not Interested"
                        ${item.status === "Not Interested" ? "selected" : ""}>
                        Not Interested
                    </option>

                </select>

                <br><br>

                <button
                    class="btn"
                    onclick="addToCart(${item.id})">
                    Add to Cart
                </button>

                <button
                    class="btn"
                    onclick="removeFromWishlist(${item.id})">
                    Remove
                </button>

            </div>
        `;

        wishlistItems.appendChild(wishlistItem);
    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
}function updateWishlistStatus(productId, status) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.forEach(function(item) {

        if (item.id === productId) {
            item.status = status;
        }

    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayWishlist();
}

// Remove product from wishlist
function removeFromWishlist(productId) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist = wishlist.filter(function (product) {
        return product.id !== productId;
    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayWishlist();
}


// Display wishlist when wishlist page loads
if (document.getElementById("wishlistItems")) {
    displayWishlist();
}// Display checkout order summary
function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    if (!checkoutItems) {
        return;
    }

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    checkoutItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        checkoutItems.innerHTML =
            "<p>Your cart is empty.</p>";

        if (checkoutTotal) {
            checkoutTotal.textContent = "$0.00";
        }

        return;
    }

    cart.forEach(function (item) {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;

        const itemElement =
            document.createElement("p");

        itemElement.textContent =
            item.name +
            " x " +
            item.quantity +
            " - $" +
            subtotal.toFixed(2);

        checkoutItems.appendChild(itemElement);
    });

    if (checkoutTotal) {

        checkoutTotal.textContent =
            "$" + total.toFixed(2);
    }
}


// Checkout form
const checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            let cart =
                JSON.parse(localStorage.getItem("cart")) || [];

            if (cart.length === 0) {

                alert("Your cart is empty.");

                return;
            }

            const fullName =
                document.getElementById("fullName").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const address =
                document.getElementById("address").value.trim();

            const paymentMethod =
                document.getElementById("paymentMethod").value;


            if (
                fullName === "" ||
                email === "" ||
                address === "" ||
                paymentMethod === ""
            ) {

                alert("Please complete all checkout details.");

                return;
            }


            const order = {

                orderId: Date.now(),

                customerName: fullName,

                email: email,

                address: address,

                paymentMethod: paymentMethod,

                items: cart,

                date: new Date().toLocaleString()
            };


            let orderHistory =
                JSON.parse(
                    localStorage.getItem("orderHistory")
                ) || [];


            orderHistory.push(order);


            localStorage.setItem(
                "orderHistory",
                JSON.stringify(orderHistory)
            );


            localStorage.removeItem("cart");


            const successMessage =
                document.getElementById("successMessage");


            if (successMessage) {

                successMessage.style.display = "block";

                successMessage.textContent =
                    "Order placed successfully! Thank you for shopping with Toy Haven.";
            }


            checkoutForm.reset();


            displayCheckout();
        }
    );
}


// Display checkout when page loads
if (document.getElementById("checkoutItems")) {
    displayCheckout();
}// Feedback form
const feedbackForm =
    document.getElementById("feedbackForm");

if (feedbackForm) {

    feedbackForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById("feedbackName").value.trim();

            const email =
                document.getElementById("feedbackEmail").value.trim();

            const message =
                document.getElementById("feedbackMessage").value.trim();


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                alert("Please complete all fields.");

                return;
            }


            const feedback = {

                name: name,

                email: email,

                message: message,

                date: new Date().toLocaleString()
            };


            let feedbackList =
                JSON.parse(
                    localStorage.getItem("feedbackList")
                ) || [];


            feedbackList.push(feedback);


            localStorage.setItem(
                "feedbackList",
                JSON.stringify(feedbackList)
            );


            document.getElementById("feedbackSuccess").textContent =
                "Thank you! Your feedback has been submitted.";


            feedbackForm.reset();
        }
    );
}


// FAQ accordion
const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const answer =
            question.nextElementSibling;

        if (answer.style.display === "block") {

            answer.style.display = "none";

        } else {

            answer.style.display = "block";
        }
    });
});// Featured Product of the Day
const featuredProduct =
    document.getElementById("featuredProduct");

if (featuredProduct) {
    const today = new Date().getDate();

    const productIndex =
        today % products.length;

    const product =
        products[productIndex];

    featuredProduct.innerHTML = `
        <div class="product-card">
            <div class="product-image">
                ${product.image}
            </div>

            <h3>${product.name}</h3>

            <p>Category: ${product.category}</p>

            <p>Price: $${product.price.toFixed(2)}</p>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>

            <button onclick="addToWishlist(${product.id})">
                Add to Wishlist
            </button>
        </div>
    `;
}// Open product modal
function openProductModal(productId) {

    const product =
        products.find(function (item) {
            return item.id === productId;
        });

    if (!product) {
        return;
    }

    const modal =
        document.getElementById("productModal");

    document.getElementById("modalProductImage").textContent =
        product.image;

    document.getElementById("modalProductName").textContent =
        product.name;

    document.getElementById("modalProductCategory").textContent =
        "Category: " + product.category;

    document.getElementById("modalProductPrice").textContent =
        "Price: $" + product.price.toFixed(2);

    document.getElementById("modalProductDescription").textContent =
        "A great addition to any toy collection.";

    const modalAddToCart =
        document.getElementById("modalAddToCart");

    modalAddToCart.onclick = function () {
        addToCart(product.id);
    };

    modal.style.display = "block";
}


// Close product modal
const closeModal =
    document.getElementById("closeModal");

if (closeModal) {

    closeModal.addEventListener(
        "click",
        function () {

            document.getElementById(
                "productModal"
            ).style.display = "none";
        }
    );
}


// Close modal when clicking outside it
window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("productModal");

        if (event.target === modal) {

            modal.style.display = "none";
        }
    }
);// Register service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("service-worker.js")
            .then(function () {
                console.log("Service Worker registered successfully.");
            })
            .catch(function () {
                console.log("Service Worker registration failed.");
            });
    });
}
