/******************************************************************************\
|                                                                              |
|                                  patent.js                                   |
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
		name: undefined,
		number: undefined,
		country: undefined,

		// date
		//
		year: undefined,
		date: undefined,

		// details
		//
		abstract: undefined,

		// team
		//
		contributors: undefined,
	},

	//
	// getting methods
	//

	getLabels: function() {
		return WordUtils.getUniqueWords(this.get('abstract') || this.get('name'));
	},

	getUrl: function() {
		return this.constructor.usptoUrl + '&s1=' + this.get('number') + '.PN.';
	}
}, {

	//
	// static attributes
	//

	usptoUrl: 'https://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50'
});