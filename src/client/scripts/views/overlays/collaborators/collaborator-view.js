/******************************************************************************\
|                                                                              |
|                            collaborator-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collaborator marker and connections.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../utilities/math/vector2.js';
import BaseView from '../../base-view.js';
import SVGRenderable from '../../svg/behaviors/svg-renderable.js';
import Animatable from '../../animation/animatable.js';
import DateRangeShowable from '../../behaviors/date-range-showable.js';
import AffiliationShowable from '../people/behaviors/affiliation-showable.js';
import CollaboratorMarkerView from './collaborator-marker-view.js';
import LineView from '../../svg/shapes/line-view.js';

export default BaseView.extend(_.extend({}, SVGRenderable, Animatable, DateRangeShowable, AffiliationShowable, {

	//
	// attributes
	//

	tagName: 'g',
	className: 'collaborator',

	//
	// getting methods
	//

	getMarkerView: function() {
		return new CollaboratorMarkerView({
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
	},

	deselect: function() {
		this.$el.removeClass('selected');
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
		this.showPerson();
		this.showAffiliations();
		return this.$el;
	},

	toTop: function() {
		let parent = this.$el.parent();
		this.$el.detach();
		parent.append(this.$el);
	},

	showMarker: function() {
		this.markerView = this.getMarkerView();
		this.$el.append(this.markerView.render());
	},

	showPerson: function() {
		this.personView = this.getParentView('person');
		this.$el.prepend(this.getConnectingLine(this.markerView, this.personView.markerView));
	},

	onRender: function() {
		this.show();
	}
}));