/******************************************************************************\
|                                                                              |
|                           activity-details-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a sidebar list view.                                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseView from '../../base-view.js';

export default BaseView.extend({

	//
	// rendering methods
	//

	templateContext: function() {
		return _.extend({}, this.model.attributes, {
			contributors: this.model.getContributorNames()
		});
	}
});