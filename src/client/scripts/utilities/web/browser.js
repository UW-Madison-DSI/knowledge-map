/******************************************************************************\
|                                                                              |
|                                  browser.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This contains utilities for detecting differences between             |
|        different browsers.                                                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

//
// browser detection
//

function getName() {
	if (window.navigator.userAgent.indexOf("Edge") > -1) {
		return 'Edge';
	} else if (navigator.userAgent.indexOf('MSIE') > -1 ||
		navigator.userAgent.indexOf('.NET') > -1) {
		return 'Explorer';
	} else if (navigator.userAgent.indexOf('Chrome') > -1) {
		return 'Chrome';
	} else if (navigator.userAgent.indexOf('Firefox') > -1) {
		return 'Firefox';
	} else if (navigator.userAgent.indexOf("Safari") > -1) {
		return 'Safari';
	}
}

//
// device detection
//

function getDevice() {
	let userAgent = navigator.userAgent || navigator.vendor || window.opera;

	// check for phones
	// Windows Phone must come first because its UA also contains "Android"
	//
	if (/windows phone/i.test(userAgent)) {
		return 'phone';
	} else if (/iPhone/.test(userAgent) && !window.MSStream) {
		return 'phone';
	} else if (/iPod/.test(userAgent) && !window.MSStream) {
		return 'phone';

	// check for tablets
	//
	} else if (/iPad/.test(userAgent) && !window.MSStream) {
		return 'tablet';
	} else if (/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(userAgent)) {
		return $(window).width() < 480 || $(window).height() < 480? 'phone' : 'tablet';
	} else {
		return 'desktop';
	}
}

function isTouchEnabled() {
	return (getDevice() != 'desktop') || window.PointerEvent && navigator.maxTouchPoints > 1;
}

function isMobile() {
	let device = getDevice();
	return device == 'phone' || device == 'tablet';
}

//
// OS detection
//

function getOsType() {
	let userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (userAgent.indexOf('Windows') > -1) {
		return 'windows';
	} else if (userAgent.indexOf('Macintosh') > -1) {
		return 'macintosh';
	} else if (userAgent.indexOf('Linux') > -1) {
		return 'linux';
	} else if (userAgent.indexOf('Android') > -1) {
		return 'android';
	} else if (userAgent.indexOf('iPhone') > -1 || 
		userAgent.indexOf('iPad') > -1) {
		return 'ios';
	}
}

function getMobileOS() {
	let userAgent = navigator.userAgent || navigator.vendor || window.opera;

	// Windows Phone must come first because its UA also contains "Android"
	//
	if (/windows phone/i.test(userAgent)) {
		return 'Windows Phone';
	} else if (/android/i.test(userAgent)) {
		return 'Android';
	} else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return 'iOS';
	}
}

//
// feature detection
//

function supportsCors() {
	if ("withCredentials" in new XMLHttpRequest()) {
		return true;	
	} else if (window.XDomainRequest) {
		return true;
	} else {
		return false;
	}
}

function supportsHTTPRequestUploads() {
	return window.XMLHttpRequest && ('upload' in new XMLHttpRequest());
}

function supportsFormData() {
	return (window.FormData !== null);
}

export default {

	// attributes
	//
	name: getName(),
	device: getDevice(),
	os_type: getOsType(),
	mobile_os: getMobileOS(),
	support_cors: supportsCors(),
	supports_http_request_uploads: supportsHTTPRequestUploads(),
	supports_form_data: supportsFormData(),

	// flags
	//
	is_mobile: isMobile(),
	is_touch_enabled: isTouchEnabled(),
	is_edge: window.navigator.userAgent.indexOf("Edge") > -1,
	is_explorer: navigator.userAgent.indexOf('MSIE') > -1 || 
		navigator.userAgent.indexOf('.NET') > -1,
	is_chrome: navigator.userAgent.indexOf('Chrome') > -1,
	is_firefox: navigator.userAgent.indexOf('Firefox') > -1,
	is_safari: navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf('Chrome') == -1,

	//
	// browser security querying methods
	//

	sameDomain: function(url) {
		let a = document.createElement('a');
		a.href = url;

		return location.hostname === a.hostname && location.protocol === a.protocol;
	},

	xFramesAllowed: function(headers) {
		for (let i = 0; i < headers.length; i++) {

			// split on first colon
			//
			let header = headers[i].split(/:(.+)/);

			// check key value pair
			//
			if (header.length > 1) {
				let key = header[0].toLowerCase();
				let value = header[1].trim();
				
				switch (key) {

					case 'x-frame-options':
						value = value.toLowerCase();
						if (value == 'sameorigin' || value == 'deny') {
							return false;
						}
						break;

					case 'access-control-allow-origin':
						if (value != '*' && value != '') {
							return false;
						}
						break;

					case 'x-xss-protection':
					case 'content-security-policy':
						return false;
				}
			}
		}
		return true;
	},

	//
	// mobile accessibility methods
	//

	hideMobileKeyboard: function() {
		document.activeElement.blur();
	},

	//
	// downloading methods
	//

	download: function(urls) {

		// check arguments
		//
		if (!urls) {
			throw new Error('Browser::download: `urls` parameter is required.');
		}

		// check if download 'a' links are not supported
		//
		if (typeof document.createElement('a').download === 'undefined') {

			// use iframes
			//
			let i = 0;
			return (function createIframe() {
				let frame = document.createElement('iframe');
				frame.style.display = 'none';
				frame.src = urls[i++];
				document.documentElement.appendChild(frame);

				// the download init has to be sequential otherwise IE only use the first
				//
				let interval = setInterval(() => {
					if (frame.contentWindow.document.readyState === 'complete' || 
						frame.contentWindow.document.readyState === 'interactive') {
						clearInterval(interval);

						// Safari needs a timeout
						//
						setTimeout(() => {
							frame.parentNode.removeChild(frame);
						}, 1000);

						if (i < urls.length) {
							createIframe();
						}
					}
				}, 100);
			})(urls);
		}

		if (!Array.isArray(urls)) {
			let url = urls;
			
			// download single file
			//
			let a = document.createElement('a');
			a.download = '';
			a.href = url;

			// firefox doesn't support `a.click()`...
			//
			a.dispatchEvent(new MouseEvent('click'));
		} else {

			// download multiple files
			//
			let delay = 0;

			urls.forEach((url) => {

				// the download init has to be sequential for Firefox 
				// if the urls are not on the same domain
				//
				if (this.is_firefox && !this.sameDomain(url)) {
					return setTimeout(download.bind(null, url), 100 * ++delay);
				}

				this.download(url);
			});
		}
	}
};