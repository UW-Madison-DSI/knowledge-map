/******************************************************************************\
|                                                                              |
|                                articles-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a collection of articles.                      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ActivitiesView from '../activities-view.js';
import ArticleView from './article-view.js';

export default ActivitiesView.extend({

	//
	// attributes
	//

	className: 'articles',
	childView: ArticleView
});