/******************************************************************************\
|                                                                              |
|                        academic-analytics-patent.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a patent from Academic Analytics.             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Patent from '../../activities/patent.js';
import Contributor from '../academic-analytics-person.js';
	
export default Patent.extend({

	//
	// attributes
	//

	baseUrl: config.servers.academic + '/patents',

	//
	// parsing methods
	//

	parseContributors(data, options) {
		let contributors = [];
		for (let i = 0; i < data.length; i++) {
			// if (!options || options.person.id != data[i].id) {
				contributors.push(new Contributor(data[i], {
					parse: true
				}));
			// }	
		}
		return contributors;
	},

	parse: function(response, options) {
		return {
			id: response.id,
			name: response.name,
			number: response.number,
			country: response.country,

			// parse date
			//
			year: response.activityYear,
			date: new Date(response.date),

			// parse details
			//
			abstract: response.abstract,

			// parse team
			//
			contributors: this.parseContributors(response.contributors, options),
		}
	}
});