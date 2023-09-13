/******************************************************************************\
|                                                                              |
|                    academic-analytics-collaborators.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a collection of collaborators.                      |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Collaborators from '../collaborators.js';
import AcademicAnalyticsCollaborator from '../../models/academic-analytics/academic-analytics-collaborator.js';

export default Collaborators.extend({

	//
	// attributes
	//

	model: AcademicAnalyticsCollaborator,

	//
	// fetching methods
	//

	fetchByPerson(person, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/people/' + person.get('id') + '/collaborators',
			parse: true
		}));
	},
});