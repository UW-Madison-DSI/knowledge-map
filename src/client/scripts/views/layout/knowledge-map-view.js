/******************************************************************************\
|                                                                              |
|                            knowledge-map-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a map view showing a campus knowledge map.               |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../utilities/math/vector2.js';
import Bounds2 from '../../utilities/bounds/bounds2.js';
import Activity from '../../models/activities/activity.js';
import People from '../../collections/people.js';

// views
//
import CampusMapView from './campus-map-view.js';

// collection views
//
import PeopleView from '../overlays/people/people-view.js';
import ArticlesView from '../overlays/activities/articles/articles-view.js';
import AwardsView from '../overlays/activities/awards/awards-view.js';
import BookChaptersView from '../overlays/activities/book-chapters/book-chapters-view.js';
import BooksView from '../overlays/activities/books/books-view.js';
import ConferenceProceedingsView from '../overlays/activities/conference-proceedings/conference-proceedings-view.js';
import GrantsView from '../overlays/activities/grants/grants-view.js';
import PatentsView from '../overlays/activities/patents/patents-view.js';
import TechnologiesView from '../overlays/activities/technologies/technologies-view.js';

// ui views
//
import SearchBarView from '../toolbars/search-bar-view.js';
import ActivitiesBarView from '../toolbars/activities-bar-view.js';
import HelpBarView from '../toolbars/help-bar-view.js';
import SettingsBarView from '../toolbars/settings-bar-view.js';
import MapBarView from '../toolbars/map-bar-view.js';
import DateBarView from '../toolbars/date-bar-view.js';

//
// locals
//

export default CampusMapView.extend({

	//
	// attributes
	//

	template: _.template(`
		<div id="background"></div>

		<svg id="viewport">
			<defs>
				<filter id="outlined" color-interpolation-filters="sRGB">
					<feMorphology in="SourceAlpha" result="MORPH" operator="dilate" radius="1" />
					<feColorMatrix in="MORPH" result="WHITENED" type="matrix" values="-1 0 0 0 1, 0 -1 0 0 1, 0 0 -1 0 1, 0 0 0 1 0"/>
					<feMerge>
						<feMergeNode in="WHITENED"/>
						<feMergeNode in="SourceGraphic"/>
					</feMerge>
				</filter>
				<filter id="selected-text" x="-.025" y="0.15" width="1.05" height="0.75">
					<feFlood flood-color="black"/>
					<feComposite in="SourceGraphic"/>
				</filter>
			</defs>
			<g id="tiles"></g>
			<g id="departments" style="display:none"></g>
		</svg>

		<div id="user-interface" class="full-screen overlay">
			<a id="logo" href="http://wisc.edu" target="_blank"><img src="images/uw-logo.svg" /></a>
			<div id="search-bar"></div>
			<div id="source-selector" class="hidden toolbar">
				<div class="title">Source</div>
				<select data-toggle="tooltip" title="Data Source" data-placement="bottom">
					<option value="academic_analytics">Academic Analytics</option>
					<option value="google_scholar">Google Scholar</option>
				</select>
			</div>
			<div id="activities-bar"></div>
			<div id="activity-bar"></div>
			<div id="help-bar"></div>
			<div id="settings-bar"></div>
			<div id="map-bar"></div>
			<div id="zoom-bar"></div>
			<div id="date-bar"></div>
		</div>

		<div id="footer" class="fineprint">
			<a href="https://datascience.wisc.edu" target="_blank">
				Data Science Institute, University of Wisconsin-Madison
			</a>
		</div>
	`),

	regions: {
		search: {
			el: '#search-bar',
			replaceElement: true
		},
		activities: {
			el: '#activities-bar',
			replaceElement: true
		},
		help: {
			el: '#help-bar',
			replaceElement: true
		},
		settings: {
			el: '#settings-bar',
			replaceElement: true
		},
		map: {
			el: '#map-bar',
			replaceElement: true
		},
		zoom: {
			el: '#zoom-bar',
			replaceElement: true
		},
		date: {
			el: '#date-bar',
			replaceElement: true
		}
	},

	events: {
		'click': 'onClick'
	},

	maxMarkerLabels: 250,

	//
	// querying methods
	//

	numMarkerLabels: function() {
		return this.viewport.$el.find('.marker text').length;
	},

	//
	// getting methods
	//

	getLocationOf: function(interests) {
		let location = this.labelsView.getLocationOf(interests);

		if (!location) {
			location = Vector2.srandom(300, 200);
		}

		return location;
	},

	getVerticesZoomLevel: function(vertices) {
		if (vertices.length > 1) {
			let bounds2 = new Bounds2();
			for (let i = 0; i < vertices.length; i++) {
				bounds2.extendTo(vertices[i]);
			}
			let size = bounds2.size();
			let dimension = (size.x + size.y) / 2;
			if (dimension != 0) {
				let height = this.viewport.$el.height();
				let size = dimension / height;
				return Math.log2(1 / size) - 1;
			}
		}
	},

	getZoomLevel: function() {
		return this.getChildView('zoom').scaleToZoomLevel(this.viewport.scale);
	},

	getActivityLocation: function(activityView) {
		let location = new Vector2(0, 0);
		let personView = activityView.getParentView('person');
		// return this.getLocationOf(activity.model.getLabels());

		// center on activity's person
		//
		if (personView) {
			location = personView.markerView.location;
		}

		// add randomness
		//
		location = location.plus(Vector2.srandom(300, 200));

		return location;
	},

	getPersonView: function() {
		if (this.peopleView && this.peopleView.children.length == 1) {
			return this.peopleView.children.findByIndex(0);
		} else {
			return this.selected || this.current;
		}
	},

	//
	// setting methods
	//

	setYear: function(value) {
		let personView = this.getPersonView();
		if (personView) {
			personView.setYear(value);
			this.viewport.rescale();		
		}
	},

	setRange: function(values) {
		let personView = this.getPersonView();
		if (personView) {
			personView.setRange(values);
			this.viewport.rescale();
		}
	},

	//
	// selection methods
	//

	selectPerson: function(personView) {
		this.selected = personView;

		// update sidebar
		//
		this.parent.parent.showPerson(personView.model);

		// update mainbar
		//
		this.hideUnselectedPeople();
	},

	deselectPerson: function() {
		this.selected = null;

		// update sidebar
		//
		/*
		if (this.people.length > 1) {
			this.parent.parent.showPeople(this.people);
		} else if (this.people.length == 1) {
			this.parent.parent.showPerson(this.people.at(0));
		} else {
			this.parent.parent.clearSideBar();
		}
		*/

		// update mainbar
		//
		this.showUnselectedPeople();
	},

	//
	// rendering methods
	//

	showToolbars: function() {
		if (this.hasRegion('search')) {
			this.showChildView('search', new SearchBarView({
				parent: this
			}));
		}
		if (this.hasRegion('activities')) {
			this.showChildView('activities', new ActivitiesBarView({
				parent: this
			}));
		}
		if (this.hasRegion('help')) {
			this.showChildView('help', new HelpBarView({
				parent: this
			}));
		}
		if (this.hasRegion('settings')) {
			this.showChildView('settings', new SettingsBarView({
				parent: this
			}));
		}
		if (this.hasRegion('map')) {
			this.showChildView('map', new MapBarView({
				parent: this
			}));
		}
		if (this.hasRegion('date')) {
			this.showChildView('date', new DateBarView({
				parent: this,

				// callbacks
				//
				onchange: () => {
					this.getChildView('search').updateQueryString();
				}
			}));
		}
	},

	initPeople: function() {
		this.people = new People();
		this.peopleView = new PeopleView({
			collection: this.people
		});
		this.viewport.el.append(this.peopleView.render());
	},

	start: function() {

		// init ui elements
		//
		this.initPeople();
		this.showToolbars();
		this.parent.parent.showSideBar();

		// set initial state
		//
		this.getChildView('activities').hide();
		this.getChildView('date').hide();

		// show initial search
		//
		this.getChildView('search').parseQueryString();
	},

	showPerson: function(person, options) {

		// hide status message
		//
		this.getTopView().hideMessage();

		// show people on map
		//
		this.people.reset([person]);
		if (this.peopleView) {
			this.peopleView.$el.remove();
		}
		this.peopleView = new PeopleView({
			collection: this.people,
			parent: this.viewport
		});
		this.viewport.el.append(this.peopleView.render());

		// show person in sidebar
		//
		this.parent.parent.showPerson(person, options);

		// fit people to view
		//
		if (!options || options.zoomTo != false) {
			this.zoomToLocations(this.peopleView.getLocations());
		}
	},

	showPeople: function(people, options) {

		// hide status message
		//
		this.getTopView().hideMessage();

		// show people on map
		//
		this.people.reset(people);
		if (this.peopleView) {
			this.peopleView.$el.remove();
		}
		this.peopleView = new PeopleView({
			collection: this.people,
			parent: this.viewport
		});
		this.viewport.el.append(this.peopleView.render());
		this.showUnselectedPeople();

		// show people in sidebar
		//
		this.parent.parent.showPeople(this.people, options);

		// fit people to view
		//
		if (!options || options.zoomTo != false) {
			if (this.people.length > 0) {
				this.zoomToLocations(this.peopleView.getLocations());
			}
		}
	},

	showDepartmentPeople: function(source, department, options) {
		this.getChildView('search').getPeople(source).fetchByInstitutionUnit(department, {

			// callbacks
			//
			success: (collection) => {
				let people = collection.models;

				// add affilations
				//
				this.getChildView('search').getPeople(source).fetchByInstitutionUnitAffiliation(department, {

					// callbacks
					//
					success: (collection) => {
						people = people.concat(collection.models);

						// show results
						//
						this.showPeople(people, options);
					}
				});
			}
		});
	},

	showPlaces(places) {
		this.buildingsView.select(places);
		let locations = this.buildingsView.getLocationsOf(places, this);

		// show popover if one place
		//
		/*
		if (places.length == 1) {
			let view = this.buildingsView.findByModel(places[0]);
			window.setTimeout(() => {
				view.showPopover();
			}, 2000);
		}
		*/

		this.zoomToLocations(locations);

		// show places in sidebar
		//
		this.parent.parent.showSideBar();
		this.parent.parent.showPlaces(places);
	},

	getActivitiesView: function(activity, params) {
		switch (activity) {
			case 'articles':
				return new ArticlesView(params);
			case 'awards':
				return new AwardsView(params);
			case 'book_chapters':
				return new BookChaptersView(params);
			case 'books':
				return new BooksView(params);
			case 'conference_proceedings':
				return new ConferenceProceedingsView(params);
			case 'grants':
				return new GrantsView(params);
			case 'patents':
				return new PatentsView(params);
			case 'technologies':
				return new TechnologiesView(params);
		}
	},

	showActivity: function(activity, collection, options) {
		this.activitiesView = this.getActivitiesView(activity, {
			collection: collection,
			parent: this.viewport
		});

		this.viewport.add(this.activitiesView);
		this.current = this.activitiesView;
		this.selected = null;

		let locations = this.activitiesView.getLocations();
		this.zoomToLocations(locations);

		// show activities in sidebar
		//
		this.parent.parent.showSideBar();
		this.parent.parent.showActivities(activity, collection, options);

		// configure UI
		//
		this.showActivitiesBar();
		this.showDateBar();

		return this.activitiesView;
	},

	//
	// hiding methods
	//

	showActivitiesBar: function(options) {
		this.getChildView('activities').show(options);
		this.getChildView('help').show();
	},

	hideActivitiesBar: function() {
		this.getChildView('activities').hide();
		this.getChildView('help').show();
	},

	showDateBar() {
		this.$el.find('#footer').hide();
		this.getChildView('date').show();
	},

	hideDateBar() {
		this.getChildView('date').hide();
		this.$el.find('#footer').show();
	},

	hidePopovers: function() {
		$('.popover').remove();
	},

	//
	// navigation methods
	//

	zoomToPerson: function(personView) {

		// zoom to person
		//
		let collaboratorViews = personView.getCollaboratorViews();
		if (collaboratorViews) {
			if (collaboratorViews.length > 1) {
				let locations = this.people.getPeopleLocations(collaboratorViews);
				locations.push(personView.markerView.location);
				this.zoomToLocations(locations);
			} else {
				this.panTo(personView.markerView.location);
			}
		} else {
			this.panTo(personView.markerView.location);
		}
	},

	zoomToPeople: function() {
		let locations = [];
		for (let i = 0; i < this.peopleView.children.length; i++) {
			let personView = this.peopleView.children.findByIndex(i);
			locations.push(personView.markerView.getLocation());
		}
		this.zoomToLocations(locations);
	},

	//
	// clearing methods
	//

	clearPeople: function() {
		this.people.reset();
		this.showUnselectedPeople();

		if (this.peopleView) {
			this.peopleView.$el.remove();
			this.peopleView = null;
		}

		this.getChildView('help').show();
		this.parent.parent.clearSideBar();
	},

	clearActivities() {
		if (this.activitiesView) {
			this.activitiesView.destroy();
			this.activitiesView = null;
		}
		this.hideActivitiesBar();
	},

	clearCollaborators: function() {
		this.viewport.$el.find('.collaborators').remove();
	},

	clearPopovers: function() {
		$('.popover').remove();
	},

	reset: function() {

		// reset UI elements to their initial state
		//
		this.getChildView('help').show();
		this.hideDateBar();
		this.hideActivitiesBar();
		this.parent.hideSideBar();
	},

	clear: function() {
		this.getTopView().hideMessage();
		this.clearPeople();
		this.clearActivities();
		this.clearCollaborators();
		this.clearPopovers();
		this.deselectAll();
		this.showMarkerLabels();
		this.reset();
		this.resetView();
	},

	//
	// hiding methods
	//

	showMarkerLabels: function() {
		this.$el.removeClass('hide-marker-labels');
	},

	hideMarkerLabels: function() {
		this.$el.addClass('hide-marker-labels');
	},

	showViewportMarkerLabels: function() {
		this.viewport.$el.removeClass('hide-marker-labels');
	},

	hideViewportMarkerLabels: function() {
		this.viewport.$el.addClass('hide-marker-labels');
	},

	//
	// selection methods
	//

	deselectAll: function() {
		this.deselectPeople();
		this.deselectBuildings();
	},

	deselectPeople: function() {
		this.selected = null;

		if (this.peopleView) {
			this.peopleView.deselectAll();
		}
	},

	deselectBuildings: function() {
		if (this.buildingsView) {
			this.buildingsView.deselectAll();
		}
	},

	deselectMarkers: function() {
		this.$el.find('.marker.selected').removeClass('selected');
	},

	//
	// selection hiding methods
	//

	showUnselectedPeople: function() {
		this.viewport.$el.removeClass('hide-unselected-people');
	},

	hideUnselectedPeople: function() {
		this.viewport.$el.addClass('hide-unselected-people');
	},

	showUnselectedActivity: function(activity) {
		this.viewport.$el.removeClass('hide-unselected-' + activity);
	},

	hideUnselectedActivity: function(activity) {
		this.viewport.$el.addClass('hide-unselected-' + activity);
	},

	showUnselectedItems: function() {
		this.showUnselected();
		for (let i = 0; i < Activity.kinds.length; i++) {
			this.showUnselectedActivity(Activity.kinds[i]);
		}
	},

	hideUnselectedItems: function() {
		this.hideUnselected();
		for (let i = 0; i < Activity.kinds.length; i++) {
			this.hideUnselectedActivity(Activity.kinds[i]);
		}
	},

	//
	// navigation event handling methods
	//

	onZoomStart: function() {

		// call superclass method
		//
		CampusMapView.prototype.onZoomStart.call(this);

		if (this.numMarkerLabels() > this.maxMarkerLabels) {
			this.hideViewportMarkerLabels();
		}
	},

	onZoomEnd: function() {

		// call superclass method
		//
		CampusMapView.prototype.onZoomEnd.call(this);

		this.showViewportMarkerLabels();
	},

	onDragStart: function() {

		// call superclass method
		//
		CampusMapView.prototype.onDragStart.call(this);

		if (this.numMarkerLabels() > this.maxMarkerLabels) {
			this.hideViewportMarkerLabels();
		}
	},

	onDragEnd: function(dragx, dragy) {

		// call superclass method
		//
		CampusMapView.prototype.onDragEnd.call(this, dragx, dragy);

		this.showViewportMarkerLabels();
	},

	onWheelZoomStart: function() {

		// call superclass method
		//
		CampusMapView.prototype.onWheelZoomStart.call(this);

		if (this.numMarkerLabels() > this.maxMarkerLabels) {
			this.hideViewportMarkerLabels();
		}
	},

	onWheelZoomEnd: function() {

		// call superclass method
		//
		CampusMapView.prototype.onWheelZoomEnd.call(this);

		this.showViewportMarkerLabels();
	},

	//
	// mouse event handling methods
	//

	onClick: function() {
		if (!this.selected) {
			this.deselectPeople();
		} else {
			this.deselectMarkers();
		}

		if (this.hasChildView('search')) {
			this.getChildView('search').$el.find('input').blur();
		}
	},

	onClickLabel: function(labelView) {
		this.getChildView('search').searchFor(labelView.options.fullname, {
			category: 'people'
		});
	}
});