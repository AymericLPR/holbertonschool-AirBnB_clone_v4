$(document).ready(function () {
    const amenities = {};
    const url1 = 'http://127.0.0.1:5001/api/v1/status/';
  
    // retrieve status grey or red
    $.get(url1, function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  
    // make POST request to server
    $.post({
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      data: JSON.stringify({}),
      contentType: 'application/json',
    })
    .done(function(data) {
      data.forEach(function(place) {
        const article = $('<article>');
        article.html(
            `<div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">
                ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
              </div>
              <div class="number_rooms">
                ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
              </div>
              <div class="number_bathrooms">
                ${place.number_bathrooms} Bathroom${
                place.number_bathrooms !== 1 ? 's' : ''
              }
              </div>
            </div>
            <div class="description">${place.description}</div>
            `
        );
        $('section.places').append(article);
      });
    })
    .fail(function(error) {
      console.error(error);
    });
  
    // checkbox if selected
    $('input[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        amenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenities[$(this).data('id')];
      }
      let amenityNames = Object.values(amenities).join(', ');
      // small list of amenties check finish by ...
      if (amenityNames.length > 35) {
        amenityNames = amenityNames.substring(0, 35) + '...';
      }
      $('.amenities h4').text(amenityNames);
    });
});
