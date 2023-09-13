/******************************************************************************\
|                                                                              |
|                  academic-analytics-institution-units.js                     |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a collection of institution units from              |
|        Academic Analytics.                                                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import InstitutionUnits from '../institution-units.js';
import InstitutionUnit from '../../models/academic-analytics/academic-analytics-institution-unit.js';

export default InstitutionUnits.extend({

	//
	// attributes
	//

	model: InstitutionUnit,
	url: config.servers.academic + '/institution-units',

	//
	// fetching methods
	//

	fetch(options) {
		return InstitutionUnits.prototype.fetch.call(this, _.extend({}, options, {
			url: this.url + (options && options.full? '/full' : ''),
			parse: true
		}));
	},
});