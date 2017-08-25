function getLocationFromGoogle() {
    var input = document.getElementById('location');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {

        var place = autocomplete.getPlace();
        document.getElementById('location').value = place.name;
        document.getElementById('latitude').value = place.geometry.location.lat();
        document.getElementById('longitude').value = place.geometry.location.lng();

    });
}

function render(data) {
    $.each(data.response.groups, function (idx, val) {
        $('.results').prepend('<div class="results__length"><em>' + val.items.length + '</em>' + ' recommended places found</div>')

        //console.log(data.response.groups.items.venue.location.distance)

        $.each(val.items, function (idx2, val2) {

            var d = val2.venue.location.distance / 1609.344;            
            var distance = val2.venue.location.distance != undefined ? '<span class="distance">' + d.toFixed(2) + ' miles </span>' : '';
            var address = $.makeArray(val2.venue.location.formattedAddress).join('<br />');
            var url = val2.venue.url != undefined ? '<div class="url">' + '<a href="' + val2.venue.url + '">Website</a>' + '</div>' : '';

            var resultItem = '';

            resultItem = '<div class="recommended__item">' + '<div class="result__name"> ' + val2.venue.name + distance + '</div>' + '<div class="result__detail">' + address + url + '</div>' + '</div>';

            $('.recommended').append(resultItem);
        })
    });
}

$(document).on('click', 'body', function () {
    $(this).toggleClass('active');
    $(this).next().slideToggle();

    alert('h')
})


$(document).on('click', '#search', function (e) {
    e.preventDefault();

    $('.results').html('').append('<div class="recommended"></div>');

    var longitude = $('#longitude').val();
    var latitude = $('#latitude').val();

    $.getJSON('https://api.foursquare.com/v2/venues/explore?ll=' + latitude + ',' + longitude + '&oauth_token=IPH0S4EQYP24AUC0WHRZI0JBHJ1J1QSTXPGXEDH5SGTSEREP&v=20170821', function (data) {
        render(data);
    });
})

$(document).ready(function () {
    getLocationFromGoogle();
    //$('#location, #latitude, #longitude').val('');
})

