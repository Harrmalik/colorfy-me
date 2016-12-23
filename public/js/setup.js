var hueIP = '';

var setFMUser = function(user) {
    $.ajax({
        url: `/api/setFMUser/${user}`,
        type: 'POST'
    });
}

$( document ).ready(function() {
    $( ".form" ).submit(function( event ) {
        event.preventDefault();
        setFMUser($('#fmUser').val());
        window.location.href = "http://localhost:3000/main";
    });

    $( ".submit" ).on('click', function( event ) {
        setFMUser($('#fmUser').val());
        window.location.href = "http://localhost:3000/main";
    });
});
