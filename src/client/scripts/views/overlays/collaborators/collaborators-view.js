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
import CollaboratorView from './collaborator-view.js';

export default CollectionView.extend(_.extend({}, SVGCollectionRenderable, {

	//
	// attributes
	//

	tagName: 'g',
	className: 'collaborators',
	childView: CollaboratorView,

	//
	// getting methods
	//

	getLocations() {
		let locations = [];
		for (let i = 0; i < this.children.length; i++) {
			locations.push(this.children.findByIndex(i).markerView.location);
		}
		return locations;
	},

	//
	// setting methods
	//

	setYear: function(year, options) {
		for (let i = 0; i < this.children.length; i++) {
			this.children.findByIndex(i).setYear(year, options);
		}
	},

	setRange: function(range, options) {
		for (let i = 0; i < this.children.length; i++) {
			this.children.findByIndex(i).setRange(range, options);
		}
	},

	//
	// selection methods
	//

	deselectAll() {
		this.each((child) => {
			child.deselect();
		});
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