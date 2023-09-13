/******************************************************************************\
|                                                                              |
|                               activities.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines an abstract base collection of articles.            |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseCollection from '../base-collection.js';

export default BaseCollection.extend({

	//
	// attributes
	//

	comparator: function(item) {
		return -item.get('year');
	}
});