/******************************************************************************\
|                                                                              |
|                                   base-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an abstract base class for creating views.               |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../../vendor/bootstrap/js/tooltip.js';
import Hierarchical from './behaviors/hierarchical.js';

export default Marionette.View.extend(_.extend({}, Hierarchical, {

	// tooltips attributes
	//
	tooltip_trigger: 'hover',
	tooltip_placement: undefined,
	tooltip_container: 'body',

	//
	// constructor
	//

	initialize: function() {

		// set attributes
		//
		if (this.options.parent) {
			this.parent = this.options.parent;
		}

		// call superclass constructor
		//
		Marionette.View.prototype.initialize.call(this);
	},

	//
	// querying methods
	//

	isVisible: function() {
		return this.$el.is(':visible');
	},
	
	//
	// getting methods
	//

	getRegionNames: function() {
		let names = [];
		let regions = Object.keys(this.regions);
		for (let i = 0; i < regions.length; i++) {
			names.push(regions[i]);
		}
		return names;
	},

	getRegionElement: function(name) {
		if (this.hasRegion(name)) {
			let region = this.getRegion(name);
			return region.getEl(region.el);
		}
	},

	getElementAttributes: function(selector, attribute, modifier) {
		return $.map(this.$el.find(selector), (el) => {
			let value = $(el).attr(attribute);
			return modifier? modifier(value) : value;
		});
	},

	//
	// tooltip getting methods
	//

	getTooltipContainer: function() {
		return this.$el.closest('.modal-dialog, .desktop') || this.$el.parent();
	},

	//
	// setting methods
	//

	setVisible: function(visibility) {
		if (visibility) {
			this.$el.show();
		} else {
			this.$el.hide();
		}
	},

	setVisibility: function(selector, visibility) {
		if (visibility) {
			this.$el.find(selector).show();
		} else {
			this.$el.find(selector).hide();
		}
	},

	//
	// rendering methods
	//

	showRegions: function() {
		if (this.showRegion) {
			let names = this.getRegionNames();

			// show child views
			//
			for (let i = 0; i < names.length; i++) {
				let name = names[i];
				if (!this.options.hidden || this.options.hidden[name]) {
					this.showRegion(name);
				}
			}
		}
	},

	showChildView: function(name, view, options) {
		if (!view) {
			return;
		}
		
		// attach child to parent
		//
		view.parent = this;

		// call superclass method
		//
		Marionette.View.prototype.showChildView.call(this, name, view, options);
	},

	reflow: function() {
		let height = this.el.offsetHeight;
	},

	update: function() {
		this.render();
	},

	//
	// hiding methods
	//

	hide: function() {
		this.setVisible(false);
	},

	show: function() {
		this.setVisible(true);
	},

	//
	// tooltip meyhods
	//

	addTooltips: function(options) {

		// show tooltips on trigger
		//
		this.$el.find('[data-toggle="tooltip"]').addClass('tooltip-trigger').tooltip(_.extend(this.options, {
			trigger: this.tooltip_trigger,
			placement: this.tooltip_placement,
			container: this.tooltip_container
		}, options));
	},

	removeTooltips: function() {
		$('body').find('.tooltip').remove();
	},

	//
	// event handling methods
	//

	block: function(event) {

		// prevent further handling of event
		//
		event.preventDefault();
		event.stopPropagation();
	},

	//
	// cleanup methods
	//

	onDestroy: function() {

		// remove any tooltips that might have been created
		//
		this.removeTooltips();
	}
}));