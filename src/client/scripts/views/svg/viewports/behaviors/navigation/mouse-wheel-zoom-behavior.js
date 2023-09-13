/******************************************************************************\
|                                                                              |
|                           mouse-wheel-zoom-behavior.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import MouseWheelBehavior from '../../../../mouse/mouse-wheel-behavior.js';

export default function MouseWheelZoomBehavior(viewport, options) {

	// set attributes
	//
	this.options = options || {};
	this.viewport = viewport;

	// call "superclass" constructor
	//
	MouseWheelBehavior.call(this, viewport.el, (deltaY) => {

		// zoom based upon direction of wheel movement
		//
		if (deltaY > 0) {
			this.onZoom(this.zoomFactor);
		} else {
			this.onZoom(1 / this.zoomFactor);
		}
	});

	return this;
}

// extend prototype from "superclass"
//
MouseWheelZoomBehavior.prototype = _.extend(Object.create(MouseWheelBehavior.prototype), {

	//
	// attributes
	//

	zoomFactor: 1.05,
	minScale: 0.2,
	maxScale: 100,

	//
	// event handling methods
	//

	onZoom: function(zoom) {
		var scale = this.viewport.scale * zoom;

		// check bounds on scale
		//
		if ((!this.minScale || scale > this.minScale) && 
			(!this.maxScale || scale < this.maxScale)) {
			this.viewport.setScale(scale);
		}

		// perform callback
		//
		if (this.options.onzoom) {
			this.options.onzoom(zoom);
		}
	}
});