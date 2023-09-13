/******************************************************************************\
|                                                                              |
|                           department-marker-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../../../../vendor/bootstrap/js/tooltip.js';
import '../../../../vendor/bootstrap/js/popover.js';
import '../../../utilities/time/date-format.js';
import LabeledMarkerView from '../markers/labeled-marker-view.js';

export default LabeledMarkerView.extend({

	//
	// attributes
	//

	className: 'marker',
	selectable: false,

	//
	// constructor
	//

	initialize: function(options) {

		// set attributes
		//
		this.options = options;
		this.location = this.options.location;
	},

	attributes: function() {	
		return {
			'id': this.options.id,
			'class': this.options.class,
			'x': this.location? this.location.x : undefined,
			'y': this.location? -this.location.y : undefined,
			'fill': this.options.fill,
			'stroke': this.options.stroke,
			'name': this.model.get('baseName')
		}
	},

	//
	// getting methods
	//

	getRadius: function() {
		return Math.sqrt(this.model.get('num_people') + this.model.get('num_affiliations')) * 5;
	},

	getBackground: function() {

		// get svg from document
		//
		let icon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

		// set attributes
		//
		$(icon).attr({
			'r': this.getRadius()
		});

		return icon;
	},

	//
	// animation methods
	//

	bounce: function() {

		// add style
		//
		this.$el.find('circle').addClass('bouncing');

		// wait for duration
		//
		window.setTimeout(() => {

			// remove style
			//
			this.$el.find('circle').removeClass('bouncing');
		}, 300);
	}
});