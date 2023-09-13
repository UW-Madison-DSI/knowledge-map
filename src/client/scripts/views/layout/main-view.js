/******************************************************************************\
|                                                                              |
|                                main-view.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the top level view of our application.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseView from '../base-view.js';
import SplitView from '../layout/split-view.js';
import MapView from './knowledge-map-view.js';
import TrendsView from './trends-view.js';
import ProfileDetailsView from '../items/people/profile/profile-details-view.js';

//
// fetching methods
//

export default SplitView.extend({

	//
	// attributes
	//

	orientation: 'vertical',
	flipped: true,
	sizes: [75, 25],

	//
	// setting methods
	//

	setYear: function(value) {
		if (this.getChildView('sidebar').setYear) {
			this.getChildView('sidebar').setYear(value);
		}
		this.getChildView('mainbar').setYear(value);
	},

	setRange: function(values) {
		if (this.getChildView('sidebar').setRange) {
			this.getChildView('sidebar').setRange(values);
		}
		this.getChildView('mainbar').setRange(values);
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		SplitView.prototype.onRender.call(this);

		// initially close sidebar
		//
		this.hideSideBar();

		// set up resize callback
		//
		$(window).bind('resize', () => {
			this.onResize();
		});
	},

	getMainBarView: function() {
		return new MapView({
			el: this.$el.find('.mainbar')[0],
			latitude: 43.0740,
			longitude: 89.406,
			zoom_level: 16,
			grid: null,
			map_kind: 'map',
			parent: this
		});
	},

	getSideBarView: function() {
		return new BaseView({
			template: _.template('')
		});
	},

	showTrends: function(activity, range, collection, color) {
		this.showSideBar();
		this.showChildView('sidebar', new TrendsView({
			collection: collection,

			// options
			//
			activity: activity,
			range: range,
			color: color
		}));
	},

	showProfileDetails: function(model) {
		this.showChildView('sidebar', new ProfileDetailsView({
			model: model
		}));
	},

	//
	// window event handling methods
	//

	onResize: function() {
		this.getChildView('mainbar').onResize()
	}
});