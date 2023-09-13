/******************************************************************************\
|                                                                              |
|                                  line-view.js                                |
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

	tagName: 'line',

	//
	// constructor
	//

	initialize: function(options) {

		// set attributes
		//
		this.options = options;
		this.vertex1 = this.options.vertex1;
		this.vertex2 = this.options.vertex2;
	},

	//
	// svg rendering methods
	//

	attributes: function() {
		return {
			'x1': this.options.vertex1.x,
			'y1': this.options.vertex1.y,
			'x2': this.options.vertex2.x,
			'y2': this.options.vertex2.y,
			'stroke': this.options.stroke
		}
	}
}));
