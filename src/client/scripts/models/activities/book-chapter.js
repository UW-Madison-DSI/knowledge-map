/******************************************************************************\
|                                                                              |
|                               book-chapter.js                                |
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
import WordUtils from '../../utilities/scripting/word-utils.js';

export default Activity.extend({

	//
	// attributes
	//

	defaults: {
		book_name: undefined,
		chapter_name: undefined,
		abstract: undefined,

		// date
		//
		year: undefined,
		publish_date: undefined,

		// details
		//
		isbn: undefined,
		publisher: undefined,
		start_page: undefined,
		end_page: undefined,

		// team
		//
		contributors: undefined
	},

	//
	// getting methods
	//

	getLabels: function() {
		return WordUtils.getUniqueWords(this.get('chapter_name') || this.get('book_name'));
	}
});