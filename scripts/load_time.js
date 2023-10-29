window.addEventListener("load", function () {
    const durationElement = document.querySelector(".load_time");

    if (durationElement) {
        const [pageNav] = performance.getEntriesByType('navigation');
        const fetchTime = (pageNav.loadEventStart - pageNav.loadEventEnd).toFixed(0);
        durationElement.textContent = "Данная страница была загружена за " + fetchTime + " мс";
    }
});