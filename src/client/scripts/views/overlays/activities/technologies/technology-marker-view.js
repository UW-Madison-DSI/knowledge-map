/******************************************************************************\
|                                                                              |
|                           technology-marker-view.js                          |
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

	d: 'M24 13.616v-3.232l-2.869-1.02c-.198-.687-.472-1.342-.811-1.955l1.308-2.751-2.285-2.285-2.751 1.307c-.613-.339-1.269-.613-1.955-.811l-1.021-2.869h-3.232l-1.021 2.869c-.686.198-1.342.471-1.955.811l-2.751-1.308-2.285 2.285 1.308 2.752c-.339.613-.614 1.268-.811 1.955l-2.869 1.02v3.232l2.869 1.02c.197.687.472 1.342.811 1.955l-1.308 2.751 2.285 2.286 2.751-1.308c.613.339 1.269.613 1.955.811l1.021 2.869h3.232l1.021-2.869c.687-.198 1.342-.472 1.955-.811l2.751 1.308 2.285-2.286-1.308-2.751c.339-.613.613-1.268.811-1.955l2.869-1.02zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z',
	offset: new Vector2(-12, -12),

	//
	// popover attributes
	//

	popover_type: 'technology',
	popover_icon: 'fa fa-gear',
	popover_title: 'Technology',
	popover_template: 
		`<div class="technology">
			<div class="info">
				<% if (title) { %>
				<div class="title">
					<label>Title</label>
					<%= title %>
				</div>
				<% } %>

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