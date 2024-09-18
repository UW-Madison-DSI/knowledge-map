/******************************************************************************\
|                                                                              |
|                                 map-tiles.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a utility to draw a grid of regularly spaced tiles.           |
|                                                                              |
|******************************************************************************|
|            Copyright (c) 2020, Megahed Labs, www.megahedlabs.com             |
\******************************************************************************/

import Tiles from '../../../views/maps/tiles/tiles.js';
import Units from '../../../utilities/math/units.js';

export default function MapTiles(viewport, element, tileSize, map) {

	// set attributes
	//
	this.viewport = viewport;
	this.tileSize = tileSize;
	this.element = element;
	this.map = map;
	this.tiles = [];

	return this;
}

// extend prototype from "superclass"
//
MapTiles.prototype = _.extend(new Tiles(), {

	//
	// attributes
	//

	fadeDuration: 500,

	//
	// tile set querying methods
	//

	sameAs: function(tile1, tile2) {
		return $(tile1).attr('href') == $(tile2).attr('href');
	},

	contains: function(tiles, tile) {
		for (var i = 0; i < tiles.length; i++) {
			if (this.sameAs(tiles[i], tile)) {
				return true;
			}
		}
	},

	getUnion: function(tiles1, tiles2) {
		var tiles = [];
		for (var i = 0; i < tiles1.length; i++) {
			var tile = tiles1[i];
			if (this.contains(tiles2, tile)) {
				tiles.push(tile);
			}
		}
		return tiles;
	},

	getDifference: function(tiles1, tiles2) {
		var tiles = [];
		for (var i = 0; i < tiles1.length; i++) {
			var tile = tiles1[i];
			if (!this.contains(tiles2, tile)) {
				tiles.push(tile);
			}
		}
		return tiles;
	},

	//
	// rendering methods
	//

	getTiles: function() {
		var tiles = [];
		var namespace = 'http://www.w3.org/2000/svg';
		var group = document.createElementNS(namespace, 'g');

		// find zoom level
		//
		var zoom = Math.round(Math.log2(this.viewport.scale));
		zoom = Math.min(zoom, this.map.maxZoomLevel - this.map.zoomLevel);

		// find map parameters
		//
		var scale = Math.pow(2, -zoom);
		var tileSize = this.tileSize * scale;
		var tileX = Math.round(this.viewport.offset.x / Units.pixelsPerMillimeter / tileSize);
		var tileY = Math.round(this.viewport.offset.y / Units.pixelsPerMillimeter / tileSize);

		// find center tile
		//
		var numTiles = this.map.getNumTiles();
		var offsetX = tileX * scale / numTiles;
		var offsetY = tileY * scale / numTiles;
		var location = this.map.getTileLocation(-offsetX, -offsetY, -zoom);

		// find center tile offset
		//
		var numTiles2 = this.map.getNumTiles(zoom);
		var x = this.map.getX() * numTiles2;
		var y = this.map.getY() * numTiles2;
		var xOffset = (x - Math.trunc(x));
		var yOffset = (y - Math.trunc(y));

		// find rows and columns
		//
		var width = this.viewport.width / this.viewport.scale / Units.pixelsPerMillimeter;
		var height = this.viewport.height / this.viewport.scale / Units.pixelsPerMillimeter;
		var rows = Math.ceil(height / tileSize / 2) * 2 + 2;
		var columns = Math.ceil(width / tileSize / 2) * 2 + 2;

		// go to upper left corner
		//
		var rowOffset = Math.floor(rows / 2);
		for (var i = 0; i < rowOffset; i++) {
			location = this.map.getNeighborTileLocation(location, 'upper');
		}
		var columnOffset = Math.floor(columns / 2);
		for (var j = 0; j < columnOffset; j++) {
			location = this.map.getNeighborTileLocation(location, 'left');
		}

		var rowLocation = location;
		var tileSize2 = tileSize + 1 * scale / Units.pixelsPerMillimeter;
		// var tileSize2 = tileSize;
		for (var row = 0; row < rows; row++) {
			var columnLocation = rowLocation;
			for (var column = 0; column < columns; column++) {
				var tile = document.createElementNS(namespace, 'image');
				var url = this.map.getLocationTileUrl(columnLocation);

				tile.setAttributeNS('http://www.w3.org/1999/xlink', 'href', url);
				tile.setAttribute('width', tileSize2+ 'mm');
				tile.setAttribute('height', tileSize2 + 'mm');
				tile.setAttribute('x', ((column - columnOffset - tileX - xOffset) * tileSize) + 'mm');
				tile.setAttribute('y', ((row - rowOffset - tileY - yOffset) * tileSize) + 'mm');
				// tile.setAttribute('image-rendering', 'pixelated');
				// tile.setAttribute('shape-rendering', 'crisp-edges');
				tiles.push(tile);
				columnLocation = this.map.getNeighborTileLocation(columnLocation, 'right');
			}
			rowLocation = this.map.getNeighborTileLocation(rowLocation, 'lower');
		}

		return tiles;
	},

	toGroup: function(tiles) {
		var namespace = 'http://www.w3.org/2000/svg';
		var group = document.createElementNS(namespace, 'g');

		for (var i = 0; i < tiles.length; i++) {
			group.appendChild(tiles[i]);
		}

		return group;
	},

	render: function() {
		var tiles = this.getTiles();
		var existingTiles = $(this.element).children();
		var newTiles = this.getDifference(tiles, existingTiles);
		var oldTiles = this.getDifference(existingTiles, tiles);

		// remove no longer needed tiles
		//
		for (var i = 0; i < oldTiles.length; i++) {
			$(oldTiles[i]).fadeOut(self.fadeDuration, function() {
				$(this).remove();
			});
		}

		// add new tiles
		//
		for (var j = 0; j < newTiles.length; j++) {
			var newTile = $(newTiles[j]).hide().fadeIn(self.fadeDuration);
			$(this.element).append(newTile);
		}
	},

	clear: function() {
		$(this.element).children().remove();
	}
});