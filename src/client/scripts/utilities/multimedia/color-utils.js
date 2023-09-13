/******************************************************************************\
|                                                                              |
|                                 color-utils.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This contains a set of color manipulating utility functions.          |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

function getRandomColor() {
	var r = 255*Math.random()|0,
		g = 255*Math.random()|0,
		b = 255*Math.random()|0;
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function convertRGBColorToHexColor(rgb) {
	var regex = /rgb *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3}) *\)/;
	var values = regex.exec(rgb);
	if (values.length != 4) {
		return rgb;             
	}
	var r = Math.round(parseFloat(values[1]));
	var g = Math.round(parseFloat(values[2]));
	var b = Math.round(parseFloat(values[3]));
	return "#" 
		+ (r + 0x10000).toString(16).substring(3).toUpperCase() 
		+ (g + 0x10000).toString(16).substring(3).toUpperCase()
		+ (b + 0x10000).toString(16).substring(3).toUpperCase();
}

function namedColorToRGBColor(color) {
	var canvas, context;
	canvas = document.createElement('canvas');
	canvas.height = 1;
	canvas.width = 1;
	context = canvas.getContext('2d');
	context.fillStyle = color;
	context.fillRect(0, 0, 1, 1);
	var data = context.getImageData(0, 0, 1, 1).data;
	return 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
}

function getRGBColorComponents(color) {
	var f = color.split(",");
	var r = parseInt(f[0].slice(4));
	var g = parseInt(f[1]);
	var b = parseInt(f[2]);
	return [r, g, b];
}

function shadeRGBColor(color, percent) {
	var f = color.split(",");
	var t = percent < 0? 0 : 255;
	var p = percent < 0? percent * -1 : percent;
	var r = parseInt(f[0].slice(4));
	var g = parseInt(f[1]);
	var b = parseInt(f[2]);
	r = Math.round((t - r) * p) + r;
	g = Math.round((t - g) * p) + g;
	b = Math.round((t - b) * p) + b;
	return "rgb(" + r + "," + g + "," + b + ")";
}

function blendRGBColors(c0, c1, p) {
	var f = c0.split(",");
	var t = c1.split(",");
	var r=parseInt(f[0].slice(4));
	var g=parseInt(f[1]);
	var b=parseInt(f[2]);
	r = Math.round((parseInt(t[0].slice(4)) - r) * p) + r;
	g = Math.round((parseInt(t[1]) - g) * p) + g;
	b = Math.round((parseInt(t[2]) - b) * p) + b;
	return "rgb(" + r + "," + g + "," + b + ")";
}

function wavelengthToColor(wavelength) {
	var r, g, b, alpha, colorSpace, gamma = 1;

	if (wavelength >= 380 && wavelength < 440) {

		// violet
		//
		r = -1 * (wavelength - 440) / (440 - 380);
		g = 0;
		b = 1;
   } else if (wavelength >= 440 && wavelength < 490) {

   		// blue
   		//
		r = 0;
		g = (wavelength - 440) / (490 - 440);
		b = 1;  
	} else if (wavelength >= 490 && wavelength < 510) {

		// green
		//
		r = 0;
		g = 1;
		b = -1 * (wavelength - 510) / (510 - 490);
	} else if (wavelength >= 510 && wavelength < 580) {

		// yellow
		//
		r = (wavelength - 510) / (580 - 510);
		g = 1;
		b = 0;
	} else if (wavelength >= 580 && wavelength < 645) {

		// orange
		//
		r = 1;
		g = -1 * (wavelength - 645) / (645 - 580);
		b = 0.0;
	} else if (wavelength >= 645 && wavelength <= 780) {

		// red
		//
		r = 1;
		g = 0;
		b = 0;
	} else {

		// infrared, ultraviolet
		//
		r = 0;
		g = 0;
		b = 0;
	}

	// intensty is lower at the edges of the visible spectrum.
	//
	if (wavelength > 780 || wavelength < 380) {
		alpha = 0;
	} else if (wavelength > 700) {
		alpha = (780 - wavelength) / (780 - 700);
	} else if (wavelength < 420) {
		alpha = (wavelength - 380) / (420 - 380);
	} else {
		alpha = 1;
	}

	// convert to rgba color
	//
	return "rgba(" + (r * 100) + "%," + (g * 100) + "%," + (b * 100) + "%, " + alpha + ")";
}