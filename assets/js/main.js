
SC.initialize({ client_id: "759830e7f516ee6df896d9016714375e"});

var newArtist;
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
				var newPlay = $('<div class ="play-button-img">');
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

// Playing and pausing
var playingTrack = 'no';

$(document).on('click','.play-button-img', function() {

	var trackNumber = $(this).parents('.content').index();
	console.log(trackNumber);

	SC.get('/tracks', {q: newArtist}, function(tracks) {
		SC.stream(tracks[trackNumber]['id'], function(sound){
			sound.play();
			$('.play-button-img').click(function() {
				sound.stop();
			});
		
			// if (playingTrack === 'no') {
			// 	sound.play();
			// 	playingTrack = 'yes';
			// 	console.log(playingTrack);
			// } else if (playingTrack === 'yes') {
			// 	sound.stop();
			// 	playingTrack = 'no';
			// 	console.log(playingTrack);
			// }
		});
	});
});








	



	

	

