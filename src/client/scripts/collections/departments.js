/******************************************************************************\
|                                                                              |
|                               departments.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a collection of departments.                        |
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
import Department from '../models/department.js';

export default BaseCollection.extend({

	//
	// attributes
	//

	model: Department,
	url: config.servers.campus_map + '/departments',
});