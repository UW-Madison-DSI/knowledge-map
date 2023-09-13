/******************************************************************************\
|                                                                              |
|                     academic-analytics-book-chapter.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a book chapter from Academic Analytics.       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BookChapter from '../../activities/book-chapter.js';
import Contributor from '../academic-analytics-person.js';
	
export default BookChapter.extend({

	//
	// attributes
	//

	baseUrl: config.servers.academic + '/book-chapters',

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
			book_name: response.bookName,
			chapter_name: response.name,
			abstract: response.abstract,

			// parse date
			//
			year: response.activityYear,
			publication_date: new Date(response.publishDate),

			// parse details
			//
			isbn: response.isbn,
			publisher: response.publisher,
			start_page: response.startPage,
			end_page: response.endPage,

			// parse team
			//
			contributors: this.parseContributors(response.contributors, options),
		}
	}
});