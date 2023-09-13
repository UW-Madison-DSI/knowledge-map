/******************************************************************************\
|                                                                              |
|                               mouse-move-behavior.js                         |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

export default function MouseMoveBehavior(element, callback) {

	// set attributes
	//
	this.element = element;
	this.callback = callback;

	// set up event handler
	//
	$(this.element).mousemove((event) => {
		this.onMouseMove(event.pageX, event.pageY);
	});

	return this;
}

_.extend(MouseMoveBehavior.prototype, {

	//
	// methods
	//

	unbind: function() {
		$(this.element).unbind('mousemove');
	},

	//
	// event handling methods
	//

	onMouseMove: function(mouseX, mouseY) {

		// perform callback
		//
		if (this.callback) {
			this.callback(mouseX, mouseY);
		}
	}
});