/******************************************************************************\
|                                                                              |
|                                  svg-viewport.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a zoomable, panable drawing canvas.           |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../utilities/math/vector2.js';
import Bounds from '../../../utilities/bounds/bounds.js';
import Bounds2 from '../../../utilities/bounds/bounds2.js';
import BaseView from '../../base-view.js';

export default BaseView.extend({

	//
	// constructor
	//

	initialize: function(options) {
		
		// set optional parameter defaults
		//
		if (!options) {
			options = {};
		}
		if (!options.offset) {
			options.offset = new Vector2(0, 0);
		}
		if (!options.scale) {
			options.scale = 1;
		}

		// set attributes
		//
		this.options = options || {};
		this.parent = options.parent;

		// set rendering attributes
		//
		this.el = options.el;
		this.$el = $(this.el);
		this.width = this.$el.width();
		this.height = this.$el.height();
		this.layers = [];

		// create new layers 
		//
		if (this.options.layers) {
			for (var i = 0; i < this.options.layers.length; i++) {
				this.addLayer(this.options.layers[i]);
			}
		}
		
		// set transformation attributes
		//
		this.offset = options.offset;
		this.scale = options.scale;
		this.bounds = this.getBounds();

		// set up resize callback
		//
		/*
		$(window).bind('resize', () => {
			this.onResize();
		});
		*/

		// initialize
		//
		if (this.options.grid) {
			this.setGrid(this.options.grid);
		}

		// set bounding region
		//
		this.setBounds(this.bounds);

		return this;
	},

	//
	// conversion methods
	//

	toPoint: function(h, v) {
		var x = (h - this.width / 2) / this.scale;
		var y = (v - this.height / 2) / this.scale;		
		x -= this.offset.x;
		y -= this.offset.y;
		return new Vector2(x, y);
	},

	scaleToZoomLevel(scale) {
		return Math.log2(scale);
	},

	zoomLevelToScale(zoomLevel) {
		return Math.pow(2, zoomLevel);
	},

	//
	// getting methods
	//

	getBounds: function() {
		return new Bounds2(
			new Bounds(
				(-this.width / 2 / this.scale - this.offset.x),
				(this.width / 2 / this.scale - this.offset.x)
			),

			new Bounds(
				(-this.height / 2 / this.scale - this.offset.y),
				(this.height / 2 / this.scale - this.offset.y)
			)
		);
	},

	getZoomLevel() {
		return this.scaleToZoomLevel(this.scale);
	},

	//
	// setting methods
	//

	setScale: function(scale) {
		this.scale = scale;

		// update grid
		//
		if (this.options.grid) {
			if (this.options.grid.setScale) {

				// update grid patterns
				//
				this.options.grid.setScale(this.el, this.scale);
			}
		}

		// rescale constant sized elements
		//
		this.rescale();
		
		this.onChange('scale');
	},

	setZoomLevel(zoomLevel) {
		this.setScale(this.zoomLevelToScale(zoomLevel));
	},

	setOffset: function(offset) {
		this.offset = offset;
		this.onChange('offset');
	},

	setBounds: function(bounds) {
		this.bounds = bounds;
		var size = bounds.size();
		this.el.setAttribute("viewBox", bounds.x.min + " " + bounds.y.min + " " + size.x + " " + size.y); 
	
		// update grid bounds
		//
		if (this.options.grid) {
			this.options.grid.setBounds(bounds);
		}
	},

	//
	// rendering methods
	//

	setGrid: function(grid) {

		// set attributes
		//
		this.options.grid = grid;

		// set grid attributes
		//
		this.options.grid.setBounds(this.bounds);
		if (this.options.grid.setPattern) {
			this.options.grid.setPattern(this.el, {
				'id': 'grid-pattern'
			});
		} else if (this.options.grid.setPatterns) {
			this.options.grid.setPatterns(this.el, {
				'id': 'grid-pattern'
			});
		}

		// render grid
		//
		var backgroundLayer = $(this.el).find('#background.layer')[0];
		if (backgroundLayer) {

			// render grid to background layer
			//
			$(backgroundLayer).append($(this.options.grid.render()).attr({
				'id': 'grid'
			}));	
		} else {
			var defs = $(this.el).find('defs')[0];
			if (defs) {

				// render after defs
				//
				$(defs).after($(this.options.grid.render()).attr({
					'id': 'grid'
				}));
			} else {

				// render to element
				//
				$(this.el).append($(this.options.grid.render()).attr({
					'id': 'grid'
				}));	
			}	
		}
	},

	add: function(item, layer) {
		
		// create element
		//
		let element = item.render? item.render() : item;

		// add element to svg
		//
		if (layer) {
			$(this.layers[layer]).append(element);
		} else {
			$(this.el).append(element);
		}

		if ($(element).hasClass('unscaled')) {
			this.unscale(element);
		}

		return element;
	},

	addElement: function(type, attributes, layer) {
		var el = document.createElementNS('http://www.w3.org/2000/svg', type);

		// set attributes
		//
		for (var name in attributes) {
			$(el).attr(name, attributes[name]);
		}

		this.add(el, layer);

		return el;
	},

	addLayer: function(name) {
		var layer = this.addElement('g', {
			id: name,
			class: 'layer'
		});

		// add to list of layers
		//
		this.layers[name] = layer;

		return layer;
	},

	addLayerGroup: function(name, group) {
		$(group).addClass('layer');
		$(group).attr('id', name);

		if (this.layers[name]) {
			this.$el.find('#' + name).replaceWith(group);
		} else {
			this.add(group);
		}

		// add to list of layers
		//
		this.layers[name] = group;

		return group;
	},

	clear: function() {
		$(this.el).empty();
	},

	//
	// event handling methods
	//

	onChange: function(attribute) {
		this.setBounds(this.getBounds());

		// perform callback
		//
		if (this.options.onchange) {
			this.options.onchange(attribute);
		}
	},

	onResize: function() {
		this.width = $(this.el).width();
		this.height = $(this.el).height();
		this.setBounds(this.getBounds());
	},

	//
	// method to unscale an element to match the viewport scale
	//
	
	rescale: function() {
		var elements = $(this.el).find('.unscaled:visible');
		for (var i = 0; i < elements.length; i++) {
			this.unscale(elements[i]);
		}
	},

	unscaled: function(element) {
		this.constructor.setScale(element, this.scale);
		return element;
	},

	unscale: function(element) {
		this.constructor.setScale(element, this.scale);
	}
}, {

	//
	// scaling methods
	//

	setScale: function(element, scale) {
		var $element = $(element);

		// unscale markers
		//
		if ($element.hasClass('marker')) {
			var group = $(element).find('g');
			var scale = 'scale(' + 1 / scale + ')';
			group.attr('transform', scale);

		// unscale text
		//
		} else if ($element.attr('x') || $element.attr('y')) {
			var x = $element.attr('x');
			var y = $element.attr('y');
			var translate1 = 'translate(' + (x) + ',' + (y) + ')';
			var scale = 'scale(' + 1 / scale + ')';
			var translate2 = 'translate(' + (-x) + ',' + (-y) + ')';
			$element.attr('transform', translate1 + ',' + scale + ',' + translate2);

		// unscale circles
		//
		} else if ($element.attr('cx') || $element.attr('cy')) {

			// get attributes
			//
			var x = $element.attr('cx');
			var y = $element.attr('cy');
			var translate1 = 'translate(' + (x) + ',' + (y) + ')';
			var scale = 'scale(' + 1 / scale + ')';
			var translate2 = 'translate(' + (-x) + ',' + (-y) + ')';
			$element.attr('transform', translate1 + ',' + scale + ',' + translate2);

		// unscale other elements
		//
		} else {
			var scale = 'scale(' + 1 / scale + ')';
			$element.attr('transform', scale);		
		}
	}
});
