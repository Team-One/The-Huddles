$(document).ready(function() {

    $('#confirm_popup').popup({
      transition: 'all 0.3s',
      onopen: function() {
        // var user = $('#name-input').val()
        // var room = $('#room-number').data('selected');
        $('#checkin-form-button').removeClass('confirm_popup_open');
        // $(this).find('h4').append(user);
        // $(this).find('h4').append('<a href="http://www.huddle.t1.la/'+room+'">http://www.huddle.t1.la/#'+room+'</a>');
      }
    });

    $('#search_popup').popup({
        transition: 'all 0.3s'

    });

    if(window.location.hash) {
        var hash = window.location.hash.substring(1);
        var $details = $('.details');
        var room = $('.rooms').find('li#'+hash);
        //alert (hash);        
        $('.details.light').addClass('newRoom');
            setTimeout(function(){
                $(room).trigger("click");
            }, 1500);
        } 
        else {
        // No hash found
    }

    // $('#confirm_popup').popup({
    //     transition: 'all 0.3s',
    //     onopen: function() {
    //         $('#checkin-form-button').removeClass('confirm_popup_open');
    //         $(this).find('h4').append('<a href="http://www.huddle.t1.la/'+hash+'">http://www.huddle.t1.la/#'+hash+'</a>');
    //     }
    // });
});