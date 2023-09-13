/******************************************************************************\
|                                                                              |
|                             technologies-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of technologies.                  |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ActivitiesView from '../activities-view.js';
import TechnologyView from './technology-view.js';

export default ActivitiesView.extend({

	//
	// attributes
	//

	className: 'technologies',
	childView: TechnologyView
});