/******************************************************************************\
|                                                                              |
|                            collaborators-view.js                             |
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

import People from '../../../collections/people.js';
import PeopleView from '../people/people-view.js';
import CollaboratorsListView from './list/collaborators-list-view.js';

export default PeopleView.extend({

	//
	// attributes
	//

	item: 'collaborator',
	icon: 'fa fa-users',
	ItemsListView: CollaboratorsListView,

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
			<div class="radio-inline">
				<label><input type="radio" name="sorting" value="year">By Year</label>
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
			csv += '"' + (model.has('interests')? model.get('interests').join(', ') : '') + '"';
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

	getCollaboratorView: function(model) {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');
		let peopleView = mapView.peopleView;
		let personView = mapView.selected || peopleView.children.findByIndex(0);
		if (personView && personView.collaboratorsView) {
			return personView.collaboratorsView.children.findByModel(model);
		}
	},

	getItemsName: function() {
		return this.collection.length == 1? this.item : this.item + 's';
	},

	//
	// setting methods
	//

	setYear: function(year, options) {
		if (this.hasChildView('items')) {
			this.getChildView('items').setYear(year, options);
		}
	},

	setRange: function(range, options) {
		if (this.hasChildView('items')) {
			this.getChildView('items').setRange(range, options);
		}
	},

	//
	// rendering methods
	//

	showItems: function() {
		this.showChildView('items', new CollaboratorsListView({
			collection: this.collection,
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

		// perform callback
		//
		if (this.options.onclick) {
			this.options.onclick(item);
		}
	},

	onMouseOver: function(item) {
		let collaboratorView = this.getCollaboratorView(item.model);
		if (collaboratorView) {
			collaboratorView.toTop();
			collaboratorView.markerView.highlight();
			collaboratorView.markerView.bounce();
		}
	},

	onMouseLeave: function(item) {
		let collaboratorView = this.getCollaboratorView(item.model);
		if (collaboratorView) {
			collaboratorView.markerView.unhighlight();
		}
	}
});