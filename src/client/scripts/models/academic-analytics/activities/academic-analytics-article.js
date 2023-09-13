/******************************************************************************\
|                                                                              |
|                        academic-analytics-article.js                         |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of an article from Academic Analytics.           |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Article from '../../activities/article.js';
import Contributor from '../academic-analytics-person.js';
	
export default Article.extend({

	//
	// attributes
	//

	baseUrl: config.servers.academic + '/articles',

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
			publication_date: new Date(response.publishDate),

			// parse details
			//
			journal_name: response.journalName,
			first_page: response.firstPage,
			last_page: response.lastPage,
			doi: response.digitalObjectIdentifier,

			// parse team
			//
			contributors: this.parseContributors(response.contributors, options)
		}
	}
});