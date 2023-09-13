/******************************************************************************\
|                                                                              |
|                      conference-proceedings-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of conference proceedings.        |
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
import ConferenceProceedingsListView from './list/conference-proceedings-list-view.js';

export default ActivitiesView.extend({

	//
	// attributes
	//

	item: 'conference proceeding',
	icon: 'fa fa-microphone',
	ItemsListView: ConferenceProceedingsListView,

	//
	// querying methods
	//

	toCSV: function() {
		let csv = '';
		csv += 'Title, ';
		csv += 'Publisher, ';
		csv += 'DOI, ';
		csv += 'Publication Date, ';
		csv += 'Contributors ';
		csv += '\n';
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			csv += '"' + model.get('title') + '",';
			csv += '"' + model.get('publisher') + '",';
			csv += model.get('doi') + ',';
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
				'Title': model.get('title'),
				'Publisher': model.get('publisher'),
				'DOI': model.get('doi'),
				'Publication Date': (model.has('publication_date')? model.get('publication_date').format('shortDate') : null),
				'Contributors': model.getContributorNames()
			});
		}
		return JSON.stringify(data, null, 4);
	}
});