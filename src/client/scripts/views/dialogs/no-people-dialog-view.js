/******************************************************************************\
|                                                                              |
|                           message-dialog-view.js                             |
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

import DialogView from './dialog-view.js';
import AddPersonDialogView from './add-person-dialog-view.js';

export default DialogView.extend({

	//
	// attributes
	//

	template: _.template(`
		<div id="message" class="medium-height dialog">
			<button class="close"><i class="fa fa-close"></i></button>
			<div class="content">
				<h1>
					<span class="icon"><i class="fa fa-search"></i></span>
					<span class="text">No People Found</span>
				</h1>

				<button class="add-person" style="display:none">Add Person</button>
			</div>
		</div>
	`),

	events: {
		'click .close': 'onClickClose',
		'click .add-person': 'onClickAddPerson'
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			icon: this.options.icon,
			text: this.options.text
		};
	},

	//
	// dialog rendering methods
	//

	showAddPersonDialog: function() {
		this.getTopView().showDialog(new AddPersonDialogView());
	},

	//
	// mouse event handling methods
	//

	onClickAddPerson: function() {
		this.showAddPersonDialog();	
		this.close();
	}
});