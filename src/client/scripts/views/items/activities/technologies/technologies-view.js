/******************************************************************************\
|                                                                              |
|                            technologies-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of technologies.                  |
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
import TechnologiesListView from './list/technologies-list-view.js';

export default ActivitiesView.extend({

	//
	// attributes
	//

	item: 'technology',
	icon: 'fa fa-gear',
	ItemsListView: TechnologiesListView,

	//
	// querying methods
	//

	toCSV: function() {
		let csv = '';
		csv += 'Name, ';
		csv += 'Country, ';
		csv += 'Number, ';
		csv += 'Date, ';
		csv += 'Contributors ';
		csv += '\n';
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			csv += '"' + model.get('name') + '",';
			csv += '"' + model.get('country') + '",';
			csv += '"' + model.get('number') + '",';
			csv += (model.has('date')? model.get('date').format('shortDate') : '') + ',';
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
				'Country': model.get('country'),
				'Number': model.get('number'),
				'Date': (model.has('date')? model.get('date').format('shortDate') : null),
				'Contributors': model.getContributorNames()
			});
		}
		return JSON.stringify(data, null, 4);
	},

	//
	// getting methods
	//

	getItemsName: function() {
		return this.collection.length == 1? this.item : 'technologies';
	}
});