import React from 'react'
import ReactDom from 'react-dom'
import Options from './components/Options.js'
var ct = new ColorThief();

var Application = React.createClass({
    getInitialState() {
        return ({
            nowPlaying: {},
            user: []
        })
    },
    componentWillMount() {
        this.getUser();
        this.getCurrentSong();
        checkForLights();
    },
    componentDidMount() {
        setInterval(this.checkNowPlaying, 5000);
    },
    getUser() {
        let component = this
        $.get('/api/user/1').done((user) => {
            component.setState({user})
        })
    },
    getCurrentSong() {
        let component = this
        $.ajax({
            url: `/api/getCurrentTrack`
        }).done(function(data) {
            component.setState({nowPlaying: data})
            component.getColors();
        });
    },
    checkNowPlaying() {
        let component = this
        $.ajax({
            url: `/api/check`
        }).done(function(data) {
            console.log(data);
            if (data.new) {
                component.setState({nowPlaying: data})
                component.getColors(data)
                component.notifyMe(data)
            }
        });
    },
    getColors() {
        let track = this.state.nowPlaying
        let lights = this.state.user.hueLights
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

                // // Change Hue lights color
                _.forEach(lights, function(light) {
                    if (light.activated)
                        changeHueLights(light.id, v[0], v[1], v[2]);
                });
            } else {
                // Change UI colors based on colors found
                $(".v").css("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
                $('body').css("backgroundColor", `rgb(${pal[1][0]}, ${pal[1][1]}, ${pal[1][2]})`);
                $('#image').css('boxShadow', `0 0 50px rgb(${color[0]}, ${color[1]}, ${color[2]})`);
                $('.dom').css("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
                $('.0').css("color", `rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);

                // Change Hue lights color
                _.forEach(lights, function(light) {
                    if (light.activated)
                        changeHueLights(light.id, color[0], color[1], color[2]);
                });
            }
        });
    },
    displayOptions() {
        $('#options-form').toggle();
    },
    notifyMe() {
        let track = this.state.nowPlaying
        var options = {
            body: track.artist,
            icon: track.image
        }
        var n = new Notification(track.name ,options);
    },
    render() {
        return (
            <div>
                <Options
                    parent={this}></Options>

                <i id="optionsBtn" className="options icon big circular inverted" onClick={this.displayOptions}></i>
                <div id="div1" className="ui container">
                    <img id="image" src=""></img>
                    <h1 className='v'></h1>
                    <h2 className='0'></h2>
                </div>
            </div>
        )
    }
})

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


ReactDom.render(<Application />,
document.getElementById('react-app'))
