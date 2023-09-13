/******************************************************************************\
|                                                                              |
|                            patent-marker-view.js                             |
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

	className: 'unscaled marker',
	d: 'M15 20.5c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5zm-.5-2.5h-5c-.276 0-.5.224-.5.5s.224.5.5.5h5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm-3.799 5.659c.19.216.465.341.752.341h1.094c.287 0 .562-.125.752-.341l1.451-1.659h-5.5l1.451 1.659zm8.299-16.925c0 4.164-3.75 6.98-3.75 10.266h-6.5c0-3.286-3.75-6.103-3.75-10.266 0-4.343 3.498-6.734 6.996-6.734 3.502 0 7.004 2.394 7.004 6.734zm-7.719-3.015l-.219-1.177c-2.017.373-3.258 1.851-3.517 3.846l1.188.154c.116-.9.602-2.463 2.548-2.823z',
	offset: new Vector2(-12, -12),
	
	//
	// popover attributes
	//

	popover_type: 'patent',
	popover_icon: 'fa fa-lightbulb',
	popover_title: '<a href="<%= url %>" target="_blank"><%= country %> Patent #<%= number %></a>',
	popover_template: 
		`<div class="patent">
			<div class="info">
				<% if (name) { %>
				<div class="title">
					<label>Name</label>
					<%= name %>
				</div>
				<% } %>

				<% if (date) { %>
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

	getPopoverTitleContent: function() {
		let data = _.extend({}, this.model.attributes, {
			url: this.model.getUrl()
		});
		return _.template(this.popover_title)(data);
	},

	getPopoverContent: function() {
		return _.template(this.popover_template)(_.extend(_.extend({}, this.model.attributes, {
			contributors: this.model.getContributorNames()
		})));
	}
});