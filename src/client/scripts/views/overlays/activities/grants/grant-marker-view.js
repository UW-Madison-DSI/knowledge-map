/******************************************************************************\
|                                                                              |
|                               grant-marker-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ActivityMarkerView from '../activity-marker-view.js';

export default ActivityMarkerView.extend({

	//
	// attributes
	//

	show_background: false,

	//
	// popover attributes
	//

	popover_type: 'grant',
	popover_icon: 'fa fa-money-check-dollar',
	popover_title: `<%= agency_abbreviation %> Grant`,
	popover_target: 'circle',
	popover_template: `
		<div class="grant">
			<div class="info">
				<% if (name) { %>
				<div class="title">
					<label>Title</label>
					<%= name %>
				</div>
				<% } %>

				<% if (agency_name) { %>
				<div class="agency">
					<label>Agency</label>
					<%= agency_name %>
				</div>
				<% } %>

				<% if (start_date || end_date) { %>
				<div class="start-date">
					<label>Date</label>
					<%= start_date.format('shortDate') %> to <%= end_date.format('shortDate') %>
				</div>
				<% } %>

				<% if (total_dollars != undefined) { %>
				<div class="amount">
					<label>Amount</label>
					$<%= total_dollars? total_dollars.toLocaleString() : '' %>
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
		this.label = this.model.get('agency_abbreviation');
		this.tooltip_title = this.model.get('name');
	},

	attributes: function() {
		return {
			'id': this.options.id,
			'class': this.options.class,
			'x': this.location? this.location.x : undefined,
			'y': this.location? -this.location.y : undefined,
			'fill': this.options.fill,
			'stroke': this.options.stroke
		}
	},

	//
	// getting methods
	//

	getRadius: function() {
		return 5 + Math.sqrt(this.model.get('total_dollars')) / 100;
	},

	getIcon: function() {

		// get svg from document
		//
		let icon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

		// set attributes
		//
		$(icon).attr({
			'r': this.getRadius()
		});

		return icon;
	},

	getLabel: function() {

		// get svg from document
		//
		let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

		// set attributes
		//
		$(text).attr({
			'dy': 5,
			//'dy': 15 + this.getRadius(),
			'fill': this.fill
		});
		$(text).html(this.label);

		return text;
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