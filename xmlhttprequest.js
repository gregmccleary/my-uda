

parseJSON = function (weaponJSON) {
    parsedJSON = JSON.parse(weaponJSON);

    return parsedJSON['frames']['chaingun_impact.png']['spriteSourceSize']['x'];
};

// Create a new XMLHttpRequest object
var weaponXHR =  new XMLHttpRequest();

var setup = function() {
// then use its open method to to define the request that
// will be sent. The parameters to 'open' are:
//
// 1) The HTTP method to use, in our case we want
//    "GET".
// 2) The resource to request, in this case we're
//    interested in "/media/js/standalone/libs/gamedev_assets/weapon.json".
// 3) A boolean indicating whether or not we want
//    the request to be asynchronous or not. True
//    means we do want it to be asynchronous.

// YOUR CODE HERE
    weaponXHR.open("GET","/media/js/standalone/libs/gamedev_assets/weapon.json",true);
    
// After that, we want to define the onload method
// of the request to be our parsing function from
// before. We've included that code above for
// reference. A few things to keep in mind here:
//
// 1) This function can't take any parameters.
// 2) Instead of parsing 'weaponJSON', we'll need
//    to parse the 'responseText' member of the
//    request object.
// 3) You can access the request object inside
//    your 'onload' function by using the 'this'
//    keyword.

// YOUR CODE HERE
    weaponXHR.onload = function (){
        
        var parsedJSON = JSON.parse(this.responseText);

        return parsedJSON['frames']['chaingun_impact.png']['spriteSourceSize']['x'];
    };


// Finally, we want to call the send method of the
// request object to actually send the request.
	weaponXHR.send();
};




// Create a new XMLHttpRequest, that GETs the
// file '/media/js/standalone/libs/gamedev_assets/bg_menu.ogg'.
//
// To properly read this binary file, we'll need
// to specify the responseType of the request as
// an 'arraybuffer'.
//
// Doing this is necessary to work with any kind
// of binary data, like sound files, rather than
// text data.
//
// WARNING: If you don't specify a responseType
// of 'arraybuffer', your browser will try to
// interpret the sound file as text data. This
// could cause your browser to slow to a crawl or
// worse.
//
// Once you have done this, leave the request's
// onload to the below function. This will play
// the sound that you loaded.
//
// Don't worry if you don't understand what this
// code does, we'll be going over it later!
//
// YOUR CODE HERE
var soundRequest = new XMLHttpRequest();

var setup = function() {
	// YOUR CODE HERE
    soundRequest.responseType = "arraybuffer";
    soundRequest.open("GET","/media/js/standalone/libs/gamedev_assets/bg_menu.ogg",true);
    
	soundRequest.onload = function(){

		try {
			var context = new webkitAudioContext();

			var mainNode = context.createGainNode(0);
			mainNode.connect(context.destination);

			var clip = context.createBufferSource();

			context.decodeAudioData(soundRequest.response, function (buffer) {
				clip.buffer = buffer;
				clip.gain.value = 1.0;
				clip.connect(mainNode);
				clip.loop = true;
				clip.noteOn(0);
			}, function (data) {});
		}
		catch(e) {
			console.warn('Web Audio API is not supported in this browser');
		}
	};

	soundRequest.send();
};

function xhrGet(reqUri, callback, type) {

	var caller = xhrGet.caller;
	var xhr = new XMLHttpRequest();
	xhr.open("GET",reqUri,true);
	
	if (type) {
		xhr.responseType=type;
	}

	xhr.onload = function(){
		if (callback) {
			try {
				callback(xhr);
			} catch(e) {
				throw "xhrGet failed:\n" + reqUri + "\nException: " + e + "\n";				
			}
		}
	}
	
	xhr.send();
}





