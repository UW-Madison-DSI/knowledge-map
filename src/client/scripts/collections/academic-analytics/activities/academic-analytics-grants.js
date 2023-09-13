/******************************************************************************\
|                                                                              |
|                        academic-analytics-grants.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a collection of grants from Academic Analytics.     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Grants from '../../activities/grants.js';
import Grant from '../../../models/academic-analytics/activities/academic-analytics-grant.js';

export default Grants.extend({

	//
	// attributes
	//

	model: Grant,

	//
	// fetching methods
	//

	fetchByPerson(person, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/people/' + person.get('id') + '/grants',
			parse: true
		}));
	},

	fetchByName(name, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/grants?name=' + encodeURIComponent(name),
			parse: true
		}));
	}
});