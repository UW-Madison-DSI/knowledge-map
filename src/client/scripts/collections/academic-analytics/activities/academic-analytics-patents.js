/******************************************************************************\
|                                                                              |
|                      academic-analytics-patents.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a collection of patents from Academic Analytics.    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Patents from '../../activities/patents.js';
import Patent from '../../../models/academic-analytics/activities/academic-analytics-patent.js';

export default Patents.extend({

	//
	// attributes
	//

	model: Patent,

	//
	// fetching methods
	//

	fetchByPerson(person, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/people/' + person.get('id') + '/patents',
			parse: true
		}));
	},

	fetchByName(name, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/patents?name=' + encodeURIComponent(name),
			parse: true
		}));
	}
});