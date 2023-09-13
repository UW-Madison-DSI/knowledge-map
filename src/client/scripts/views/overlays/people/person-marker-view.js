/******************************************************************************\
|                                                                              |
|                            person-marker-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../../../../vendor/bootstrap/js/tooltip.js';
import '../../../../vendor/bootstrap/js/popover.js';
import Vector2 from '../../../utilities/math/vector2.js';
import LabeledMarkerView from '../markers/labeled-marker-view.js';

export default LabeledMarkerView.extend({

	//
	// attributes
	//

	className: 'unscaled person marker',
	d: "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
	offset: new Vector2(-12, -12),
	radius: 20,
	deselectable: false,

	//
	// popover attributes
	//

	popover_title: 
		`<a href="<%= url %>" target="blank">
			<% if (first_name) { %><span class="first-name"><%= first_name %></span><% } %>
			<% if (middle_name) { %><span class="middle-name"><%= middle_name %></span><% } %>
			<% if (last_name) { %><span class="last-name"><%= last_name %></span><% } %>
		</a>`,
	popover_template:
		`<div class="person">
			<% if (image) { %>
			<img class="icon" src="<%= image %>" />
			<% } %>
			<div class="info">

				<% if (title) { %>
				<div class="professional-title">
					<label>Title</label>
					<%= title %>
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
					<%= affiliations.join(', ') %>
				</div>
				<% } %>

				<% if (interests && interests.length > 0) { %>
				<div class="interests">
					<label>Interests</label>
					<%= interests.join(', ') %>
				</div>
				<% } %>

				<% if (research_summary) { %>
				<div class="summary">
					<label>Research Summary</label>
					<%= research_summary %>
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
		LabeledMarkerView.prototype.initialize.call(this, options);

		// set attributes
		//
		this.label = this.model.getName();
		this.location = this.getLocation();
		this.tooltip_title = this.model.get('primary_affiliation');
	},

	//
	// getting methods
	//

	getPopoverIcon: function() {
		return this.model.get('title') == 'Professor'? '<i class="fa fa-user-graduate"></i>' : '<i class="fa fa-user"></i>';
	},

	getRandom: function(minRadius, maxRadius) {
		let vector = Vector2.srandom(maxRadius, maxRadius);
		let length = vector.length();
		while (length < minRadius || length > maxRadius) {
			vector = Vector2.srandom(maxRadius, maxRadius);
			length = vector.length();		
		}
		return vector;
	},

	getLocation() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			return this.constructor.getLocationOf(this.model, viewport.parent);
		}
	},

	//
	// rendering methods
	//

	showPerson: function() {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');

		if (mapView.selected == this.options.parent) {
			return;
		}

		if (mapView.peopleView && mapView.peopleView.collection.contains(this.model)) {
			topView.showPerson(this.model);
			mapView.hideUnselectedPeople();
			mapView.selected = this.options.parent;
		} else {
			let viewport = this.getParentViewById('viewport');
			if (viewport) {

				// search for person
				//
				viewport.parent.getChildView('search').searchFor(this.model.getName(), {
					category: 'people',
					exact: true
				});
			}
		}
	},

	//
	// animation methods
	//

	bounce: function() {

		// add style
		//
		this.$el.find('circle').addClass('bouncing');

		// wait for duration
		//
		window.setTimeout(() => {

			// remove style
			//
			this.$el.find('circle').removeClass('bouncing');
		}, 300);
	},

	//
	// mouse event handling methods
	//

	onClick: function(event) {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');

		if (mapView.selected) {
			this.togglePopover();
		} else {
			this.select();
			this.showPerson();

			if (this.options.onclick) {
				this.options.onclick();
			}
		}

		// block from parents
		//
		event.stopPropagation();
	},

	onDoubleClick: function() {
		this.showPerson();
	}
}, {

	//
	// static attributes
	//

	directory: [],

	//
	// static methods
	//

	getLocationOf(person, map) {
		let id = person.get('id');

		// check if person is in directory
		//
		if (this.directory[id]) {

			// return directory person
			//
			return this.directory[id];
		} else {

			// find person's location
			//
			let affiliation = person.getAffiliation();
			let affiliations = affiliation? [ affiliation ] : undefined;
			let location = map.getLocationOf(affiliations);

			// add randomness to avoid pileups
			//
			location.add(Vector2.srandom(25, 25));

			// store location in directory
			//
			this.directory[id] = location;

			return location;
		}
	},
});