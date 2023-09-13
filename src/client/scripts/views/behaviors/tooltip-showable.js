/******************************************************************************\
|                                                                              |
|                              tooltip-showable.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../../../vendor/bootstrap/js/tooltip.js';

export default {

	// tooltip attributes
	//
	tooltip_title: 'Tooltip',
	tooltip_trigger: 'manual',
	tooltip_placement: undefined,
	tooltip_container: 'body',

	//
	// methods
	//

	showTooltip: function() {
		if (this.tooltip) {
			this.tooltip.tooltip('show');
		}
	},

	hideTooltip: function() {
		if (this.tooltip) {
			this.tooltip.tooltip('hide');
		}
	},

	//
	// rendering methods
	//

	addTooltip: function(options) {
		let $el = this.tooltip_target? this.$el.find(this.tooltip_target) : this.$el;

		// add tooltip data
		//
		if (this.tooltip_title) {
			$el.attr({
				'title': this.tooltip_title.toTitleCase(),
				'data-toggle': 'tooltip'
			});
		}

		// show tooltips on trigger
		//
		this.tooltip = $el.addClass('tooltip-trigger').tooltip(_.extend(this.options, {
			trigger: this.tooltip_trigger,
			placement: this.tooltip_placement,
			container: this.tooltip_container
		}, options));
	},

	removeTooltips: function() {
		$('body').find('.tooltip').remove();
	}
};