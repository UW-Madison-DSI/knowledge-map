/******************************************************************************\
|                                                                              |
|                                  array-utils.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This contains some general purpose array handling utilities.          |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

//
// converting methods
//

Array.prototype.clone = function() {
	return this.slice(0);
};

Array.prototype.remove = function(item) {
	let index = this.indexOf(item);
	if (index != -1) {
		this.splice(index, 1);
	}
	return this;
};

Array.prototype.removeAll = function(items) {
	let array = this.clone();
	for (let i = 0; i < items.length; i++) {
		array = array.remove(items[i]);
	}
	return array;
};