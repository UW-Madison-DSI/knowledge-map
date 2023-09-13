/******************************************************************************\
|                                                                              |
|                           people-list-item-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a sidebar list view.                                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ListItemView from '../../tables/table-item-view.js';
import PeopleListItemDetailsView from './people-list-item-details-view.js';

export default ListItemView.extend({

	//
	// attributes
	//

	tagName: 'tr',
	template: _.template(`
		<% if (columns.includes('department')) { %>
		<td class="department">
			<%= primary_affiliation %>
		</td>
		<% } %>

		<% if (columns.includes('first_name')) { %>
		<td class="first-name">
			<%= first_name %>
			<% if (middle_name) { %>
				<%= middle_name %>
			<% } %>
		</td>
		<% } %>

		<% if (columns.includes('last_name')) { %>
		<td class="last-name">
			<div class="title">
				<% if (last_name) { %>
				<a>
					<% if (last_name) { %><span class="last-name"><%= last_name %></span><% } %>
				</a>
				<% } %>

				<div class="expander">
					<button type="button" class="collapse btn btn-sm">
						<i class="fa fa-caret-up"></i>
					</button>
					<button type="button" class="expand btn btn-sm">
						<i class="fa fa-caret-down"></i>	
					</button>
				</div>
			</div>

			<div class="details"></div>
		</td>
		<% } %>

		<% if (columns.includes('name')) { %>
		<td class="name">
			<div class="title">
				<% if (first_name || middle_name || last_name) { %>
				<a>
					<% if (first_name) { %><span class="first-name"><%= first_name %></span><% } %>
					<% if (middle_name) { %><span class="middle-name"><%= middle_name %></span><% } %>
					<% if (last_name) { %><span class="last-name"><%= last_name %></span><% } %>
				</a>
				<% } %>

				<div class="expander">
					<button type="button" class="collapse btn btn-sm">
						<i class="fa fa-caret-up"></i>
					</button>
					<button type="button" class="expand btn btn-sm">
						<i class="fa fa-caret-down"></i>	
					</button>
				</div>
			</div>
		
			<div class="details"></div>
		</td>
		<% } %>
	`),

	regions: {
		details: '.details'
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			columns: this.options.columns
		};
	},

	showDetails: function() {
		this.showChildView('details', new PeopleListItemDetailsView({
			model: this.model
		}));
	}
});