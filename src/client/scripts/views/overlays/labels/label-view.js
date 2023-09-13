/******************************************************************************\
|                                                                              |
|                                 label-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the view for a type of annotation and markup element.    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseView from '../../base-view.js';
import SVGRenderable from '../../svg/behaviors/svg-renderable.js';

export default BaseView.extend(_.extend({}, SVGRenderable, {

	//
	// attributes
	//

	tagName: 'text',
	vertices: [],

	events: {
		'click': 'onClick'
	},

	initialize: function(options) {

		// set attributes
		//
		this.options = options;
		this.location = this.options.location || new Vector2(0, 0);
		this.text = this.options.text || 'Label';
	},

	//
	// querying methods
	//

	matches: function(query, exact) {
		if (exact) {
			return this.text.toLowerCase() == query.toLowerCase();
		} else {
			return query && this.text.toLowerCase().includes(query.toLowerCase());
		}
	},
	
	//
	// svg rendering methods
	//

	attributes: function() {
		return {
			'id': this.options.id,
			'class': this.options.class + (this.highlighted? ' highlighted' : ''),
			// 'filter': 'url(#outlined)',
			'x': this.options.location.x,
			'y': -this.options.location.y,
			'dy': this.options.dy,
			'fill': this.options.fill,
			'stroke': this.options.stroke,
			'weight': this.options.weight
		}
	},

	template: function() {
		return this.text;
	},

	highlight: function() {
		this.highlighted = true;
		if (this.$el) {
			this.$el.addClass('highlighted');
		}
	},

	unhighlight: function() {
		this.highlighted = false;
		if (this.$el) {
			this.$el.removeClass('highlighted');
		}
	},

	select: function() {
		this.selected = true;
		if (this.$el) {
			this.$el.addClass('selected');
		}
	},

	deselect: function() {
		this.selected = false;
		if (this.$el) {
			this.$el.removeClass('selected');
		}
	},

	//
	// mouse event handling methods
	//

	onClick: function() {
		if (this.options.onclick) {
			this.options.onclick(this);
		}
	}
}));
