/******************************************************************************\
|                                                                              |
|                               patents-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of patents.                       |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ActivitiesView from '../activities-view.js';
import PatentView from './patent-view.js';

export default ActivitiesView.extend({

	//
	// attributes
	//

	className: 'patents',
	childView: PatentView
});