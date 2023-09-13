/******************************************************************************\
|                                                                              |
|                           mouse-drag-object-behavior.js                      |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import MouseDragBehavior from '../../../mouse/mouse-drag-behavior.js';

export default function MouseDragObjectBehavior(element, viewport, callback, options) {

	// call "superclass" constructor
	//
	MouseDragElementBehavior.call(this, element, callback, options);

	// set attributes
	//
	this.viewport = viewport;
	this.unscaled = $(element).attr('class').contains('unscaled');

	return this;
}

// extend prototype from "superclass"
//
MouseDragObjectBehavior.prototype = _.extend(Object.create(MouseDragElementBehavior.prototype), {

	//
	// event handling methods
	//
	
	onMouseDrag: function(mouseX, mouseY) {
		var dragX = mouseX - this.startX;
		var dragY = mouseY - this.startY;
		
		// scale drag to viewport scale
		//
		dragX /= this.viewport.scale;
		dragY /= this.viewport.scale;

		// set location of element
		//
		this.setElementLocation(dragX, dragY);

		// keep scale of elements uniform
		//
		if (this.unscaled) {
			this.viewport.unscale(this.element);
		}

		// compute location in object space units
		//
		var x = this.ox + dragX / pixelsPerMillimeter;
		var y = this.oy + dragY / pixelsPerMillimeter;

		// call "superclass" method
		//
		MouseDragBehavior.prototype.onMouseDrag.call(this, x, y);
	}
});