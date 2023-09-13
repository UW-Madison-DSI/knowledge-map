/******************************************************************************\
|                                                                              |
|                           date-range-queryable.js                            |
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

	getStartYear: function() {
		return this.get('start_date').getFullYear();
	},

	getEndYear: function() {
		return this.get('end_date').getFullYear();
	},

	happenedIn: function(year) {
		return this.getStartYear() <= year && year <= this.getEndYear();
	},

	happenedDuring: function(range) {
		let bounds1 = new Bounds(range[0], range[1]);
		let bounds2 = new Bounds(this.getStartYear(), this.getEndYear());
		return bounds1.overlaps(bounds2);
	},
};