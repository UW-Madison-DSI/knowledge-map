/******************************************************************************\
|                                                                              |
|                          svg-collection-renderable.js                        |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a mixin for displaying svg renderable views.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import SVGRenderable from './svg-renderable.js';

export default _.extend(_.extend({}, SVGRenderable), {

	//
	// attributes
	//

	tagName: 'g',

	//
	// collection rendering methods
	//

	toElement: function() {

		// call superclass method
		//
		let element = SVGRenderable.toElement.call(this);

		// append child views
		//
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			let options = this.childViewOptions(model);
			let childView = new this.childView(options);
			this.children._add(childView);
			$(element).prepend(childView.render());
		}

		return element;
	},

	clear: function() {

		// clear child views
		//
		this.children.each((childView) => {
			if (!childView.options.permanant) {

				// remove view
				//
				this.children.remove(childView);

				// destroy view
				//
				childView.destroy();
			}
		});
	}
});