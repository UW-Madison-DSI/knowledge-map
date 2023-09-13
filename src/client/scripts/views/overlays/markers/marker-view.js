/******************************************************************************\
|                                                                              |
|                                  marker-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseView from '../../base-view.js';
import SVGRenderable from '../../svg/behaviors/svg-renderable.js';
import PopoverShowable from '../../behaviors/marker-popover-showable.js';
import TooltipShowable from '../../behaviors/tooltip-showable.js';

export default BaseView.extend(_.extend({}, SVGRenderable, PopoverShowable, TooltipShowable, {

	//
	// attributes
	//

	tagName: 'svg',
	className: 'unscaled marker',
	animated: true,
	deselectable: true,
	popover_trigger: 'manual',

	events: {
		'mouseover': 'onMouseOver',
		'mouseleave': 'onMouseLeave',
		'click': 'onClick',
		'dblclick': 'onDoubleClick'
	},

	//
	// constructor
	//

	initialize: function() {

		// set attributes
		//
		if (this.options.location) {
			this.location = this.options.location;
		}
		if (this.options.width) {
			this.width = this.options.width;
		}
		if (this.options.height) {
			this.height = this.options.height;
		}
		if (this.options.fill) {
			this.fill = this.options.fill;
		}
	},

	attributes: function() {
		return {
			'id': this.options.id,
			'class': this.options.class,
			'viewBox': this.viewBox,
			'x': this.location? this.location.x : undefined,
			'y': this.location? -this.location.y : undefined,
			'fill': this.options.fill,
			'stroke': this.options.stroke
		}
	},

	//
	// querying methods
	//

	isSelected: function() {
		return this.$el.hasClass('selected');
	},

	//
	// getting methods
	//

	getIcon: function() {

		// get svg from document
		//
		let icon = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		// set attributes
		//
		$(icon).attr({
			'class': 'icon',
			'd': this.d,
			'width': this.width,
			'height': this.height,
			'transform': this.offset? 'translate(' + this.offset.x + ', ' + this.offset.y + ')' : undefined
		});

		return icon;
	},

	getGroup: function() {
		let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		group.append(this.getIcon());
		return group;
	},

	//
	// popover getting methods
	//

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
		if (this.popover_title) {
			return _.template(this.popover_title)(this.model.attributes);
		} else {
			return this.$el.attr('title');
		}
	},

	getPopoverCloseButton: function() {
		return '<button class="close"><i class="fa fa-close"></i></button>';
	},

	getPopoverTitle: function() {
		return this.getPopoverIcon() + this.getPopoverTitleContent() + this.getPopoverCloseButton();
	},

	getPopoverContent: function() {
		if (this.popover_template) {
			return _.template(this.popover_template)(this.model.attributes);
		} else {
			return this.$el.attr('data-content');
		}
	},

	//
	// selection methods
	//

	select: function() {
		if (this.isSelected()) {
			return;
		}

		this.$el.addClass('selected');

		// add deselect action
		//
		if (this.deselectable) {

			// add deselect callback
			//
			let viewport = this.getParentViewById('viewport');
			if (viewport) {
				this.mousedownhandler = (event) => {
					if ($(event.target).closest('.marker').length == 0) {
						this.deselect();

						// add deselect callback
						//
						let viewport = this.getParentViewById('viewport');
						if (viewport) {
							viewport.$el.off('mousedown', this.mousedownhandler);
						}
					}
				};
				viewport.$el.on('mousedown', this.mousedownhandler);
			}
		}

		// perform callback
		//
		if (this.options.onselect) {
			this.options.onselect(this);
		}
	},

	deselect: function() {
		if (!this.isSelected()) {
			return;
		}

		this.$el.removeClass('selected');
		this.removePopovers();

		/*
		if (this.options.parent && this.options.parent.deselect) {
			this.options.parent.deselect();
		}
		*/

		// perform callback
		//
		if (this.options.ondeselect) {
			this.options.ondeselect(this);
		}
	},

	highlight: function() {
		this.$el.addClass('highlighted');
	},

	unhighlight: function() {
		this.$el.removeClass('highlighted');
	},

	//
	// rendering methods
	//

	render: function() {
		let $el = SVGRenderable.render.call(this);
		return $el;
	},

	onRender: function() {
		this.unscale();
	},

	toElement: function() {

		// create icon
		//
		let element = SVGRenderable.toElement.call(this);

		// set attributes
		//
		element.append(this.getGroup());

		return element;
	},

	show: function(options) {
		if (this.animated) {
			this.$el.fadeIn(options);
		} else {
			this.$el.removeClass('hidden');
		}		
	},

	hide: function(options) {
		if (this.animated) {
			this.$el.fadeOut(options);
		} else {
			this.$el.addClass('hidden');
		}		
	},

	unscale() {
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.unscale(this.$el);
		}
	},

	//
	// mouse event handling methods
	//

	onClick: function(event) {
		this.togglePopover();
		
		if (!this.isSelected()) {
			this.select();

			if (this.options.onclick) {
				this.options.onclick();
			}
		}

		// block from parents
		//
		event.stopPropagation();
	},

	onBeforeDestroy: function() {
		this.hidePopover();
	}
}));