/******************************************************************************\
|                                                                              |
|                                person-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseView from '../../base-view.js';
import SVGRenderable from '../../svg/behaviors/svg-renderable.js';
import Person from '../../../models/person.js';
import Activity from '../../../models/activities/activity.js';
import PersonMarkerView from './person-marker-view.js';
import AffiliationShowable from './behaviors/affiliation-showable.js';
import CollaboratorShowable from '../collaborators/collaborator-showable.js';

// activity views
//
import ActivityShowable from '../activities/activity-showable.js';
import ArticleShowable from '../activities/articles/article-showable.js';
import AwardShowable from '../activities/awards/award-showable.js';
import BookShowable from '../activities/books/book-showable.js';
import BookChapterShowable from '../activities/book-chapters/book-chapter-showable.js';
import ConferenceProceedingShowable from '../activities/conference-proceedings/conference-proceeding-showable.js';
import GrantShowable from '../activities/grants/grant-showable.js';
import PatentShowable from '../activities/patents/patent-showable.js';
import TechnologyShowable from '../activities/technologies/technology-showable.js';

export default BaseView.extend(_.extend({}, SVGRenderable, AffiliationShowable, CollaboratorShowable, ActivityShowable, ArticleShowable, AwardShowable, BookShowable, BookChapterShowable, ConferenceProceedingShowable, GrantShowable, PatentShowable, TechnologyShowable, {

	//
	// attributes
	//

	tagName: 'g',
	className: 'person',
	animated: true,

	//
	// constructor
	//

	initialize: function(options) {

		// set attributes
		//
		this.activityViews = [];
	},

	//
	// getting methods
	//

	getMarkerView: function() {
		return new PersonMarkerView({
			model: this.model,
			parent: this,

			// callbacks
			//
			onclick: () => {
				this.select();
			}
		});
	},

	getContributorViews: function() {
		let views = [];
		for (let i = 0; i < Activity.kinds.length; i++) {
			let activity = Activity.kinds[i];
			views = views.concat(this.getActivityContributorViews(activity));
		}
		return views;
	},

	getContributorLocations: function(contributorViews) {
		let locations = [];
		for (let i = 0; i < contributorViews.length; i++) {
			let contributorView = contributorViews[i];
			if (contributorView.location) {
				locations.push(contributorView.location);
			}
		}
		return locations;
	},

	getActivityContributorViews: function(activity) {
		let views = [];
		let activityViews = this.activityViews[activity];
		for (let i = 0; i < activityViews.length; i++) {
			views = views.concat(activityViews[i].contributorViews);
		}
		return views;
	},

	//
	// setting methos
	//

	setYear: function(year, options) {
		if (this.collaboratorsView) {
			this.collaboratorsView.setYear(year, options);
		}
		for (let i = 0; i < Activity.kinds.length; i++) {
			this.setActivityYear(Activity.kinds[i], year, options);
		}
	},

	setRange: function(range, options) {
		if (this.collaboratorsView) {
			this.collaboratorsView.setRange(range, options);
		}
		for (let i = 0; i < Activity.kinds.length; i++) {
			this.setActivityRange(Activity.kinds[i], range, options);
		}
	},

	//
	// selection methods
	//

	isSelected: function() {
		return this.$el.hasClass('selected');
	},

	select: function(options) {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');

		// show in sidebar
		//
		if (this.isSelected()) {
			mapView.selectPerson(this);
		}

		this.markerView.select();
		mapView.goTo(this.markerView.getLocation(), 1);
		this.$el.addClass('selected');
	},

	deselect: function() {
		this.$el.removeClass('selected');
		this.markerView.deselect();
		this.$el.find('.selected').removeClass('selected');

		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.parent.deselectPerson();
		}
	},

	selectContributor: function(contributor) {
		for (let i = 0; i < People.activities.length; i++) {
			let activity = People.activities[i];
			let activityViews = this.activityViews[activity];
			for (let j = 0; j < this.activityViews.length; j++) {
				this.activityViews[j].selectContributor(contributor);
			}
		}
	},

	selectItemsByContributor: function(contributor) {
		for (let i = 0; i < People.activities.length; i++) {
			let activity = People.activities[i];
			let activityViews = this.activityViews[activity];
			for (let j = 0; j < this.activityViews.length; j++) {
				this.activityViews[j].selectByContributor(contributor);
			}
		}
	},

	//
	// rendering methods
	//

	toElement: function() {

		// create element
		//
		let element = document.createElementNS('http://www.w3.org/2000/svg', this.tagName);

		// set class
		//
		if (this.className) {
			$(element).attr('class', this.className);
		}

		return element;
	},

	render: function() {
		this.$el = $(this.toElement());
		this.showMarker();
		this.showAffiliations();
		return this.$el;
	},

	onRender: function() {
		this.show();
	},

	showMarker: function() {
		this.markerView = this.getMarkerView();
		this.$el.append(this.markerView.render());
	},

	toTop: function() {
		let parent = this.$el.parent();
		this.$el.detach();
		parent.append(this.$el);
	},

	//
	// activity rendering methods
	//

	showActivityViews(activity, views) {
		this.activity = activity;
		if (views) {
			this.activityViews[activity] = views;
			this.activityViews[activity].show();
		} else if (this.activityViews[activity]) {
			this.activityViews[activity].grow();
		}
	},

	showSidebarActivities(activity, collection) {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.parent.parent.getChildView('sidebar').showActivities(activity, collection);
		}
	},

	showActivity(activity, options) {
		let views;

		switch (activity) {
			case 'articles':
				this.showArticles({

					// callbacks
					//
					done: (views) => {
						this.showActivityViews(activity, views);
						if (options && options.done) {
							options.done(views);
						}
					}
				});
				break;
			case 'awards':
				this.showAwards({

					// callbacks
					//
					done: (views) => {
						this.showActivityViews(activity, views);
						if (options && options.done) {
							options.done(views);
						}
					}
				});
				break;
			case 'book_chapters':
				this.showBookChapters({

					// callbacks
					//
					done: (views) => {
						this.showActivityViews(activity, views);
						if (options && options.done) {
							options.done(views);
						}
					}
				});
				break;
			case 'books':
				this.showBooks({

					// callbacks
					//
					done: (views) => {
						this.showActivityViews(activity, views);
						if (options && options.done) {
							options.done(views);
						}
					}
				});
				break;
			case 'conference_proceedings':
				this.showConferenceProceedings({

					// callbacks
					//
					done: (views) => {
						this.showActivityViews(activity, views);
						if (options && options.done) {
							options.done(views);
						}
					}
				});
				break;
			case 'grants':
				this.showGrants({

					// callbacks
					//
					done: (views) => {
						this.showActivityViews(activity, views);
						if (options && options.done) {
							options.done(views);
						}
					}
				});
				break;
			case 'patents':
				this.showPatents({

					// callbacks
					//
					done: (views) => {
						this.showActivityViews(activity, views);
						if (options && options.done) {
							options.done(views);
						}
					}
				});
				break;
			case 'technologies':
				this.showTechnologies({

					// callbacks
					//
					done: (views) => {
						this.showActivityViews(activity, views);
						if (options && options.done) {
							options.done(views);
						}
					}
				});
				break;
		}
	},

	hideActivity(activity) {
		switch (activity) {
			case 'articles':
				this.hideArticles();	
				break;
			case 'awards':
				this.hideAwards();
				break;
			case 'book_chapters':
				this.hideBookChapters();
				break;
			case 'books':
				this.hideBooks();
				break;
			case 'conference_proceedings':
				this.hideConferenceProceedings();
				break;
			case 'grants':
				this.hideGrants();
				break;
			case 'patents':
				this.hidePatents();
				break;
			case 'technologies':
				this.hideTechnologies();
				break;
		}
	},

	//
	// cleanup methods
	//

	clear: function() {
		this.clearCollaborators();
 		this.clearActivities();
	},

	onBeforeDestroy: function() {
		this.clear();
		this.markerView.destroy();
	}
}));