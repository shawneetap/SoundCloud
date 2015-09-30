// function number #1
$(document).ready(function() {
	SC.get('/tracks', {q: newArtist}, function(tracks) {
		console.log(tracks);
		$(document).on('click','.play-button-img', function() {
			var trackNumber = $(this).parents('.content').index();
			console.log(trackNumber);

			SC.stream(tracks[trackNumber]['id'], function(sound){
			  // sound.play();
			  // $('.play-button-img').click(function() {
			  //   sound.stop();
			  // });

			  if (playingTrack === 'no') {
			   sound.play();
			   playingTrack = 'yes';
			   console.log(playingTrack);
			  } else if (playingTrack === 'yes') {
			   sound.stop();
			   playingTrack = 'no';
			   console.log(playingTrack);
			  }
			});

		});
	});
});

// function number #2
function StateMan(currentTrack) {
	var track = currentTrack;
	if (playingTrack === 'no') {
		track.play();
		playingTrack = 'yes';
		console.log(playingTrack);
	} else if (playingTrack === 'yes') {
		track.stop();
		playingTrack = 'no';
		console.log(playingTrack);
	}

	var track = currentTrack;
	var state = "";

	this.play = function() {
		if(state == "play") return;
		state = "play";
		track.play();
		console.log('playing');
	};

	this.stop = function() {
		if (state == "stop") return;
		state = "stop";	
		track.stop();
		console.log('stopped');
	};
	this.stop();
}

$(document).ready(function() {
	playingTrack = 'no';
	SC.get('/tracks', {q: newArtist}, function(tracks) {
		$(document).on('click','.play-button-img', function() {
			console.log(newArtist);
			trackNumber = $(this).parents('.content').index();
			console.log(trackNumber);
			
			SC.stream(tracks[trackNumber]['id'], function(sound) {
				console.log(sound);
				stateMan = new StateMan(sound);
				// console.log(StateMan);
			});
		
		});
	});
});