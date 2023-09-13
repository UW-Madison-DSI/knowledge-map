/******************************************************************************\
|                                                                              |
|                              activities-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an item list view.                                       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ItemsView from '../items-view.js';

export default ItemsView.extend({

	template: _.template(`
		<div class="<%= length == 0? 'empty ' : '' %><%= nested? 'header' : 'title' %>">
			<% if (icon) { %>
			<span class="<%= item.replace(/ /g, '-').replace(/_/g, '-') %> icon"><i class="<%= icon %>"></i></span>
			<% } %>
			<span class="count"><% if (length != 1) { %><%= length == 0? 'No' : length %><% } %></span>
			<%= items.replace(/_/g, ' ').toTitleCase() %>
		</div>

		<div class="sorting radio-buttons">
			<div class="radio-inline">
				<label><input type="radio" name="sorting" value="name" checked>By Name</label>
			</div>
			<div class="radio-inline">
				<label><input type="radio" name="sorting" value="year">By Year</label>
			</div>
			<div class="radio-inline">
				<label><input type="radio" name="sorting" value="contributors">By Contributors</label>
			</div>
		</div>

		<div class="items">
			<div class="list"></div>
		</div>

		<% if (length > 0) { %>
		<div class="buttons">
			<button>
				<i class="fa fa-download" data-toggle="tooltip" title="Download File"></i>
				<i class="fa fa-spinner spinning" style="display:none"></i>
			</button>
		</div>
		<% } %>
	`),

	//
	// getting methods
	//

	getColumns: function() {
		let sorting = this.getSorting();
		if (sorting == 'name') {
			return ['name'];
		} else {
			return ['name', sorting];
		}
	},

	getActivityViewOf: function(model) {
		let activitiesView = this.getActivitiesView();
		if (activitiesView) {
			return activitiesView.children.findByModel(model);
		}
	},

	getActivitiesView: function() {
		if (this.parent.personView) {

			// get current person's activities
			//
			let activity = this.parent.personView.activity;
			return this.parent.personView.activityViews[activity];
		} else {

			// get map view's activities
			//
			let topView = this.getTopView();
			let mainView = topView.getChildView('mainbar');
			let mapView = mainView.getChildView('mainbar');
			return mapView.activitiesView;
		}
	},

	//
	// setting methods
	//

	setYear: function(year, options) {
		if (this.hasChildView('items')) {
			this.getChildView('items').setYear(year, options);
			this.updateCount();
		}
	},

	setRange: function(range, options) {
		if (this.hasChildView('items')) {
			this.getChildView('items').setRange(range, options);
			this.updateCount();
		}
	},

	showItems: function() {
		this.showChildView('items', new this.ItemsListView({
			collection: this.options.collection,
			columns: this.getColumns() || [],
			sorting: this.getSorting(),

			// callbacks
			//
			onclick: (item) => this.onClick(item),
			onmouseover: (item) => this.onMouseOver(item),
			onmouseleave: (item) => this.onMouseLeave(item)
		}));
	},

	updateCount: function() {
		let count = this.getChildView('items').numVisible();
		this.$el.find('.count').text(count);
	},

	//
	// selection event handling methods
	//

	onClick: function(item) {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');
		let activitiesView = this.getActivitiesView();

		if (activitiesView) {
			let activityView = activitiesView.children.findByModel(item.model);

			activitiesView.deselectAll();

			// highlight activity
			//
			if (activityView) {
				mapView.deselectAll();
				mapView.clearPopovers();
				mapView.goTo(activityView.markerView.location, 1, {

					// callbacks
					//
					done: () => {
						activityView.markerView.onClick();
					}
				});
			}
		}
	},

	onMouseOver: function(item) {
		let activityView = this.getActivityViewOf(item.model);
		if (activityView) {
			activityView.highlight();
			activityView.markerView.bounce();
		}
	},

	onMouseLeave: function(item) {
		let activityView = this.getActivityViewOf(item.model);
		if (activityView) {
			activityView.unhighlight();
		}
	}
});