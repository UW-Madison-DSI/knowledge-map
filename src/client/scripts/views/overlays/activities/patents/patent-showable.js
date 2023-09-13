/******************************************************************************\
|                                                                              |
|                              patent-showable.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for displaying patents.                       |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import PatentsView from './patents-view.js';

export default {

	//
	// querying methods
	//

	hasPatents: function() {
		return this.$el.find('.patents').length > 0;
	},

	//
	// rendering methods
	//

	showPatents: function(options) {

		// show existing patents
		//
		if (this.hasPatents()) {
			this.$el.find('.patents').show();

			// perform callback
			//
			if (options && options.done) {
				options.done(this.patentsView);
			}

			return;
		}

		// make sure we have patents to show
		//
		if (!this.model.has('patents')) {
			this.showMessage({
				icon: 'fa fa-lightbulb',
				text: 'Loading Patents...'
			});
			this.model.getPatents().fetchByPerson(this.model, {

				// callbacks
				//
				success: (collection) => {
					this.model.set('patents', collection);
					this.showPatents(options);
					this.hideMessage();
				}
			});
			return;
		}

		// render patents
		//
		this.patentsView = new PatentsView({
			collection: this.model.get('patents'),
			parent: this
		});
		this.$el.prepend(this.patentsView.render());

		// perform callback
		//
		if (options && options.done) {
			options.done(this.patentsView);
		}
	},

	hidePatents() {
		this.$el.find('.patents').hide();
	}
}