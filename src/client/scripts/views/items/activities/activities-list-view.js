/******************************************************************************\
|                                                                              |
|                          activities-list-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a table list view for activities.                        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ListView from '../tables/table-view.js';

export default ListView.extend({

	//
	// attributes
	//

	tagName: 'table',

	template: _.template(`
		<thead>
			<% if (columns.includes('year')) { %>
			<th class="year">
				Year
			</th>
			<% } %>

			<% if (columns.includes('contributors')) { %>
			<th class="contributors">
				Contributors
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
	// querying methods
	//

	numVisible: function() {
		return this.$el.find('tbody tr:visible').length;
	},

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
					sortList: [[0,0]]
				});
				break;
			default:
				this.$el.tablesorter({
					sortList: [[0,1]]
				});
				break;
		}
	}
});