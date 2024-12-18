// // Simple Carousel Functionality
// const carousel = document.querySelector('.carousel');
// const prev = document.querySelector('.prev');
// const next = document.querySelector('.next');
// let index = 0;

// function showSlide() {
//     carousel.style.transform = `translateX(-${index * 100}%)`;
// }

// next.addEventListener('click', () => {
//     index = (index + 1) % 3;
//     showSlide();
// });

// prev.addEventListener('click', () => {
//     index = (index - 1 + 3) % 3;
//     showSlide();
// });

// JavaScript for Carousel Functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;

// Function to show the current slide
function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    // Show the selected slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Function to go to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Function to go to the previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

// Function to go to a specific slide via dots
function goToSlide(event) {
    currentIndex = parseInt(event.target.dataset.index);
    showSlide(currentIndex);
}

// Event Listeners
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
dots.forEach((dot) => dot.addEventListener('click', goToSlide));

// Show the initial slide
showSlide(currentIndex);

// JavaScript for Gallery Hover Logging (Optional)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        console.log('Hovering over:', item.querySelector('img').alt);
    });
});