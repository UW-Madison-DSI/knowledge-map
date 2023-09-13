/******************************************************************************\
|                                                                              |
|                             search-bar-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a search bar view.                             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import People from '../../collections/people.js';
import AcademicAnalyticsPeople from '../../collections/academic-analytics/academic-analytics-people.js';
import AcademicAnalyticsArticles from '../../collections/academic-analytics/activities/academic-analytics-articles.js';
import AcademicAnalyticsAwards from '../../collections/academic-analytics/activities/academic-analytics-awards.js';
import AcademicAnalyticsBookChapters from '../../collections/academic-analytics/activities/academic-analytics-book-chapters.js';
import AcademicAnalyticsBooks from '../../collections/academic-analytics/activities/academic-analytics-books.js';
import AcademicAnalyticsConferenceProceedings from '../../collections/academic-analytics/activities/academic-analytics-conference-proceedings.js';
import AcademicAnalyticsGrants from '../../collections/academic-analytics/activities/academic-analytics-grants.js';
import AcademicAnalyticsPatents from '../../collections/academic-analytics/activities/academic-analytics-patents.js';
import AcademicAnalyticsTechnologies from '../../collections/academic-analytics/activities/academic-analytics-technologies.js';
import GoogleScholarPeople from '../../collections/google-scholar/google-scholar-people.js';
import ToolbarView from './toolbar-view.js';
import NoPeopleDialogView from '../../views/dialogs/no-people-dialog-view.js';

export default ToolbarView.extend({

	//
	// attributes
	//

	id: 'search-bar',

	template: _.template(`
		<input type="text" placeholder="Search.." />

		<select data-toggle="tooltip" title="Category" data-placement="bottom">
			<option value="people">People</option>
			<option value="places">Places</option>
			<option value="grants">Grants</option>
			<option value="articles">Articles</option>
			<option value="chapters">Chapters</option>
			<option value="books">Books</option>
			<option value="proceedings">Proceedings</option>
			<option value="patents">Patents</option>
			<option value="technologies">Technologies</option>
			<option value="awards">Awards</option>
		</select>

		<div class="buttons">
			<button class="clear" type="button" data-toggle="tooltip" title="Clear" data-placement="bottom"><i class="fa fa-times"></i></button>
			<button class="search" type="button" data-toggle="tooltip" title="Search" data-placement="bottom"><i class="fa fa-search"></i></button>
		</div>
	`),

	events: {
		'change select': 'onChangeSelect',
		'click .search': 'onClickSearch',
		'click .clear': 'onClickClear',
		'click input': 'onClickInput',
		'keydown': 'onKeyDown'
	},

	//
	// getting methods
	//

	getSearchParams() {
		let urlSearchParams = new URLSearchParams(window.location.search);
		return Object.fromEntries(urlSearchParams.entries());
	},

	getQueryParams: function(params) {
		let query = this.$el.find('input').val();
		let category = this.$el.find('select').val();
		let source = $('#source-selector select').val();

		params.set('query', query);
		params.set('category', category);
		if (source != 'academic_analytics') {
			params.set('source', source);
		}

		// update params
		//
		params = this.parent.getChildView('activities').getQueryParams(params);
		params = this.parent.getChildView('date').getQueryParams(params);
		params = this.parent.getChildView('map').getQueryParams(params);

		let topView = this.getTopView();
		let sidebar = topView.getChildView('sidebar');
		if (sidebar && sidebar.getQueryParams) {
			params = sidebar.getQueryParams(params);
		}

		return params;
	},

	//
	// setting methods
	//

	setQueryOptions: function(options) {

		// set category
		//
		if (options.category && options.category != 'null') {
			this.$el.find('select').val(options.category);
		}

		// set source
		//
		if (options.source && options.source != 'null') {
			$('#source-selector select').val(options.source);
		}
	},

	setQueryParams: function(params) {
		this.setQueryOptions(params);

		// set input
		//
		if (params.query && params.query != 'null') {
			this.$el.find('input').val(params.query);
		}
	},

	setQuery: function(query, options) {

		// set input
		//
		if (query && query != 'null') {
			this.$el.find('input').val(query);
		}

		if (options) {
			this.setQueryOptions(options);
		}
	},

	//
	// query string methods
	//

	parseQueryString: function() {
		const params = this.getSearchParams();

		// configure ui
		//
		this.setQueryParams(params);
		this.parent.getChildView('activities').setQueryParams(params);
		this.parent.getChildView('date').setQueryParams(params);
		this.parent.getChildView('map').setQueryParams(params);

		// set input
		//
		if (params.query && params.query != 'null') {
			this.search();
		}
	},

	updateQueryString: function() {
		let params = new URLSearchParams();

		// add query to params
		//
		params = this.getQueryParams(params);

		// set address bar
		//
		this.setQueryString(params.toString());
	},

	setQueryString: function(queryString) {
		let address = `${location.pathname}?${queryString}`;
		window.history.replaceState('', '', address);
	},

	pushQueryString: function(queryString) {
		let address = `${location.pathname}?${queryString}`;
		window.history.pushState('', '', address);
	},

	clearQueryString: function() {
		window.history.replaceState('', '', window.location.origin + window.location.pathname);
	},

	//
	// querying methods
	//

	isQuotated: function(string) {
		return string && string[0] == '"' && string[string.length - 1] == '"';
	},

	unQuotated: function(string) {
		return string.substring(1, string.length - 1);
	},

	//
	// getting methods
	//

	getPeople: function(source) {
		switch (source) {
			case 'academic_analytics':
				return new AcademicAnalyticsPeople();
				break;
			default:
				return new GoogleScholarPeople();
				break;
		}
	},

	getActivities: function(activity, source) {
		switch (source) {
			case 'academic_analytics':
				switch (activity) {
					case 'articles':
						return new AcademicAnalyticsArticles();
					case 'awards':
						return new AcademicAnalyticsAwards();
					case 'book_chapters':
						return new AcademicAnalyticsBookChapters();
					case 'books':
						return new AcademicAnalyticsBooks();
					case 'conference_proceedings':
						return new AcademicAnalyticsConferenceProceedings();
					case 'grants':
						return new AcademicAnalyticsGrants();
					case 'patents':
						return new AcademicAnalyticsPatents();
					case 'technologies':
						return new AcademicAnalyticsTechnologies();
				}
			case 'google_scholar':
				switch (activity) {
					case 'articles':
						return new GoogleScholarArticles();
					case 'awards':
						return new GoogleScholarAwards();
					case 'book_chapters':
						return new GoogleScholarBookChapters();
					case 'books':
						return new GoogleScholarBooks();
					case 'conference_proceedings':
						return new GoogleScholarConferenceProceedings();
					case 'grants':
						return new GoogleScholarGrants();
					case 'patents':
						return new GoogleScholarPatents();
					case 'technologies':
						return new GoogleScholarTechnologies();
				}
		}
	},

	//
	// searching methods
	//

	searchFor: function(query, options) {

		// configure UI
		//
		this.setQuery(query, options);

		// perform search
		//
		this.search({
			clear: true
		});
	},

	search: function(options) {
		let query = this.$el.find('input').val();
		let category = this.$el.find('select').val();
		let source = $('#source-selector select').val();
		let exact = false;

		// clear map
		//
		this.parent.clear();

		if (query == '') {
			return;
		}

		const params = new URLSearchParams(location.search);
		params.set('query', query);

		if (options && options.clear) {
			params.delete('info');
		}

		if (category != 'people') {
			params.set('category', category);
			params.delete('activity');
		}
		if (source != 'academic_analytics') {
			params.set('source', source);
		}

		// perform exact search
		//
		if (this.isQuotated(query)) {
			query = this.unQuotated(query);
			exact = true;
		}

		// set search options
		//
		options = {
			source: source,
			exact: exact
		}

		// set address bar
		//
		this.pushQueryString(params.toString());

		// check for exact match of label
		//
		switch (category || 'people') {
			case 'people':
				this.searchPeople(query, source, options);
				break;
			case 'places':
				this.searchPlaces(query, options);
				break;
			case 'awards':
				this.searchAwards(query, options);
				break;
			case 'articles':
				this.searchArticles(query, options);
				break;
			case 'books':
				this.searchBooks(query, options);
				break;
			case 'chapters':
				this.searchBookChapters(query, options);
				break;
			case 'proceedings':
				this.searchConferenceProceedings(query, options);
				break;
			case 'grants':
				this.searchGrants(query, options);
				break;
			case 'patents':
				this.searchPatents(query, options);
				break;
			case 'technologies':
				this.searchTechnologies(query, options);
				break;
		}
	},

	searchPeople: function(query, source, options) {

		// search people by department
		//
		let department = this.parent.departments.findByName(query);
		if (department) {
			this.parent.showDepartmentPeople(source, department);

		// search people by topic
		//
		} else {
			this.searchPeopleByTopic(query, _.extend({}, options, {

				// callbacks
				//
				success: (people) => {

					// search people by name
					//
					if (!people || people.length == 0) {
						this.searchPeopleByName(query, options);
					}
				}
			}));
		}
	},

	searchPeopleByTopic: function(query, options) {

		// show status message
		//
		this.getTopView().showMessage({
			icon: 'fa fa-search',
			text: 'Searching for people...'
		});

		// find people associated with label
		//
		this.getPeople(options.source).fetchByLabel(query, {

			// options
			//
			source: options? options.source : undefined,
			exact: options? options.exact : undefined,

			// callbacks
			//
			success: (collection) => {
				let people = collection.models;

				// check for exact matches
				//
				if (options && options.exact) {
					people = collection.filterByTopic(query);
				}

				// show results
				//
				options.query = query;
				this.showPeople(people, options);

				// perform callback
				//
				if (options && options.success) {
					options.success(people);
				}
			}
		});
	},

	searchPeopleByName: function(query, options) {

		// show status message
		//
		this.getTopView().showMessage({
			icon: 'fa fa-search',
			text: 'Searching for people...'
		});

		this.getPeople(options.source).fetchByName(query, _.extend({

			// callbacks
			//
			success: (collection) => {
				let people = collection.models;

				if (people.length > 0) {

					// check for exact matches
					//
					if (options && options.exact) {
						let matches = collection.filterByName(query);
						if (matches && matches.length > 0) {
							people = matches;
						}
					}

					// show results
					//
					this.showPeople(people, {
						zoomTo: true
					});

					// autoselect first person
					//
					/*
					if (people.length == 1) {
						this.parent.peopleView.children.findByIndex(0).select();
					}
					*/
				} else {
					/*
					this.getTopView().showMessage({
						icon: 'fa fa-search',
						text: 'No people found.'
					});
					*/
					this.getTopView().showDialog(new NoPeopleDialogView())
				}
			}
		}, options));
	},

	searchPlaces: function(query, options) {
		let buildings = this.parent.buildings.findByName(query, options);

		this.parent.buildingsView.deselectAll();
		if (buildings.length > 0) {
			this.parent.showPlaces(buildings);
		} else {
			this.getTopView().showMessage({
				icon: 'fa fa-search',
				text: 'No places found.'
			});
		}
	},

	searchArticles: function(query, options) {

		// show status message
		//
		this.getTopView().showMessage({
			icon: 'fa fa-search',
			text: 'Searching for articles...'
		});

		this.getActivities('articles', options.source).fetchByTitle(query, {

			// callbacks
			//
			success: (collection) => {

				// hide status message
				//
				this.getTopView().hideMessage();

				// show results
				//
				this.showActivity('articles', collection, {
					query: query,
					exact: options? options.exact : false
				});
			}
		});
	},

	searchAwards: function(query, options) {

		// show status message
		//
		this.getTopView().showMessage({
			icon: 'fa fa-search',
			text: 'Searching for awards...'
		});

		this.getActivities('awards', options.source).fetchByName(query, {

			// callbacks
			//
			success: (collection) => {

				// hide status message
				//
				this.getTopView().hideMessage();

				// show results
				//
				this.showActivity('awards', collection, {
					query: query,
					exact: options? options.exact : false
				});
			}
		});
	},

	searchBookChapters: function(query, options) {

		// show status message
		//
		this.getTopView().showMessage({
			icon: 'fa fa-search',
			text: 'Searching for book chapters...'
		});

		this.getActivities('book_chapters', options.source).fetchByName(query, {

			// callbacks
			//
			success: (collection) => {

				// hide status message
				//
				this.getTopView().hideMessage();

				// show results
				//
				this.showActivity('book_chapters', collection, {
					query: query,
					exact: options? options.exact : false
				});
			}
		});
	},

	searchBooks: function(query, options) {

		// show status message
		//
		this.getTopView().showMessage({
			icon: 'fa fa-search',
			text: 'Searching for books...'
		});

		this.getActivities('books', options.source).fetchByTitle(query, {

			// callbacks
			//
			success: (collection) => {

				// hide status message
				//
				this.getTopView().hideMessage();

				// show results
				//
				this.showActivity('books', collection, {
					query: query,
					exact: options? options.exact : false
				});
			}
		});
	},

	searchConferenceProceedings: function(query, options) {

		// show status message
		//
		this.getTopView().showMessage({
			icon: 'fa fa-search',
			text: 'Searching for conference proceedings...'
		});

		this.getActivities('conference_proceedings', options.source).fetchByTitle(query, {

			// callbacks
			//
			success: (collection) => {

				// hide status message
				//
				this.getTopView().hideMessage();

				// show results
				//
				this.showActivity('conference_proceedings', collection, {
					query: query,
					exact: options? options.exact : false
				});
			}
		});
	},

	searchGrants: function(query, options) {

		// show status message
		//
		this.getTopView().showMessage({
			icon: 'fa fa-search',
			text: 'Searching for grants...'
		});

		this.getActivities('grants', options.source).fetchByName(query, {

			// callbacks
			//
			success: (collection) => {

				// hide status message
				//
				this.getTopView().hideMessage();

				// show results
				//
				this.showActivity('grants', collection, {
					query: query,
					exact: options? options.exact : false
				});
			}
		});
	},

	searchPatents: function(query, options) {

		// show status message
		//
		this.getTopView().showMessage({
			icon: 'fa fa-search',
			text: 'Searching for patents...'
		});

		this.getActivities('patents', options.source).fetchByName(query, {

			// callbacks
			//
			success: (collection) => {

				// hide status message
				//
				this.getTopView().hideMessage();

				// show results
				//
				this.showActivity('patents', collection, {
					query: query,
					exact: options? options.exact : false
				});
			}
		});
	},

	searchTechnologies: function(query, options) {

		// show status message
		//
		this.getTopView().showMessage({
			icon: 'fa fa-search',
			text: 'Searching for technologies...'
		});

		this.getActivities('technologies', options.source).fetchByTitle(query, {

			// callbacks
			//
			success: (collection) => {

				// hide status message
				//
				this.getTopView().hideMessage();

				// show results
				//
				this.showActivity('technologies', collection, {
					query: query,
					exact: options? options.exact : false
				});
			}
		});
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		ToolbarView.prototype.onRender.call(this);

		// add back button handler
		//
		$(window).on('popstate', () => {
			window.setTimeout(() => {
				this.parseQueryString();
			}, 500);
		});
	},

	clear: function() {
		this.$el.find('input').val('');
		this.parent.clear();
		this.parent.labelsView.deselectAll();
		this.clearQueryString();
	},

	//
	// overlay display methods
	//

	showPeople: function(people, options) {
		if (people.length > 1) {
			this.parent.showPeople(people, options);
		} else if (people.length == 1) {
			this.parent.showPerson(people[0], options);
		} else {
			this.getTopView().showMessage({
				icon: 'fa fa-search',
				text: 'No people found.'
			});
		}
	},

	showActivity: function(activity, collection, options) {
		if (collection.length > 0) {
			this.parent.showActivity(activity, collection, options);
		} else {
			this.getTopView().showMessage({
				icon: 'fa fa-search',
				text: 'No ' + activity.replace(/_/g, ' ') + ' found.'
			});
		}
	},

	//
	// mouse event handling methods
	//

	onChangeSelect: function() {
		this.updateQueryString();
	},

	onClickSearch: function() {
		this.search();
	},

	onClickClear: function() {
		this.clear();
		this.parent.resetView();
	},

	onClickInput: function(event) {
		this.$el.find('input').focus();

		// block from parent
		//
		event.stopPropagation();
	},

	//
	// keyboard event handling methods
	//

	onKeyDown: function(event) {
		if (event.keyCode == 13) {
			this.$el.find('.search').trigger('click');
		}

		// block events
		//
		if (event.target.type == 'text') {
			event.stopPropagation();
		}
	}
});