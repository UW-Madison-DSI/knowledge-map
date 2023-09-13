/******************************************************************************\
|                                                                              |
|                             contributor-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a contributor marker and connections.          |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../utilities/math/vector2.js';
import BaseView from '../../base-view.js';
import SVGRenderable from '../../svg/behaviors/svg-renderable.js';
import AffiliationShowable from '../people/behaviors/affiliation-showable.js';
import PersonView from '../people/person-view.js';
import ContributorMarkerView from './contributor-marker-view.js';
import LineView from '../../svg/shapes/line-view.js';

export default BaseView.extend(_.extend({}, SVGRenderable, AffiliationShowable, {

	//
	// attributes
	//

	tagName: 'g',
	className: 'contributor',

	//
	// getting methods
	//

	getContributorMarkerView: function() {
		return new ContributorMarkerView({
			model: this.model,
			parent: this,

			// callbacks
			//
			onselect: () => {
				this.select();
			},
			ondeselect: () => {
				this.deselect();
			}
		});
	},

	getMarkerView: function() {
		/*
		if (this.parent.parent.parent.parent instanceof PersonView) {
			return this.parent.parent.parent.parent.markerView;
		} else {
			return this.getContributorMarkerView();
		}
		*/
		return this.getContributorMarkerView();
	},

	getActivityView() {
		return this.parent.parent;
	},

	getActivitiesView() {
		return this.parent.parent.parent;
	},

	getConnectingLine(markerView1, markerView2) {
		let factor = new Vector2(1, -1);
		let lineView = new LineView({
			vertex1: markerView1.location.times(factor),
			vertex2: markerView2.location.times(factor)
		});
		return lineView.render();
	},

	//
	// selection methods
	//

	select: function() {
		this.$el.addClass('selected');

		// select contributor's activities
		//
		this.getActivitiesView().selectByPerson(this.model);
	},

	deselect: function() {
		this.$el.removeClass('selected');

		// deselect contributor's activities
		//
		this.getActivitiesView().deselectAll();
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
		this.showMarker();
		this.showActivity();
		this.showAffiliations();
		return this.$el;
	},

	showMarker: function() {
		this.markerView = this.getMarkerView();
		this.$el.append(this.markerView.render());
	},

	showActivity() {
		this.activityView = this.getActivityView();
		this.$el.prepend(this.getConnectingLine(this.markerView, this.activityView.markerView));		
	},

	onRender: function() {
		this.show();
	}
}));