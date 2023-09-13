/******************************************************************************\
|                                                                              |
|                             award-details-view.js                            |
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
		<% if (organization) { %>
		<div class="organization">
			<label>Organization</label>
			<%= organization %>
		</div>
		<% } %>

		<% if (date && !isNaN(date)) { %>
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
	`)
});