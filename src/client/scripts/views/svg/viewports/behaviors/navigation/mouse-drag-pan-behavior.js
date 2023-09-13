/******************************************************************************\
|                                                                              |
|                             mouse-drag-pan-behavior.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../../../utilities/math/vector2.js';
import MouseDragBehavior from '../../../../mouse/mouse-drag-behavior.js';

export default function MouseDragPanBehavior(viewport, options) {

	// set attributes
	//
	this.viewport = viewport;
	
	// call "superclass" constructor
	//
	MouseDragBehavior.call(this, viewport.el, _.extend(options || {}, {
		cursor: 'move'
	}));

	return this;
}

// extend prototype from "superclass"
//
MouseDragPanBehavior.prototype = _.extend(Object.create(MouseDragBehavior.prototype), {

	//
	// event handling methods
	//

	onMouseDown: function(mouseX, mouseY) {

		// call "superclass" method
		//
		MouseDragBehavior.prototype.onMouseDown.call(this, mouseX, mouseY);

		// store viewport offset at start of drag
		//
		this.offsetX = this.viewport.offset.x;
		this.offsetY = this.viewport.offset.y;
	},

	onMouseDrag: function(mouseX, mouseY) {
		var dragX = mouseX - this.startX;
		var dragY = mouseY - this.startY;
		
		// call "superclass" method
		//
		MouseDragBehavior.prototype.onMouseDrag.call(this, dragX, dragY);

		// convert to viewport coords
		//
		if ($(this.viewport.el).is('canvas')) {
			dragX /= pixelsPerMillimeter;
			dragY /= pixelsPerMillimeter;
		}

		// find new viewport offset
		//
		var panX = dragX / this.viewport.scale;
		var panY = dragY / this.viewport.scale;
		var offsetX = this.offsetX + panX;
		var offsetY = this.offsetY + panY;

		// apply new viewport offset
		//
		this.viewport.setOffset(new Vector2(offsetX, offsetY));
	}
});