function pasteSelection() {
	// chrome.runtime.sendMessage( {method: "getSelection"}, function(response) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var currTab = tabs[0];
		var tab_id = currTab.id;
		chrome.tabs.sendMessage(tab_id, {method: "getSelection"}, function(response) {
			var text = document.getElementById('text');
			text.innerHTML = response.data;
		});
	});
}

	//chrome.tabs.sendMessage(
	//	var text = document.getElementById('text');
	//	text.innerHTML = response.data;

		

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById("myButton").addEventListener("click", pasteSelection);
});


