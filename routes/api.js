var express = require('express');
var router = express.Router();
const request = require('request');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var apiKey = process.env.lastfmApiKey;
var myBucket = 'colorfyme';
url = require('url');
fs = require('fs');
var nowPlaying = {};
var io = require('socket.io');
var socket = io();

router.get('/getCurrentTrack', function(req, res, next) {
    request.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Harrmalik&api_key=${apiKey}&format=json&limit=1`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        data = data.recenttracks.track[0];
        var image = data.image[Object.keys(data.image)[3]]
        nowPlaying = {
            artist: data.artist[Object.keys(data.artist)[0]],
            name: data.name,
            album: data.album[Object.keys(data.album)[0]],
            url: data.url,
            image: image[Object.keys(image)[0]]
        };

        console.log(nowPlaying);
        res.send(nowPlaying);
    } else {
            res.send('error' + response);
    }

    });
});

router.get('/demo', function(req, res, next) {
    request.get(`https://lastfm-img2.akamaized.net/i/u/300x300/065ccd5a01d5667b4b1085f858be346f.png`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          s3.putObject({
            Bucket: myBucket,
            Key: `demo`,
            Body: body,
            ContentType:'image/png',
            ACL: 'public-read',
          }, function(err, data){
            if(err){ console.log(err); };
            console.log('Uploaded '+ data);
          });
        res.send(response);
    } else {
            res.send('error' + response);
    }

    });
});

router.get('/check', function(req, res, next) {
    request.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Harrmalik&api_key=${apiKey}&format=json&limit=1`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            data = data.recenttracks.track[0];
            var image = data.image[Object.keys(data.image)[3]]
            track = {
                artist: data.artist[Object.keys(data.artist)[0]],
                name: data.name,
                album: data.album[Object.keys(data.album)[0]],
                url: data.url,
                image: image[Object.keys(image)[0]]
            };

            console.log('track ' + track.name);
            console.log('nowPlaying ' + nowPlaying.name);
              if (nowPlaying.name && nowPlaying.name !== track.name) {
                  console.log('change detected');
                  nowPlaying = track;
                  track.new = true;
                  res.send(track);
              } else {
                  res.send('nope');
              }
      } else {
              console.log('res');
      }
    });
});

// //This function will make the call to get user data from last.fm
// var checkingUserRecentTracks = function() {
//
// };
//
// setInterval(checkingUserRecentTracks, 1000);

module.exports = router;
