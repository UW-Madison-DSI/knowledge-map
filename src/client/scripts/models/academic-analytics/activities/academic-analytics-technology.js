/******************************************************************************\
|                                                                              |
|                       academic-analytics-technology.js                       |
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

import Technology from '../../activities/technology.js';
import Contributor from '../academic-analytics-person.js';
	
export default Technology.extend({

	//
	// attributes
	//

	baseUrl: config.servers.academic + '/technologies',

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
			title: response.title,
			introduction: response.introduction,

			// parse date
			//
			year: response.activityYear,
			date: new Date(response.date),

			// parse details
			//
			url: response.url,
			inventors: response.inventors,

			// parse team
			//
			contributors: this.parseContributors(response.contributors, options),
		}
	}
});