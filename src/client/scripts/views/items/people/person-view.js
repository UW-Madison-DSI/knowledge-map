/******************************************************************************\
|                                                                              |
|                               person-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an item list view.                                       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../../../../vendor/bootstrap/js/tab.js';
import Activity from '../../../models/activities/activity.js';
import BaseView from '../../base-view.js';
import ProfileView from './profile/profile-view.js';
import CollaboratorsView from '../collaborators/collaborators-view.js';
import EditPersonDialogView from '../../dialogs/edit-person-dialog-view.js';

// activity views
//
import GrantsView from '../activities/grants/grants-view.js';
import ArticlesView from '../activities/articles/articles-view.js';
import AwardsView from '../activities/awards/awards-view.js';
import BookChaptersView from '../activities/book-chapters/book-chapters-view.js';
import BooksView from '../activities/books/books-view.js';
import ConferenceProceedingsView from '../activities/conference-proceedings/conference-proceedings-view.js';
import PatentsView from '../activities/patents/patents-view.js';
import TechnologiesView from '../activities/technologies/technologies-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	item: 'person',
	className: 'info panel',

	template: _.template(`
		<button id="close" data-toggle="tooltip" title="Close" data-placement="right">
			<i class="fa fa-close"></i>
		</button>

		<div class="title">
			<div class="icon">
				<% if (title && title == 'Professor') { %>
				<i class="fa fa-user-graduate"></i>
				<% } else { %>
				<i class="fa fa-user"></i>
				<% } %>
			</div>

			<a href="<%= url %>" target="_blank">
				<% if (first_name) { %><span class="first-name"><%= first_name %></span><% } %>
				<% if (middle_name) { %><span class="middle-name"><%= middle_name %></span><% } %>
				<% if (last_name) { %><span class="last-name"><%= last_name %></span><% } %>
			</a>

			<% if (title) { %>
			<div class="subtitle"><%= title %></div>
			<% } %>
		</div>

		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="profile tab active" data-toggle="tooltip" title="Profile">
				<a class="icon" role="tab" data-toggle="tab">
					<i class="fa fa-info-circle"></i>
					<i class="fa fa-spinner spinning" style="display:none"></i>
				</a>
			</li>
			<li role="presentation" class="collaborators tab" data-toggle="tooltip" title="Collaborators">
				<a class="icon" role="tab" data-toggle="tab">
					<i class="fa fa-users"></i>
				</a>
			</li>
			<li role="presentation" class="grants tab" data-toggle="tooltip" title="Grants">
				<a class="icon" role="tab" data-toggle="tab">
					<i class="fa fa-money-check-dollar"></i>
				</a>
			</li>
			<li role="presentation" class="articles tab" data-toggle="tooltip" title="Articles">
				<a class="icon" role="tab" data-toggle="tab">
					<i class="fa fa-file-text"></i>
				</a>
			</li>
			<li role="presentation" class="book-chapters tab" data-toggle="tooltip" title="Book Chapters">
				<a class="icon" role="tab" data-toggle="tab">
					<i class="fa fa-book-open"></i>
				</a>
			</li>
			<li role="presentation" class="books tab" data-toggle="tooltip" title="Books">
				<a class="icon" role="tab" data-toggle="tab">
					<i class="fa fa-book"></i>
				</a>
			</li>
			<li role="presentation" class="conference-proceedings tab" data-toggle="tooltip" title="Conference Proceedings">
				<a class="icon" role="tab" data-toggle="tab">
					<i class="fa fa-microphone"></i>
				</a>
			</li>
			<li role="presentation" class="patents tab" data-toggle="tooltip" title="Patents">
				<a class="icon" role="tab" data-toggle="tab">
					<i class="fa fa-lightbulb"></i>
				</a>
			</li>
			<li role="presentation" class="technologies tab" data-toggle="tooltip" title="Technologies">
				<a class="icon" role="tab" data-toggle="tab">
					<i class="fa fa-gear"></i>
				</a>
			</li>
			<li role="presentation" class="awards tab" data-toggle="tooltip" title="Awards">
				<a class="icon" role="tab" data-toggle="tab">
					<i class="fa fa-trophy"></i>
				</a>
			</li>
		</ul>

		<div class="details"></div>

		<% if (is_protected) { %>
		<div class="buttons">
			<button class="edit-person">Edit Person</button>
		</div>
		<% } %>
	`),

	regions: {
		details: '.details'
	},

	events: {
		'click .nav-tabs > li > a': 'onClickTab',
		'click #close': 'onClickClose',
		'click .edit-person': 'onClickEditPerson'
	},

	//
	// mouse event handling methods
	//

	onClickAddPerson: function() {
		this.getTopView().showAddPersonDialog();
	},

	//
	// querying methods
	//

	toCSV: function() {
		let csv = '';
		csv += 'First Name, ';
		csv += 'Middle Name, ';
		csv += 'Last Name, ';
		csv += 'Primary Affiliation, ';
		csv += 'Other Affiliations, ';
		csv += 'Interests ';
		csv += '\n';
		csv += (this.model.get('first_name') || '') + ',';
		csv += (this.model.get('middle_name') || '') + ',';
		csv += (this.model.get('last_name') || '') + ',';
		csv += (this.model.get('primary_affiliation') || '') + ',';
		csv += '"' + this.model.getSecondaryAffiliations().join(', ') + '",';
		csv += '"' + this.model.get('interests').join(', ') + '"';
		csv += '\n';
		return csv;
	},

	toJSON: function() {
		let data = [];
		data.push({
			'First Name': this.model.get('first_name'),
			'Middle Name': this.model.get('middle_name'),
			'Last Name': this.model.get('last_name'),
			'Primary Affiliation': this.model.get('primary_affiliation'),
			'Other Affiliations': this.model.getSecondaryAffiliations(),
			'Interests': this.model.get('interests')
		});
		return JSON.stringify(data, null, 4);
	},

	//
	// getting methods
	//

	getSearchParams: function() {
		let urlSearchParams = new URLSearchParams(window.location.search);
		return Object.fromEntries(urlSearchParams.entries());
	},

	getQueryParams: function(params) {

		// add activity to params
		//
		if (this.info && this.info != 'profile') {
			params.set('info', this.info);
		}

		return params;
	},

	//
	// setting methods
	//

	setActiveTab: function(tab) {
		this.$el.find('li.active').removeClass('active');
		this.$el.find('li.' + tab.replace(/_/g, '-')).addClass('active');
	},

	setYear: function(value) {
		if (this.hasChildView('details') && this.getChildView('details').setYear) {
			this.getChildView('details').setYear(value);
		}
	},

	setRange: function(values) {
		if (this.hasChildView('details') && this.getChildView('details').setRange) {
			this.getChildView('details').setRange(values);
		}
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			other_affiliations: this.model.getSecondaryAffiliations()
		};
	},

	onRender: function() {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');
		let info = this.getSearchParams().info || 'profile';

		// set initial state
		//
		this.$el.find('li').hide();
		this.$el.find('li.profile').show();
		this.setActiveTab(info);
		this.showInfo(info);
		mainView.showSideBar();

		// fetch model counts
		//
		this.showSpinner();
		this.model.clone().fetch({

			// callbacks
			//
			success: (model) => {
				this.hideSpinner();
				this.showCounts(model);
			}
		});

		// hide close button
		//
		if (mapView.peopleView.children.length <= 1) {
			this.$el.find('#close').hide();
		}

		// add tooltip triggers
		//
		this.addTooltips();
	},

	showInfo: function(info) {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');
		let personView = mapView.peopleView.children.findByModel(this.model);

		// set defaults
		//
		if (!info) {
			info = 'profile';
		}

		if (!personView) {
			personView = mapView.peopleView.children.findByIndex(0);
		}
		this.personView = personView;

		// show only one activity at a time
		//
		if (this.info == 'collaborators') {
			personView.hideCollaborators();
		} else if (this.info != 'profile') {
			personView.hideActivity(this.info);
		}

		this.info = info;

		// update query string
		//
		mapView.getChildView('search').updateQueryString();

		switch (info) {

			case 'profile':
				this.showProfile();
				mainView.showProfileDetails(this.model);

				// configure map view
				//
				mapView.hideDateBar();
				mapView.hideActivitiesBar();
				break;

			case 'collaborators':
				personView.showCollaborators({

					// callbacks
					//
					done: (collaboratorsView) => {
						this.showCollaborators();

						// configure map view
						//
						mapView.showDateBar();
						mapView.hideActivitiesBar();

						// zoom to collaborators
						//
						if (collaboratorsView) {
							mapView.zoomToLocations(collaboratorsView.getLocations());
						}
					}
				});
				break;

			default:
				personView.showActivity(info, {

					// callbacks
					//
					done: (activitiesView) => {
						this.showActivity(info);

						// configure map view
						//
						mapView.showDateBar();
						mapView.showActivitiesBar();

						// update activity date
						//
						mapView.getChildView('date').update();

						// zoom to activity
						//
						if (activitiesView) {
							mapView.zoomToLocations(activitiesView.getLocations());
						}
					}
				});
				break;
		}
	},

	showProfile: function() {
		this.showChildView('details', new ProfileView({
			model: this.model
		}));
	},

	addBadge: function(element, count) {
		$(element).append($('<span class="badge">' + count + '</span>'));
	},

	updateTabCount: function(element, count) {
		if (count == 0) {
			element.hide();
		} else {
			element.show();
			this.addBadge(element, count);
		}
	},

	showCounts: function(model) {
		this.updateTabCount(this.$el.find('li.collaborators'), model.get('num_collaborators'));
		this.updateTabCount(this.$el.find('li.grants'), model.get('num_grants'));
		this.updateTabCount(this.$el.find('li.articles'), model.get('num_articles'));
		this.updateTabCount(this.$el.find('li.book-chapters'), model.get('num_book_chapters'));
		this.updateTabCount(this.$el.find('li.books'), model.get('num_books'));
		this.updateTabCount(this.$el.find('li.conference-proceedings'), model.get('num_conference_proceedings'));
		this.updateTabCount(this.$el.find('li.patents'), model.get('num_patents'));
		this.updateTabCount(this.$el.find('li.technologies'), model.get('num_technologies'));
		this.updateTabCount(this.$el.find('li.awards'), model.get('num_awards'));
	},

	showCollaborators: function() {
		let collection = this.model.get('collaborators');
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');
		let range = mapView.getChildView('date').range;
		let color = 'grey';

		this.showChildView('details', new CollaboratorsView({
			collection: collection,
			nested: true,

			// callbacks
			//
			onclick: (item) => {
				let view = this.personView.collaboratorsView.children.findByModel(item.model);
				let topView = this.getTopView();
				let mainView = topView.getChildView('mainbar');
				let mapView = mainView.getChildView('mainbar');

				// reset map
				//
				mapView.deselectAll();
				mapView.clearPopovers();

				// select collaborator marker
				//
				view.toTop();
				view.markerView.select();
				mapView.goTo(view.markerView.location, 1, {

					// callbacks
					//
					done: () => {
						view.markerView.showPopover();
					}
				});
			}
		}));

		mainView.showTrends('collaborators', range, collection, color);
	},

	showActivityView(ActivityView, activity) {
		let collection = this.model.get(activity);
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');
		let range = mapView.getChildView('date').range;
		let color = Activity.colors[activity];

		this.showChildView('details', new ActivityView({
			collection: collection,
			nested: true
		}));

		mainView.showTrends(activity, range, collection, color);
	},

	showActivity: function(activity) {
		switch (activity) {
			case 'awards':
				this.showActivityView(AwardsView, activity);
				break;
			case 'articles':
				this.showActivityView(ArticlesView, activity);
				break;
			case 'book_chapters':
				this.showActivityView(BookChaptersView, activity);
				break;
			case 'books':
				this.showActivityView(BooksView, activity);
				break;
			case 'conference_proceedings':
				this.showActivityView(ConferenceProceedingsView, activity);
				break;
			case 'grants':
				this.showActivityView(GrantsView, activity);
				break;
			case 'patents':
				this.showActivityView(PatentsView, activity);
				break;
			case 'technologies':
				this.showActivityView(TechnologiesView, activity);
				break;
		}
	},

	showSpinner: function() {
		this.$el.find('.nav-tabs .profile .fa-info-circle').hide();
		this.$el.find('.nav-tabs .profile .fa-spinner').show();
	},

	hideSpinner: function() {
		this.$el.find('.nav-tabs .profile .fa-info-circle').show();
		this.$el.find('.nav-tabs .profile .fa-spinner').hide();
	},

	//
	// dialog rendering methods
	//

	showEditPersonDialog: function() {
		this.getTopView().showDialog(new EditPersonDialogView({
			model: this.model,
			parent: this
		}));
	},

	//
	// mouse event handling methods
	//

	onClickTab: function(event) {
		let className = $(event.target).closest('li').attr('class');
		let info = className.replace('tab', '').replace('tooltip-trigger', '').replace('active', '').replace(/-/g, '_').trim();
		
		if (info != this.info) {

			// clear current sidebar view
			//
			this.showChildView('details', new BaseView({
				template: _.template('<div class="message">Loading...</div>')
			}));

			this.showInfo(info);
		}
	},

	onClickClose: function() {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');

		// close trends view 
		//
		mainView.hideSideBar();

		// deselect selected person
		//
		mapView.deselectAll();
		mapView.peopleView.clearAll();
		mapView.showUnselectedPeople();
		mapView.zoomToPeople();

		// hide activity oriented ui elements
		//
		mapView.hideDateBar();

		// replace this view
		//
		this.parent.showPeople(mapView.peopleView.collection);
	},

	onClickEditPerson: function() {
		this.showEditPersonDialog();
	}
});