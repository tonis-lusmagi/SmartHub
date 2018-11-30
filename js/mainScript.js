var clicks = 0;

var mode = getStoredValue('btnState');

function storeValue(key, value) {

    if (localStorage) {
        localStorage.setItem(key, value);

    } else {
        $.cookies.set(key, value);
    }
}

function getStoredValue(key) {

    if (localStorage) {
        return localStorage.getItem(key);

    } else {
        return $.cookies.get(key);
    }
}

function buttonState() {

    var trigger = false;
  
    if (getStoredValue('btnState')) {

        $('.btn-like').toggleClass("btn-like btn-like-clicked");
        $(this).removeClass('btn-like-clicked');
        toggle_visibility('afterLike');
        trigger = true;

    } else if (trigger == false) {

        $('.btn-like').on('click', function(e) {
        $('.btn-like').removeClass('btn-like');
        $(this).addClass('btn-like-clicked');
        });
    }
}

function clr() {

    localStorage.removeItem("btnState");
}

window.addEventListener('load', function() {

    console.log('doc onload');
    getCount().then(function(count) {
    document.getElementById('counter').innerHTML = count;
    });
});

function getCount() {

    return new Promise(function(resolve, reject) {

        $.get('/likecount', function(result) {

        var count = JSON.parse(result).count;
        console.log('getCount:', count);
        resolve(count);
        });
    });
}

function makeLikeRequest() {

    if (getStoredValue('btnState')) {

    return;

    } else { 
        $.post('/like', function(data) {
        var count = JSON.parse(data).count;
        $('#counter').html(count);
        });
    }

    mode = mode;
    storeValue('btnState', mode);
}

function toggle_visibility(id) {

    if (getStoredValue('btnState')) {
        var e = document.getElementById(id);
        if (e.style.display == 'none')
            e.style.display = 'none';
        else
            e.style.display = 'none';
    }

    var e = document.getElementById(id);
    if (e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
 }