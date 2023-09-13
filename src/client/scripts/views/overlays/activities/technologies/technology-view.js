/******************************************************************************\
|                                                                              |
|                             technology-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ActivityView from '../activity-view.js';
import TechnologyMarkerView from './technology-marker-view.js';

export default ActivityView.extend({

	//
	// attributes
	//

	className: 'technology',

	//
	// getting methods
	//

	getMarkerView: function() {
		return new TechnologyMarkerView({
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
	}
});