/******************************************************************************\
|                                                                              |
|                             base-map-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a basic map view.                                        |
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
import Units from '../../utilities/math/units.js';
import BaseView from '../base-view.js';
import SVGViewport from '../svg/viewports/svg-viewport.js';
import MultiGrid from '../svg/viewports/grids/multi-grid.js';
import MouseDragPanBehavior from '../svg/viewports/behaviors/navigation/mouse-drag-pan-behavior.js';
import MouseDragZoomBehavior from '../svg/viewports/behaviors/navigation/mouse-drag-zoom-behavior.js';
import MouseWheelZoomBehavior from '../svg/viewports/behaviors/navigation/mouse-wheel-zoom-behavior.js';
import BingMap from '../maps/tiles/bing-maps.js';
import MapTiles from '../maps/tiles/map-tiles.js';
import ZoomBarView from '../toolbars/zoom-bar-view.js';
import FullScreenable from '../behaviors/full-screenable.js';

//
// fetching methods
//

export default BaseView.extend(_.extend({}, FullScreenable, {

	//
	// attributes
	//

	template: _.template(`
		<svg id="viewport">
			<defs>
				<filter id="outlined" color-interpolation-filters="sRGB">
					<feMorphology in="SourceAlpha" result="MORPH" operator="dilate" radius="1" />
					<feColorMatrix in="MORPH" result="WHITENED" type="matrix" values="-1 0 0 0 1, 0 -1 0 0 1, 0 0 -1 0 1, 0 0 0 1 0"/>
					<feMerge>
						<feMergeNode in="WHITENED"/>
						<feMergeNode in="SourceGraphic"/>
					</feMerge>
				</filter>
				<filter id="selected-text" x="-.025" y="0.15" width="1.05" height="0.75">
					<feFlood flood-color="black"/>
					<feComposite in="SourceGraphic"/>
				</filter>
			</defs>
			<g id="tiles"></g>
			<g id="departments" style="display:none"></g>
		</svg>

		<div id="user-interface">
			<div id="zoom-bar"></div>
		</div>
	`),

	regions: {
		zoom: {
			el: '#zoom-bar',
			replaceElement: true
		}
	},

	//
	// constructor
	//

	initialize: function(options) {

		// set attributes
		//
		this.options = options || {};
		this.scale = 1;
		this.offset = new Vector2(0, 0);
		this.grid = this.options.grid !== undefined? this.options.grid : new MultiGrid();
		this.layers = this.options.layers || ['overlays'];
		this.stack = [];
		this.parent = this.options.parent;
	},

	//
	// converting methods
	//

	latLongToPoint: function(latitude, longitude) {
		let scale = Math.pow(2, this.options.zoom_level - 14);
		let point = new Vector2(-longitude, latitude);
		point = point.minus(new Vector2(this.map.longitude, this.map.latitude));
		point.x = -point.x;
		point = point.times(new Vector2(11650, 15950).scaledBy(scale));
		return point;
	},

	getLocation: function() {
		return new Vector2(-this.viewport.offset.x, this.viewport.offset.y);
	},

	getZoomLevel: function() {
		return this.viewport.getZoomLevel();
	},

	//
	// navigation methods
	//

	panTo: function(location, options) {
		let duration = options && options.duration? options.duration : 1000;

		// start animation
		//
		this.onPanStart();

		// stop previous animation
		//
		if (this.animation) {
			this.animation.stop();
		}

		this.animation = this.getChildView('zoom').panTo(location, {
			duration: duration,

			// callbacks
			//
			done: () => {
				this.animation = null;

				// end animation
				//
				this.onPanEnd();

				// perform callback
				//
				if (options && options.done) {
					options.done();
				}
			}
		});
	},

	zoomTo: function(zoomLevel, options) {
		let duration = options && options.duration? options.duration : 1000;

		// start animation
		//
		this.onZoomStart();

		// stop previous animation
		//
		if (this.animation) {
			this.animation.stop();
		}

		this.animation = this.getChildView('zoom').panTo(location, {
			duration: duration,

			// callbacks
			//
			done: () => {
				this.animation = null;

				// end animation
				//
				this.onZoomEnd();

				// perform callback
				//
				if (options && options.done) {
					options.done();
				}
			}
		});	
	},

	panAndZoomTo: function(location, zoomLevel, options) {
		let duration = options && options.duration? options.duration : 1000;

		// start animation
		//
		this.onPanStart();
		this.onZoomStart();

		// stop previous animation
		//
		if (this.animation) {
			this.animation.stop();
		}

		this.animation = this.getChildView('zoom').panAndZoomTo(location, zoomLevel, {
			duration: duration,

			// callbacks
			//
			done: () => {
				this.animation = null;

				// end animation
				//
				this.onPanEnd();
				this.onZoomEnd();

				// perform callback
				//
				if (options && options.done) {
					options.done();
				}
			}
		});
	},

	zoomAndPanTo: function(location, zoomLevel, options) {
		let duration = options && options.duration? options.duration : 1000;

		// start animation
		//
		this.onZoomStart();
		this.onPanStart();

		// stop previous animation
		//
		if (this.animation) {
			this.animation.stop();
		}

		this.animation = this.getChildView('zoom').zoomAndPanTo(location, zoomLevel, {
			duration: duration,

			// callbacks
			//
			done: () => {
				this.animation = null;

				// end animation
				//
				this.onZoomEnd();
				this.onPanEnd();

				// perform callback
				//
				if (options && options.done) {
					options.done();
				}
			}
		});
	},

	goTo: function(location, zoomLevel, options) {
		if (this.getZoomLevel() > zoomLevel) {
			this.zoomAndPanTo(location, zoomLevel, options);
		} else {
			this.panAndZoomTo(location, zoomLevel, options);
		}
	},

	zoomToLocations: function(locations, options) {
		let center = Vector2.center(locations);
		let zoomLevel = locations.length > 1? this.getVerticesZoomLevel(locations): 1;
		let duration = options && options.duration? options.duration : 1000;

		if (!locations || locations.length == 0) {
			return;
		}

		if (zoomLevel < -2) {
			zoomLevel = -2;
		}
		if (zoomLevel > 2) {
			zoomLevel = 2;
		}

		if (zoomLevel != undefined) {
			if (zoomLevel < -2) {
				zoomLevel = -2;
			}
		}

		// no need to zoom
		//
		if (Math.abs(this.getZoomLevel() - zoomLevel) < 0.01) {
			zoomLevel = undefined;
		}

		if (center && zoomLevel != undefined) {
			if (this.getZoomLevel() < zoomLevel) {
				this.panAndZoomTo(center, zoomLevel, options);
			} else {
				this.zoomAndPanTo(center, zoomLevel, options);
			}
		} else if (center) {
			this.panTo(center);
		} else if (zoomLevel != undefined) {
			this.zoomTo(zoomLevel, options);
		}
	},

	pushView: function() {
		this.stack.push({
			location: this.getLocation(),
			zoomLevel: this.getZoomLevel()
		});
	},

	popView: function() {
		if (this.stack.length > 0) {
			let view = this.stack.pop();
			this.goTo(view.location, view.zoomLevel);
		}
	},

	//
	// map methods
	//

	setMapMode: function(mapMode) {
		if (mapMode == 'graph') {
			this.fadeOut();
		} else {
			if (this.mapMode == 'graph') {
				this.fadeIn();
			}
			this.map.view = mapMode;
			this.tiles.render();
		}
		this.mapMode = mapMode;
	},

	showMapLabels: function() {
		this.map.labels = true;
		this.tiles.render();
	},

	hideMapLabels: function() {
		this.map.labels = false;
		this.tiles.render();
	},

	//
	// zoom methods
	//

	updateZoomLevel: function() {
		let zoomLevel = this.viewport.getZoomLevel() + 2;

		// update display
		//
		this.getChildView('zoom').showZoomLevel(zoomLevel);

		// update labels and tiles
		//
		window.clearTimeout(window.timeout);
		window.timeout = window.setTimeout(() => {
			this.update();
			this.timeout = null;
		}, 500);
	},

	//
	// navigation methods
	//

	zoomTo: function(location, options) {
		if (Math.abs(location.x + this.viewport.offset.x) < 0.01 && 
			Math.abs(location.y - this.viewport.offset.y) < 0.01) {
			return;
		}

		// start animation
		//
		this.onZoomStart();

		$({
			y: this.viewport.offset.y
		}).animate({
			x: -location.x,
			y: location.y
		}, {
			duration: 1000,
			step: function() { 
				self.viewport.setOffset(new Vector2(this.x, this.y));
			},
			complete: () => {

				// end animation
				//
				this.onZoomEnd();

				// perform callback
				//
				if (options && options.done) {
					options.done();
				}
			}
		});
	},

	resetView: function(options) {
		this.goTo(new Vector2(0, 0), 0, options);
	},

	//
	// rendering methods
	//

	onAttach: function() {

		// create viewport
		//
		this.viewport = new SVGViewport({
			el: this.$el.find('#viewport')[0],
			scale: this.scale,
			offset: this.offset,
			grid: this.grid,
			layers: this.layers,
			parent: this,

			// callbacks
			//
			onchange: (attribute) => {
				if (attribute == 'scale') {
					this.updateZoomLevel();
				}
			}
		});

		// render map
		//
		this.showBaseMap();

		// render toolbars
		//
		this.showZoomBar();
	},

	showBaseMap: function() {

		// create scene
		//
		this.map = new BingMap(this.options.longitude, this.options.latitude, this.options.zoom_level, this.options.map_kind);
		this.tiles = new MapTiles(this.viewport, $('#tiles'), 256 * Units.millimetersPerPixel, this.map);

		// render initial map
		//
		this.tiles.render();

		// add mouse interaction behaviors
		//
		this.addBehaviors();
	},

	showZoomBar: function() {

		// add zoom bar
		//
		this.showChildView('zoom', new ZoomBarView({
			parent: this,

			// callbacks
			//
			ondragend: (dragx, dragy) => {
				this.onDragEnd(dragx, dragy);
			},
			onzoomend: () => {
				this.update();
			}	
		}));
	},

	update: function() {
		if (this.tiles) {
			this.tiles.render();
		}
		if (this.labelsView) {
			this.labelsView.update();
		}
	},

	updateScale: function() {
		this.viewport.setScale(this.viewport.scale);
	},

	redraw: function() {
		if (this.tiles) {
			this.tiles.render();
		}
		if (this.labelsView) {
			this.labelsView.redraw();
		}
	},

	fadeOut: function() {
		this.viewport.$el.find('#tiles').fadeOut();
		$('#background').fadeIn();
	},

	fadeIn: function() {
		this.viewport.$el.find('#tiles').fadeIn();
		$('#background').fadeOut();
	},

	addBehaviors: function() {
		var panBehavior = new MouseDragPanBehavior(this.viewport, {
			button: 1,

			// callbacks
			//
			ondragstart: (startx, starty) => {
				this.onDragStart(startx, starty);
			},
			ondragend: (dragx, dragy) => {
				this.onDragEnd(dragx, dragy);
			}
		});
		var zoomBehavior = new MouseDragZoomBehavior(this.viewport, {
			button: 2
		});
		var zoomBehavior2 = new MouseWheelZoomBehavior(this.viewport, {

			// callbacks
			//
			onzoom: () => {
				this.onWheelZoomStart();
			}
		});
	},

	//
	// hiding methods
	//

	showMap: function() {
		this.viewport.$el.removeClass('hide-map');
	},

	hideMap: function() {
		this.viewport.$el.addClass('hide-map');
	},

	showGrid: function() {
		this.viewport.$el.removeClass('hide-grid');
	},

	hideGrid: function() {
		this.viewport.$el.addClass('hide-grid');
	},

	//
	// navigation event handling methods
	//

	onPanStart: function() {

		// do nothing
		//
	},

	onPanEnd: function() {

		// update map
		//
		this.redraw();
	},

	onZoomStart: function() {
		if (this.labelsView) {
			this.labelsView.hide();
		}
	},

	onZoomEnd: function() {
		if (this.labelsView) {
			this.labelsView.show();
		}
	},

	//
	// mouse event handling methods
	//

	onDragStart: function() {
		$('.popover').remove();
	},

	onDragEnd: function(dragx, dragy) {
		if (dragx != 0 || dragy != 0) {
			if (this.tiles) {
				this.tiles.render();
			}
			if (this.labelsView) {
				this.labelsView.redraw();
			}
		}
	},

	onWheelZoomStart: function() {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.onWheelZoomEnd();
		}, 100);
		$('.popover').remove();
	},

	onWheelZoomEnd: function() {
		this.update();
	},

	onResize: function() {
		if (this.viewport) {
			this.viewport.onResize();
		}
	}
}));