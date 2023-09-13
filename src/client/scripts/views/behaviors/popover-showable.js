/******************************************************************************\
|                                                                              |
|                             popover-showable.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for displaying popovers.                      |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../../../vendor/bootstrap/js/tooltip.js';
import '../../../vendor/bootstrap/js/popover.js';

export default {

	//
	// attributes
	//

	popover_container: '.modal',
	popover_trigger: 'hover',
	popover_placement: 'top',

	//
	// querying methods
	//

	container: function() {
		return this.$el.closest(this.popover_container)[0] || this.el;
	},

	//
	// rendering methods
	//

	addPopovers: function(options) {
		
		// show popovers on trigger
		//
		this.$el.find('[data-toggle="popover"]').addClass('popover-trigger').popover(_.extend({
			container: _.result(this, 'container'),
			trigger: this.popover_trigger,
			placement: this.popover_placement
		}, options));
	},

	removePopovers: function() {
		$('.popover').remove();
	}
};
