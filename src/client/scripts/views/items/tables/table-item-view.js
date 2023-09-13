/******************************************************************************\
|                                                                              |
|                              table-item-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a table row.                                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseView from '../../base-view.js';
import Collapsible from '../../behaviors/collapsible.js';

export default BaseView.extend(_.extend({}, Collapsible, {

	//
	// attributes
	//

	tagName: 'tr',

	events: _.extend({}, Collapsible.events, {
		'mouseover': 'onMouseOver',
		'mouseleave': 'onMouseLeave',
		'click a': 'onClick'
	}),

	//
	// querying methods
	//

	hasDetails: function() {
		return this.$el.find('.details').children().length > 0;
	},

	//
	// collapsing methods
	//

	expand: function() {
		if (!this.hasDetails()) {
			this.showDetails();
		}

		// call superclass method
		//
		Collapsible.expand.call(this);
	},

	//
	// rendering methods
	//

	highlight: function(text, options) {
		let titles = this.$el.find('.title');
		for (let i = 0; i < titles.length; i++) {
			let title = $(titles[i]);
			let html = title.html();

			// highlight text
			//
			if (options && options.exact) {
				let words = html.split(', ');
				for (let i = 0; i < words.length; i++) {
					words[i] = words[i].trim();
					if (words[i] == text) {
						words[i] = '<span class="highlighted">' + text + '</span>';
					}
				}
				html = words.join(', ');
			} else {
				html = html.replace(text, '<span class="highlighted">' + text + '</span>');
				html = html.replace(text.toTitleCase(), '<span class="highlighted">' + text.toTitleCase() + '</span>');
				html = html.replace(text.toUpperCase(), '<span class="highlighted">' + text.toUpperCase() + '</span>');
			}

			title.html(html);
		}
	},

	onRender: function() {
		this.collapse();
	},

	//
	// mouse event handling methods
	//

	onMouseOver: function() {

		// perform callback
		//
		if (this.options.onmouseover) {
			this.options.onmouseover(this);
		}
	},

	onMouseLeave: function() {

		// perform callback
		//
		if (this.options.onmouseleave) {
			this.options.onmouseleave(this);
		}
	},

	onClick: function() {

		// perform callback
		//
		if (this.options.onclick) {
			this.options.onclick(this);
		}
	}
}));