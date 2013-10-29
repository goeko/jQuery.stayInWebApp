/*!
 * jQuery stayInWebApp Plugin
 * version: 0.4 (2012-06-19)
 * version: 0.5 (2013-10-29)
 */

// update last path your exit Standalone Webapp
$(window).load(function() {
	if(("standalone" in window.navigator) && window.navigator.standalone && 'url' in window.localStorage) {
		var url = window.localStorage.getItem('url');
		if (window.location.pathname!=url) {
			self.location = url;
		}
	}
});

;(function($) {
	//extend the jQuery object, adding $.stayInWebApp() as a function
	$.extend($, {
		stayInWebApp: function(selector) {
			//detect iOS full screen mode
			if(("standalone" in window.navigator) && window.navigator.standalone) {
				//if the selector is empty, default to all links
				if(!selector) {
					selector = 'a';
				}
				//bind to the click event of all specified elements
				$("body").delegate(selector,"click",function(event) {
					//TODO: execute all other events if this element has more bound events
					/* NEEDS TESTING
					for(i = 0; i < $(this).data('events'); i++) {
						console.log($(this).data('events'));
					}
					*/
				
					//only stay in web app for links that are set to _self (or not set)
					if($(this).attr("target") == undefined || $(this).attr("target") == "" || $(this).attr("target") == "_self") {
						//get the destination of the link clicked
						var dest = $(this).attr("href");
						
						//if the destination is an absolute url, ignore it
						if(!dest.match(/^http(s?)/g)) {
							//prevent default behavior (opening safari)
							event.preventDefault();
							
							// safe clicked path in localStorage
							window.localStorage.setItem('url', dest);
							
							//update location of the web app, wait a half second
							window.setTimeout(function () {
								self.location = dest;
							}, 500);
						}
					}
				});
			}
		} //end stayInWebApp func
	});
})( window.jQuery || window.Zepto );
