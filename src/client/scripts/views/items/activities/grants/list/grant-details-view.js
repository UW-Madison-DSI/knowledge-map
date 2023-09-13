/******************************************************************************\
|                                                                              |
|                            grant-details-view.js                             |
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
		<% if (agency_name) { %>
		<div class="agency">
			<label>Agency</label>
			<%= agency_name %>
		</div>
		<% } %>

		<% if (start_date || end_date) { %>
		<div class="start-date">
			<label>Date</label>
			<%= start_date.format('shortDate') %> to <%= end_date.format('shortDate') %>
		</div>
		<% } %>

		<% if (total_dollars != undefined) { %>
		<div class="amount">
			<label>Amount</label>
			$<%= total_dollars? total_dollars.toLocaleString() : '' %>
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
	`)
});