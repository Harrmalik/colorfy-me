
var ct = new ColorThief();
var colors = colors || window.colors;
var socket = io();

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
    $('.0').html(track.artist);
    console.log(image);
    img.setAttribute('src', src);
    img.setAttribute('crossOrigin', '*');
    img.addEventListener('load', function() {
        // Set variables and get colors from images
        var vibrant = new Vibrant(img, 64, 5);
        var swatches = vibrant.swatches();
        var color = ct.getColor(img);
        var pal = ct.getPalette(img);
        var v = swatches['Vibrant'].getRgb();

        // Change UI colors based on colors found
        $(".v").css("color", swatches['Vibrant'].getHex());
        $('#div1').css("backgroundColor", `rgb(${pal[1][0]}, ${pal[1][1]}, ${pal[1][2]})`);
        $('#div1').css('boxShadow', `0px 0px 50px rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);
        $('#image').css('boxShadow', `0 0 100px ${swatches['Vibrant'].getHex()}`);
        $('.dom').css("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        $('.0').css("color", `rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);

        // Change Hue lights color
        changeHueLights(1, v[0], v[1], v[2]);
        changeHueLights(2, pal[0][0], pal[0][1], pal[0][2]);
        changeHueLights(3, v[0], v[1], v[2]);
    });
}


// Make API calls to hue lights to change the colors of each bulb
var changeHueLights = function(light, r, g, b) {
    var xy = colors.rgbToCIE1931(r, g, b);

    $.ajax({
        url: `http://192.168.0.7/api/tQdJ7GMOv2NTW9eTIzqjL2YbRbTKrrGyG2RY37MD/lights/${light}/state`,
        type: 'PUT',
        data: `{
            "on": true,
            "bri": 254,
            "sat": 254,
            "transitiontime": 30,
            "xy": [${xy}]
        }`
    });
}

var checkNowPlaying = function() {
    $.ajax({
        url: `/api/check`
    }).done(function(data) {
        console.log(data);
        if (data.new) {
            getColors(data);
        }
    });
}

$( document ).ready(function() {
    // If the server detects a change in songs run function to change html and lights
    socket.on('new track', function(track) {
        console.log(track);
        getColors(track);
    });

    getCurrentSong();
    setInterval(checkNowPlaying, 1000);
});
