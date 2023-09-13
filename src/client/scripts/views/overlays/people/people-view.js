/******************************************************************************\
|                                                                              |
|                                people-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of people.                        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import CollectionView from '../../collections/collection-view.js';
import SVGCollectionRenderable from '../../svg/behaviors/svg-collection-renderable.js';
import PersonView from './person-view.js';

export default CollectionView.extend(_.extend({}, SVGCollectionRenderable, {

	//
	// attributes
	//

	tagName: 'g',
	className: 'people',
	childView: PersonView,

	//
	// getting methods
	//

	getLocations() {
		let locations = [];
		for (let i = 0; i < this.children.length; i++) {
			let child = this.children.findByIndex(i);
			if (child.markerView.isVisible()) {
				let location = child.markerView.getLocation();
				if (location) {
					locations.push(location);
				}
			}
		}
		return locations;
	},

	//
	// selection methods
	//

	selectAll: function() {
		this.each((child) => {
			child.select();
		});
	},

	deselectAll: function() {
		this.each((child) => {
			child.deselect();
		});
		this.$el.removeClass('hide-unselected');
	},

	clearAll: function() {
		this.each((child) => {
			child.clear();
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
	},

	//
	// hiding methods
	//

	showUnselected: function() {
		this.viewport.$el.removeClass('selected-people-only');
	},

	hideUnselected: function() {
		this.viewport.$el.addClass('selected-people-only');
	}
}));