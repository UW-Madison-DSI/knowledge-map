/******************************************************************************\
|                                                                              |
|                     conference-proceeding-marker-view.js                     |
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

	d: 'M16 11c0 2.209-1.791 4-4 4s-4-1.791-4-4v-7c0-2.209 1.791-4 4-4s4 1.791 4 4v7zm4-2v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z',
	offset: new Vector2(-12, -12),

	//
	// popover attributes
	//

	popover_type: 'conference-proceeding',
	popover_icon: 'fa fa-microphone',
	popover_title: 'Conference Proceeding',
	popover_template: 
		`<div class="conference-proceeding">
			<div class="info">
				<% if (title) { %>
				<div class="title">
					<label>Title</label>
					<%= title %>
				</div>
				<% } %>

				<% if (journal_name) { %>
				<div class="journal-name">
					<label>Journal</label>
					<%= journal_name %>
				</div>
				<% } %>

				<% if (journal_volume) { %>
				<div class="journal-volume">
					<label>Volume</label>
					<%= journal_volume %>
				</div>
				<% } %>

				<% if (journal_issue) { %>
				<div class="journal-issue">
					<label>Issue</label>
					<%= journal_issue %>
				</div>
				<% } %>

				<% if (url) { %>
				<div class="doi">
					<label>DOI</label>
					<a href="<%= url %>" target="_blank"><%= url %></a>
				</div>
				<% } %>

				<% if (publish_date) { %>
				<div class="publish-date">
					<label>Publication Date</label>
					<%= publish_date.format('shortDate') %>
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
		this.tooltip_title = this.model.get('title');
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