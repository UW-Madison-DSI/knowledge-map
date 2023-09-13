/******************************************************************************\
|                                                                              |
|                               activities-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of activities.                    |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import CollectionView from '../../collections/collection-view.js';
import SVGCollectionRenderable from '../../svg/behaviors/svg-collection-renderable.js';

export default CollectionView.extend(_.extend({}, SVGCollectionRenderable, {

	//
	// attributes
	//

	tagName: 'g',
	className: 'activities',

	//
	// constructor
	//

	initialize: function() {
		if (this.collection) {
			this.collection.sort();
		}
	},

	//
	// getting methods
	//

	getLocations() {
		let locations = [];
		for (let i = 0; i < this.children.length; i++) {
			let markerView = this.children.findByIndex(i).markerView;
			if (markerView.isVisible()) {
				locations.push(markerView.location);
			}
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

	selectByPerson: function(person) {
		for (let i = 0; i < this.children.length; i++) {
			let activityView = this.children.findByIndex(i);
			if (activityView.model.hasContributor(person)) {
				activityView.select();
			}
		}
	},

	deselectAll: function() {
		this.each((child) => {
			child.deselect();
		});
		this.$el.removeClass('hide-unselected');
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

	show() {
		for (let i = 0; i < this.children.length; i++) {
			this.children.findByIndex(i).show();
		}
	},

	grow() {
		for (let i = 0; i < this.children.length; i++) {
			this.children.findByIndex(i).grow();
		}
	}
}));