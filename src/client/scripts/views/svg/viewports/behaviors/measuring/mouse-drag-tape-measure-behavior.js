/******************************************************************************\
|                                                                              |
|                       mouse-drag-tape-measure-behavior.js                    |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import MouseDragBehavior from '../../../mouse/mouse-drag-behavior.js';

export default function MouseDragTapeMeasureBehavior(viewport, callback, options) {

	// set attributes
	//
	this.viewport = viewport;
	this.markerWidth = 8;
	this.markerHeight = 8;
	this.markerUnits = 'strokeWidth';
	
	// call "superclass" constructor
	//
	MouseDragBehavior.call(this, viewport.el, callback, _.extend(options || {}, {
		cursor: null
	}));

	return this;
}

// inherit prototype from "superclass"
//
MouseDragTapeMeasureBehavior.prototype = _.extend(Object.create(MouseDragBehavior.prototype), {

	//
	// svg methods
	//

	toMarker: function(attributes) {

		// create marker
		//
		var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');

		// set attributes
		//
		for (var name in attributes) {
			marker.setAttributeNS(null, name, attributes[name]);
		}

		return marker;
	},

	toDrawing: function(point1, point2) {
		return 'M ' + point1.x + ' ' + point1.y + 'L ' + point2.x + ' ' + point2.y;
	},

	toPath: function(point1, point2, attributes) {

		// create path
		//
		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		// set attributes
		//
		for (var name in attributes) {
			$(path).attr(name, attributes[name]);
		}
		$(path).attr('d', this.toDrawing(point1, point2));

		return path;
	},

	toText: function(attributes) {

		// create text
		//
		var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

		// set attributes
		//
		for (var name in attributes) {
			$(text).attr(name, attributes[name]);
		}

		return text;
	},

	//
	// event handling methods
	//

	onMouseDown: function(mouseX, mouseY) {

		// call "superclass" method
		//
		MouseDragBehavior.prototype.onMouseDown.call(this, mouseX, mouseY);

		// add path to viewport
		//
		this.start = this.viewport.toPoint(mouseX, mouseY);
		this.path = this.toPath(this.start, this.start, {
			'stroke': 'black',
			'stroke-width': '2',
			'vector-effect': 'non-scaling-stroke',
			'marker-start': 'url(#marker-measure-start)',
			'marker-end': 'url(#marker-measure-end)'
		});
		this.text = this.toText({
			'class': 'unscaled measurement',
			'x': mouseX,
			'y': mouseY,
			'text-anchor': 'middle',
			'alignment-baseline': 'middle',
			'filter': 'url(#remove-background)'
		});
		$(this.viewport.el).append(this.path);
		$(this.viewport.el).append(this.viewport.unscaled(this.text));
	},

	onMouseDrag: function(mouseX, mouseY) {
		
		// call "superclass" method
		//
		MouseDragBehavior.prototype.onMouseDrag.call(this, mouseX, mouseY);

		// update path
		//
		var finish = this.viewport.toPoint(mouseX, mouseY);
		$(this.path).attr('d', this.toDrawing(this.start, finish));

		// update text
		//
		var length = finish.minus(this.start).length() / pixelsPerMillimeter;
		$(this.text).text(length.toPrecision(3) + 'mm');
		$(this.text).attr('x', (this.start.x + finish.x) / 2);
		$(this.text).attr('y', (this.start.y + finish.y) / 2);
		this.viewport.unscale(this.text);
	}
});