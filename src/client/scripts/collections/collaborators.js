/******************************************************************************\
|                                                                              |
|                               collaborators.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a base collection and generic utility methods.      |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import People from './people.js';
import Collaborator from '../models/collaborator.js';

export default People.extend({

	//
	// attributes
	//

	model: Collaborator,

	//
	// sorting methods
	//

	comparator: function(item) {
		return -item.getStartYear();
	}
});