var hueIP = '';
var colors = ['#03A9F4','#E91E63','#F44336','#009688','#4CAF50','#FF5722','#FFC107','#00BCD4','#E040FB'];
var color = Math.floor(Math.random() * colors.length);
var timeLeft = 30;

var setFMUser = function(user) {
    $.ajax({
        url: `/api/setFMUser/${user}`,
        type: 'POST'
    });
}

var startTimer = function() {
    timeLeft = 30;

    function countdown() {
      if (timeLeft == 0) {
        clearTimeout(timerId);
        $('#example5').progress({
            percent: timeLeft,
            label: 'ratio',
            text: {
                ratio: `${timeLeft}s`
              }
        });
      } else {
          $('#example5').progress({
              percent: timeLeft * 3.333,
              label: 'ratio',
              text: {
                  ratio: `${timeLeft}s`
                }
          });
        timeLeft--;
      }
    }
    countdown();
    setInterval(countdown, 1000);
}

var getHueIP = function() {
    $.get( "/api/getHueIP", function( data ) {
        hueIP = data;
        $('.sub.header').html(data);
    });
}

var createHueUser = function() {
    timeLeft = 30;
    $.ajax({
        url: `http://${hueIP}/api/`,
        type: 'POST',
        data: `{
        "devicetype": "colorfyme#web"
        }`
    }).success(function(data) {
        if (data[0].error) {
            console.log(data[0].error.description);
            $('.connecting')
              .transition({
                  animation  : 'fade',
                  duration   : '500ms',
              });
            $('.retry')
                .transition({
                    animation  : 'fade',
                    duration   : '500ms',
                });
        }
        if (data[0].success) {
            window.location.href = "http://localhost:3000/main";
        }
    }).fail(function(data) {
        console.log('failure');
        console.log(data);
    });
}

$( document ).ready(function() {
    $('#body').css("backgroundColor", colors[color]);
    $('.button.submit').css("backgroundColor", colors[color]);
    $('.ui.header').css("color", colors[color]);
    getHueIP();

    $( ".form" ).submit(function( event ) {
        event.preventDefault();
        setFMUser($('#fmUser').val());
        window.location.href = "http://localhost:3000/main";
    });

    $( "#fmBtn" ).on('click', function( event ) {
        color = Math.floor(Math.random() * colors.length);
        $('#body').css("backgroundColor", colors[color]);
        $('.ui.header').css("color", colors[color]);
        $('#hueYesBtn').css("backgroundColor", colors[color]);
        $('.form1')
          .transition({
              animation  : 'fade down',
              duration   : '1s',
          })
        ;
        $('.form2')
            .transition({
                animation  : 'fade up',
                duration   : '1s',
            })
        ;
        setFMUser($('#fmUser').val());
    });

    $( "#hueYesBtn" ).on('click', function( event ) {
        color = Math.floor(Math.random() * colors.length);
        $('#body').css("backgroundColor", colors[color]);
        $('.ui.header').css("color", colors[color]);
        $('.button.submit, #ipStartBtn').css("backgroundColor", colors[color]);
        $('.ui.progress .bar ').css("background", colors[color]);

        $('.form2')
          .transition({
              animation  : 'fade down',
              duration   : '1s',
          });
        $('.form3')
            .transition({
                animation  : 'fade up',
                duration   : '1s',
            });
    });

    $( "#ipYesBtn" ).on('click', function( event ) {
        color = Math.floor(Math.random() * colors.length);
        $('#body').css("backgroundColor", colors[color]);
        $('.ui.header').css("color", colors[color]);
        $('.button.submit, #hueStartBtn, #hueConnectBtn, #hueRetryBtn').css("backgroundColor", colors[color]);
        $('.ui.progress .bar ').css("background", colors[color]);

        $('.form3')
          .transition({
              animation  : 'fade down',
              duration   : '1s',
          });
        $('.form4')
            .transition({
                animation  : 'fade up',
                duration   : '1s',
            });
    });

    $( "#hueStartBtn" ).on('click', function( event ) {
        $('.start')
          .transition({
              animation  : 'fade down',
              duration   : '500ms',
          });
        $('.connecting')
            .transition({
                animation  : 'fade up',
                duration   : '500ms',
            });
        startTimer()
    });

    $( "#hueRetryBtn" ).on('click', function( event ) {
        $('.retry')
          .transition({
              animation  : 'fade',
              duration   : '500ms',
          });
        $('.connecting')
            .transition({
                animation  : 'fade',
                duration   : '500ms',
            });
        startTimer()
    });


    $( "#hueConnectBtn" ).on('click', function( event ) {
        $('.form3 .segment').addClass('loading');
        createHueUser();
    });


    $( "#hueNoBtn" ).on('click', function( event ) {
        window.location.href = "http://localhost:3000/main";
    });
});
