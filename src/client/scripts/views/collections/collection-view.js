/******************************************************************************\
|                                                                              |
|                              collection-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a base class for creating collection views.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Hierarchical from '../behaviors/hierarchical.js';

export default Marionette.CollectionView.extend(_.extend({}, Hierarchical, {

	//
	// constructor
	//

	initialize: function() {

		// set attributes
		//
		if (this.options.emptyView) {
			this.emptyView = this.options.emptyView;
		}
		if (this.options.viewFilter) {
			this.viewFilter = this.options.viewFilter;
		}
		if (this.options.parent) {
			this.parent = this.options.parent;
		}

		// call superclass constructor
		//
		Marionette.CollectionView.prototype.initialize.call(this);
	},

	//
	// querying methods
	//

	isEmpty: function() {
		return this.children.length == 0;
	},

	numChildren: function() {
		return this.children.length;
	},

	//
	// iterator
	//

	each: function(callback, filter, options) {
		let children = [];
		for (let i = 0; i < this.children.length; i++) {
			let child = this.children.findByIndex(i);
			if (!filter || filter(child)) {
				if (callback(child, options) == false) {
					break;
				}
			}
		}
	},

	//
	// querying methods
	//

	isVisible: function() {
		return this.$el.is(':visible');
	},

	hasParentView: function(className) {
		if (this.$el.hasClass(className)) {
			return true;
		} else if (this.parent && this.parent.hasParentView) {
			return this.parent.hasParentView(className);
		} else if (this.options.parent && this.options.parent.hasParentView) {
			return this.options.parent.hasParentView(className);
		} else {
			return false;
		}
	},

	hasChildViewAt: function(index) {
		return this.children.findByIndex(index) != null;
	},

	//
	// getting methods
	//

	getParentView: function(className) {
		if (this.$el.hasClass(className)) {
			return this;
		} else if (this.parent && this.parent.getParentView) {
			return this.parent.getParentView(className);
		}
	},

	getChildViewAt: function(index) {
		return this.children.findByIndex(index);
	},

	getItemView: function(model) {
		return this.children.findByModel(model);
	},

	setVisible: function(visibility) {
		if (visibility) {
			this.$el.show();
		} else {
			this.$el.hide();
		}
	},

	//
	// rendering methods
	//

	buildChildView: function(child, ChildViewClass, childViewOptions) {

		// call superclass method
		//
		let view = Marionette.CollectionView.prototype.buildChildView.call(this, child, ChildViewClass, childViewOptions);

		// attach child to parent
		//
		view.parent = this;

		return view;
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
	// child event handling methods
	//

	onAddChild: function(parentView, childView) {

		// perform callback
		//
		if (this.options.onadd && this.isRendered()) {
			this.options.onadd(childView);
		}
	},

	onRemoveChild: function(parentView, childView) {

		// perform callback
		//
		if (this.options.onremove && this.isRendered()) {
			this.options.onremove(childView);
		}
	}
}));
