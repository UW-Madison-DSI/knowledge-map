/******************************************************************************\
|                                                                              |
|                            activity-showable.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for showing activities.                       |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Activity from '../../../models/activities/activity.js';

export default {

	//
	// message methods
	//

	showMessage: function(options) {
		this.getTopView().showMessage(options);
	},

	hideMessage: function() {
		this.getTopView().hideMessage();
	},

	//
	// setting methods
	//

	setActivityYear: function(activity, year, options) {
		if (this.activityViews) {
			let activityViews = this.activityViews[activity];
			if (activityViews) {
				activityViews.setYear(year, options);
			}
		}
	},

	setActivityRange: function(activity, range, options) {
		if (this.activityViews) {
			let activityViews = this.activityViews[activity];
			if (activityViews) {
				activityViews.setRange(range, options);
			}
		}
	},

	//
	// hiding methods
	//

	showActivities: function() {
		for (let i = 0; i < Activity.kinds.length; i++) {
			this.showActivity(Activity.kinds[i]);
		}
	},

	hideActivities: function() {
		for (let i = 0; i < Activity.kinds.length; i++) {
			this.hideActivity(Activity.kinds[i]);
		}
	},

	//
	// cleanup methods
	//

	clearActivity: function(activity) {
		if (this.activityViews[activity]) {
			this.activityViews[activity].destroy();
			this.activityViews[activity] = null;
		}
	},

	clearActivities: function() {
		for (let i = 0; i < Activity.kinds.length; i++) {
			this.clearActivity(Activity.kinds[i]);
		}
	},
};