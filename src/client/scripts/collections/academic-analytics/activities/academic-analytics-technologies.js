/******************************************************************************\
|                                                                              |
|                    academic-analytics-technologies.js                        |
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

import Technologies from '../../activities/technologies.js';
import Technology from '../../../models/academic-analytics/activities/academic-analytics-technology.js';

export default Technologies.extend({

	//
	// attributes
	//

	model: Technology,

	//
	// fetching methods
	//

	fetchByPerson(person, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/people/' + person.get('id') + '/technologies',
			parse: true
		}));
	},

	fetchByTitle(title, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/technologies?title=' + encodeURIComponent(title),
			parse: true
		}));
	}
});