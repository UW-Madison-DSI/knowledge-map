/******************************************************************************\
|                                                                              |
|                               trends-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing activity trends over time.            |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseView from '../base-view.js';
import '../../../vendor/chartjs/chart.js';

export default BaseView.extend({

	//
	// attributes
	//

	className: 'trends',

	template: _.template(`
		<label><span class="activity"></span> / Year</label>
		<canvas id="chart" width="100%" height="100%"></canvas>
	`),

	//
	// getting methods
	//

	getYears: function(range) {
		let years = [];
		for (let year = range[0]; year <= range[1]; year++) {
			years.push(year);
		}
		return years;
	},

	getNumInstances: function(year, collection) {
		let value = 0;
		for (let i = 0; i < collection.length; i++) {
			let model = collection.at(i);
			if (model.happenedIn(year)) {
				value++;
			}
		}
		return value;
	},

	getValues: function(range, collection) {
		let values = [];
		for (let year = range[0]; year <= range[1]; year++) {
			values.push(this.getNumInstances(year, collection));
		}
		return values;
	},

	getRGBColor: function(color) {
		let div = document.createElement("div");
		div.style.color = color;
		document.body.appendChild(div);
		let rgbColor = window.getComputedStyle(div).color;
		div.remove();
		rgbColor = rgbColor.replace('rgb(', '').replace(')', '').split(', ');
		let r = parseInt(rgbColor[0]);
		let g = parseInt(rgbColor[1]);
		let b = parseInt(rgbColor[2]);
		return [r, g, b];
	},

	getRGBAColor: function(color, opacity) {
		let rgb = this.getRGBColor(color);
		let r = rgb[0];
		let g = rgb[1];
		let b = rgb[2];
		let a = opacity;
		return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
	},

	//
	// rendering methods
	//

	onRender: function() {
		const ctx = this.$el.find('#chart')[0].getContext('2d');
		let years = this.getYears(this.options.range);
		let values = this.getValues(this.options.range, this.collection);
		let title = this.options.activity.replace(/_/g, ' ').toTitleCase();
		let color = this.options.color || 'grey';

		// update label
		//
		this.$el.find('.activity').text(title);

		// show chart
		//
		if (this.chart) {
			this.chart.destroy();
		}
		this.chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: years,
				datasets: [{
					label: title + ' / Year',
					data: values,
					fill: true,
					backgroundColor: this.getRGBAColor(color, 0.5),
					borderColor: color,
					borderWidth: 2
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				},
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {
					x: {
						display: true
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				resizeDelay: 0
			}
		});
	}
});