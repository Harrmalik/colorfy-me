var ct = new ColorThief();

//////////////////////////////////////////////////
//              FUNCTIONS
//////////////////////////////////////////////////

// Make API request to find out what song is currently playing
var getCurrentSong = function() {
    $.ajax({
        url: `/api/getCurrentTrack`
    }).done(function(data) {
        console.log(data);
        getColors(data);
    });
};

// Create image element and finds useful colors to set the UI
var getColors = function(track) {
    var img = document.getElementById('image')
    var src = track.image ? `${track.image}?${new Date().getTime()}` : '/imgs/no-img.png';
    $('.v').html(track.name);
    $('.0').html(`${track.artist} - ${track.album}`);
    // $('.dom').html(track.album);
    img.setAttribute('src', src);
    img.setAttribute('crossOrigin', '*');
    img.addEventListener('load', function() {
        // Set variables and get colors from images
        var vibrant = new Vibrant(img, 64, 5);
        var swatches = vibrant.swatches();
        var color = ct.getColor(img);
        var pal = ct.getPalette(img);
        if (swatches['Vibrant']) {
            var v = swatches['Vibrant'].getRgb();

            // Change UI colors based on colors found
            $(".v").css("color", swatches['Vibrant'].getHex());
            $('body').css("backgroundColor", `rgb(${pal[1][0]}, ${pal[1][1]}, ${pal[1][2]})`);
            $('#image').css('boxShadow', `0 0 50px ${swatches['Vibrant'].getHex()}`);
            $('.dom').css("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
            $('.0').css("color", `rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);

            // Change Hue lights color
            // changeHueLights(1, v[0], v[1], v[2]);
            // changeHueLights(2, v[0], v[1], v[2]);
            //changeHueLights(2, pal[0][0], pal[0][1], pal[0][2]);
            changeHueLights(3, v[0], v[1], v[2]);
        } else {
            // Change UI colors based on colors found
            $(".v").css("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
            $('body').css("backgroundColor", `rgb(${pal[1][0]}, ${pal[1][1]}, ${pal[1][2]})`);
            $('#image').css('boxShadow', `0 0 50px rgb(${color[0]}, ${color[1]}, ${color[2]})`);
            $('.dom').css("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
            $('.0').css("color", `rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);

            // Change Hue lights color
            // changeHueLights(1, color[0], color[1], color[2]);
            // changeHueLights(2, color[0], color[1], color[2]);
            //changeHueLights(2, pal[0][0], pal[0][1], pal[0][2]);
            changeHueLights(3, color[0], color[1], color[2]);
        }
    });
}

var notifyMe = function(track) {
    var options = {
        body: track.artist,
        icon: track.image
    }
    var n = new Notification(track.name ,options);
}

var checkNowPlaying = function() {
    $.ajax({
        url: `/api/check`
    }).done(function(data) {
        console.log(data);
        if (data.new) {
            getColors(data);
            notifyMe(data);
        }
    });
}

$( document ).ready(function() {
    getCurrentSong();
    checkForLights();
    setInterval(checkNowPlaying, 1000);
    $('#optionsBtn').on('click', function(){
        _.forEach(activatedLights, function(lights) {
            var form = $('.ui.form'),
                newDiv = $("<div class='ui checkbox'></div>"),
                input = $('<input type="checkbox" tabindex="0" class="hidden">'),
                label = $(`<label>${lights.name}</label>`);
            form.append(newDiv, [input, label]);
        });
        console.log('clicked');
        $('#options-form').toggle();
    });
    //
    // // fix menu when passed
    // $('.masthead')
    //   .visibility({
    //     once: false,
    //     onBottomPassed: function() {
    //       $('.fixed.menu').transition('fade in');
    //     },
    //     onBottomPassedReverse: function() {
    //       $('.fixed.menu').transition('fade out');
    //     }
    //   })
    // ;
    //
    // // create sidebar and attach to menu open
    // $('.ui.sidebar')
    //   .sidebar('attach events', '.toc.item')
    // ;
});

// function notifyMe() {
//   // Let's check if the browser supports notifications
//   if (!("Notification" in window)) {
//     alert("This browser does not support desktop notification");
//   }
//
//   // Let's check whether notification permissions have already been granted
//   else if (Notification.permission === "granted") {
//     // If it's okay let's create a notification
//     var notification = new Notification("Hi there!");
//   }
//
//   // Otherwise, we need to ask the user for permission
//   else if (Notification.permission !== 'denied') {
//     Notification.requestPermission(function (permission) {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         var notification = new Notification("Hi there!");
//       }
//     });
//   }
//
//   // At last, if the user has denied notifications, and you
//   // want to be respectful there is no need to bother them any more.
// }
