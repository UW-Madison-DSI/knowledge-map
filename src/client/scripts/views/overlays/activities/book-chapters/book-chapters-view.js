/******************************************************************************\
|                                                                              |
|                             book-chapters-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of book chapters.                 |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ActivitiesView from '../activities-view.js';
import BookChapterView from './book-chapter-view.js';

export default ActivitiesView.extend({

	//
	// attributes
	//

	className: 'book-chapters',
	childView: BookChapterView
});