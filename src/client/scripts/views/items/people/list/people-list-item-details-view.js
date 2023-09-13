/******************************************************************************\
|                                                                              |
|                      people-list-item-details-view.js                        |
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

import BaseView from '../../../base-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	template: _.template(`
		<div class="affiliations">
			<label>Other Affiliations</label>
			<%= other_affiliations && other_affiliations.length > 0? other_affiliations.join(', ') : 'none' %>
		</div>

		<% if (interests && interests.length > 0) { %>
		<div class="interests">
			<label>Interests</label>
			<%= interests.join(', ').trim() %>
		</div>
		<% } %>
	`),

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			other_affiliations: this.model.getSecondaryAffiliations() || 'none'
		};
	}
});