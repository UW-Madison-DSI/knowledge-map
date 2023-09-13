/******************************************************************************\
|                                                                              |
|                             book-chapters.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines an abstract base collection of book chapters.       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Activities from './activities.js';
import BookChapter from '../../models/activities/book-chapter.js';

export default Activities.extend({

	//
	// attributes
	//

	model: BookChapter
});