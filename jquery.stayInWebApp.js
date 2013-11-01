/*!
 * jQuery stayInWebApp Plugin
 * version: 0.4 (2012-06-19)
 * version: 0.5.1 (2013-11-01)
 */
var standaloneDebug = false;
var isStandalone = ( ("standalone" in window.navigator) && window.navigator.standalone || standaloneDebug)?true:false;
// update last path your exit Standalone Webapp
$(window).load(function() {
	if(isStandalone && 'url' in window.localStorage) {
		var url = window.localStorage.getItem('url');
		if (window.location.pathname!=url) {
			var loadTime = Math.round(new Date().getTime() / 1000);
			window.localStorage.setItem('loadTime', loadTime);
			self.location = url;
		}
		if ('loadTime' in window.localStorage) {
			var loadTime = window.localStorage.getItem('loadTime');
			$('script').each(function (e,i) {
				$this = $(this);
				$src = $this.attr('src');
				if ($src) {
					$src = ($src.indexOf('js?'))?$src.split('?')[0]:$src;
					$this.attr('src', $src+'?'+loadTime);
				}
			});
			$('link[rel="stylesheet"]').each(function (e,i) {
				$this = $(this);
				$href = $this.attr('href');
				if ($href) {
					$href = ($href.indexOf('css?'))?$href.split('?')[0]:$href;
					$this.attr('href', $href+'?'+loadTime);
				}
			});
		}
	}
});

;(function($) {
	//extend the jQuery object, adding $.stayInWebApp() as a function
	$.extend($, {
		stayInWebApp: function(selector) {
			//detect iOS full screen mode
			if(isStandalone) {
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
