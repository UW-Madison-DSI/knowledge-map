/******************************************************************************\
|                                                                              |
|                            book-chapter-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ActivityView from '../activity-view.js';
import BookChapterMarkerView from './book-chapter-marker-view.js';

export default ActivityView.extend({

	//
	// attributes
	//

	className: 'book-chapter',

	//
	// getting methods
	//

	getMarkerView: function() {
		return new BookChapterMarkerView({
			model: this.model,
			parent: this,

			// callbacks
			//
			onselect: () => {
				this.select();
			},
			ondeselect: () => {
				this.deselect();
			}
		});
	}
});