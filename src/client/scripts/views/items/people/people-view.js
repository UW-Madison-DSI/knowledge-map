/******************************************************************************\
|                                                                              |
|                               people-view.js                                 |
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
import PeopleListView from './list/people-list-view.js';

export default ItemsView.extend({

	//
	// attributes
	//

	item: 'person',
	icon: 'fa fa-user',

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
				<label><input type="radio" name="sorting" value="department">By Department</label>
			</div>
		</div>

		<div class="items"></div>

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
	// querying methods
	//

	toCSV: function() {
		let csv = '';
		csv += 'First Name, ';
		csv += 'Middle Name, ';
		csv += 'Last Name, ';
		csv += 'Primary Affiliation, ';
		csv += 'Other Affiliations, ';
		csv += 'Interests ';
		csv += '\n';
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			csv += (model.get('first_name') || '') + ',';
			csv += (model.get('middle_name') || '') + ',';
			csv += (model.get('last_name') || '') + ',';
			csv += (model.get('primary_affiliation') || '') + ',';
			csv += '"' + model.getSecondaryAffiliations().join(', ') + '",';
			csv += '"' + model.get('interests').join(', ') + '"';
			csv += '\n';
		}
		return csv;
	},

	toJSON: function() {
		let data = [];
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			data.push({
				'First Name': model.get('first_name'),
				'Middle Name': model.get('middle_name'),
				'Last Name': model.get('last_name'),
				'Primary Affiliation': model.get('primary_affiliation'),
				'Other Affiliations': model.getSecondaryAffiliations(),
				'Interests': model.get('interests')
			});
		}
		return JSON.stringify(data, null, 4);
	},

	//
	// getting methods
	//

	getItemsName: function() {
		return this.collection.length == 1? this.item : 'people';
	},

	getPersonView: function(model) {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');
		return mapView.peopleView.children.findByModel(model);
	},

	getColumns: function() {
		let sorting = this.getSorting() || 'name';
		switch (sorting) {
			case 'name':
				return ['first_name', 'last_name'];
			default:
				return ['name', sorting];
		}
	},

	/*
	getItemsListView: function() {
		switch (this.getSorting() || 'name') {
			case 'name':
				return PeopleListView;
			case 'department':
				return PeopleListsView;
		}
	},

	//
	// rendering methods
	//

	showItems: function() {
		let sorting = this.getSorting();
		let ItemsListView = this.getItemsListView(sorting);

		this.showChildView('items', new ItemsListView({
			collection: this.options.collection,

			// callbacks
			//
			onclick: (item) => this.onClick(item),
			onmouseover: (item) => this.onMouseOver(item),
			onmouseleave: (item) => this.onMouseLeave(item)
		}));
	},
	*/

	//
	// rendering methods
	//

	showItems: function() {
		this.showChildView('items', new PeopleListView({
			collection: this.options.collection,
			columns: this.getColumns(),
			sorting: this.getSorting(),

			// callbacks
			//
			onclick: (item) => this.onClick(item),
			onmouseover: (item) => this.onMouseOver(item),
			onmouseleave: (item) => this.onMouseLeave(item)
		}));
	},

	//
	// selection event handling methods
	//

	onClick: function(item) {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');
		let personView = mapView.peopleView.children.findByModel(item.model);

		// highlight person
		//
		if (personView) {
			mapView.deselectAll();
			mapView.clearPopovers();
			personView.toTop();
			personView.select();
			personView.clear();
			personView.markerView.unhighlight();
			personView.markerView.select();

			mapView.goTo(personView.markerView.location, 1, {

				// callbacks
				//
				done: () => {
					personView.markerView.showPopover();
				}
			});
		}
	},

	onMouseOver: function(item) {
		let personView = this.getPersonView(item.model);
		if (personView) {
			personView.toTop();
			personView.markerView.highlight();
			personView.markerView.bounce();
		}
	},

	onMouseLeave: function(item) {
		let personView = this.getPersonView(item.model);
		if (personView) {
			personView.markerView.unhighlight();
		}
	}
});