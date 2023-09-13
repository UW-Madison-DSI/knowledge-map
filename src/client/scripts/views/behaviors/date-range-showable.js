/******************************************************************************\
|                                                                              |
|                          date-range-showable.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for views that can be restricted to           |
|        a date or date range.                                                 |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

export default {

	//
	// setting methods
	//

	setYear: function(year, options) {
		if (this.model.happenedIn(year)) {
			this.show(options);
			this.visible = true;
		} else {
			this.hide(options);
			this.visible = false;
		}
	},

	setRange: function(range, options) {
		if (this.model.happenedDuring(range)) {
			this.show(options);
			this.visible = true;
		} else {
			this.hide(options);
			this.visible = false;
		}
	}
};