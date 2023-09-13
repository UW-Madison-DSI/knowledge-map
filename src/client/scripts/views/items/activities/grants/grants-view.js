/******************************************************************************\
|                                                                              |
|                               grants-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of grants.                        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseCollection from '../../../../collections/base-collection.js';
import ActivitiesView from '../activities-view.js';
import GrantsListView from './list/grants-list-view.js';

export default ActivitiesView.extend({

	//
	// attributes
	//

	item: 'grant',
	icon: 'fa fa-money-check-dollar',
	ItemsListView: GrantsListView,

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
				<label><input type="radio" name="sorting" value="amount">By Amount</label>
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
	// querying methods
	//

	toCSV: function() {
		let csv = '';
		csv += 'Name, ';
		csv += 'Agency, ';
		csv += 'Start Date, ';
		csv += 'End Date, ';
		csv += 'Amount, ';
		csv += 'Contributors ';
		csv += '\n';
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			csv += '"' + model.get('name') + '",';
			csv += (model.has('agency_name')? '"' + model.get('agency_name') + '"': '') + ',';
			csv += (model.has('start_date')? model.get('start_date').format('shortDate') : '') + ',';
			csv += (model.has('end_date')? model.get('end_date').format('shortDate') : '') + ',';
			csv += (model.has('total_dollars')? '"$' + model.get('total_dollars').toLocaleString() + '"' : '') + ',';
			csv += '"' + model.getContributorNames().join(', ') + '"';
			csv += '\n';
		}
		return csv;
	},

	toJSON: function() {
		let data = [];
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			data.push({
				'Name': model.get('name'),
				'Agency': model.get('agency_name'),
				'Start Date': (model.has('start_date')? model.get('start_date').format('shortDate') : null),
				'End Date': (model.has('end_date')? model.get('end_date').format('shortDate') : null),
				'Amount': model.has('total_dollars')? '$' + model.get('total_dollars').toLocaleString() : '',
				'Contributors': model.getContributorNames()
			});
		}
		return JSON.stringify(data, null, 4);
	}
});