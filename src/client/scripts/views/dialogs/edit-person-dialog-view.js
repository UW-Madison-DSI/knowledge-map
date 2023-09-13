/******************************************************************************\
|                                                                              |
|                         edit-person-dialog-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a dialog for editing people.                             |
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
import PersonMarkerView from '../overlays/people/person-marker-view.js';

export default DialogView.extend({

	//
	// attributes
	//

	template: _.template(`
		<div class="dialog">
			<button class="close"><i class="fa fa-close"></i></button>
			<div class="content">
				<div class="page">
					<h1>Edit Person</h1>

					<form></form>

					<div class="bottom-buttons">
						<button class="save btn btn-primary" disabled>Save</button>
						<button class="delete btn">Delete</button>
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
		'click .save': 'onClickSave',
		'click .delete': 'onClickDelete',
		'click .cancel': 'onClickCancel'
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
		this.$el.find('.save').prop('disabled', disabled !== false);
	},

	//
	// mouse event handling methods
	//

	onClickSave: function() {
		this.getChildView('form').submit({

			// callbacks
			//
			success: () => {
				let topView = this.getTopView();
				let mainView = topView.getChildView('mainbar');
				let mapView = mainView.getChildView('mainbar');

				// clear person location
				//
				PersonMarkerView.directory[this.model.get('id')] = null;

				// search for person
				//
				mapView.getChildView('search').searchFor(this.model.getName());

				// close dialog
				//
				this.close();
			},

			error: function(model, response) {
				alert(response.responseText);
			}
		});
	},

	onClickDelete: function() {
		this.model.destroy({

			// callbacks
			//
			success: () => {
				let topView = this.getTopView();
				let mainView = topView.getChildView('mainbar');
				let mapView = mainView.getChildView('mainbar');

				// clear view
				//
				mapView.getChildView('search').clear();

				// close dialog
				//
				this.close();
			},

			error: function(model, response) {
				alert(response.responseText);
			}
		});
	},

	onClickCancel: function() {
		this.close();
	}
});