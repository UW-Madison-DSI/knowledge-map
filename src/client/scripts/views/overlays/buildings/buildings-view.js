/******************************************************************************\
|                                                                              |
|                               buildings-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of buildings.                     |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import CollectionView from '../../collections/collection-view.js';
import SVGCollectionRenderable from '../../svg/behaviors/svg-collection-renderable.js';
import BuildingView from './building-view.js';

export default CollectionView.extend(_.extend({}, SVGCollectionRenderable, {

	//
	// attributes
	//

	tagName: 'g',
	className: 'buildings',
	childView: BuildingView,

	//
	// querying methods
	//

	findByModel: function(model) {
		for (let i = 0; i < this.children.length; i++) {
			let child = this.children.findByIndex(i);
			if (child.model == model) {
				return child;
			}
		}
	},

	getLocationsOf: function(models, map) {
		let locations = [];
		for (let i = 0; i < this.children.length; i++) {
			let child = this.children.findByIndex(i);
			if (models.includes(child.model)) {
				let location = child.getLocation(map);
				if (location) {
					locations.push(location);
				}
			}
		}
		return locations;
	},

	//
	// rendering methods
	//

	childViewOptions: function(model) {
		return {
			model: model,
			offset: this.options.offset,
			scale: this.options.scale
		}
	},

	deselectAll() {
		for (let i = 0; i < this.children.length; i++) {
			this.children.findByIndex(i).deselect();
		}
	},

	select: function(models) {
		for (let i = 0; i < this.children.length; i++) {
			let child = this.children.findByIndex(i);
			if (models.includes(child.model)) {
				child.select();
			}
		}
	}
}));