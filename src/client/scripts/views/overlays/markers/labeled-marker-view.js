/******************************************************************************\
|                                                                              |
|                             labeled-marker-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import MarkerView from './marker-view.js';

export default MarkerView.extend({

	//
	// attributes
	//

	dy: 35,
	show_background: true,
	radius: 15,
	popover_target: '.background',

	//
	// constructor
	//

	initialize: function() {

		// call superclass constructor
		//
		MarkerView.prototype.initialize.call(this);

		// set attributes
		//
		if (this.options.label) {
			this.label = this.options.label;
		}
	},

	//
	// getting methods
	//

	getBackground: function() {

		// get svg from document
		//
		let icon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

		// set attributes
		//
		$(icon).attr({
			'class': 'background',
			'r': this.radius
		});

		return icon;
	},

	getLabel: function() {

		// get svg from document
		//
		let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

		// set attributes
		//
		$(text).attr({
			'x': 0,
			'y': 0,
			'dy': this.dy,
			'fill': this.fill
		});
		$(text).html(this.label);

		return text;
	},

	getGroup: function() {
		let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		if (this.show_background) {
			group.append(this.getBackground());
		}
		if (this.getIcon) {
			group.append(this.getIcon());
		}
		if (this.label) {
			group.append(this.getLabel());
		}
		return group;
	}
});