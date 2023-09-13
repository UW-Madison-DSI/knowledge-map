/******************************************************************************\
|                                                                              |
|                          collaborators-list-view.js                          |
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

import PeopleListView from '../../people/list/people-list-view.js';
import CollaboratorsListItemView from './collaborators-list-item-view.js';

export default PeopleListView.extend({

	//
	// attributes
	//

	tagName: 'table',
	childView: CollaboratorsListItemView,
	childViewContainer: 'tbody',

	template: _.template(`
		<thead>
			<% if (columns.includes('year')) { %>
			<th class="year">
				Year
			</th>
			<% } %>

			<% if (columns.includes('department')) { %>
			<th class="department">
				Department
			</th>
			<% } %>

			<% if (columns.includes('first_name')) { %>
			<th class="first-name">
				First
			</th>
			<% } %>

			<% if (columns.includes('last_name')) { %>
			<th class="last-name">
				Last
			</th>
			<% } %>

			<% if (columns.includes('name')) { %>
			<th class="name">
				Name
			</th>
			<% } %>
		</thead>
		<tbody>
		</tbody>
	`),

	//
	// setting methods
	//

	setYear: function(year, options) {
		for (let i = 0; i < this.children.length; i++) {
			this.children.findByIndex(i).setYear(year, options);
		}
	},

	setRange: function(range, options) {
		for (let i = 0; i < this.children.length; i++) {
			this.children.findByIndex(i).setRange(range, options);
		}
	},

	//
	// rendering methods
	//

	sortBy: function(column) {
		switch (column) {
			case 'name':
				this.$el.tablesorter({
					sortList: [[1,0]]
				});
				break;
			case 'year':
				this.$el.tablesorter({
					sortList: [[0,1]]
				});
				break;
			default:
				this.$el.tablesorter({
					sortList: [[0,0]]
				});
				break;	
		}
	}
});