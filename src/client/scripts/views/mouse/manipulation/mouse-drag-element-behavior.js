/******************************************************************************\
|                                                                              |
|                          mouse-drag-element-behavior.js                      |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

function MouseDragElementBehavior(element, callback, options) {

	// call "superclass constructor"
	//
	MouseDragBehavior.call(this, element, callback, {
		cursor: 'move'
	});

	// add class for cursor
	//
	$(element).addClass("draggable");

	return this;
}

// extend prototype from "superclass"
//
MouseDragElementBehavior.prototype = _.extend(Object.create(MouseDragBehavior.prototype), {

	//
	// methods
	//

	getElementLocation: function() {

		// get original object location
		//
		this.ox = $(this.element).attr('x');
		this.oy = $(this.element).attr('y');

		// convert object location to pixels
		//
		if (this.ox.endsWith('mm')) {
			this.ox = parseFloat(this.ox.replace('mm', ''));
			this.oxUnits = 'mm';
		} else {
			this.ox = parseFloat(this.ox);
		}
		if (this.oy.endsWith('mm')) {
			this.oy = parseFloat(this.oy.replace('mm', ''));
			this.oyUnits = 'mm';
		} else {
			this.oy = parseFloat(this.oy);
		}
	},

	setElementLocation: function(dragX, dragY) {

		// convert units
		//
		if (this.oxUnits == 'mm') {
			dragX /= pixelsPerMillimeter;
		}
		if (this.oyUnits == 'mm') {
			dragY /= pixelsPerMillimeter;
		}

		// compute new location
		//
		var x = this.ox + dragX;
		var y = this.oy + dragY;
		if (this.oxUnits == 'mm') {
			x += 'mm';
		}
		if (this.oyUnits == 'mm') {
			y += 'mm';
		}

		// set element location
		//
		$(this.element).attr('x', x);
		$(this.element).attr('y', y);
	},

	//
	// event handling methods
	//

	onMouseDown: function(mouseX, mouseY) {

		// call "superclass" method
		//
		MouseDragBehavior.prototype.onMouseDown.call(this, mouseX, mouseY);

		// get element location and units
		//
		this.getElementLocation();
	},

	onMouseDrag: function(mouseX, mouseY) {
		var dragX = mouseX - this.startX;
		var dragY = mouseY - this.startY;

		// set location of element in original units
		//
		this.setElementLocation(dragX, dragY);

		// call "superclass" method
		//
		MouseDragBehavior.prototype.onMouseDrag.call(this, mouseX, mouseY);
	}
});