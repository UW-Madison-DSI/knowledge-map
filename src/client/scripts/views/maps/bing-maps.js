/******************************************************************************\
|                                                                              |
|                                 bing-maps.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a utility for rendering maps using tiles from Bing.           |
|                                                                              |
|******************************************************************************|
|            Copyright (c) 2020, Megahed Labs, www.megahedlabs.com             |
\******************************************************************************/

import Map from "./maps.js";

//
// constructor
//

export default function BingMap(longitude, latitude, zoomLevel, view, labels) {

	// set attributes
	//
	this.longitude = longitude;
	this.latitude = latitude;
	this.zoomLevel = zoomLevel;
	this.view = view || 'hybrid';
	this.labels = labels;

	// set map server attributes
	//
	this.tileServer = "https://t2.ssl.ak.dynamic.tiles.virtualearth.net/comp/ch";
	
	return this;
}

// inherit prototype from "superclass"
//
BingMap.prototype = _.extend(new Map(), {

	//
	// static attributes
	//

	maxZoomLevel: 20,

	//
	// querying methods
	//

	getTileLocation: function(offsetX, offsetY, zoomOffset) {
		var x = this.getX() + (offsetX || 0);
		var y = 1 - this.getY() - (offsetY || 0);
		var xmin = 0, xmax = 1;
		var ymin = 0, ymax = 1;
		var location = "";
		var zoomLevel = this.zoomLevel - (zoomOffset || 0);

		for (var i = 0; i < zoomLevel; i++) {
			var xmid = (xmin + xmax) / 2;
			var ymid = (ymin + ymax) / 2;

			if (y > ymid) {

				// upper part ("0" or "1" quadrants)
				//
				ymin = ymid;
				if (x < xmid) {

					// upper left quadrant - "0"
					//
					location += "0";
					xmax = xmid;
				} else {

					// upper right quadrant - "1"
					//
					location += "1";
					xmin = xmid;
				}
			} else {

				// lower part ("2" or "3" quadrants)
				//
				ymax = ymid;
				if (x < xmid) {

					// lower left quadrant - "2"
					//
					location += "2";
					xmax = xmid;
				} else {

					// lower right quadrant - "3"
					//
					location += "3";
					xmin = xmid;
				}
			}
		}

		return location;
	},

	getNeighborTileLocation: function(location, direction) {
		var parent = location.substring(0, location.length - 1);
		var quadrant = location.charAt(location.length - 1);

		if (direction == "left") {
			if (quadrant == "0") {
				parent = this.getNeighborTileLocation(parent, direction);
				quadrant = "1";
			} else if (quadrant == "1")
				quadrant = "0";
			else if (quadrant == "3")
				quadrant = "2";
			else if (quadrant == "2") {
				parent = this.getNeighborTileLocation(parent, direction); 
				quadrant = "3";
			}

		} else if (direction == "right") {
			if (quadrant == "0")
				quadrant = "1";
			else if (quadrant == "1") {
				parent = this.getNeighborTileLocation(parent, direction);
				quadrant = "0";
			} else if (quadrant == "3") {
				parent = this.getNeighborTileLocation(parent, direction); 
				quadrant = "2";
			} else if (quadrant == "2")
				quadrant = "3";

		} else if (direction == "upper") {
			if (quadrant == "0") {
				parent = this.getNeighborTileLocation(parent, direction);
				quadrant = "2";
			} else if (quadrant == "1") {
				parent = this.getNeighborTileLocation(parent, direction);
				quadrant = "3";
			} else if (quadrant == "3")
				quadrant = "1";
			else if (quadrant == "2")
				quadrant = "0";

		} else if (direction == "lower") {
			if (quadrant == "0")
				quadrant = "2";
			else if (quadrant == "1")
				quadrant = "3";
			else if (quadrant == "3") {
				parent = this.getNeighborTileLocation(parent, direction);
				quadrant = "1";
			} else if (quadrant == "2") {
				parent = this.getNeighborTileLocation(parent, direction);
				quadrant = "0";
			}

		} else if (direction == "upper left") {
			if (quadrant == "0") {
				parent = this.getNeighborTileLocation(parent, direction);
				quadrant = "3";
			} else if (quadrant == "1") {
				parent = this.getNeighborTileLocation(parent, "upper");
				quadrant = "2";
			} else if (quadrant == "3")
				quadrant = "0";
			else if (quadrant == "2") {
				parent = this.getNeighborTileLocation(parent, "left");
				quadrant = "1";
			}

		} else if (direction == "upper right") {
			if (quadrant == "0") {
				parent = this.getNeighborTileLocation(parent, "upper");
				quadrant = "3";
			} else if (quadrant == "1") {
				parent = this.getNeighborTileLocation(parent, direction);
				quadrant = "2";
			} else if (quadrant == "3") {
				parent = this.getNeighborTileLocation(parent, "right");
				quadrant = "0";
			} else if (quadrant == "2")
				quadrant = "1";

		} else if (direction == "lower left") {
			if (quadrant == "0") {
				parent = this.getNeighborTileLocation(parent, "left");
				quadrant = "3";
			} else if (quadrant == "1")
				quadrant = "2";
			else if (quadrant == "3") {
				parent = this.getNeighborTileLocation(parent, "lower");
				quadrant = "0";
			} else if (quadrant == "2") {
				parent = this.getNeighborTileLocation(parent, direction);
				quadrant = "1";
			}

		} else if (direction == "lower right") {
			if (quadrant == "0")
				quadrant = "3";
			else if (quadrant == "1") {
				parent = this.getNeighborTileLocation(parent, "right");
				quadrant = "2";
			} else if (quadrant == "3") {
				parent = this.getNeighborTileLocation(parent, direction);
				quadrant = "0";
			} else if (quadrant == "2") {
				parent = this.getNeighborTileLocation(parent, "lower");
				quadrant = "1";
			}
		}

		return parent + quadrant;
	},

	//
	// map tile URL quering methods
	//

	getLocationTileUrl: function(location) {
		if (this.view == "map") {
			// return this.tileServer + "/" + location + "?it=G,L,LA";
			return this.tileServer + "/" + location + "?it=G" + (this.labels? ',L' : '');
		} else if (this.view == "aerial" || this.view == "satellite") {
			return this.tileServer + "/" + location + "?it=A" + (this.labels? ',L' : '');
		} else {
			return this.tileServer + "/" + location + "?it=A,G,L,LA";
		}
	},

	getTileURL: function() {
		return this.getLocationTileUrl(this.getCenterTileLocation());
	},

	//
	// map overlay querying methods
	//

	getTiles: function(view, rows, columns, units, height, northAngle) {
		var tiles = [];
		
		// set optional parameters
		//
		if (height == undefined) {
			height = 0;
		}
		if (northAngle == undefined) {
			northAngle = 0;
		}
		
		// find map location
		//
		var tileX = this.getTileX();
		var tileY = this.getTileY();
		var tileWidth = this.getTileWidth(units);
		var tileHeight = this.getTileHeight(units);
		var numTiles = this.getNumTiles();
		var tileXOffset = (this.getX() * numTiles) - tileX;
		var tileYOffset = (this.getY() * numTiles) - tileY;
		var rowOffset = Math.floor((rows - 1) / 2);
		var columnOffset = Math.floor((columns - 1) / 2);
		var axis = new HCVector3(0, 0, 1);
		
		// find map starting location
		//
		var location = this.getCenterTileLocation();
		for (var i = 0; i < rowOffset; i++) {
			location = this.getNeighborTileLocation(location, "upper");
		}
		for (var j = 0; j < columnOffset; j++) {
			location = this.getNeighborTileLocation(location, "left");
		}

		// create map tile texture coordinates
		//
		var texcoords = [new HCVector2(0, 1), new HCVector2(0, 0), new HCVector2(1, 0), new HCVector2(1, 1)];

		// create array of map tiles
		//
		var index = 0;
		var smin = 0, smax = 1;
		var tmin = 0, tmax = 1;
		var rowLocation = location;
		for (var row = 0; row < rows; row++) {
			var y = (rowOffset - row + tileYOffset) * tileHeight;
			var columnLocation = rowLocation;
			for (var column = 0; column < columns; column++) {
				var x = (-columnOffset + column - tileXOffset) * tileWidth;
				var vertices = [new HCVector3(x, y, height), new HCVector3(x, y - tileHeight, height),
					new HCVector3(x + tileWidth, y - tileHeight, height), new HCVector3(x + tileWidth, y, height)];
				var textureName = this.getLocationTileUrl(view, columnLocation);
				var material = new HCMaterial(textureName);
			
				// rotate tile, if necessary
				//
				if (northAngle != 0) {
					for (var k = 0; k < vertices.length; k++) {
						vertices[j].rotateBy(northAngle, axis);
					}
				}
				
				// add tile
				//
				tiles[index] = new HCPolygon(vertices, material, texcoords);
				columnLocation = this.getNeighborTileLocation(columnLocation, "right");
				index++;
			}
			rowLocation = this.getNeighborTileLocation(rowLocation, "lower");
		}
		 
		return tiles;
	}
});