/******************************************************************************\
|                                                                              |
|                              activity-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an abstract base class for views of activities.          |
|        (grants, articles etc.)                                               |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../utilities/math/vector2.js';
import BaseView from '../../base-view.js';
import SVGRenderable from '../../svg/behaviors/svg-renderable.js';
import Animatable from '../../animation/animatable.js';
import DateRangeShowable from '../../behaviors/date-range-showable.js';
import ContributorShowable from '../contributors/contributor-showable.js';

export default BaseView.extend(_.extend({}, SVGRenderable, Animatable, DateRangeShowable, ContributorShowable, {

	//
	// attributes
	//

	tagName: 'g',

	//
	// querying methods
	//

	isVisible: function() {
		return this.visible != false;
	},

	//
	// selection methods
	//

	select() {

		// show only this grant
		//
		this.$el.addClass('selected');

		// hide unselected activities
		//
		this.parent.$el.addClass('hide-unselected');
	},

	deselect() {

		// show all grants
		//
		this.$el.removeClass('selected');

		// show unselected activities
		//
		this.parent.$el.removeClass('hide-unselected');

		// rescale markers
		//
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.rescale();
		}
	},

	highlight: function() {
		this.$el.addClass('highlighted');
	},

	unhighlight: function() {
		this.$el.removeClass('highlighted');
	},

	//
	// rendering methods
	//

	toElement: function() {

		// create element
		//
		let element = document.createElementNS('http://www.w3.org/2000/svg', this.tagName);

		// set class
		//
		if (this.className) {
			$(element).attr('class', this.className);
		}

		return element;
	},

	render: function() {
		this.$el = $(this.toElement());
		this.markerView = this.getMarkerView();
		this.$el.append(this.markerView.render());
		this.showContributors();
		this.unscale();
		return this.$el;
	},

	onRender: function() {
		this.show();
	},

	//
	// marker rendering methods
	//

	showMarker: function() {
		this.markerView = this.getMarkerView();
		this.$el.append(this.markerView.render());
	},

	unscale() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.unscale(this.markerView.$el);
		}
	},

	//
	// cleanup methods
	//

	onBeforeDestroy: function() {
		if (this.markerView) {
			this.markerView.destroy();
		}
	}
}));