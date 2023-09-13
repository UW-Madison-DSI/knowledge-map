/******************************************************************************\
|                                                                              |
|                                info-view.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a simple info view.                                      |
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
import AddPersonDialogView from '../dialogs/add-person-dialog-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	className: 'welcome panel',

	template: _.template(`
		<a href="http://www.wisc.edu" target="_blank">
			<img class="logo" src="images/uw-crest.png" />
		</a>
		<h1>UW Campus Knowledge Map</h1>
		<div class="subheading">
			<a href="http://datascience.wisc.edu" target="_blank">
				<div>Data Science Institute</div>
				<div>University of Wisconsin-Madison</div>
			</a>
		</div>

		<div class="introduction">
			<p>The UW Campus Knowledge Map is a tool for helping you to visually explore information about UW facilities, faculty and staff and to explore connections between your UW colleagues. </p>
		</div>

		<div class="buttons" style="display:none">
			<button class="add-person">Add Person</button>
		</div>
	`),

	events: {
		'click .add-person': 'onClickAddPerson'
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
	}
});