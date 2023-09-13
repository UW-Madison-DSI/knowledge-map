/******************************************************************************\
|                                                                              |
|                       academic-analytics-awards.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a collection of awards from Academic Analytics.     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Awards from '../../activities/awards.js';
import Award from '../../../models/academic-analytics/activities/academic-analytics-award.js';

export default Awards.extend({

	//
	// attributes
	//

	model: Award,

	//
	// fetching methods
	//

	fetchByPerson(person, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/people/' + person.get('id') + '/awards',
			parse: true
		}));
	},

	fetchByName(name, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/awards?name=' + encodeURIComponent(name),
			parse: true
		}));
	}
});