/******************************************************************************\
|                                                                              |
|                                buildings.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a collection of buildings.                          |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseCollection from './base-collection.js';
import Building from '../models/building.js';

export default BaseCollection.extend({

	//
	// attributes
	//

	model: Building,
	url: config.servers.campus_map + '/buildings',

	//
	// sorting methods
	//

	comparator: function(item) {
		return item.get('name');
	},

	//
	// querying methods
	//

	findByName: function(query, options) {
		let results = [];

		if (options && options.exact) {
			for (let i = 0; i < this.length; i++) {
				let building = this.at(i);
				if (building.get('name') == query) {
					results.push(building);
				}
			}
		} else {
			let searchstr = query.toLowerCase();
			for (let i = 0; i < this.length; i++) {
				let building = this.at(i);
				let name = building.get('name').toLowerCase();
				if (searchstr.contains(name) || name.contains(searchstr)) {
					results.push(building);
				}
			}	
		}
		return results;
	}
});