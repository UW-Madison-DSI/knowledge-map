/******************************************************************************\
|                                                                              |
|                              article-marker-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../../utilities/math/vector2.js';
import ActivityMarkerView from '../activity-marker-view.js';

export default ActivityMarkerView.extend({

	//
	// attributes
	//

	d: 'M13.744 8s1.522-8-3.335-8h-8.409v24h20v-13c0-3.419-5.247-3.745-8.256-3zm.256 11h-8v-1h8v1zm4-3h-12v-1h12v1zm0-3h-12v-1h12v1zm-3.432-12.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z',
	offset: new Vector2(-12, -15),

	//
	// popover attributes
	//

	popover_type: 'article',
	popover_icon: 'fa fa-file-text',
	popover_title: 'Article',
	popover_template: `
		<div class="article">
			<div class="info">
				<% if (title) { %>
				<div class="title">
					<label>Title</label>
					<%= title %>
				</div>
				<% } %>

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
			</div>
		</div>`,

	//
	// constructor
	//

	initialize: function(options) {

		// call superclass constructor
		//
		ActivityMarkerView.prototype.initialize.call(this, options);

		// set attributes
		//
		this.tooltip_title = this.model.get('name');
	},

	//
	// rendering methods
	//

	getPopoverContent: function() {
		return _.template(this.popover_template)(_.extend(_.extend({}, this.model.attributes, {
			url: this.model.getUrl(),
			contributors: this.model.getContributorNames()
		})));
	}
});