/******************************************************************************\
|                                                                              |
|                             zoom-bar-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the navigations controls.                                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../utilities/math/vector2.js';
import ToolbarView from './toolbar-view.js';

let minZoomLevel = 1;
let maxZoomLevel = 9;
let zoomDuration = 500;

export default ToolbarView.extend({

	//
	// attributes
	//

	id: 'zoom-bar',
	className: 'vertical toolbar',

	template: _.template(`
		<div class="buttons">
			<button id="zoom-in" data-toggle="tooltip" title="Zoom In" data-placement="left"><i class="fa fa-plus"></i></button>
			<div class="current" data-toggle="tooltip" title="Current Zoom Level" data-placement="left">1</div>
			<button id="zoom-out" data-toggle="tooltip" title="Zoom Out" data-placement="left"><i class="fa fa-minus"></i></button>
		</div>
	`),

	events: {
		'click #zoom-in': 'onClickZoomIn',
		'click #zoom-out': 'onClickZoomOut'
	},

	//
	// conversion methods
	//

	scaleToZoomLevel: function(scale) {
		return Math.log2(scale);
	},

	zoomLevelToScale: function(zoomLevel) {
		return Math.pow(2, zoomLevel);
	},

	//
	// getting methods
	//

	getZoomLevel: function() {
		return this.scaleToZoomLevel(this.viewport.scale);
	},

	//
	// zooming methods
	//

	zoomTo: function(zoomLevel, options) {
		let self = this;
		let start = this.getZoomLevel();
		let finish = zoomLevel;

		// skip zoom
		//
		if (Math.abs(start - finish) < 0.001) {
			if (options && options.done) {
				options.done();
			}
			return;
		}

		return $({zoomLevel: start}).animate({zoomLevel: finish}, {
			duration: options && options.duration? options.duration : zoomDuration,

			// callbacks
			//
			step: function() { 
				self.viewport.setScale(self.zoomLevelToScale(this.zoomLevel));
			},
			complete: options? options.done : undefined
		});
	},

	zoomIn: function(options) {
		let zoomLevel = Math.min(this.scaleToZoomLevel(this.viewport.scale), maxZoomLevel);
		return this.zoomTo(zoomLevel + 1, {
			duration: options? options.duration : undefined,

			// callbacks
			//
			done: () => {
				if (this.options.onzoomend) {
					this.options.onzoomend();
				}
			}
		});
	},

	zoomOut: function(options) {
		let zoomLevel = Math.min(this.scaleToZoomLevel(this.viewport.scale), maxZoomLevel);
		return this.zoomTo(zoomLevel - 1, {
			duration: options? options.duration : undefined,

			// callbacks
			//
			done: () => {
				if (this.options.onzoomend) {
					this.options.onzoomend();
				}
			}
		});
	},

	//
	// panning methods
	//

	panTo: function(location, options) {
		let self = this;
		let start = this.viewport.offset;
		let finish = new Vector2(-location.x, location.y);

		// skip zoom
		//
		if (start.distanceTo(finish) < 0.001) {
			if (options && options.done) {
				options.done();
			}
			return;
		}

		return $({x: start.x, y:start.y}).animate({x: finish.x, y:finish.y}, {
			duration: options && options.duration? options.duration : zoomDuration,

			// callbacks
			//
			step: function() { 
				self.viewport.setOffset(new Vector2(this.x, this.y));
			},
			complete: options? options.done : undefined
		});
	},

	panAndZoomTo: function(location, zoomLevel, options) {
		return this.panTo(location, {
			duration: options && options.duration? options.duration : zoomDuration,

			// callbacks
			//
			done: () => {
				this.zoomTo(zoomLevel, options);		
			}
		});
	},

	zoomAndPanTo: function(location, zoomLevel, options) {
		return this.zoomTo(zoomLevel, {
			duration: options && options.duration? options.duration : zoomDuration,

			// callbacks
			//
			done: () => {
				this.panTo(location, options);		
			}
		});
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		ToolbarView.prototype.onRender.call(this);

		// set attributes
		//
		this.viewport = this.options.parent.viewport;

		// handle all keyboard events
		//
		$('body').on('keydown', (event) => {
			this.onKeyDown(event);
		});
	},

	showZoomLevel: function(zoomLevel) {
		$('#zoom-bar .current').text(Math.trunc(zoomLevel));
	},

	//
	// mouse event handling methods
	//

	onClickZoomIn: function() {
		this.zoomIn();
	},

	onClickZoomOut: function() {
		this.zoomOut()
	},

	//
	// keyboard event handling methods
	//

	onKeyDown: function(event) {
		if (event.keyCode == 187) {
			this.$el.find('#zoom-in').trigger('click');
		} else if (event.keyCode == 189) {
			this.$el.find('#zoom-out').trigger('click');
		}
		event.stopPropagation();
	}
});