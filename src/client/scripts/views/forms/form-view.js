/******************************************************************************\
|                                                                              |
|                                 form-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an abstract base class for form views.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|         Copyright (C) 2016-2022, Megahed Labs LLC, www.sharedigm.com         |
\******************************************************************************/

import BaseView from '../base-view.js';
import PopoverShowable from '../behaviors/popover-showable.js';
import '../../../vendor/jquery/validate/js/jquery.validate.js';

export default BaseView.extend(_.extend({}, PopoverShowable, {

	//
	// attributes
	//

	tagName: 'form',

	events: {

		// form events
		//
		'submit': 'onSubmit',

		// input events
		//
		'input input': 'onChange',
		'input textarea': 'onChange',
		'change select': 'onChange',
	},

	focusable: 'input:visible, textarea:visible, select:visible',

	// prevent default form submission
	//
	attributes: {
		'onsubmit': 'return false'
	},

	//
	// constructor
	//

	initialize: function() {

		// set attributes
		//
		if (this.options.focusable !== undefined) {
			this.focusable = this.options.focuable;
		}
		if (this.options.focused == undefined) {
			this.options.focused = true;
		}
	},

	//
	// getting methods
	//

	getElementsValues: function(selector) {
		return $.map(this.$el.find(selector), (el) => $(el).val());
	},

	getElementsByValues: function(selector, values) {
		let els = this.$el.find(selector);

		// find elements where the values of the
		// element is included in the provided set
		//
		let elements = [];
		for (let i = 0; i < els.length; i++) {
			let $el = $(els[i]);
			let value = $el.val();
			if (values.includes(value)) {
				elements.push($el);
			}
		}

		return $(elements);
	},

	//
	// setting methods
	//

	setValues: function(values) {

		// set initial form values
		//
		for (let key in values) {
			let value = values[key];
			this.setValue(key, value);
		}
	},

	//
	// form methods
	//

	focus: function() {
		if (this.focusable) {

			// find first element to focus on
			//
			let element = this.$el.find(this.focusable).first();
			if (element) {
				element.focus();
			}
		}
	},

	container: function() {
		return this.$el.closest(this.popover_container)[0] || this.el;
	},

	//
	// rendering methods
	//

	onRender: function() {

		// show form regions
		//
		this.showRegions();

		// create form validator
		//
		this.validate();
	},

	onAttach: function() {

		// add popover triggers
		//
		this.addPopovers();
	},

	//
	// form validating methods
	//

	validate: function() {
		this.validator = this.$el.validate({
			rules: this.rules,
			messages: this.messages,
			onfocusout: false
		});
	},

	isValid: function() {
		if (this.validator) {
			return this.validator.checkForm();
		} else {
			return true;
		}
	},

	//
	// form submission methods
	//

	apply: function() {

		// check form validation
		//
		if (!this.isValid()) {
			return null;
		} else {

			// set model attributes
			//
			this.model.set(this.getValues());
			return this.model;
		}
	},
	
	submit: function(options) {

		// check form validation
		//
		if (!this.isValid()) {
			return null;
		} else {

			// save model
			//
			this.model.save(this.getValues(), options);
			return this.model;
		}
	},

	//
	// form event handling methods
	//

	onSubmit: function() {
		this.submit();
	},

	//
	// event handling methods
	//

	onChange: function() {

		// perform callback
		//
		if (this.options.onvalidate) {
			this.options.onvalidate(this.isValid());
		}
	},

	//
	// cleanup methods
	//

	onBeforeDestroy: function() {
		this.removePopovers();
	}
}));
