/******************************************************************************\
|                                                                              |
|                     conference-proceedings-list-view.js                      |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a list of conference proceedings.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ActivitiesListView from '../../activities-list-view.js';
import ConferenceProceedingsListItemView from './conference-proceedings-list-item-view.js';

export default ActivitiesListView.extend({

	//
	// attributes
	//

	childView: ConferenceProceedingsListItemView
});