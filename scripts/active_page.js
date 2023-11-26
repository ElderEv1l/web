document.addEventListener("DOMContentLoaded", function() {
    let currentPageName = document.location.href;
    const menuLinks = document.querySelectorAll('.nav_bar li a');

    if (menuLinks){
        menuLinks.forEach(function(link) {
            if (link.href === currentPageName) {
                link.classList.add('active');
            }
        });
    }
});
