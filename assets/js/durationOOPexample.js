// OOP way?
function showDuration(millis) {
	setInterval(checkSongTime, 1000);
	function checkSongTime() {
		//Get mins and secs
		var m = Math.floor(millis / 60000);
		var s = ((millis % 60000) / 1000).toFixed(0);
		//Add 0 if less than 10
		if (s < 10) {
			s = '0' + s;
		}
		$('#duration').html(m + ':' + s);
	}
};

SC.stream(tracks[trackIndex]['id'], function(sound){ 
	sound.play();
	sounds[trackIndex] = sound;
	voy = sound;
	showDuration(voy.getCurrentPosition());
}); 

// How my code is
function showDuration() {
	setInterval(checkSongTime, 1000);
	function checkSongTime() {
		//Get mins and secs
		var m = Math.floor(voy.getCurrentPosition() / 60000);
		var s = ((voy.getCurrentPosition() % 60000) / 1000).toFixed(0);
		//Add 0 if less than 10
		if (s < 10) {
			s = '0' + s;
		}
		$('#duration').html(m + ':' + s);
	}
};

SC.stream(tracks[trackIndex]['id'], function(sound){ 
	sound.play();
	sounds[trackIndex] = sound;
	voy = sound;
	showDuration();
}); 	