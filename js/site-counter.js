var oldcount = 0;

function updcount(val) {
$('.count').each(function () {
    $(this).prop('Counter', oldcount).animate({
        Counter: val
    }, {
        duration: 3000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
    oldcount = val;
});
}

function fetchcount() {
    console.log("fetching count");
$.get("https://cs-sitecounter.marble.zone/countview", function( data ) {
    updcount(data.count);
  });
}

$(document).ready(function() {
    $.get("https://cs-sitecounter.marble.zone/count", function( dta ) {
    console.log("current count including YOU: " + dta.count);
  });
    fetchcount();
    setInterval(fetchcount, 30000);
});