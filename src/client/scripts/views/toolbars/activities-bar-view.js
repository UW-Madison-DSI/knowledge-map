/******************************************************************************\
|                                                                              |
|                           activities-bar-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the toolbar used to hide and show activities.            |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ToolbarView from './toolbar-view.js';

export default ToolbarView.extend({

	//
	// attributes
	//

	id: 'activities-bar',
	className: 'vertical toolbar',

	template: _.template(`
		<div class="title">Info</div>

		<div class="buttons">
			<button id="show-markers" class="selected" data-toggle="tooltip" title="Hide / Show Markers" data-placement="right">
				<i class="fa fa-map-pin"></i>
			</button>

			<button id="show-contributors" class="selected" data-toggle="tooltip" title="Hide / Show Contributors" data-placement="right">
				<i class="fa fa-users"></i>
			</button>
		</div>
	`),

	events: {
		'click #show-markers': 'onClickShowMarkers',
		'click #show-contributors': 'onClickShowContributors'
	},

	//
	// getting methods
	//

	getQueryParams: function(params) {
		let items = this.getItems();
		if (items) {
			params.set('items', items);
		}
		return params;
	},

	getItems: function() {
		let showMarkers = this.$el.find('#show-markers').hasClass('selected');
		let showContributors = this.$el.find('#show-contributors').hasClass('selected');
		if (showMarkers && !showContributors) {
			return 'markers';
		} else if (!showMarkers && showContributors) {
			return 'contributors';
		} else if (!showMarkers && !showContributors) {
			return 'none';
		}
	},

	//
	// setting methods
	//

	setQueryParams: function(params) {
		if (params.items) {
			this.showItems(params.items);
		}
	},

	//
	// rendering methods
	//

	show: function(options) {
		
		// call superclass method
		//
		ToolbarView.prototype.show.call(this);

		// show all
		//
		this.$el.find("#show-collaborators").show();

		if (options && options.items) {
			this.showItems(options.items);
		}
	},

	showItems: function(items) {
		switch (items) {
			case 'markers':
				this.$el.find('#show-markers').addClass('selected');
				this.$el.find('#show-contributors').removeClass('selected');
				this.parent.$el.removeClass('hide-activity-markers');
				this.parent.$el.addClass('hide-contributors');
				break;
			case 'contributors':
				this.$el.find('#show-markers').removeClass('selected');
				this.$el.find('#show-contributors').addClass('selected');
				this.parent.$el.addClass('hide-activity-markers');
				this.parent.$el.removeClass('hide-contributors');
				break;
			case 'none':
				this.$el.find('#show-markers').removeClass('selected');
				this.$el.find('#show-contributors').removeClass('selected');
				this.parent.$el.addClass('hide-activity-markers');
				this.parent.$el.addClass('hide-contributors');
				break;
		}
	},

	//
	// mouse event handling methods
	//

	onClickShowMarkers: function() {
		if (!this.$el.find('#show-markers').hasClass('selected')) {
			this.$el.find('#show-markers').addClass('selected');
			this.parent.$el.removeClass('hide-activity-markers');
			this.parent.viewport.rescale();
		} else {
			this.$el.find('#show-markers').removeClass('selected');
			this.parent.$el.addClass('hide-activity-markers');
		}
		this.parent.getChildView('search').updateQueryString();
	},

	onClickShowContributors: function() {
		if (!this.$el.find('#show-contributors').hasClass('selected')) {
			this.$el.find('#show-contributors').addClass('selected');
			this.parent.$el.removeClass('hide-contributors');
			this.parent.viewport.rescale();
		} else {
			this.$el.find('#show-contributors').removeClass('selected');
			this.parent.$el.addClass('hide-contributors');
		}
		this.parent.getChildView('search').updateQueryString();
	}
});