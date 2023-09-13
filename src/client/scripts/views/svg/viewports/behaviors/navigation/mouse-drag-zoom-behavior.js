/******************************************************************************\
|                                                                              |
|                            mouse-drag-zoom-behavior.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import MouseDragBehavior from '../../../../mouse/mouse-drag-behavior.js';

export default function MouseDragZoomBehavior(viewport, options) {
	
	// set attributes
	//
	this.viewport = viewport;

	// call "superclass" constructor
	//
	MouseDragBehavior.call(this, viewport.el, _.extend(options || {}, {
		cursor: 'ns-resize'
	}));

	return this;
}

// extend prototype from "superclass"
//
MouseDragZoomBehavior.prototype = _.extend(Object.create(MouseDragBehavior.prototype), {

	//
	// event handling methods
	//

	onMouseDown: function(mouseX, mouseY) {

		// call superclass method
		//
		MouseDragBehavior.prototype.onMouseDown.call(this, mouseX, mouseY);

		// reset prev drag
		//
		this.prevDragX = 0;
		this.prevDragY = 0;
	},

	onMouseDrag: function(mouseX, mouseY) {
		var dragX = mouseX - this.startX;
		var dragY = mouseY - this.startY;

		// find change in drag
		//
		var dx = this.prevDragX - dragX;
		var dy = this.prevDragY - dragY;
		this.prevDragX = dragX;
		this.prevDragY = dragY;

		// compute zoom and new scale
		//
		var zoom = 1 - (dy / this.viewport.height) * MouseDragZoomBehavior.zoomFactor;
		var scale = this.viewport.scale * zoom;

		// check bounds on scale
		//
		if (scale > MouseDragZoomBehavior.minScale && scale < MouseDragZoomBehavior.maxScale) {
			this.viewport.setScale(scale);
		}

		// call superclass method
		//
		MouseDragBehavior.prototype.onMouseDrag.call(this, dragX, dragY);
	}
});

//
// static attributes
//

_.extend(MouseDragZoomBehavior, {
	zoomFactor: 5,
	minScale: 1.0e-3,
	maxScale: 1.0e3
});