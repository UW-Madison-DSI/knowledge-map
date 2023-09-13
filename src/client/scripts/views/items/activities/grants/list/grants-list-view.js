/******************************************************************************\
|                                                                              |
|                            grants-list-view.js                               |
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

import ActivitiesListView from '../../activities-list-view.js';
import GrantsListItemView from './grants-list-item-view.js';

export default ActivitiesListView.extend({

	//
	// attributes
	//

	childView: GrantsListItemView,

	template: _.template(`
		<thead>
			<% if (columns.includes('year')) { %>
			<th class="year">
				Year
			</th>
			<% } %>

			<% if (columns.includes('amount')) { %>
			<th class="amount">
				Amount
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
	`)
});