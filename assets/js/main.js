
SC.initialize({ client_id: "759830e7f516ee6df896d9016714375e"});

// newTrack variable
var newArtist;
// Playing/Pausing variables
var sounds = [];
var currentSong;
var trackIndex;
var storedSound;

// Playing/Pausing bottom interface
var voy;

function newTrack() {
	newArtist = $("input").val();
	$('.search-title').text(newArtist);
	SC.get('/tracks', { q: newArtist}, function(tracks) {

		console.log(tracks);
		var trackLength = tracks.length;
		console.log(trackLength);

	  	for (var i = 0; i < trackLength; i++) {

			var title = tracks[i]['title'];
			var plays = tracks[i]['playback_count'];
			var likes = tracks[i]['likes_count'];
			var art = tracks[i]['artwork_url'];
			console.log(title);

			if (i === $(".song").length) {
				console.log($(".song").length);
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
				console.log(artworkUrl);

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
		console.log('yes');
	} 
});

// Showing Duration
function showDuration() {
	setInterval(checkSongTime, 1000);
	function checkSongTime() {
		//Get mins and secs
		var s = parseInt(voy.getCurrentPosition()) % 60;
		var m = parseInt((voy.getCurrentPosition()) / 60) %60;
		//Add 0 if less than 10
		if (s < 10) {
			s = '0' + s;
		}
		$('#duration').html(m + ':' + s);
	}
};

// Playing Pausing Stopping

$(document).on('click','.state', function() {
	trackIndex = $(this).parents('.content').index();
	currentSong = $('.artwork-container div').eq(trackIndex);
	console.log(currentSong);
	console.log(trackIndex);
	console.log(sounds);

	$('#audio-controls').animate({
		marginBottom: '0',
		}, 400, function() {
	});

	SC.get('/tracks', {q: newArtist}, function(tracks) {
		storedSound = sounds[trackIndex];
		if (storedSound) {
			if (storedSound.getState() == "paused") {
				console.log(storedSound.getCurrentPosition());
				storedSound.play();
				console.log('playing!');
				currentSong.removeClass('play-button-img').addClass('pause-button-img');
				$('#play-button, #pause-button').toggle();
			} else {
				storedSound.pause();
				console.log('paused!');
				currentSong.removeClass('pause-button-img').addClass('play-button-img');	
				$('#play-button, #pause-button').toggle();
			} 
			
		} else { 
			$('#play-button, #pause-button').toggle();
			currentSong = $('.artwork-container div').eq(trackIndex);
			currentSong.removeClass('play-button-img').addClass('pause-button-img');

			SC.stream(tracks[trackIndex]['id'], function(sound){
				if (voy) {
					voy.stop();
				}
				sound.play();
				sounds[trackIndex] = sound;
				voy = sound;
				console.log(voy);
				showDuration();
			});	
		}
		
	});
});

// Using bottom interface to Play/Pause
$('.event-btn').click(function() {
	$('#play-button, #pause-button').toggle();
	if (voy) {
		if (voy.getState() == "paused") {
			
			currentSong.removeClass('play-button-img').addClass('pause-button-img');
			voy.play();
			console.log('playing!');
		} else {
			
			currentSong.removeClass('pause-button-img').addClass('play-button-img');
			voy.pause();
			console.log('paused!');
		} 
	}
});











	



	

	

