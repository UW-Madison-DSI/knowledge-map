/******************************************************************************\
|                                                                              |
|                               collaborative.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for quering collaborators.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/
	
export default {

	//
	// querying methods
	//

	hasContributor: function(contributor) {
		let contributors = this.get('contributors');
		for (let i = 0; i < contributors.length; i++) {
			let item = contributors[i];
			if (item && item.is(contributor)) {
				return true;
			}
		}
		return false;
	},

	getContributorNames: function() {
		let names = [];
		let contributors = this.get('contributors');
		for (let i = 0; i < contributors.length; i++) {
			let name = contributors[i].get('name');
			if (name && name != '') {
				names.push(name);
			}
		}
		return names;
	}
};