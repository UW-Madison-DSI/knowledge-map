/******************************************************************************\
|                                                                              |
|                       academic-analytics-articles.js                         |
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

import Articles from '../../activities/articles.js';
import Article from '../../../models/academic-analytics/activities/academic-analytics-article.js';

export default Articles.extend({

	//
	// attributes
	//

	model: Article,

	//
	// fetching methods
	//

	fetchByPerson(person, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/people/' + person.get('id') + '/articles',
			parse: true
		}));
	},

	fetchByTitle(title, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/articles?title=' + encodeURIComponent(title),
			parse: true
		}));
	}
});