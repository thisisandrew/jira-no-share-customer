var observer = new WebKitMutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		var externalSubmits = document.getElementsByClassName("sd-external-submit");
		for(var i = 0; i < externalSubmits.length; i++){
			externalSubmits[i].style.display = "none";
		}

		if(document.getElementById('button-public') != null){
			document.getElementById('button-public').style.display = "none";
		}

		var externalEstimationTabs = document.getElementsByClassName("js-sd-external-comment");
		for(var i = 0; i < externalEstimationTabs.length; i++){
			externalEstimationTabs[i].style.display = "none";
		}

		var clickEvent = new MouseEvent("click", {
	    	"view": window,
	    	"bubbles": true,
	    	"cancelable": false
		});

		var internalEstimationTabs = document.getElementsByClassName("js-sd-internal-comment");
		for(var i = 0; i < internalEstimationTabs.length; i++){
			internalEstimationTabs[i].dispatchEvent(clickEvent);
			internalEstimationTabs[i].classList.remove("inactive");
			internalEstimationTabs[i].classList.add("active");
		}
	})
});
observer.observe(document.body, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
});