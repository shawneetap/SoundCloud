
SC.initialize({ client_id: "759830e7f516ee6df896d9016714375e"});

var newArtist;
var playingTrack = 'no';

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

// pressing Ente sends the newTrack function
$(document).keypress(function(newTrack) {
	if(event.keyCode === 13) {
		$('#submit-button').click();
		console.log('yes');
	} 
});

// Playing Pausing Stopping
var sounds = [];
var currentSong;
var trackIndex;
var storedSound;
var voy;

$(document).on('click','.state', function() {
	trackIndex = $(this).parents('.content').index();
	currentSong = $('.artwork-container div').eq(trackIndex);
	$(this).removeClass('play-button-img').addClass('pause-button-img');
	console.log(currentSong);
	console.log(trackIndex);

	$('#audio-controls').animate({
		marginBottom: '0',
		}, 400, function() {
	});

	SC.get('/tracks', {q: newArtist}, function(tracks) {
		storedSound = sounds[trackIndex];
		// playingIndex = sounds.length;
		// console.log(playingIndex);
		
		if (storedSound) {
			if (storedSound.getState() == "paused") {
				storedSound.play();
				console.log('playing!');
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

			SC.stream(tracks[trackIndex]['id'], function(sound){
				sound.play();
				sounds[trackIndex] = sound;
				voy = sound;
				console.log(voy);
			});	
		}
		
	});
});

$('.event-btn').click(function() {
	if (voy) {
		if (voy.getState() == "paused") {
			$('#play-button, #pause-button').toggle();
			currentSong.removeClass('play-button-img').addClass('pause-button-img');
			voy.play();
			console.log('playing!');
		} else {
			$('#play-button, #pause-button').toggle();
			currentSong.removeClass('pause-button-img').addClass('play-button-img');
			voy.pause();
			console.log('paused!');
		} 
	}
});










	



	

	

