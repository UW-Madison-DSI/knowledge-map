/******************************************************************************\
|                                                                              |
|                           contributors-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of contributors.                  |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import CollectionView from '../../collections/collection-view.js';
import SVGCollectionRenderable from '../../svg/behaviors/svg-collection-renderable.js';
import ContributorView from './contributor-view.js';

export default CollectionView.extend(_.extend({}, SVGCollectionRenderable, {

	//
	// attributes
	//

	tagName: 'g',
	className: 'contributors',
	childView: ContributorView,

	//
	// getting methods
	//

	getLocations() {
		let locations = [];
		for (let i = 0; i < this.children.length; i++) {
			locations.push(this.children.findByIndex(i).getLocation());
		}
		return locations;
	},

	//
	// rendering methods
	//

	childViewOptions: function(model) {
		return {
			model: model,
			parent: this
		}
	}
}));