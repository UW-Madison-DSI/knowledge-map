/******************************************************************************\
|                                                                              |
|                              mouse-wheel-behavior.js                         |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

export default function MouseWheelBehavior(element, callback) {

	// set attributes
	//
	this.element = element;
	this.callback = callback;

	// set up event handler
	//
	$(this.element).mousewheel((event, delta) => {

		// disable native scroll
		//
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			
			// IE fix
			//
			event.returnValue = false;
		};

		$("body, html, document").stop().animate({}, 'slow');

		// handle event
		//
		this.onWheelMove(event.deltaY);
	});

	return this;
}

_.extend(MouseWheelBehavior.prototype, {

	//
	// methods
	//

	unbind: function() {
		$(this.element).unbind('mousewheel');
	},

	//
	// event handling methods
	//

	onWheelMove: function(deltaY) {

		// perform callback
		//
		if (this.callback) {
			this.callback(deltaY);
		}
	}
});