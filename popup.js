function pasteSelection() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var observe;
		if (window.attachEvent) {
			observe = function (element, event, handler) {
				element.attachEvent('on'+event, handler);
			};
		}
		else {
			observe = function (element, event, handler) {
				element.addEventListener(event, handler, false);
			};
		}	
		var currTab = tabs[0];
		var tab_id = currTab.id;
		
		chrome.tabs.sendMessage(tab_id, {method: "getSelection"}, function(response) {
			var text = document.getElementById('text');
			function resize () {
				text.style.height = 'auto';
				text.style.height = text.scrollHeight+'px';
			}
			function delayedResize () {
				window.setTimeout(resize, 0);
			}
			text.innerHTML = response.data;
			
			observe(text, 'change', resize);
			observe(text, 'cut', delayedResize);
			observe(text, 'paste', delayedResize);
			observe(text, 'drop', delayedResize);
			observe(text, 'keydown', delayedResize);

			text.focus();
			text.select();
			resize();
		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById("myButton").addEventListener("click", pasteSelection);
});

