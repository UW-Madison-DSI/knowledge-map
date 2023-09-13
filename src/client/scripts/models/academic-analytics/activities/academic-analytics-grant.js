/******************************************************************************\
|                                                                              |
|                        academic-analytics-grant.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a grant from Academic Analytics.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Grant from '../../activities/grant.js';
import Contributor from '../academic-analytics-person.js';

export default Grant.extend({

	//
	// attributes
	//

	baseUrl: config.servers.academic + '/grants',

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
			abstract: response.abstract,

			// parse date
			//
			year: response.activityYear,
			start_date: new Date(response.startDate),
			end_date: new Date(response.endDate),

			// parse details
			//
			agency_name: response.agencyName,
			agency_abbreviation: response.agencyNameAbbreviation,
			total_dollars: response.totalDollars,

			// parse team
			//
			contributors: this.parseContributors(response.contributors, options)
		}
	}
});