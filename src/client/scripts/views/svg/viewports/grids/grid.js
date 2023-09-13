/******************************************************************************\
|                                                                              |
|                                     grid.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a utility to draw a grid of regularly spaced lines.           |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

export default function Grid(spacing) {

	// set optional parameter defaults
	//
	if (spacing == undefined) {
		spacing = 1;
	}

	// set attributes
	//
	this.spacing = spacing;

	return this;
}

// extend prototype from "superclass"
//
Grid.prototype = _.extend(Object.create(Object.prototype), {

	//
	// setting methods
	//

	setBounds: function(bounds) {
		this.bounds = bounds;

		// set element attributes
		//
		if (this.rect) {
			var size = bounds.size();
			$(this.rect).attr('x', bounds.x.min);
			$(this.rect).attr('y', bounds.y.min);
			$(this.rect).attr('width', size.x);
			$(this.rect).attr('height', size.y);
		}
	},

	//
	// querying methods
	//

	getGridBounds: function(bounds) {
		return new Bounds2(
			new Bounds(Math.ceil(bounds.x.min / this.spacing) * this.spacing,
				Math.ceil(bounds.x.max / this.spacing) * this.spacing),
			new Bounds(Math.ceil(bounds.y.min / this.spacing) * this.spacing,
				Math.ceil(bounds.y.max / this.spacing) * this.spacing)
		);
	},

	//
	// canvas drawing methods
	//

	draw: function(context) {

		// get bounds of grid squares, a superset of the viewing bounds
		//
		bounds = this.getGridBounds(this.bounds);

		context.beginPath();

		// draw vertical grid lines
		//
		for (x = bounds.x.min; x < this.bounds.x.max; x += this.spacing) {
			context.moveTo(x, this.bounds.y.min);
			context.lineTo(x, this.bounds.y.max);
		}

		// draw horizontal grid lines
		//
		for (y = bounds.y.min; y < this.bounds.y.max; y += this.spacing) {
			context.moveTo(this.bounds.x.min, y);
			context.lineTo(this.bounds.x.max, y);
		}

		context.stroke();
	},

	//
	// svg rendering methods
	//

	setPattern: function(svg, attributes) {
		this.pattern = this.getPattern(attributes);

		// find or create defs
		//
		var defs = $(svg).find('defs')[0];
		if (!defs) {
			var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
			$(svg).prepend(defs);
		}

		// add pattern to defs
		//
		$(defs).append(this.pattern);
	},

	render: function() {
		this.rect = this.getRect(this.bounds, this.pattern);
		return this.rect;
	},

	//
	// private svg methods
	//

	getPattern: function(attributes) {

		// create pattern
		//
		var pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');

		// set attributes
		//
		for (var name in attributes) {
			$(pattern).attr(name, attributes[name]);
		}
		$(pattern).attr('width', this.spacing + 'mm');
		$(pattern).attr('height', this.spacing + 'mm');
		pattern.setAttributeNS(null, 'patternUnits', 'userSpaceOnUse');

		// create svg
		//
		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		$(svg).attr('x', 0);
		$(svg).attr('y', 0);
		$(svg).attr('width', this.spacing + 'mm');
		$(svg).attr('height', this.spacing + 'mm');
		svg.setAttributeNS(null, 'viewBox', '0 0 ' + this.spacing + ' ' + this.spacing);

		// create path
		//
		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		$(path).attr('d', 'M ' + this.spacing + ' 0 ' + 'L 0 0 0 ' + this.spacing);

		// set path attributes
		//
		$(path).attr('fill', 'none');

		// add path to svg
		//
		$(svg).append(path);

		// add svg to pattern
		//
		$(pattern).append(svg);

		return pattern;
	},

	getRect: function(bounds, pattern) {

		// create rect
		//
		var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

		// set attributes
		//
		$(rect).attr('x', bounds.x.min);
		$(rect).attr('y', bounds.y.min);
		$(rect).attr('width', '100%');
		$(rect).attr('height', '100%');
		$(rect).attr('fill', 'url(#' + $(pattern).attr('id') + ')');

		return rect;
	}
});