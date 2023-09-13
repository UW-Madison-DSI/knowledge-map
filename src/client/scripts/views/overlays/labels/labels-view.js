/******************************************************************************\
|                                                                              |
|                                  labels.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a means of adding labels to the map.                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../utilities/math/vector2.js';
import BaseView from '../../base-view.js';
import LabelView from './label-view.js';

export default BaseView.extend({

	// attributes
	//

	minWeight: 1,
	maxWeight: 10,

	//
	// constructor
	//

	initialize: function(options) {

		// set attributes
		//
		this.viewport = options.viewport;
		this.labels = {};		// dictionary
		this.labelViews = [];
		this.center = Vector2.center(options.locations);
		this.zoom_level = 1;
		this.options = options;

		// add elements
		//
		this.addLabels(options.names, options.locations, options);
	},

	//
	// querying methods
	//

	isHidden: function() {
		return this.viewport.$el.hasClass('hide-labels');
	},

	//
	// vertex methods
	//

	getRandomLocation: function(spread) {
		let offset = new Vector2(Math.random() * 20 - 10, Math.random() * 20 - 10);
		return this.center.plus(offset);
	},

	getLocationOf: function(interests) {
		let labels = this.getLabels(interests);
		let locations = [];
		for (let i = 0; i < labels.length; i++) {
			locations.push(labels[i].location);
		}

		// set location to center or random
		//
		return locations && locations.length > 0? Vector2.average(locations) : undefined;
	},

	//
	// label getting methods
	//

	getLabelLocations: function(terms) {
		let locations = [];
		for (let i = 0; i < terms.length; i++) {
			let label = this.getLabel(terms[i].toLowerCase());
			if (label) {
				locations.push(label.location);
			}
		}
		return locations;
	},

	//
	// querying methods
	//

	hasLabel: function(text, options) {
		if (!options || options.exact) {
			return this.labels[text] != undefined;
		} else {
			let keys = Object.keys(this.labels);
			for (let i = 0; i < keys.length; i++) {
				let key = keys[i];
				if (key.contains(text) || text.contains(key)) {
					return true;
				}
			}
			return false;
		}
	},

	//
	// getting methods
	//

	getLabel: function(text) {
		if (text) {
			return this.labels[text.toLowerCase()];
		}
	},

	getWords: function(terms) {
		let words = [];
		for (let i = 0; i < terms.length; i++) {
			let term = terms[i];
			if (term) {
				let units = term.split(' ');
				for (let j = 0; j < units.length; j++) {
					words.push(units[j]);
				}
			}
		}
		return words;
	},

	getLabels: function(interests) {
		let labels = [];
		if (interests) {
			for (let i = 0; i < interests.length; i++) {
				let label = this.getLabel(interests[i]);
				if (label) {
					labels.push(label);
				}
			}

			if (labels.length == 0) {
				interests = this.getWords(interests);
				for (let i = 0; i < interests.length; i++) {
					let label = this.getLabel(interests[i]);
					if (label) {
						labels.push(label);
					}
				}	
			}
		}
		return labels;
	},

	//
	// setting methods
	//

	setZoomLevel: function(zoomLevel) {
		this.zoomLevel = zoomLevel;
		for (let i = this.minWeight; i <= this.maxWeight; i++) {
			let weight = (i + zoomLevel);
			let opacity = weight / 10;
			let fontSize = 5 + Math.trunc(weight / 10 * 8);
			let $elements = $('[weight=' + i + ']:not(.selected)');

			if (fontSize <= 9) {

				// hide elements
				//
				$elements.addClass('hidden');
			} else {

				// rescale elements
				//
				$elements.attr('opacity', opacity);
				$elements.css('font-size', fontSize);

				// rescale hiden elements that are about to be shown
				//
				for (let i = 0; i < $elements.length; i++) {
					this.viewport.unscale($elements[i]);
				}

				// show hidden elements
				//
				$elements.removeClass('hidden');
			}
		}
	},

	//
	// selecting methods
	//

	select: function(labels) {
		this.selectedLabels = labels;
		for (let i = 0; i < labels.length; i++) {
			let label = labels[i];
			let labelView = this.labels[label];
			if (labelView) {
				labelView.select();
				labelView.$el.removeClass('hidden');
			}
		}
	},

	deselect: function(labels) {
		this.selectedLabels = undefined;
		if (!labels) {
			labels = this.labels;
		}
		for (let i = 0; i < labels.length; i++) {
			let label = labels[i];
			let labelView = this.labels[label];
			if (labelView) {
				labelView.deselect();
				labelView.$el.addClass('hidden');
			}
		}
	},

	deselectAll: function() {
		this.viewport.$el.find('.selected').removeClass('selected');
		this.selectedLabels = null;
	},

	//
	// rendering methods
	//

	addLabel: function(name, location, options) {
		let labelView = new LabelView({
			class: 'unscaled label',
			text: name,
			location: location,
			fill: options && options.color? options.color : undefined,
			weight: options && options.weight? options.weight : 10,
			fullname: options && options.fullname? options.fullname : undefined,
			onclick: options.onclick
		});

		// add to dictionary
		//
		if (options) {
			this.labels[name.toLowerCase()] = labelView;
		}
	},

	addLabels: function(names, locations, options) {
		let fullnames = options? options.fullnames : undefined;
		let weights = options? options.weights : undefined;
		let colors = options? options.colors : undefined;

		for (let i = 0; i < names.length; i++) {

			// set optional values
			//
			let fullname = fullnames? fullnames[i] : undefined;
			let weight = weights? weights[i] : undefined;
			let color = colors? colors[i] : undefined;
			this.addLabel(names[i], locations[i], {
				fullname: fullname,
				weight : weight, 
				color: color
			});
		}
	},

	render: function() {
		let bounds = this.viewport.getBounds();

		// expand bounds
		//
		let width = bounds.x.max - bounds.x.min;
		let height = bounds.y.max - bounds.y.min;
		bounds.x.min -= width / 3;
		bounds.x.max += width / 3;
		bounds.y.min -= height / 3;
		bounds.y.max += height / 3;

		// render labels inside bounds
		//
		this.labelViews = [];
		let keys = Object.keys(this.labels);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let labelView = this.labels[key];
			let point = new Vector2(labelView.location.x, -labelView.location.y);
			if (bounds.contains(point)) {
				let element = labelView.render();
				this.viewport.add(element, 'labels');
				this.labelViews.push(labelView);

				// add label callback
				//
				labelView.$el.click((event) => {
					if (this.options.onclick) {
						this.options.onclick(labelView);
					}
				});
			}
		}

		if (this.selectedLabels) {
			this.select(this.selectedLabels);
		}

		this.update();
	},

	clear: function() {
		for (let i = 0; i < this.labelViews.length; i++) {
			this.labelViews[i].$el.off();
			this.labelViews[i].$el.remove();
		}
		this.labelViews = [];
	},

	redraw: function() {
		this.clear();
		this.render();
	},

	update: function() {
		this.setZoomLevel(this.viewport.getZoomLevel());
	},

	//
	// hiding methods
	//

	show: function() {
		this.viewport.$el.find('#labels').show();
		this.update();
	},

	hide: function() {
		this.viewport.$el.find('#labels').hide();
		this.update();
	},

	showUnselected: function() {
		this.viewport.$el.find('.label:not(.selected').removeClass('hidden');
	},

	hideUnselected: function() {
		this.viewport.$el.find('.label:not(.selected').addClass('hidden');
	}
});