/******************************************************************************\
|                                                                              |
|                                 circle-view.js                               |
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

	tagName: 'circle',

	//
	// constructor
	//

	initialize: function(options) {

		// set attributes
		//
		this.options = options;
		this.center = this.options.center || new Vector2(0, 0);
		this.radius = this.options.radius || 1;
	},

	//
	// svg rendering methods
	//

	attributes: function() {
		return {
			'id': this.options.id,
			'class': this.options.class,
			'cx': this.center? this.center.x : undefined,
			'cy': this.center? -this.center.y : undefined,
			'r': this.radius,
			'fill': this.options.fill,
			'stroke': this.options.stroke,
			'data-toggle': this.options.title? 'tooltip' : '',
			'title': this.options.title,
			'weight': this.options.weight
		}
	}
}));
