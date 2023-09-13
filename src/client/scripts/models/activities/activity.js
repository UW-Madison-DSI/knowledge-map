/******************************************************************************\
|                                                                              |
|                                 activity.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of an abstract activity.                         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../../utilities/scripting/string-utils.js';
import '../../utilities/time/date-format.js';
import BaseModel from '../base-model.js';
import DateQueryable from '../behaviors/date-queryable.js';
import Collaborative from '../behaviors/collaborative.js';
	
export default BaseModel.extend(_.extend({}, DateQueryable, Collaborative, {

	//
	// attributes
	//

	defaults: {
	},

	//
	// ajax methods
	//

	url: function() {
		return this.baseUrl + '/' + this.get('id');
	},

	//
	// getting methods
	//

	getAge: function() {
		return new Date().getFullYear() - this.get('year');
	},

	getContributorNames: function() {
		let names = [];
		let contributors = this.get('contributors');
		for (let i = 0; i < contributors.length; i++) {
			names.push(contributors[i].getName());
		}
		return names;
	}
}), {

	//
	// static attributes
	//

	kinds: [
		'articles', 
		'awards', 
		'books', 
		'book_chapters', 
		'conference_proceedings', 
		'grants', 
		'patents', 
		'technologies'
	], 

	colors: {
		articles: 'cornflowerblue',
		awards: 'goldenrod',
		books: 'brown',
		book_chapters: 'sienna', 
		conference_proceedings: 'indianred', 
		grants: 'green', 
		patents: 'orange', 
		technologies: 'purple'
	}
});