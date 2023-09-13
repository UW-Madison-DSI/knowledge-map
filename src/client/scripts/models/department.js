/******************************************************************************\
|                                                                              |
|                                department.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a department.                                 |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseModel from './base-model.js';

export default BaseModel.extend({

	//
	// ajax attributes
	//

	urlRoot: 'api/public/departments',

	url: () => {
		return this.urlRoot + '/' + this.id
	},

	//
	// attributes
	//

	defaults: {
		id: undefined,
		name: undefined,
		base_name: undefined,
		url: undefined,
		building_id: undefined
	}
});