/******************************************************************************\
|                                                                              |
|                       conference-proceedings-view.js                         |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of books.                         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ActivitiesView from '../activities-view.js';
import ConferenceProceedingView from './conference-proceeding-view.js';

export default ActivitiesView.extend({

	//
	// attributes
	//

	className: 'conference-proceedings',
	childView: ConferenceProceedingView
});