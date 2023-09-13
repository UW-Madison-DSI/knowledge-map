/******************************************************************************\
|                                                                              |
|                         activities-list-item-view.js                         |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a table list item view for activities.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import TableItemView from '../tables/table-item-view.js';
import DateRangeShowable from '../../behaviors/date-range-showable.js';

export default TableItemView.extend(_.extend({}, DateRangeShowable, {

	//
	// attributes
	//

	tagName: 'tr',

	regions: {
		details: '.details'
	},

	//
	// collapsing methods
	//

	expand: function() {
		if (!this.hasDetails()) {

			// show activity
			//
			if (this.model.loaded) {
				this.showDetails();
			} else {
				this.model.fetch({

					// callbacks
					//
					success: () => {
						this.model.loaded = true;
						this.showDetails();
					}
				})
			}
		}

		// call superclass method
		//
		TableItemView.prototype.expand.call(this);
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return _.extend({}, this.model.attributes, {
			columns: this.options.columns || [],
			contributors: this.model.getContributorNames()
		});
	}
}));