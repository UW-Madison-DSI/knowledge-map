/******************************************************************************\
|                                                                              |
|                           institution-units.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a base collection of institution units.             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseCollection from './base-collection.js';
import InstitutionUnit from '../models/institution-unit.js';

export default BaseCollection.extend({

	//
	// attributes
	//

	model: InstitutionUnit,

	//
	// querying methods
	//

	findByName: function(name) {
		for (let i = 0; i < this.length; i++) {
			let model = this.at(i);
			if (model.get('name') == name) {
				return model;
			}
		}
	}
});