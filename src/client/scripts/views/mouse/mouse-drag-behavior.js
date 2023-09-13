/******************************************************************************\
|                                                                              |
|                              mouse-drag-behavior.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

export default function MouseDragBehavior(element, options) {
	
	// set attributes
	//
	this.element = element;
	this.cursor = (options && typeof options.cursor != 'undefined')? options.cursor : undefined;
	this.button = (options && typeof options.button != 'undefined')? options.button : 1;
	this.options = options || {};

	// set up event handlers
	//
	$(element).on('mousedown.drag', (event) => {
		if (event.which == this.button) {
			this.onMouseDown(event.pageX, event.pageY);

			// end event handling
			//
			event.stopPropagation();
			event.preventDefault();

			// create mouse move callback
			//
			$(window).on('mousemove.drag', (event) => {

				// end event handling
				//
				event.stopPropagation();
				event.preventDefault();

				this.onMouseDrag(event.pageX, event.pageY);
			});

			// create mouse up callback
			//
			$(window).on('mouseup.drag', (event) => {

				// end event handling
				//
				event.stopPropagation();
				event.preventDefault();
				
				this.onMouseUp(event.pageX, event.pageY);

				// end behavior
				//
				$(window).off('mousemove.drag');
				$(window).off('mouseup.drag');
			});
		}
	});

	return this;
}

MouseDragBehavior.prototype = _.extend(Object.create(MouseDragBehavior.prototype), {

	//
	// methods
	//

	unbind: function() {
		$(this.element).off('mousedown');
	},

	//
	// event handling methods
	//

	onMouseDown: function(mouseX, mouseY) {

		// set start location
		//
		this.startX = mouseX;
		this.startY = mouseY;

		// set to drag cursor
		//
		if (this.cursor) {
			$(this.element).css('cursor', this.cursor);
		}

		// perform callback
		//
		if (this.options.ondragstart) {
			this.options.ondragstart(mouseX, mouseY);
		}
	},

	onMouseDrag: function(mouseX, mouseY) {

		// perform callback
		//
		if (this.options.ondrag) {
			this.options.ondrag(mouseX, mouseY);
		}
	},

	onMouseUp: function(mouseX, mouseY) {
		let dragX = mouseX - this.startX;
		let dragY = mouseY - this.startY;

		// reset start location
		//
		this.startX = undefined;
		this.startY = undefined;

		// reset cursor
		//
		if (this.cursor) {
			$(this.element).css('cursor', '');
		}

		// perform callback
		//
		if (this.options.ondragend) {
			this.options.ondragend(dragX, dragY);
		}
	},
});