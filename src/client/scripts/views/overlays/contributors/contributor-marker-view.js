/******************************************************************************\
|                                                                              |
|                          contributor-marker-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import PersonMarkerView from '../people/person-marker-view.js';

export default PersonMarkerView.extend({

	//
	// attributes
	//

	deselectable: true,

	//
	// rendering methods
	//

	render: function() {
		let $el = PersonMarkerView.prototype.render.call(this);
		this.unscale();
		return $el;
	},

	//
	// selection methods
	//

	select: function() {

		// call superclass method
		//
		PersonMarkerView.prototype.select.call(this);

		// select contributor
		//
		if (this.options.parent) {
			this.options.parent.select();
		}
	},

	deselect: function() {

		// call superclass method
		//
		PersonMarkerView.prototype.deselect.call(this);

		// deselect contributor
		//
		if (this.options.parent) {
			this.options.parent.deselect();
		}
	},

	//
	// mouse event handling methods
	//

	onClick: function(event) {
		if (!this.isSelected()) {
			this.select();
			this.showPopover();
		} else {
			this.showPerson();
		}

		// block from parents
		//
		event.stopPropagation();
	}
});