/******************************************************************************\
|                                                                              |
|                                  multi-grid.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a zoomable, multiresolution grid.             |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

export default function MultiGrid(options) {

	// set optional parameter defaults
	//
	if (!options) {
		options = {};
	}
	if (!options.scale) {
		options.scale = 1;
	}
	if (!options.numGrids) {
		options.numGrids = 2;
	}
	if (!options.gridSize) {
		options.gridSize = 10;
	}
	if (!options.minSpacing) {
		options.minSpacing = 0.5;
	}

	// set attributes
	//
	this.scale = options.scale;
	this.numGrids = options.numGrids;
	this.gridSize = options.gridSize;
	this.minSpacing = options.minSpacing;

	return this;
}

// extend prototype from "superclass"
//
MultiGrid.prototype = _.extend(Object.create(Object.prototype), {

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

		// set grid bounds
		//
		if (this.grids) {
			for (var i = 0; i < this.grids.length; i++) {
				this.grids[i].setBounds(bounds);
			}
		}
	},

	setScale: function(svg, scale) {
		this.scale = scale;
		var minGridSpacing = this.getMinGridSpacing();

		// update patterns if spacing changes
		//
		if (minGridSpacing != this.minGridSpacing) {
			this.minGridSpacing = minGridSpacing;
			this.patterns = this.getPatterns({
				id: this.patterns.id
			});

			// remove previous patterns
			//
			for (var i = 0; i < this.patterns.length; i++) {
				var pattern = this.patterns[i];
				$(svg).find('defs').find('#' + $(pattern).attr('id')).remove();
			}

			// add new patterns
			//
			for (var i = 0; i < this.patterns.length; i++) {
				$(svg).find('defs').append(this.patterns[i]);
			}
		} 

		// update patterns attributes
		//
		this.setPatternsAttributes(this.patterns, this.getPatternAttributes());
	},

	//
	// canvas drawing methods
	//

	getGrids: function(scale, bounds) {
		this.scale = scale;
		this.zoomLevel = this.getZoomLevel();
		this.magnification = 1 / Math.pow(this.gridSize, Math.floor(this.zoomLevel));

		// compute zoom offset
		//
		this.zoomOffset = -(Math.floor(this.zoomLevel) % this.numGrids);
		if (this.zoomOffset < 0) {
			this.zoomOffset += this.numGrids;
		}

		// create grids
		//
		var grids = [];
		grids.scale = scale;
		for (var i = 0; i < this.numGrids; i++) {
			var spacing = Math.pow(this.gridSize, i) * this.magnification;
			grids[i] = new Grid(spacing);
			grids[i].setBounds(bounds);
		}
		return grids;
	},

	draw: function(context, options) {

		// create new grids, if necessary
		//
		if (!this.grids || this.scale != this.grids.scale) {
			this.grids = this.getGrids(this.scale, this.bounds);
		}

		// set optional parameter defaults
		//
		if (!options) {
			options = {};
		}
		if (!options.strokeStyle) {
			options.strokeStyle = "blue";
		}
		if (!options.opacity) {
			options.opacity = 0.1;
		}

		// draw grids
		//
		for (var i = 0; i < this.numGrids; i++) {
			var index = (i + this.offset) % this.numGrids;

			if (i == 0) {

				// fade in smallest grid
				//
				var alpha = (this.zoomLevel - Math.floor(this.zoomLevel)) * 0.75;
					
			} else if (i == this.numGrids - 1) {
				var alpha = 1.0;
			} else {
				var alpha = i / (this.numGrids - 1) * 1.0;
			}

			if (alpha > .05) {

				// set drawing style
				//
				context.lineWidth = 1 / pixelsPerMillimeter / this.scale;
				context.globalAlpha = options.opacity * alpha;	
				context.strokeStyle = options.strokeStyle;

				// draw grid
				//
				this.grids[i].draw(context);
			}
		}

		// restore context
		//
		context.globalAlpha = 1.0;
	},

	//
	// svg rendering methods
	//

	setPatterns: function(svg, attributes) {
		this.patterns = this.getPatterns(attributes);

		// update patterns attributes
		//
		this.setPatternsAttributes(this.patterns, this.getPatternAttributes());

		// find or create defs
		//
		var defs = $(svg).find('defs')[0];
		if (!defs) {
			var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
			$(svg).prepend(defs);
		}

		// add patterns to defs
		//
		for (var i = 0; i < this.patterns.length; i++) {
			$(defs).append(this.patterns[i]);
		}
	},

	render: function() {
		this.rect = this.getRect(this.bounds, this.patterns[this.patterns.length - 1]);
		return this.rect;
	},

	//
	// private utility methods
	//

	getZoomLevel: function() {

		// get log in base grid size of scale
		//
		return Math.log(this.scale / this.minSpacing) / Math.log(this.gridSize);
	},

	getMinGridSpacing: function() {

		// get minimum spacing based upon zoom level
		//
		return 1 / Math.pow(this.gridSize, Math.floor(this.getZoomLevel()));
	},

	getPatterns: function(attributes) {
		var patterns = [];
		patterns.id = attributes['id'];

		// create pattern
		//
		var spacing = this.getMinGridSpacing();
		for (var i = 0; i < this.numGrids; i++) {
			var pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');

			// set pattern attributes
			//
			$(pattern).attr('id', attributes['id'] + i);
			for (var name in attributes) {
				if (name != 'id') {
					$(pattern).attr(name, attributes[name]);
				}
			}
			$(pattern).attr('width', spacing + 'mm');
			$(pattern).attr('height', spacing + 'mm');
			pattern.setAttributeNS(null, 'patternUnits', 'userSpaceOnUse');

			// create svg
			//
			var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			$(svg).attr('x', 0);
			$(svg).attr('y', 0);
			$(svg).attr('width', spacing + 'mm');
			$(svg).attr('height', spacing + 'mm');
			svg.setAttributeNS(null, 'viewBox', '0 0 ' + spacing + ' ' + spacing);

			// add background to pattern
			//
			if (i > 0) {
				var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				$(rect).attr('width', spacing + 'mm');
				$(rect).attr('height', spacing + 'mm');
				$(rect).attr('fill', 'url(#' + attributes['id'] + (i - 1) + ')');

				// add rect to pattern
				//
				$(pattern).append(rect);
			}

			// create path
			//
			var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			$(path).attr('d', 'M ' + spacing + ' 0 L 0 0 0 ' + spacing);

			// set path attributes
			//
			$(path).attr('fill', 'none');

			// add path to svg
			//
			$(svg).append(path);

			// add svg to pattern
			//
			$(pattern).append(svg);

			// add to list of patterns
			//
			patterns[i] = pattern;

			// go to next grid
			// 
			spacing *= this.gridSize;
		}
		
		return patterns;
	},

	getPatternAttributes: function() {
		var attributes = [];
		var zoomLevel = this.getZoomLevel();
		var zoomFraction = zoomLevel - Math.floor(zoomLevel);
		var minAlpha = zoomFraction;

		// create pattern attributes
		//
		for (var i = 0; i < this.numGrids; i++) {
			attributes[i] = [];

			if (i == 0) {

				// fade in smallest grid
				//
				attributes[i]['stroke-opacity'] = minAlpha;
			} else {

				// interpolate other grids
				//
				attributes[i]['stroke-opacity'] = (minAlpha + i / (this.numGrids - 1) * (1 - minAlpha));
			}
		}

		return attributes;
	},

	setPatternsAttributes: function(patterns, attributes) {
		for (var i = 0; i < patterns.length; i++) {
			var pattern = patterns[i];
			for (var key in attributes[i]) {
				$(pattern).find('path').attr(key, attributes[i][key]);
			}	
		}
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