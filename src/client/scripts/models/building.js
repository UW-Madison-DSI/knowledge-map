/******************************************************************************\
|                                                                              |
|                                 building.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a building.                                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../utilities/math/vector2.js';
import Bounds2 from '../utilities/bounds/bounds2.js';
import BaseModel from './base-model.js';

export default BaseModel.extend({

	//
	// ajax attributes
	//

	urlRoot: 'api/public/buildings',

	url: () => {
		return this.urlRoot + '/' + this.id
	},

	//
	// attributes
	//

	defaults: {
		id: undefined,
		name: undefined,
		building_number: undefined,
		departments: undefined,
		description: undefined,
		hours: undefined,
		geojson: undefined,
		medium_image: undefined,
		thumb_image: undefined,
		latlng: undefined,
		object_type: undefined,
		street_address: undefined,
		tags: undefined,
		thumbnail: undefined
	},

	getCenter: function(coordinates) {
		let bounds = new Bounds2();
		for (let i = 0; i < coordinates.length; i++) {
			let x = coordinates[i][1];
			let y = coordinates[i][0];
			let vertex = new Vector2(x, y);
			bounds.extendTo(vertex);
		}
		return bounds.center();
	},

	getLatLng: function() {
		let latlng = this.get('latlng');
		return new Vector2(latlng[0], latlng[1]);

		/*
		let geojson = this.get('geojson');
		if (geojson) {
			switch (geojson.type) {
				case 'Polygon':
					return this.getCenter(geojson.coordinates[0]);
			}
		}
		*/
	},

	//
	// ajax methods
	//

	/*
	parse: function(attributes) {

		// parse coordinates
		//
		if (attributes.geojson) {
			attributes.geojson = JSON.parse(attributes.geojson);
		}

		return attributes;
	}
	*/
});