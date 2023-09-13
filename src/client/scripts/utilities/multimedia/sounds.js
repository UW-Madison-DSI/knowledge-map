/******************************************************************************\
|                                                                              |
|                                    sounds.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a single lens element.                      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

export default {
	muted: false,
	click: new Audio('sounds/tick.mp3'),

	//
	// audio methods
	//

	play(sound) {
		if (!this.muted && this[sound]) {
			this[sound].play();
		}
	}
};