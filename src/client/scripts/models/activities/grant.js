/******************************************************************************\
|                                                                              |
|                                   grant.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a grant.                                      |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Activity from './activity.js';
import DateRangeQueryable from '../behaviors/date-range-queryable.js';
import WordUtils from '../../utilities/scripting/word-utils.js';

export default Activity.extend(_.extend({}, DateRangeQueryable, {

	//
	// attributes
	//

	defaults: {
		name: undefined,
		abstract: undefined,

		// date
		//
		year: undefined,
		start_date: undefined,
		end_date: undefined,

		// details
		//
		agency_name: undefined,
		agency_abbreviation: undefined,
		total_dollars: undefined,

		// team
		//
		contributors: undefined
	},

	//
	// getting methods
	//

	getLabels: function() {
		return WordUtils.getUniqueWords(this.get('abstract') || this.get('name'));
	}
}));