/******************************************************************************\
|                                                                              |
|                    academic-analytics-book-chapters.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a collection of book chapters from                  |
|        Academic Analytics.                                                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BookChapters from '../../activities/book-chapters.js';
import BookChapter from '../../../models/academic-analytics/activities/academic-analytics-book-chapter.js';

export default BookChapters.extend({

	//
	// attributes
	//

	model: BookChapter,

	//
	// fetching methods
	//

	fetchByPerson(person, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/people/' + person.get('id') + '/book-chapters',
			parse: true
		}));
	},

	fetchByName(name, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/book-chapters?name=' + encodeURIComponent(name),
			parse: true
		}));
	}
});