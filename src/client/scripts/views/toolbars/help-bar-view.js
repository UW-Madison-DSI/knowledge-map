/******************************************************************************\
|                                                                              |
|                              help-bar-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a toolbar view for showing help info.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ToolbarView from './toolbar-view.js';

export default ToolbarView.extend({

	//
	// attributes
	//

	id: 'help-bar',
	className: 'vertical toolbar',

	template: _.template(`
		<div class="title">Help</div>

		<div class="buttons">
			<button id="show-help" data-toggle="tooltip" title="Show / Hide Help" data-placement="right">
				<i class="fa fa-question-circle"></i>
			</button>
		</div>
	`),

	events: {
		'click #show-help': 'onClickShowHelp'
	},

	//
	// mouse event handling methods
	//

	onClickShowHelp: function() {
		this.getTopView().showHelp();
	}
});