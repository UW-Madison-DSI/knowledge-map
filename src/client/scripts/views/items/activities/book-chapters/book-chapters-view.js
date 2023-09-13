/******************************************************************************\
|                                                                              |
|                            book-chapters-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of book chapters.                 |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ActivitiesView from '../activities-view.js';
import BookChaptersListView from './list/book-chapters-list-view.js';

export default ActivitiesView.extend({

	//
	// attributes
	//

	item: 'book_chapter',
	icon: 'fa fa-book-open',
	ItemsListView: BookChaptersListView,

	//
	// querying methods
	//

	toCSV: function() {
		let csv = '';
		csv += 'Chapter Name, ';
		csv += 'Book Name, ';
		csv += 'Publisher, ';
		csv += 'ISBN, ';
		// csv += 'Start Page, ';
		// csv += 'End Page, ';
		csv += 'Publication Date, ';
		csv += 'Contributors ';
		csv += '\n';
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			csv += '"' + model.get('chapter_name') + '",';
			csv += '"' + model.get('book_name') + '",';
			csv += '"' + model.get('publisher') + '",';
			csv += model.get('isbn') + ',';
			// csv += (model.has('start_page')? model.get('start_page') : '') + ',';
			// csv += (model.has('end_page')? model.get('end_page') : '') + ',';
			csv += (model.has('publication_date')? model.get('publication_date').format('shortDate') : '') + ',';
			csv += '"' + model.getContributorNames().join(', ') + '"';
			csv += '\n';
		}
		return csv;
	},

	toJSON: function() {
		let data = [];
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			data.push({
				'Chapter Name': model.get('chapter_name'),
				'Book Name': model.get('book_name'),
				'Publisher': model.get('publisher'),
				'ISBN': model.get('isbn'),
				'Publication Date': (model.has('publication_date')? model.get('publication_date').format('shortDate') : null),
				'Contributors': model.getContributorNames()
			});
		}
		return JSON.stringify(data, null, 4);
	}
});