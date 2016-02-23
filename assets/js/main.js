
SC.initialize({ client_id: "759830e7f516ee6df896d9016714375e"});

// newTrack variable
var newArtist;
// Playing/Pausing variables
var sounds = [];
var currentSong;
var trackIndex;
var storedSound;

var songSelector = function() {
    $('.artwork-container').css('width',100);
    $('.artwork-container').css('height',100);
    $('.art').css('width',100);
    $('.art').css('height',100);
    $('.artwork-container').css('box-shadow',"none");

    $('.artwork-container').eq(trackIndex).css('width',120);
    $('.artwork-container').eq(trackIndex).css('height',120);
    $('.art').eq(trackIndex).css('width',120);
    $('.art').eq(trackIndex).css('height',120);
    $('.artwork-container').eq(trackIndex).css('box-shadow',"0px 0px 8px 6px #3bc3dc");
};

var buttonToggle = function() {
    currentSong.removeClass('play-button-img').addClass('pause-button-img');
    $('#play-button').css('display','none');
    $('#pause-button').css('display','block');
};

var songReset = function() {
    $('.artwork-container div').removeClass('pause-button-img').addClass('play-button-img');
    voy.stop();
    sounds = [];
};

var nextPrev = function() {
    currentSong = $('.artwork-container div').eq(trackIndex);
    songSelector();
    buttonToggle();
    SC.get('/tracks', {q: newArtist}, function(tracks) {
        SC.stream(tracks[trackIndex]['id'], function(sound){ 
            sound.play();
            sounds[trackIndex] = sound;
            voy = sound;
            showDuration();
        });
    });
};

// Playing/Pausing bottom interface
var voy;

function newTrack() {
    newArtist = $("input").val();
    $('.search-title').text(newArtist);
    SC.get('/tracks', { q: newArtist}, function(tracks) {
        var trackLength = tracks.length;

        for (var i = 0; i < trackLength; i++) {

            var title = tracks[i]['title'];
            var plays = tracks[i]['playback_count'];
            var likes = tracks[i]['likes_count'];
            var art = tracks[i]['artwork_url'];

            if (i === $(".song").length) {
                var newContent =$('<div class="content clearfix">');
                var newSong = $("<div class='song'>");
                var newTitle = $("<div class ='title'>").text(title);
                var newPlays = $("<div class ='plays'>").text(plays);
                var newLikes = $("<div class='likes'>").text(likes);
                var newArtworkContainer = $('<div class="artwork-container">');
                var newPlay = $('<div class ="state play-button-img">');
                var newArt = $('<img class ="art">').attr('src', art);

                var titleDiv = newSong.append(newTitle).append(newPlays).append(newLikes);
    
                var artDiv = newArtworkContainer.append(newPlay).append(newArt);

                var yo = newContent.append(artDiv).append(titleDiv);

                $('.content-wrapper').append(yo);
            }

            $('.song .title').eq(i).text(title);
            $('.song .plays').eq(i).text('plays: ' + plays);
            $('.song .likes').eq(i).text('likes: ' + likes);
            $('img').eq(i).attr('src', art);

            var artworkUrl = tracks[i]['artwork_url'];

            if (artworkUrl === null) {
                $('.art').addClass('default-art');
            }
        };
    });
}

// Submits newTrack via button
$("#submit-button").click(newTrack);

// pressing Enter sends the newTrack function
$(document).keypress(function(newTrack) {
    if(event.keyCode === 13) {
        $('#submit-button').click();
    } 
});

// Showing Duration
function showDuration() {
    setInterval(checkSongTime, 1000);
    function checkSongTime() {
        var pos = voy.getCurrentPosition();
        var dur = voy.getDuration();
    
        //Get mins and secs
        var m = Math.floor(pos / 60000);
        var s = ((pos % 60000) / 1000).toFixed(0);
        //Add 0 if less than 10
        if (s < 10) {
            s = '0' + s;
        }
        $('#duration').html(m + ':' + s);

        var value = 0;
        if(pos > 0) {
            value = Math.floor((100 / dur) * pos);
        }
        
        $('#progress').css('width',value+'%');
    }
};

// Volume
// Not Working
$('#volume').change(function() {
    voy.setVolume = parseFloat(this.value / 100);
    console.log(voy.getVolume);
});

// Playing Pausing Stopping
$(document).on('click','.state', function() {
    trackIndex = $(this).parents('.content').index();
    currentSong = $('.artwork-container div').eq(trackIndex);

    $('#audio-controls').animate({
        marginBottom: '0',
        }, 400, function() {
    });

    songSelector();

    SC.get('/tracks', {q: newArtist}, function(tracks) {
        storedSound = sounds[trackIndex];
        if (storedSound) {
            if (storedSound.getState() == "paused") {
                storedSound.play();
                currentSong.removeClass('play-button-img').addClass('pause-button-img');
                $('#play-button, #pause-button').toggle();
            } else {
                storedSound.pause();
                currentSong.removeClass('pause-button-img').addClass('play-button-img');
                $('#play-button, #pause-button').toggle();
            } 
            
        } else { 
            if (voy) {
                songReset();
            }

            SC.stream(tracks[trackIndex]['id'], function(sound){ 
                buttonToggle();
                sound.play();
                sounds[trackIndex] = sound;
                voy = sound;
                showDuration();
            }); 
        }
    });
});

//next song
$('#next-button').click(function() {
    songReset();
    trackIndex = (trackIndex + 1);
    nextPrev();
});

//previous song
$('#prev-button').click(function() {
    songReset();
    trackIndex = (trackIndex - 1);
    nextPrev();
});

// Using bottom interface to Play/Pause
$('.event-btn').click(function() {
    $('#play-button, #pause-button').toggle();
    if (voy) {
        if (voy.getState() == "paused") {
            currentSong.removeClass('play-button-img').addClass('pause-button-img');
            voy.play();
        } else {
            currentSong.removeClass('pause-button-img').addClass('play-button-img');
            voy.pause();
        } 
    }
});














    



    

    

