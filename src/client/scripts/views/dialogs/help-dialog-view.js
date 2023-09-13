/******************************************************************************\
|                                                                              |
|                            help-dialog-view.js                               |
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

export default DialogView.extend({

	//
	// attributes
	//

	template: _.template(`
		<div id="help" class="dialog">
			<button class="close"><i class="fa fa-close"></i></button>
			<div class="content">
				<iframe src="help/help.html"></iframe>
			</div>
		</div>
	`)
});