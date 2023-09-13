/******************************************************************************\
|                                                                              |
|                                    bounds2.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines two dimensional set of bounds.                           |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../math/vector2.js';
import Bounds from '../bounds/bounds.js';

export default class Bounds2 {

	constructor(x, y) {
		if (x == undefined) {
			x = new Bounds();
		}
		if (y == undefined) {
			y = new Bounds();
		}

		// set attributes
		//
		this.x = x;
		this.y = y;
	}

	//
	// setting methods
	//

	extendTo(value) {
		this.x.extendTo(value.x);
		this.y.extendTo(value.y);
	}

	//
	// querying methods
	//

	center() {
		return new Vector2(this.x.mean(), this.y.mean());
	}

	size() {
		return new Vector2(this.x.size(), this.y.size());
	}

	contains(value) {
		return this.x.contains(value.x) && this.y.contains(value.y);
	}

	overlaps(bounds) {
		return this.x.overlaps(bounds) && this.y.overlaps(bounds);
	}
}