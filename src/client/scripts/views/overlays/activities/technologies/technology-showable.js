/******************************************************************************\
|                                                                              |
|                           technology-showable.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for displaying books.                         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import TechnologiesView from './technologies-view.js';

export default {

	//
	// querying methods
	//

	hasTechnologies: function() {
		return this.$el.find('.technologies').length > 0;
	},

	//
	// rendering methods
	//

	showTechnologies: function(options) {

		// show existing books
		//
		if (this.hasTechnologies()) {
			this.$el.find('.technologies').show();

			// perform callback
			//
			if (options && options.done) {
				options.done(this.technologiesView);
			}

			return;
		}

		// make sure we have technologies to show
		//
		if (!this.model.has('technologies')) {
			this.showMessage({
				icon: 'fa fa-gear',
				text: 'Loading Technologies...'
			});
			this.model.getTechnologies().fetchByPerson(this.model, {

				// callbacks
				//
				success: (collection) => {
					this.model.set('technologies', collection);
					this.showTechnologies(options);
					this.hideMessage();
				}
			});
			return;
		}

		// render books
		//
		this.technologiesView = new TechnologiesView({
			collection: this.model.get('technologies'),
			parent: this
		});
		this.$el.prepend(this.technologiesView.render());

		// perform callback
		//
		if (options && options.done) {
			options.done(this.technologiesView);
		}
	},

	hideTechnologies() {
		this.$el.find('.technologies').hide();
	}
}