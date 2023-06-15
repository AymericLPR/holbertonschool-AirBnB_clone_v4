const amenities = {}
$(document).on('change', "ul li input[type=checkbox]", function(){
    var $this = $(this);
    if ($this.is(':checked')) {
        amenities[$(this).data('id')] = $(this).data('name')
    } else {
        delete amenities[$(this).data('id')]
    }
    $('.amenities h4').text(Object.values(amenities).join(', '))
})
