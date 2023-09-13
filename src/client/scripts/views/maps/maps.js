/******************************************************************************\
|                                                                              |
|                                   maps.js                                    |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is an abstract utility for rendering maps using tiles.           |
|                                                                              |
|******************************************************************************|
|            Copyright (c) 2020, Megahed Labs, www.megahedlabs.com             |
\******************************************************************************/

//
// constructor
//

export default function Map(longitude, latitude, zoomLevel) {

	// set attributes
	//
	this.longitude = longitude;
	this.latitude = latitude;
	this.zoomLevel = zoomLevel;

	return this;
}

// inherit prototype from "superclass"
//
Map.prototype = _.extend({}, Object.prototype, {

	//
	// methods
	//

	getNumTiles: function(zoomOffset) {
		return Math.pow(2, this.zoomLevel + (zoomOffset || 0));
	},

	//
	// projection querying methods
	//

	getX: function() {
		var longitude = this.longitude;

		// clamp longitude range from 0 to 360
		//
		longitude = 180 - longitude;
		while (longitude < 0) {
			longitude += 360;
		}
		while (longitude > 360) {
			longitude -= 360;
		}

		// convert to map coords (0 to 1)
		//
		return longitude / 360;
	},

	getY: function() {
		var latitude = this.latitude;

		// clamp latitude range from -90 to 90
		//
		if (latitude > 90) {
			latitude = latitude - 180;
		}
		if (latitude < -90) {
			latitude = latitude + 180;
		}

		// convert latitude from degrees to radians
		//
		var phi = latitude * Math.PI / 180;
		
		// perform Mercator projection
		//
		var y = 0.5 * Math.log((1 + Math.sin(phi)) / (1 - Math.sin(phi)));

		// since the Mercator projection runs from -infinity to infinity
		// in the y direction, we limit the y range clipping the poles.
		//
		return ((1 - (y / Math.PI)) / 2);
	},

	//
	// tile querying methods
	//

	getTileX: function() {
		return Math.floor(this.getX() * this.getNumTiles());
	},

	getTileY: function() {
		return Math.floor(this.getY() * this.getNumTiles());
	},

	//
	// tile dimension querying methods
	//

	getStretch: function() {
		return Math.cos(this.latitude * Math.PI / 180);
	},

	getTileWidth: function(units) {
		var stretch = this.getStretch();
		var numTiles = this.getNumTiles();

		switch (units) {
			case 'degrees':
				return 360 * stretch / numTiles;
			case 'inches':
				return 24901 * 5280 * 12 * stretch / numTiles;
			case 'feet':
				return 24901 * 5280 * stretch / numTiles;
			case 'millimeters':
				return 40075 * 1000 * 1000 * stretch / numTimes;
			case 'centimeters':
				return 40075 * 1000 * 100 * stretch / numTimes;
			case 'meters':
				return 40075 * 1000 * stretch / numTimes;
		}
	},

	getTileHeight: function(units) {
		var stretch = this.getStretch();
		var numTiles = this.getNumTiles();

		switch (units) {
			case 'degrees':
				return 180 * stretch / numTiles;
			case 'inches':
				return 24859 * 5280 * 12 * stretch / numTiles;
			case 'feet':
				return 24859 * 5280 * stretch / numTiles; 
			case 'millimeters':
				return 40008 * 1000 * 1000 * stretch / numTiles;
			case 'centimeters':
				return 40008 * 1000 * 100 * stretch / numTiles;
			case 'meters':
				return 40008 * 1000 * stretch / numTiles;

		}
	}
});