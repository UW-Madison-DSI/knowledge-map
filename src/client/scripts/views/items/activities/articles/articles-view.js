/******************************************************************************\
|                                                                              |
|                              articles-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of articles.                      |
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
import ArticlesListView from './list/articles-list-view.js';

export default ActivitiesView.extend({

	//
	// attributes
	//

	item: 'article',
	icon: 'fa fa-file-text',
	ItemsListView: ArticlesListView,

	//
	// querying methods
	//

	toCSV: function() {
		let csv = '';
		csv += 'Name, ';
		csv += 'Journal Name, ';
		csv += 'First Page, ';
		csv += 'Last Page, ';
		csv += 'Publication Date, ';
		csv += 'Contributors ';
		csv += '\n';
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			csv += '"' + model.get('title') + '",';
			csv += '"' + model.get('journal_name') + '",';
			csv += (model.has('first_page')? model.get('first_page') : '') + ',';
			csv += (model.has('last_page')? model.get('last_page') : '') + ',';
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
				'Name': model.get('name'),
				'Journal Name': model.get('journal_name'),
				'First Page': model.get('first_page'),
				'Last Page': model.get('last_page'),
				'Publication Date': (model.has('publication_date')? model.get('publication_date').format('shortDate') : null),
				'Contributors': model.getContributorNames()
			});
		}
		return JSON.stringify(data, null, 4);
	}
});