/******************************************************************************\
|                                                                              |
|                                   path-view.js                               |
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

	tagName: 'path',
	vertices: [],
	
	//
	// constructor
	//

	initialize: function(options) {

		// set attributes
		//
		this.options = options;
		if (options.vertices) {
			this.vertices = this.options.vertices;
		}
	},

	//
	// svg rendering methods
	//

	attributes: function() {
		return {
			'id': this.options.id,
			'class': this.options.class,
			'd': this.toDrawing(),
			'fill': this.options.fill,
			'stroke': this.options.stroke,
			'data-toggle': this.options.title? 'tooltip' : '',
			'title': this.options.title
		}
	},

	toDrawing: function() {
		var vertices = this.vertices;
		if (vertices.length >= 2) {
			var vertex = vertices[0];
			var d = 'M ' + vertex.x + ' ' + -vertex.y;
			for (var i = 1; i < vertices.length; i++) {
				vertex = vertices[i];
				d += ' L ' + vertex.x + ' ' + -vertex.y;
			}
			if (this.options.closed) {
				d += ' Z';
			}
			return d;
		} else {
			return '';
		}
	},

	update: function() {

		// update path attributes
		//
		this.$el.attr('d', this.toDrawing());
	}
}));
