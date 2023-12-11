document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.mySwiper', {
        spaceBetween: 30, // string | number 0 Distance between slides in px.
        centeredSlides: true, // boolean false If true, then active slide will be centered, not always on the left side.
        loop: true, // boolean false Set to true to enable continuous loop mode
        autoplay: {
            delay: 4000, // number 3000 Delay between transitions (in ms). If this parameter is not specified, autoplay will be disabled
            disableOnInteraction: false, // boolean true Set to false and autoplay will not be disabled after user interactions (swipes), it will be restarted every time after interaction
        },
        pagination: {
            el: ".swiper-pagination", // any null String with CSS selector or HTML element of the container with pagination
            clickable: true, //boolean false If true then clicking on pagination button will cause transition to appropriate slide. Only for bullets pagination type
        },
        navigation: {
            nextEl: ".swiper-button-next", // String with CSS selector or HTML element of the element that will work like "next" button after click on it
            prevEl: ".swiper-button-prev", // String with CSS selector or HTML element of the element that will work like "prev" button after click on it
        },
    });
});