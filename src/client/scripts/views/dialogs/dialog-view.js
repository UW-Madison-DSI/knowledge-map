/******************************************************************************\
|                                                                              |
|                               dialog-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for a type of modal dialog box.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseView from '../base-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	className: 'modal',

	template: _.template(`
		<button class="close"><i class="fa fa-close"></i></button>
		<div class="content">
		</div>
	`),

	events: {
		'click .close': 'onClickClose'
	},

	//
	// methods
	//

	close: function() {
		this.destroy();
	},

	//
	// event handling methods
	//

	onClickClose: function() {
		this.close();
	}
});