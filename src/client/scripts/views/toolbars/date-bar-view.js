/******************************************************************************\
|                                                                              |
|                              date-bar-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the date / date range controls.                          |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ToolbarView from './toolbar-view.js';

export default ToolbarView.extend({

	//
	// attributes
	//

	id: 'date-bar',

	template: _.template(`
		<div class="title">Date</div>

		<div id="date">
			<div id="year" data-toggle="tooltip" title="Date" data-placement="top">
				<label>
					<i class="fa fa-calendar"></i>
					<span class="from"></span>
					<span class="preposition">to</span>
					<span class="to"></span>
				</label>
			</div>

			<div class="buttons">
				<button id="play" data-toggle="tooltip" title="Play / Pause" data-placement="top">
					<i class="fa fa-play"></i>
					<i class="fa fa-pause hidden"></i>
				</button>
			</div>
		</div>

		<div id="date-slider" class="slider" data-toggle="tooltip" title="Year" data-placement="top">
			<div class="slider-range"></div>
			<div class="slider-min"></div>
			<div class="slider-max"></div>
		</div>

		<div class="buttons">
			<button id="range" data-toggle="tooltip" title="Toggle Year / Range" data-placement="top">
				<i class="fa fa-calendar hidden"></i>
				<i class="fa fa-arrows-left-right"></i>
			</button>
		</div>
	`),

	events: {
		'click #play': 'onClickPlay',
		'click #range': 'onClickRange'
	},

	//
	// constructor
	//

	initialize: function(options) {

		// set attributes
		//
		this.range = [1990, new Date().getFullYear()];
		this.value = this.range[1];
		this.values = [this.range[0], this.range[1]];
		this.show_range = true;
		this.playing = false;
	},

	//
	// querying methods
	//

	hasRange: function() {
		return this.show_range && (this.values[0] != this.range[0] ||
			this.values[1] != this.range[1]);
	},

	hasYear: function() {
		return !this.show_range;
	},

	//
	// getting methods
	//

	getRange: function() {
		return this.values;
	},

	getYear: function() {
		return this.value;
	},

	getQueryParams: function(params) {
		if (this.isVisible()) {
			if (this.hasRange()) {
				let range = this.getRange();
				params.set('from', range[0]);
				params.set('to', range[1]);
			} else if (this.hasYear()) {
				params.set('year', this.getYear());
			}
		}
		return params;
	},

	//
	// setting methods
	//

	setQueryParams: function(params) {
		if (params.from) {
			this.setRange(params.from, params.to);
		} else {
			this.setYear(params.year);
		}
	},

	setRange: function(from, to) {
		this.values = [from, to];
		this.showRange();
	},

	setYear: function(year) {
		this.value = year;
		this.showValue();
	},

	setQueryParams: function(params) {
		if (params.year) {
			let year = parseInt(params.year);
			this.setYear(year);
		} else if (params.from) {
			let from = parseInt(params.from);
			let to = parseInt(params.to);
			this.setRange(from, to);
		}
	},

	//
	// play / pause methods
	//

	play: function() {

		// update button icon
		//
		this.$el.find('.fa-play').addClass('hidden');
		this.$el.find('.fa-pause').removeClass('hidden');

		// set update interval
		//
		this.interval = window.setInterval(() => {
			let value = this.slider.slider('value');
			if (value >= this.slider.slider('option', 'max')) {
				value = this.slider.slider('option', 'min');
			} else {
				value++;
			}
			this.slider.slider('value', value);
			this.slider.trigger('slidechange');
		}, 500);
	},

	pause: function() {

		// update button icon
		//
		this.$el.find('button .fa-play').removeClass('hidden');
		this.$el.find('button .fa-pause').addClass('hidden');

		// clear update interval
		//
		window.clearInterval(this.interval);
	},

	stop: function() {
		if (this.playing) {
			this.onClickPlay();
		}
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		ToolbarView.prototype.onRender.call(this);

		// initialize range slider
		//
		if (this.show_range) {
			this.showRange();
		} else {
			this.showValue();
		}
	},

	//
	// time slider methods
	//

	showValue: function() {
		this.$el.find('#play').show();

		// update button icon
		//
		this.$el.find('button .fa-calendar').addClass('hidden');
		this.$el.find('button .fa-arrows-left-right').removeClass('hidden');

		// set slider mode
		//
		if (this.slider) {
			this.$el.find("#date-slider .slider-range").slider('destroy');
		}
		this.slider = this.$el.find("#date-slider .slider-range").slider({
			range: false,
			value: this.value,
			min: this.range[0],
			max: this.range[1],
			step: 1,

			// callbacks
			//
			create: (event, ui) => {
				this.updateSliderLabel(this.value);
				this.updateYear();
			},
			slide: (event, ui) => {
				this.value = ui.value;
				this.updateSliderLabel(this.value);
				this.updateYear();
			},
			change: (event, ui) => {
				this.value = ui.value;
				this.updateSliderLabel(this.value);
				this.updateYear();

				if (this.options.onchange) {
					this.options.onchange(this.value);
				}
			}
		});

		this.show_range = false;
	},

	showRange: function() {
		this.$el.find('#play').hide();

		// update button icon
		//
		this.$el.find('.fa-calendar').removeClass('hidden');
		this.$el.find('.fa-arrows-left-right').addClass('hidden');

		// set slider mode
		//
		if (this.slider) {
			this.$el.find("#date-slider .slider-range").slider('destroy');
		}
		this.slider = this.$el.find("#date-slider .slider-range").slider({
			range: true,
			min: this.range[0],
			max: this.range[1],
			values: this.values,

			// callbacks
			//
			create: (event, ui) => {
				this.updateSliderLabels(this.values);
				this.updateRange();
			},
			slide: (event, ui) => {
				this.values = [ui.values[0], ui.values[1]];
				this.updateSliderLabels(this.values);
				this.updateRange();
			},
			change: (event, ui) => {
				this.values = [ui.values[0], ui.values[1]];
				this.updateSliderLabels(this.values);
				this.updateRange();

				if (this.options.onchange) {
					this.options.onchange(this.values);
				}
			}
		});

		this.show_range = true;
	},

	//
	// updating methods
	//

	updateSliderLabel: function(value) {
		this.$el.find(' .preposition').hide();
		this.$el.find(' .from').show();
		this.$el.find(' .to').hide();
		this.$el.find(' .from').text(value);
		this.$el.find(' .to').text(value);
	},

	updateSliderLabels: function(values) {
		let min = values[0];
		let max = values[1];
		if (min == max) {
			this.$el.find(' .preposition').hide();
			this.$el.find(' .from').show();
			this.$el.find(' .to').hide();
			this.$el.find(' .from').text(min);
			this.$el.find(' .to').text(max);
		} else {
			this.$el.find(' .preposition').show();
			this.$el.find(' .from').show();
			this.$el.find(' .to').show();
			this.$el.find(' .from').text(min);
			this.$el.find(' .to').text(max);
		}
	},

	updateYear: function() {
		this.getTopView().setYear(this.value)
	},

	updateRange: function() {
		this.getTopView().setRange(this.values);
	},

	update: function() {
		if (this.show_range) {
			this.getTopView().setRange(this.values);
		} else {
			this.getTopView().setYear(this.value);
		}
	},

	//
	// hiding methods
	//

	show: function() {
		this.$el.removeClass('hidden');
		this.update();
	},

	hide: function() {
		this.$el.addClass('hidden');
	},

	showDateControls: function() {
		this.$el.find('#date').removeClass('hidden');
		this.$el.find('#date-slider').removeClass('hidden');
		this.$el.find('#range').removeClass('hidden');
	},

	hideDateControls: function() {
		this.$el.find('#date').addClass('hidden');
		this.$el.find('#date-slider').addClass('hidden');
		this.$el.find('#range').addClass('hidden');
	},

	//
	// mouse event handling methods
	//

	onClickPlay: function() {
		this.playing = !this.playing;
		if (this.playing) {
			this.play();
		} else {
			this.pause();
		}
	},

	onClickRange: function() {
		if (this.playing) {
			this.onClickPlay();
		}
		this.show_range = !this.show_range;
		if (this.show_range) {
			this.values = [this.range[0], this.range[1]];
			this.showRange();
		} else {
			this.showValue();
		}

		// perform callback
		//
		if (this.options.onchange) {
			this.options.onchange();
		}
	}
});