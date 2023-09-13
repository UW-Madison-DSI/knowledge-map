/******************************************************************************\
|                                                                              |
|                        academic-analytics-books.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a collection of articles from Academic Analytics.   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Books from '../../activities/books.js';
import Book from '../../../models/academic-analytics/activities/academic-analytics-book.js';

export default Books.extend({

	//
	// attributes
	//

	model: Book,

	//
	// fetching methods
	//

	fetchByPerson(person, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/people/' + person.get('id') + '/books',
			parse: true
		}));
	},

	fetchByTitle(title, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/books?title=' + encodeURIComponent(title),
			parse: true
		}));
	}
});