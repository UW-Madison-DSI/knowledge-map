/******************************************************************************\
|                                                                              |
|                           affiliation-showable.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for showing affiliations.                     |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../../utilities/math/vector2.js';
import LineView from '../../../../views/svg/shapes/line-view.js';

export default {

	//
	// getting methods
	//

	getAffiliationViews: function() {
		let affiliationViews = [];
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			let labels = viewport.parent.labelsView.getLabels([this.model.getAffiliation()]);
			if (labels) {

				// add lines from affiliations to center
				//
				for (let i = 0; i < labels.length; i++) {
					let label = labels[i];
					affiliationViews.push(new LineView({
						vertex1: new Vector2(this.markerView.location.x, -this.markerView.location.y),
						vertex2: new Vector2(label.location.x, -label.location.y),
						label: label
					}));
				}
			}
		}

		return affiliationViews;
	},

	//
	// label rendering methods
	//

	showAffiliations: function() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.$el.removeClass('hide-affiliations');
			let affiliationViews = this.getAffiliationViews();
			this.affiliations = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			$(this.affiliations).addClass('affiliations');
			for (let i = 0; i < affiliationViews.length; i++) {
				let affiliationView = affiliationViews[i];
				$(this.affiliations).append(affiliationView.render());
			}
			this.$el.prepend(this.affiliations);
		}
	},

	hideAffiliations: function() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.$el.addClass('hide-affiliations');
		}
	},

	unhideAffiliations: function() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.$el.removeClass('hide-affiliations');
		}
	},

	clearAffiliations: function() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.$el.removeClass('hide-affiliations');
			viewport.parent.labels.deselect(this.model.getAffiliations());
			if (this.affiliations) {
				this.affiliations.remove();
			}
		}
	}
}