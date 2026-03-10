// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            header.style.padding = '10px 0'; // Compact mode
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '0'; // Reverted by css mostly, adjust manually if needed
        }
    });

    // --- Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // --- E-commerce Logic (Cart Management) ---
    
    // Initialize Cart
    let cart = JSON.parse(localStorage.getItem('lihimCart')) || [];
    updateCartCount();

    // Add to Cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            const productImage = button.getAttribute('data-image');
            
            // Basic quantity selector logic if present on page
            let quantity = 1;
            const quantityInput = document.getElementById('qty');
            if(quantityInput) {
                quantity = parseInt(quantityInput.value) || 1;
            }

            addItemToCart(productId, productName, productPrice, productImage, quantity);
            
            // Visual feedback
            const originalText = button.innerHTML;
            button.innerHTML = '¡Añadido!';
            button.style.backgroundColor = '#4caf50';
            button.style.borderColor = '#4caf50';
            button.style.color = '#fff';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.backgroundColor = '';
                button.style.borderColor = '';
                button.style.color = '';
            }, 2000);
        });
    });
    
    function addItemToCart(id, name, price, image, quantity) {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id, name, price, image, quantity });
        }
        
        saveCart();
    }
    
    function saveCart() {
        localStorage.setItem('lihimCart', JSON.stringify(cart));
        updateCartCount();
    }
    
    function updateCartCount() {
        const cartCounts = document.querySelectorAll('.cart-count');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartCounts.forEach(counter => {
            counter.textContent = totalItems;
            // Hide if 0
            counter.style.display = totalItems > 0 ? 'inline-block' : 'none';
        });
    }

});
