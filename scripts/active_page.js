$(document).ready(function(){
    let str = location.pathname.split("/").pop()

    if (str === '') {
        str = 'index.html';
    }

    let target = $('nav li a[href="'+str+'"]');
    target.addClass('active');
});