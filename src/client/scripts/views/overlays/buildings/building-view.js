/******************************************************************************\
|                                                                              |
|                               building-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../utilities/math/vector2.js';
import BaseView from '../../base-view.js';
import SVGRenderable from '../../svg/behaviors/svg-renderable.js';
import PopoverShowable from '../../behaviors/popover-showable.js';

export default BaseView.extend(_.extend({}, SVGRenderable, PopoverShowable, {

	//
	// attributes
	//

	tagName: 'svg',

	//
	// popover attributes
	//

	popover_icon: 'fa fa-building',
	popover_title: '<%= name %>',
	popover_trigger: 'hover',
	popover_template:
		`<div class="building">
			<% if (medium_image) { %>
			<img class="icon" src="<%= medium_image %>" />
			<% } %>
			<div class="info">
				<% if (departments && departments.length > 0) { %>
				<div class="departments">
					<label>Departments</label>
					<%= departments %>
				</div>
				<% } %>

				<% if (street_address) { %>
				<div class="street-address">
					<label>Street Address</label>
					<%= street_address %>
				</div>
				<% } %>

				<% if (departments.length == 0 && !street_address) { %>
				<div class="no-info">
					No additional information is available.
				</div>
				<% } %>
			</div>
		</div>`,

	//
	// querying methods
	//

	hasGeometry: function() {
		let geojson = this.model.get('geojson');
		if (geojson) {
			switch (geojson.type) {
				case 'Polygon':
					return true;
				default:
					return false;
			}
		}
	},

	//
	// selection methods
	//

	select: function() {
		this.$el.addClass('selected');
	},

	deselect: function() {
		this.$el.removeClass('selected');
	},

	//
	// svg rendering methods
	//

	vertexToLocation(vertex) {
		if (this.options.offset) {
			vertex[0] -= this.options.offset.x;
			vertex[1] -= this.options.offset.y;
		}
		if (this.options.scale) {
			vertex[0] *= this.options.scale.x;
			vertex[1] *= this.options.scale.y;
		}
		return vertex;
	},

	toDrawing: function(vertices) {
		if (vertices.length >= 2) {
			var vertex = this.vertexToLocation(vertices[0]);
			var d = 'M ' + vertex[0] + ' ' + -vertex[1];
			for (var i = 1; i < vertices.length; i++) {
				vertex = this.vertexToLocation(vertices[i]);
				d += ' L ' + vertex[0] + ' ' + -vertex[1];
			}
			if (this.options.closed) {
				d += ' Z';
			}
			return d;
		} else {
			return '';
		}
	},

	getLocation: function(map) {
		let latLng = this.model.getLatLng();
		if (latLng && this.hasGeometry()) {
			return map.latLongToPoint(latLng.x, latLng.y);
		}
	},

	getPolygon: function(vertices) {

		// get svg from document
		//
		let icon = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		// set attributes
		//
		$(icon).attr({
			'class': 'polygon',
			'd': this.toDrawing(vertices)
		});

		return icon;
	},

	//
	// rendering methods
	//

	render: function() {
		let $el = SVGRenderable.render.call(this);
		if (this.model.has('object_type')) {
			this.$el.addClass(this.model.get('object_type').replace(/_/g, '-'));
		}
		this.addPopovers();
		return $el;
	},

	toGeometry: function() {
		let geojson = this.model.get('geojson');
		if (geojson) {
			switch (geojson.type) {
				case 'Polygon':
					return this.getPolygon(geojson.coordinates[0]);
				default:
					return null;
			}
		}	
	},

	toElement: function() {

		// set attributes
		//
		let element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		$(element).attr({
			'class': 'building',
			'number': this.model.get('building_number')
		});

		let geometry = this.toGeometry();
		if (geometry) {
			element.append(geometry);
		}

		return element;
	}
}));