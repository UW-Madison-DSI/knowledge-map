/******************************************************************************\
|                                                                              |
|                                  article.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a journal article.                            |
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
		title: undefined,
		abstract: undefined,

		// date
		//
		year: undefined,
		publication_date: undefined,

		// details
		//
		journal_name: undefined,
		first_page: undefined,
		last_page: undefined,
		doi: undefined,

		// team
		//
		contributors: undefined
	},

	//
	// getting methods
	//

	getLabels: function() {
		return WordUtils.getUniqueWords(this.get('abstract') || this.get('title'));
	},

	getUrl: function() {
		return this.has('doi')? 'https://doi.org/' + this.get('doi') : undefined;
	}
});