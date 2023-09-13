/******************************************************************************\
|                                                                              |
|                            patent-details-view.js                            |
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

	template: _.template(`
		<% if (country || number) { %>
		<div class="number">
			<label>Number</label>
			<a href="<%= url %>" target="_blank"><%= country %> <%= number %></a>
		</div>
		<% } %>

		<% if (date) { %>
		<div class="date">
			<label>Date</label>
			<%= date.format('shortDate') %>
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