/******************************************************************************\
|                                                                              |
|                       conference-proceeding-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ActivityView from '../activity-view.js';
import ConferenceProceedingMarkerView from './conference-proceeding-marker-view.js';

export default ActivityView.extend({

	//
	// attributes
	//

	className: 'conference-proceeding',

	//
	// getting methods
	//

	getMarkerView: function() {
		return new ConferenceProceedingMarkerView({
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