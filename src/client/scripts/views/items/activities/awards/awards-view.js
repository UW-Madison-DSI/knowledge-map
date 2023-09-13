/******************************************************************************\
|                                                                              |
|                                awards-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of patents.                       |
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
import AwardsListView from './list/awards-list-view.js';

export default ActivitiesView.extend({

	//
	// attributes
	//

	item: 'award',
	icon: 'fa fa-trophy',
	ItemsListView: AwardsListView,

	//
	// querying methods
	//

	toCSV: function() {
		let csv = '';
		csv += 'Name, ';
		csv += 'Organization, ';
		csv += 'Date, ';
		csv += 'Contributors ';
		csv += '\n';
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			csv += '"' + model.get('name') + '",';
			csv += '"' + model.get('organization') + '",';
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
				'Organization': model.get('organization'),
				'Date': (model.has('date')? model.get('date').format('shortDate') : null),
				'Contributors': model.getContributorNames()
			});
		}
		return JSON.stringify(data, null, 4);
	}
});