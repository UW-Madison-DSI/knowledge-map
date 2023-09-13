/******************************************************************************\
|                                                                              |
|                             places-list-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an item list view.                                       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ListView from '../lists/list-view.js';
import PlacesListItemView from './places-list-item-view.js';

export default ListView.extend({

	//
	// attributes
	//

	childView: PlacesListItemView
});