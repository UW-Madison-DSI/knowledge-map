/******************************************************************************\
|                                                                              |
|                                    tiles.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a utility to draw a grid of regularly spaced tiles.           |
|                                                                              |
|******************************************************************************|
|            Copyright (c) 2020, Megahed Labs, www.megahedlabs.com             |
\******************************************************************************/

import Units from '../../utilities/math/units.js';

export default function Tiles(viewport, element, tileSize, url) {

	// set attributes
	//
	this.viewport = viewport;
	this.tileSize = tileSize;
	this.element = element;
	this.url = url;

	return this;
}

// extend prototype from "superclass"
//
Tiles.prototype = _.extend(Object.create(Object.prototype), {

	//
	// rendering methods
	//

	toGroup: function() {
		var overdraw = 1;
		var width = this.viewport.width / this.viewport.scale / Units.pixelsPerMillimeter;
		var height = this.viewport.height / this.viewport.scale / Units.pixelsPerMillimeter;
		var scale = Math.pow(2, Math.round(Math.log2(1 / this.viewport.scale)));
		var tileSize = this.tileSize * scale;
		var rows = Math.ceil(height / tileSize) * overdraw + 2;
		var columns = Math.ceil(width / tileSize) * overdraw + 2;
		var namespace = 'http://www.w3.org/2000/svg';
		var group = document.createElementNS(namespace, 'g');

		var rowOffset = Math.floor(this.viewport.offset.y / Units.pixelsPerMillimeter / tileSize + 1);
		var columnOffset = Math.floor(this.viewport.offset.x / Units.pixelsPerMillimeter / tileSize + 1);

		for (var row = 0; row < rows; row++) {
			for (var column = 0; column < columns; column++) {
				var tile = document.createElementNS(namespace, 'image');
				var xOffset = -Math.floor(columns / 2) * tileSize;
				var yOffset = -Math.floor(rows / 2) * tileSize;
				var x = xOffset + (column - columnOffset) * tileSize;
				var y = yOffset + (row - rowOffset) * tileSize;

				tile.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.url);
				tile.setAttribute('width', tileSize + 'mm');
				tile.setAttribute('height', tileSize + 'mm');
				tile.setAttribute('x', x + 'mm');
				tile.setAttribute('y', y + 'mm');
				group.appendChild(tile);
			}
		}

		return group;
	},

	render: function() {
		var tiles = this.toTiles();
		var group = this.toGroup(tiles);

		$(this.element).append(group);
		if (this.group) {
			this.group.remove();
		}

		this.group = group;
	}
});