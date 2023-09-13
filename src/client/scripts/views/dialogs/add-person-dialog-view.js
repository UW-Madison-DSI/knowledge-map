/******************************************************************************\
|                                                                              |
|                         add-person-dialog-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a dialog for adding new people.                          |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Person from '../../models/academic-analytics/academic-analytics-person.js';
import DialogView from './dialog-view.js';
import PersonFormView from '../forms/person-form-view.js';

export default DialogView.extend({

	//
	// attributes
	//

	template: _.template(`
		<div class="dialog">
			<button class="close"><i class="fa fa-close"></i></button>
			<div class="content">
				<div class="page">
					<h1>Add Person</h1>

					<form></form>

					<div class="bottom-buttons">
						<button type="submit" class="ok btn btn-primary" disabled>Ok</button>
						<button class="cancel btn">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	`),

	regions: {
		'form': {
			el: 'form',
			replaceElement: true
		}
	},

	events: {
		'click .close': 'onClickClose',
		'click .ok': 'onClickOk',
		'click .cancel': 'onClickCancel'
	},

	initialize: function() {
		this.model = new Person();
	},

	onRender: function() {
		this.showChildView('form', new PersonFormView({
			model: this.model,

			// callbacks
			//
			onvalidate: (valid) => this.setDisabled(!valid)
		}));
	},

	setDisabled: function(disabled) {
		this.$el.find('.ok').prop('disabled', disabled !== false);
	},

	//
	// mouse event handling methods
	//

	onClickOk: function() {
		this.getChildView('form').submit({

			// callbacks
			//
			success: () => {
				let topView = this.getTopView();
				let mainView = topView.getChildView('mainbar');
				let mapView = mainView.getChildView('mainbar');

				// search for new person
				//
				mapView.getChildView('search').searchFor(this.model.getName());

				// close dialog
				//
				this.close();
			}
		});
	},

	onClickCancel: function() {
		this.close();
	}
});