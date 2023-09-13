/******************************************************************************\
|                                                                              |
|                                  technology.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an abstract model of a technology.                       |
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
		introduction: undefined,

		// date
		//
		year: undefined,
		date: undefined,

		// details
		//
		url: undefined,
		inventors: undefined,

		// team
		//
		contributors: undefined
	},

	//
	// getting methods
	//

	getLabels: function() {
		return WordUtils.getUniqueWords(this.get('title'));
	}
});