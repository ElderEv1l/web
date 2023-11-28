async function fetchImage(randomLimit) {
    //const response = await fetch(`https://jsonplaceholder.typicode.com/photos?id=${randomLimit}`);
    const response = await fetch(`https://api.thecatapi.com/v1/images/search`);
    return await response.json();
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

window.addEventListener("load", function() {
    const fetchButton = document.getElementById('fetchButton');
    const preload = document.getElementById('preload');
    const data = document.getElementById('data');

    fetchButton.addEventListener('click', () => {
        preload.style.display = 'block';
        data.style.display = 'none'

        setTimeout(() => {
            fetchImage(randomInteger(1, 5000))
                .then(got => {
                    preload.style.display = 'none';
                    data.src = got[0].url;
                    data.style.display = 'block'
                })
                .catch(error => {
                    preload.style.display = 'none';
                    data.style.display = 'none'
                    data.src = "./images/error.jpg";
                    console.log("Something went wrong")
                });
        }, 200);
    });
});