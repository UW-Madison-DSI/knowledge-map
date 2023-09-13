/******************************************************************************\
|                                                                              |
|                              date-queryable.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for quering models for a timeframe.           |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../../utilities/time/date-format.js';
import Bounds from '../../utilities/bounds/bounds.js';
	
export default {

	//
	// querying methods
	//

	getYear: function() {
		return this.get('year');
	},

	happenedIn: function(year) {
		return this.getYear() == year;
	},

	happenedDuring: function(range) {
		let bounds = new Bounds(range[0], range[1]);
		return bounds.contains(this.getYear());
	}
};