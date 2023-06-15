$(document).ready(function() {
    const amenities = {}
    $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
        if (data.status === 'OK'){
            $('#api_status').addClass('available')
        } else {
            $('#api_status').removeClass('available')
        }
    })
    $(document).on('change', "ul li input[type=checkbox]", function(){
        var $this = $(this);
        if ($this.is(':checked')) {
            amenities[$(this).data('id')] = $(this).data('name')
        } else {
            delete amenities[$(this).data('id')]
        }
        $('.amenities h4').text(Object.values(amenities).join(', '))
    })
});
