/******************************************************************************\
|                                                                              |
|                                 svg-renderable.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a mixin for displaying svg renderable views.                  |
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
	// rendering methods
	//

	toElement: function() {

		// create element
		//
		let element = document.createElementNS('http://www.w3.org/2000/svg', this.tagName);

		// set class
		//
		if (this.className) {
			$(element).attr('class', this.className);
		}

		// set attributes
		//
		if (this.attributes) {
			let attributes = _.result(this, 'attributes');
			for (let name in attributes) {
				$(element).attr(name, attributes[name]);
			}
		}

		// add template elements
		//
		if (this.template) {
			element.innerHTML = this.template();
		}

		return element;	
	},

	clear: function() {
		this.$el.children().remove();
	},

	render: function() {
		let element = this.toElement();

		// BaseView.prototype.initialize.call(this, options);

		// bind events etc.
		//
		if (element) {
			this.setElement(element);
		}

		// alert listeners of rendering
		//
		this.triggerMethod('render', this);

		return element;
	}
};
