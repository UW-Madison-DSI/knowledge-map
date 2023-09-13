/******************************************************************************\
|                                                                              |
|                              book-marker-view.js                             |
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

	d: 'M22 24h-17c-1.657 0 -3 -1.343 -3 -3v -18c0 -1.657 1.343 -3 3 -3h 17v 24zm -2 -4h -14.505c -1.375 0 -1.375 2 0 2h14.505v -2zm -3 -3z',
	offset: new Vector2(-12, -12),

	//
	// popover attributes
	//

	popover_type: 'book',
	popover_icon: 'fa fa-book',
	popover_title: 'Book',
	popover_template: 
		`<div class="book">
			<div class="info">
				<% if (title) { %>
				<div class="title">
					<label>Title</label>
					<%= title %>
				</div>
				<% } %>

				<% if (publisher) { %>
				<div class="publisher">
					<label>Publisher</label>
					<%= publisher %>
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
		this.tooltip_title = this.model.get('title');
	},

	//
	// rendering methods
	//

	getPopoverContent: function() {
		return _.template(this.popover_template)(_.extend(_.extend({}, this.model.attributes, {
			contributors: this.model.getContributorNames()
		})));
	}
});