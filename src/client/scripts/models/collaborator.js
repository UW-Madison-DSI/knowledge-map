/******************************************************************************\
|                                                                              |
|                                  person.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a person.                                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import DateRangeQueryable from './behaviors/date-range-queryable.js';
import Person from './person.js';
	
export default Person.extend(_.extend({}, DateRangeQueryable, {

	defaults: {
		id: undefined,
		source: undefined,

		// personal info
		//
		first_name: undefined,
		last_name: undefined,
		middle_name: undefined,
		image: undefined,

		// professional info
		//
		title: undefined,
		primary_affiliation: undefined,
		affiliations: undefined,
		interests: undefined,
		research_summary: undefined,

		// date range
		//
		start_date: undefined, 
		end_date: undefined,

		// contact info
		//
		email: undefined,
		url: undefined
	}
}));