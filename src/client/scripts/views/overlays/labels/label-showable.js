/******************************************************************************\
|                                                                              |
|                               label-showable.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for showing labels.                           |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../utilities/math/vector2.js';
import LineView from '../svg/shapes/line-view.js';

export default {

	//
	// getting methods
	//

	getLabelViews: function() {
		let labelViews = [];
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			let labels = viewport.parent.labels.getLabels([this.model.getAffiliation()]);
			if (labels) {

				// add lines from labels to center
				//
				for (let i = 0; i < labels.length; i++) {
					let label = labels[i];
					labelViews.push(new LineView({
						vertex1: new Vector2(this.markerView.location.x, -this.markerView.location.y),
						vertex2: new Vector2(label.location.x, -label.location.y),
						label: label
					}));
				}
			}
		}

		return labelViews;
	},

	//
	// label rendering methods
	//

	showLabels: function() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			let labelViews = this.getLabelViews();
			this.labels = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			$(this.labels).addClass('labels');
			for (let i = 0; i < labelViews.length; i++) {
				let labelView = labelViews[i];
				$(this.labels).append(labelView.render());
			}
			this.$el.prepend(this.labels);
		}
		this.unhideLabels();
	},

	hideLabels: function() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.$el.addClass('hide-labels');
		}
	},

	unhideLabels: function() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.$el.removeClass('hide-labels');
		}
	},

	clearLabels: function() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.$el.removeClass('hide-labels');
			viewport.parent.labelsView.deselect(this.model.getLabels());
			viewport.parent.labelsView.clear();
		}
	}
}