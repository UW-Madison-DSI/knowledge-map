/******************************************************************************\
|                                                                              |
|                           activity-marker-view.js                            |
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
import Vector2 from '../../../utilities/math/vector2.js';
import LabeledMarkerView from '../markers/labeled-marker-view.js';
import PersonMarkerView from '../people/person-marker-view.js';

export default LabeledMarkerView.extend({

	//
	// attributes
	//

	className: 'unscaled marker',

	//
	// constructor
	//

	initialize: function(options) {

		// set attributes
		//
		this.options = options;
		this.location = this.getLocation();
	},

	//
	// querying methods
	//

	isVisible: function() {
		return this.options.parent.isVisible();
	},

	//
	// getting methods
	//

	getLocation: function() {
		let locations = this.getContributorsLocations();
		let location = locations.length > 0? Vector2.average(locations) : new Vector2(0, 0);
		let minRadius = 5;
		let maxRadius = 50;

		// add randomness to avoid pileups
		//
		let angle = Math.random() * Math.PI * 2;
		let radius = Math.min(minRadius + this.model.getAge() * 2, maxRadius);
		let x = Math.cos(angle) * radius;
		let y = Math.sin(angle) * radius;
		location.add(new Vector2(x, y));

		return location;
	},

	getContributorsLocations() {
		let locations = [];
		let contributors = this.model.get('contributors');
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			for (let i = 0; i < contributors.length; i++) {
				let contributor = contributors[i];
				let location = PersonMarkerView.getLocationOf(contributor, viewport.parent);
				if (location) {
					locations.push(location);
				}
			}
		}
		return locations;
	},

	//
	// rendering methods
	//

	addPopover: function(options) {

		// load model
		//
		if (this.model.loaded) {
			LabeledMarkerView.prototype.addPopover.call(this);

			// perform callback
			//
			if (options && options.done) {
				options.done();
			}
		} else {
			this.model.fetch({

				// callbacks
				//
				success: () => {
					this.model.loaded = true;
					this.addPopovers(options);
				}
			})
		}
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
	},

	//
	// event handling methods
	//

	onMouseOver() {
		this.highlight();
		this.bounce();
	},

	onMouseLeave() {
		this.unhighlight();
	}
});