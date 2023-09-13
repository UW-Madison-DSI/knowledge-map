/******************************************************************************\
|                                                                              |
|                         collaborator-marker-view.js                          |
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
	// rendering methods
	//

	showPerson: function() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {

			// search for person
			//
			viewport.parent.getChildView('search').searchFor(this.model.getName(), {
				category: 'people',
				exact: true
			});
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