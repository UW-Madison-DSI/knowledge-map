/******************************************************************************\
|                                                                              |
|                         marker-popover-showable.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../../../vendor/bootstrap/js/tooltip.js';
import '../../../vendor/bootstrap/js/popover.js';

export default {

	//
	// popover attributes
	//

	popover_type: undefined,
	popover_icon: undefined,
	popover_target: undefined,
	popover_title: 'Title',
	popover_template: 'This is a popover!',
	popover_container: 'body',
	popover_placement: 'bottom',
	popover_trigger: 'hover',

	//
	// querying methods
	//

	hasPopover: function() {
		return this.$popover != undefined;
	},

	isShowingPopover: function() {
		return $('.popover').length > 0;
	},

	//
	// getting methods
	//

	getPopoverElement: function() {
		return this.popover_target? this.$el.find(this.popover_target) : this.$el;
	},

	getPopoverAttributes: function() {
		return {
			'data-toggle': 'popover',
			'data-html': true,
			'title': this.getPopoverTitle(),
			'data-content': this.getPopoverContent()
		};
	},

	getPopoverIcon: function() {
		return this.popover_icon? '<span class="' + (this.popover_type? this.popover_type + ' ' : '') + 'icon"><i class="' + this.popover_icon + '"></i></span>' : '';
	},

	getPopoverTitleContent: function() {
		return _.template(this.popover_title)(this.model.attributes);
	},

	getPopoverCloseButton: function() {
		return '<button class="close"><i class="fa fa-close"></i></button>';
	},

	getPopoverTitle: function() {
		return this.getPopoverIcon() + this.getPopoverTitleContent() + this.getPopoverCloseButton();
	},

	getPopoverContent: function() {
		return _.template(this.popover_template)(this.model.attributes);
	},

	//
	// hiding methods
	//

	showPopover: function() {
		if (!this.hasPopover()) {
			this.addPopover({

				// show popover after added
				//
				done: () => {
					this.showPopover();
				}
			});
		} else {
			if (this.$popover) {
				this.removePopovers();
				this.$popover.popover('show');
			}
		}
	},

	hidePopover: function() {
		if (this.$popover) {
			this.$popover.popover('hide');
		}
	},

	//
	// rendering methods
	//

	togglePopover: function() {
		if (!this.isShowingPopover()) {
			this.showPopover();

			// hide popover when clicking on viewport
			//
			this.mousedownhandler = (event) => {
				let viewport = this.getParentViewById('viewport');
				if (viewport) {
					if (event.target == viewport.el) {
						this.hidePopover();

						// add deselect callback
						//
						let view = this.getTopView();
						if (view && view.$el) {
							view.$el.off('mousedown', this.mousedownhandler);
						}
					}
				}
			};

			// add deselect callback
			//
			let view = this.getTopView();
			if (view && view.$el) {
				view.$el.on('mousedown', this.mousedownhandler);
			}
		} else {
			this.hidePopover();
		}
	},

	addPopover: function(options) {
		let $el = this.getPopoverElement();

		// add only one popover per element
		//
		if (this.$popover) {
			return;
		}

		// add popover data
		//
		$el.attr(this.getPopoverAttributes());

		// add popover trigger
		//
		this.$popover = $el.addClass('popover-trigger').popover(_.extend({
			container: this.popover_container,
			trigger: this.popover_trigger,
			placement: this.popover_placement
		}, options));

		// add close action
		//
		this.$popover.on('shown.bs.popover', (event) => {
			$('.popover .close').on('click', (event) => {
				$(event.target).closest('.popover').popover('hide');
			});
		});

		// perform callback
		//
		if (options && options.done) {
			options.done();
		}
	},

	//
	// cleanup methods
	//

	removePopovers() {
		$('.popover').remove();
	},
};