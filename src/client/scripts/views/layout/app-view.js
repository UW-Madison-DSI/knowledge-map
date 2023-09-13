/******************************************************************************\
|                                                                              |
|                                 app-view.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the top level view of our application.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Activity from '../../models/activities/activity.js';
import Buildings from '../../collections/buildings.js';

import SplitView from '../layout/split-view.js';
import MainView from './main-view.js';
import InfoView from './info-view.js';
import PersonView from '../items/people/person-view.js';
import PeopleView from '../items/people/people-view.js';
import PlacesView from '../items/places/places-view.js';

// activity views
//
import ArticlesView from '../items/activities/articles/articles-view.js';
import AwardsView from '../items/activities/awards/awards-view.js';
import BookChaptersView from '../items/activities/book-chapters/book-chapters-view.js';
import BooksView from '../items/activities/books/books-view.js';
import ConferenceProceedingsView from '../items/activities/conference-proceedings/conference-proceedings-view.js';
import GrantsView from '../items/activities/grants/grants-view.js';
import PatentsView from '../items/activities/patents/patents-view.js';
import TechnologiesView from '../items/activities/technologies/technologies-view.js';

// dialog views
//
import HelpDialogView from '../dialogs/help-dialog-view.js';
import MessageDialogView from '../dialogs/message-dialog-view.js';
import DownloadDialogView from '../dialogs/download-dialog-view.js';

//
// fetching methods
//

export default SplitView.extend({

	//
	// constructor
	//

	onRender: function() {

		// call superclass method
		//
		SplitView.prototype.onRender.call(this);

		// set initial state
		//
		this.clearSideBar();

		// add region for dialogs
		//
		this.addRegion('overlays', {
			el: $('#overlays'),
			replaceElement: false
		});
	},

	//
	// setting methods
	//

	setYear: function(value) {
		if (this.getChildView('sidebar').setYear) {
			this.getChildView('sidebar').setYear(value);
		}
		this.getChildView('mainbar').setYear(value);
	},

	setRange: function(values) {
		if (this.getChildView('sidebar').setRange) {
			this.getChildView('sidebar').setRange(values);
		}
		this.getChildView('mainbar').setRange(values);
	},

	//
	// sidebar rendering methods
	//

	showPerson: function(person, options) {
		this.showChildView('sidebar', new PersonView(_.extend({
			model: person
		}, options)));
	},

	showPeople: function(people, options) {
		this.showChildView('sidebar', new PeopleView(_.extend({
			collection: people
		}, options)));
	},

	showPlaces: function(places, options) {
		this.showChildView('sidebar', new PlacesView(_.extend({
			collection: new Buildings(places)
		}, options)));
	},

	showActivities: function(activity, collection, options) {
		let mainView = this.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');
		let range = mapView.getChildView('date').range;
		let color = Activity.colors[activity];

		switch (activity) {
			case 'articles':
				this.showChildView('sidebar', new ArticlesView(_.extend({
					collection: collection
				}, options)));
				break;
			case 'awards':
				this.showChildView('sidebar', new AwardsView(_.extend({
					collection: collection
				}, options)));
				break;
			case 'book_chapters':
				this.showChildView('sidebar', new BookChaptersView(_.extend({
					collection: collection
				}, options)));
				break;
			case 'books':
				this.showChildView('sidebar', new BooksView(_.extend({
					collection: collection
				}, options)));
				break;
			case 'conference_proceedings':
				this.showChildView('sidebar', new ConferenceProceedingsView(_.extend({
					collection: collection
				}, options)));
				break;
			case 'grants':
				this.showChildView('sidebar', new GrantsView(_.extend({
					collection: collection
				}, options)));
				break;
			case 'patents':
				this.showChildView('sidebar', new PatentsView(_.extend({
					collection: collection
				}, options)));
				break;
			case 'technologies':
				this.showChildView('sidebar', new TechnologiesView(_.extend({
					collection: collection
				}, options)));
				break;
		}
		
		this.getChildView('mainbar').showTrends(activity, range, collection, color);
	},

	clearSideBar: function() {
		this.showChildView('sidebar', new InfoView());
	},

	//
	// dialog rendering methods
	//

	showDialog: function(dialogView) {
		this.showChildView('overlays', dialogView);
	},

	showHelp: function() {
		this.showDialog(new HelpDialogView());
	},

	showMessage: function(options) {
		this.messageDialogView = new MessageDialogView(options);
		this.showDialog(this.messageDialogView);
	},

	hideMessage: function() {
		if (this.messageDialogView) {
			this.messageDialogView.destroy();
			this.messageDialogView = null;
		}
	},

	showDownloadDialog: function(options) {
		this.showDialog(new DownloadDialogView(options));
	},

	//
	// mainbar rendering methods
	//

	getMainBarView: function() {
		return new MainView();
	},

	//
	// window event handling methods
	//

	onResize: function() {
		this.getChildView('mainbar').onResize();
	}
});