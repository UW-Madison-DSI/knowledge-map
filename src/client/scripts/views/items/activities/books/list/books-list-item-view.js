/******************************************************************************\
|                                                                              |
|                             books-list-item-view.js                          |
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

import ActivitiesListItemView from '../../activities-list-item-view.js';
import BookDetailsView from './book-details-view.js';

export default ActivitiesListItemView.extend({

	//
	// attributes
	//

	template: _.template(`
		<% if (columns.includes('year')) { %>
		<td class="year">
			<%= year %>
		</td>
		<% } %>

		<% if (columns.includes('contributors')) { %>
		<td class="contributors">
			<%= contributors.length %>
		</td>
		<% } %>

		<% if (columns.includes('name')) { %>
		<td class="name">
			<div class="title">
				<span class="book icon">
					<i class="fa fa-book"></i>
				</span>

				<% if (title) { %>
				<a><%= title %></a>
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

	//
	// rendering methods
	//

	showDetails: function() {
		this.showChildView('details', new BookDetailsView({
			model: this.model
		}));
	}
});