/******************************************************************************\
|                                                                              |
|                              profile-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a person's profile information.                |
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

	className: 'profile',

	template: _.template(`

		<% if (degree_institution) { %>
		<div class="interests">
			<label>Degree Institution</label>
			<%= degree_institution %>
			<% if (degree_year) { %>
			<%= degree_year %>
			<% } %>
		</div>
		<% } %>

		<% if (primary_affiliation) { %>
		<div class="primary-affiliation">
			<label>Primary Affiliation</label>
			<%= primary_affiliation %>
		</div>
		<% } %>

		<% if (affiliations && affiliations.length > 0) { %>
		<div class="affiliations">
			<label>Other Affiliations</label>
			<%= other_affiliations.join(', ') %>
		</div>
		<% } %>

		<% if (interests && interests.length > 0) { %>
		<div class="interests">
			<label>Research Interests</label>
			<%= interests.join(', ').trim() %>
		</div>
		<% } %>

		<% if (research_summary) { %>
		<div class="summary">
			<label>Research Summary</label>
			<%= research_summary %>
		</div>
		<% } %>
	`),

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			other_affiliations: this.model.getSecondaryAffiliations()
		};
	}
});