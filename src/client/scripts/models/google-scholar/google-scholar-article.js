/******************************************************************************\
|                                                                              |
|                          google-scholar-article.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a journal article.                            |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Article from '../activities/article.js';
import Contributor from './google-scholar-person.js';
	
export default Article.extend({

	//
	// parsing methods
	//

	parseContributors(data, options) {
		let contributors = [];
		for (let i = 0; i < data.length; i++) {
			let contributor = new Contributor(data[i], {
				parse: true
			});

			// look up contributor in case already known
			//
			/*
			if (Contributor.has(contributor)) {
				contributor = Contributor.get(contributor);
			} else {
				Contributor.set(contributor);
			}
			*/

			// if (!options || options.person.id != data[i].id) {
				contributors.push(contributor);
			// }
		}
		return contributors;
	},

	parse: function(response) {
		let $el = $(response);
		return {
			title: $el.find('.gsc_a_at').text(),
			// abstract: response.abstract,
			// contributors: this.parseContributors(response.contributors, options),

			// parse journal
			//
			// journal_name: response.journalName,
			// first_page: response.firstPage,
			// last_page: response.lastPage,

			// parse date
			//
			// publication_date: new Date(response.publishDate)
		}
	}
});