// --- Navbar Toggle ---
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

// --- Home Image Slider Click ---
document.querySelectorAll('.image-slider img').forEach(images => {
    images.onclick = () => {
        var src = images.getAttribute('src');
        document.querySelector('.main-home-image').src = src;
    };
});

// --- Swiper Review Slider ---
var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        }
    },
});

// --- ORDER FORM LOGIC ---

// Elements
const quantityInput = document.querySelector('#coffee-quantity');
const submitBtn = document.querySelector('#order-form input[type="submit"]');
const orderDetails = document.querySelector('#order-details');
const modal = document.querySelector('#order-modal');
const modalText = document.querySelector('#modal-text');
const closeModal = document.querySelector('.close-modal');
const confirmBtn = document.querySelector('.confirm-btn');

// Initially disable quantity and submit
quantityInput.value = '';
quantityInput.placeholder = 'Select coffee first';
quantityInput.disabled = true;
submitBtn.disabled = true;

// Global variables for selected coffee
let selectedCoffee = '';
let selectedPrice = 0;

// --- Order button click ---
document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function(e){
        e.preventDefault();

        // Scroll to order form
        document.querySelector('#book').scrollIntoView({behavior:'smooth'});

        // Coffee name & price
        const box = this.closest('.box');
        selectedCoffee = box.querySelector('h3').innerText;
        selectedPrice = parseFloat(box.querySelector('.price').dataset.price);

        // Enable quantity and submit
        quantityInput.disabled = false;
        submitBtn.disabled = false;

        // Reset quantity to 1
        quantityInput.value = 1;

        // Fill order details
        orderDetails.value = `Coffee: ${selectedCoffee} | Quantity: 1 | Price: $${selectedPrice.toFixed(2)}`;
    });
});

// --- Quantity change ---
quantityInput.addEventListener('input', function(){
    let qty = parseInt(this.value);
    if(qty < 1) this.value = 1;
    const totalPrice = (selectedPrice * qty).toFixed(2);
    orderDetails.value = `Coffee: ${selectedCoffee} | Quantity: ${qty} | Price: $${totalPrice}`;
});

// --- Form submit → show modal ---
document.querySelector('#order-form').addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.querySelector('#user-name').value;
    const location = document.querySelector('#user-location').value;
    const phone = document.querySelector('#user-phone').value;
    const qty = parseInt(quantityInput.value);
    const totalPrice = (selectedPrice * qty).toFixed(2);

    // Populate modal
    modalText.innerHTML = `
        Name: ${name} <br>
        Location: ${location} <br>
        Phone: ${phone} <br>
        Coffee: ${selectedCoffee} <br>
        Quantity: ${qty} <br>
        Total Price: $${totalPrice}
    `;

    // Show modal
    modal.style.display = 'flex';
});

// --- Close modal ---
closeModal.addEventListener('click', function(){
    modal.style.display = 'none';
});

// --- Confirm order ---
confirmBtn.addEventListener('click', function(){
    alert("✅ Order Confirmed!");
    modal.style.display = 'none';
    document.querySelector('#order-form').reset();
    orderDetails.value = '';
    quantityInput.disabled = true;
    submitBtn.disabled = true;

    // Show toast
    const toast = document.getElementById('success-toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
});

// Blog section container
// const blogContainer = document.querySelector('.blog-container');

// fetch('../blogs.json')
//     .then(response => response.json())
//     .then(data => {
//         data.forEach(blog => {
//             const blogHTML = `
//                 <div class="blog-card">
//                     <img src="${blog.image}" alt="${blog.title}">
//                     <div class="blog-content">
//                         <h3>${blog.title}</h3>
//                         <p class="meta">By ${blog.author} | ${blog.date}</p>
//                         <p class="excerpt">${blog.excerpt}</p>
//                         <a href="${blog.link}" class="btn">Read More</a>
//                     </div>
//                 </div>
//             `;
//             blogContainer.innerHTML += blogHTML;
//         });
//     })
//     .catch(err => console.error("Error loading blogs:", err));
const blogContainer = document.querySelector('.blog-container');

// Fetch JSON
fetch('../blogs.json')  // path sahi rakho
    .then(response => response.json())
    .then(data => {
        data.forEach(blog => {
            const blogHTML = `
                <div class="swiper-slide box">
                    <img src="${blog.image}" alt="${blog.title}">
                    <div class="blog-content">
                        <h3>${blog.title}</h3>
                        <p class="meta">By ${blog.author} | ${blog.date}</p>
                        <p class="excerpt">${blog.excerpt}</p>
                        <a href="${blog.link}" class="btn">Read More</a>
                    </div>
                </div>
            `;
            blogContainer.innerHTML += blogHTML;
        });

        // Initialize Swiper after content is loaded
        new Swiper(".review-slider", {
            spaceBetween: 20,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 7500,
                disableOnInteraction: false,
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            },
        });
    })
    .catch(err => console.error("Error loading blogs:", err));
