chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log('Event triggered');
	if (message.method == "getSelection") {
		sendResponse({data: window.getSelection().toString()});
		console.log('Everythin okay!');
	}
	else {
		sendResponse( {} );
		console.log('Maybe not so much...');
	}
	//return true;
});
