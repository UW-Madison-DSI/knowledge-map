/******************************************************************************\
|                                                                              |
|                academic-analytics-conference-proceeding.js                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a book from Academic Analytics.               |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ConferenceProceeding from '../../activities/conference-proceeding.js';
import Contributor from '../academic-analytics-person.js';
	
export default ConferenceProceeding.extend({

	//
	// attributes
	//

	baseUrl: config.servers.academic + '/conference-proceedings',

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
			abstract: response.abstract,

			// parse date
			//
			year: response.activityYear,
			publish_date: new Date(response.publishDate),

			// parse details
			//
			doi: response.digitalObjectIdentifier,
			journal_name: response.journalName,
			journal_volume: response.journalVolume,
			journal_issue: response.journalIssue,

			// parse team
			//
			contributors: this.parseContributors(response.contributors, options),
		}
	}
});