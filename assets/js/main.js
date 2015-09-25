// function currentArtist () {
// 	var newArtist = $("input").val();
// 	console.log(newArtist);
// 	var api = "https://api.soundcloud.com";
// 	var api_newArtist = api+newArtist;
// 	console.log(bluh);


// 	$.getJSON(api_newArtist, function(responseJSON){

// 	});
// }
SC.initialize({ client_id: "759830e7f516ee6df896d9016714375e"});

$("#submit-button").click(function() {

	var newArtist = $("input").val();
	$('.search-title').text(newArtist);
	SC.get('/tracks', { q: newArtist}, function(tracks) {
		
		console.log(tracks);
		var trackLength = tracks.length;
		console.log(trackLength);

	  	for (var i = 0; i < trackLength; i++) {

			var title = tracks[i]['title'];
			var art = tracks[i]['artwork_url'];
			console.log(title);
			// console.log(title);

			if (i === $(".song").length) {
				console.log($(".song").length);
				var newContent =$('<div class="content clearfix">');
				var newSong = $("<div class='song'>");
				var newTitle = $("<div class ='title'>").text(title);
				var newArtworkContainer = $('<div class="artwork-container">');
				var newPlay = $('<div class ="play-button-img">');
				var newArt = $('<img class ="art">').attr('src', art);

				var titleDiv = newSong.append(newTitle);
	
				var artDiv = newArtworkContainer.append(newPlay).append(newArt);

				var yo = newContent.append(artDiv).append(titleDiv);

				$('.content-wrapper').append(yo);
			}

			$('.song .title').eq(i).text(title);
			$('img').eq(i).attr('src', art);

		};

		$('.play-button-img').click(function() {

			var trackNumber = $(this).parents('.content').index();


			SC.stream(tracks[trackNumber]['id'], function(sound){
				sound.play();

				$('.play-button-img').click(function() {
					sound.stop();
				});
			});
		});
	});
});






	



	

	

