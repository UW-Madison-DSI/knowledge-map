/******************************************************************************\
|                                                                              |
|                                   base-model.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a backbone base model.                        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

export default Backbone.Model.extend({

	//
	// querying methods
	//

	is: function(model) {
		if (!model) {
			return false;
		}
		if (this == model) {
			return true;
		}
		let id = this.get(this.idAttribute);
		return id && id == model.get(model.idAttribute);
	},

	//
	// getting methods
	//

	getClassName: function() {
		if (this.constructor.name) {
			return this.constructor.name;
		} else {
			return 'model';
		}
	}
});