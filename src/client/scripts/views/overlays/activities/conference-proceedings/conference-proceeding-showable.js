/******************************************************************************\
|                                                                              |
|                       conference-proceeding-showable.js                      |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for displaying conference proceedings.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ConferenceProceedingsView from './conference-proceedings-view.js';

export default {

	//
	// querying methods
	//

	hasConferenceProceedings: function() {
		return this.$el.find('.conference-proceedings').length > 0;
	},

	//
	// rendering methods
	//

	showConferenceProceedings: function(options) {

		// show existing conference proceedings
		//
		if (this.hasConferenceProceedings()) {
			this.$el.find('.conference-proceedings').show();

			// perform callback
			//
			if (options && options.done) {
				options.done(this.conferenceProceedingsView);
			}

			return;
		}

		// make sure we have conference proceedings to show
		//
		if (!this.model.has('conference_proceedings')) {
			this.showMessage({
				icon: 'fa fa-microphone',
				text: 'Loading Conference Proceedings...'
			});
			this.model.getConferenceProceedings().fetchByPerson(this.model, {

				// callbacks
				//
				success: (collection) => {
					this.model.set('conference_proceedings', collection);
					this.showConferenceProceedings(options);
					this.hideMessage();
				}
			});
			return;
		}

		// render books
		//
		this.conferenceProceedingsView = new ConferenceProceedingsView({
			collection: this.model.get('conference_proceedings'),
			parent: this
		});
		this.$el.prepend(this.conferenceProceedingsView.render());

		// perform callback
		//
		if (options && options.done) {
			options.done(this.conferenceProceedingsView);
		}
	},

	hideConferenceProceedings() {
		this.$el.find('.conference-proceedings').hide();
	}
}