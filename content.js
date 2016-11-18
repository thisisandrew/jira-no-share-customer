var externalSubmits = document.getElementsByClassName("sd-external-submit");
var externalCommentsTabs = document.getElementsByClassName("js-sd-external-comment");
var buttonPublic = document.getElementById('button-public');
var internalCommentsTabs = document.getElementsByClassName("js-sd-internal-comment");
var clientTestingNotesTextArea = document.getElementById("customfield_12400");

var clickEvent = new MouseEvent("click", {
	"view": window,
	"bubbles": true,
	"cancelable": false
});

var actionClientTextArea = function() {
	var disabled = false;

	return {
		do: function() {
			if (disabled) {
				return;
			}

			if (!clientTestingNotesTextArea) {
				clientTestingNotesTextArea = document.getElementById("customfield_12400");
			}

			if (clientTestingNotesTextArea) {
				clientTestingNotesTextArea.setAttribute("disabled", "");
				disabled = true;
			}
		}
	}
};

var actionExternalSubmits = function() {
	var disabled = false;

	return {
		do: function() {
			if (disabled) {
				return;
			}

			if (!externalSubmits) {
				externalSubmits = document.getElementsByClassName("sd-external-submit");
			}

			if (externalSubmits && externalSubmits.length > 0) {
				for (var i = 0; i < externalSubmits.length; i++) {
					externalSubmits[i].style.display = "none";
				}

				/**
				 * Multiple "sd-external-submit" can pop up all over the place after many 
				 * different DOM mutations and so we shouldn't disable after 1 attempt as
				 * we will miss some instances of this button type
				 */
				//disabled = true;
			}
		}
	}
};

var actionButtonPublic = function() {
	var disabled = false;

	return {
		do: function() {
			if (disabled) {
				return;
			}

			if (!buttonPublic) {
				buttonPublic = document.getElementById('button-public');
			}

			if (buttonPublic){
				buttonPublic.style.display = "none";
				disabled = true;
			}
		}
	}
};

var actionInternalComments = function() {
	var disabled = false;

	return {
		do: function() {
			if (disabled) {
				return;
			}

			if (!internalCommentsTabs) {
				internalCommentsTabs = document.getElementsByClassName("js-sd-internal-comment");
			}

			if (internalCommentsTabs && internalCommentsTabs.length > 0){
				for (var i = 0; i < internalCommentsTabs.length; i++) {
					internalCommentsTabs[i].dispatchEvent(clickEvent);
					internalCommentsTabs[i].classList.remove("inactive");
					internalCommentsTabs[i].classList.add("active");
				}

				disabled = true;
			}
		}
	}
};

var actionExternalComments = function() {
	var disabled = false;

	return {
		do: function() {
			if (disabled) {
				return;
			}

			if (!externalCommentsTabs) {
				externalCommentsTabs = document.getElementsByClassName("js-sd-external-comment");
			}

			if (externalCommentsTabs && externalCommentsTabs.length > 0){
				for (var i = 0; i < externalCommentsTabs.length; i++) {
					externalCommentsTabs[i].style.display = "none";
				}

				//We don't diable this one because there's more than one set of External comments which can appear in the DOM
				//disabled = true;
			}
		}
	}
};

var actions = [
	actionClientTextArea(),
	actionExternalSubmits(),
	actionButtonPublic(),
	actionInternalComments(),
	actionExternalComments(),
];

var observer = new WebKitMutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		actions.forEach(function(fn) {
			fn.do();
		});
	});
});
observer.observe(document.body, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
});