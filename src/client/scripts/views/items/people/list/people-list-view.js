/******************************************************************************\
|                                                                              |
|                             people-list-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a list of people.                              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ListView from '../../tables/table-view.js';
import PeopleListItemView from './people-list-item-view.js';

export default ListView.extend({

	//
	// attributes
	//

	tagName: 'table',
	childView: PeopleListItemView,

	template: _.template(`
		<thead>
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
	// rendering methods
	//

	childViewOptions: function(model) {
		return {
			model: model,
			parent: this,
			columns: this.options.columns,

			// callbacks
			//
			onclick: this.options.onclick,
			onmouseover: this.options.onmouseover,
			onmouseleave: this.options.onmouseleave
		};
	},

	templateContext: function() {
		return {
			columns: this.options.columns
		};
	},

	sortBy: function(column) {
		switch (column) {
			case 'name':
				this.$el.tablesorter({
					sortList: [[1,0]]
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