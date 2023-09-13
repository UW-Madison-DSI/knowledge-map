/******************************************************************************\
|                                                                              |
|                               unit-conversions.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a single lens element.                      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

export default class Units {

	// unit of length conversions
	//
	static millimetersPerInch = 25.4;

	// pixels unit conversions
	//
	static pixelsPerInch = 96;
	static pixelsPerMillimeter = this.pixelsPerInch / this.millimetersPerInch;
	static millimetersPerPixel = 1 / this.pixelsPerMillimeter;
}