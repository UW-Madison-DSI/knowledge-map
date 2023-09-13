/******************************************************************************\
|                                                                              |
|                            article-details-view.js                           |
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

import ActivityDetailsView from '../../activity-details-view.js';

export default ActivityDetailsView.extend({

	//
	// attributes
	//

	tagName: 'tr',
	template: _.template(`
		<% if (journal_name) { %>
		<div class="journal">
			<label>Journal</label>
			<%= journal_name %>
		</div>
		<% } %>

		<% if (url) { %>
		<div class="doi">
			<label>DOI</label>
			<a href="<%= url %>" target="_blank"><%= url %></a>
		</div>
		<% } %>

		<% if (first_page || last_page) { %>
		<div class="pages">
			<label>Pages</label>
			<%= first_page %> to <%= last_page %>
		</div>
		<% } %>

		<% if (publication_date) { %>
		<div class="publication-date">
			<label>Publication Date</label>
			<%= publication_date.format('shortDate') %>
		</div>
		<% } %>

		<% if (contributors.length > 0) { %>
		<div class="contributors">
			<label>Contributors</label>
			<%= contributors.join(', ') %>
		</div>
		<% } %>

		<% if (abstract) { %>
		<div class="abstract">
			<label>Abstract</label>
			<%= abstract %>
		</div>
		<% } %>
	`),

	//
	// rendering methods
	//

	templateContext: function() {
		return _.extend({}, this.model.attributes, {
			url: this.model.getUrl(),
			contributors: this.model.getContributorNames()
		});
	}
});