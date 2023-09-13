/******************************************************************************\
|                                                                              |
|                          technology-details-view.js                          |
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
		<% if (date) { %>
		<div class="date">
			<label>Date</label>
			<%= date.format('shortDate') %>
		</div>
		<% } %>

		<% if (url) { %>
		<div class="url">
			<label>URL</label>
			<a href="<%= url %>" target="_blank"><%= url %></a>
		</div>
		<% } %>

		<% if (contributors.length > 0) { %>
		<div class="contributors">
			<label>Contributors</label>
			<%= contributors.join(', ') %>
		</div>
		<% } %>

		<% if (introduction) { %>
		<div class="introduction">
			<label>Introduction</label>
			<%= introduction %>
		</div>
		<% } %>
	`)
});