/******************************************************************************\
|                                                                              |
|                              grant-showable.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for displaying grants.                        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import GrantsView from './grants-view.js';

export default {

	//
	// querying methods
	//

	hasGrants: function() {
		return this.$el.find('.grants').length > 0;
	},

	//
	// rendering methods
	//

	showGrants: function(options) {

		// show existing grants
		//
		if (this.hasGrants()) {
			this.$el.find('.grants').show();

			// perform callback
			//
			if (options && options.done) {
				options.done(this.grantsView);
			}

			return;
		}

		// make sure we have grants to show
		//
		if (!this.model.has('grants')) {
			this.showMessage({
				icon: 'fa fa-money-check-dollar',
				text: 'Loading Grants...'
			});
			this.model.getGrants().fetchByPerson(this.model, {

				// callbacks
				//
				success: (collection) => {
					this.model.set('grants', collection);
					this.showGrants(options);
					this.hideMessage();
				}
			});
			return;
		}

		// render grants
		//
		this.grantsView = new GrantsView({
			collection: this.model.get('grants'),
			parent: this
		});
		this.$el.prepend(this.grantsView.render());

		// perform callback
		//
		if (options && options.done) {
			options.done(this.grantsView);
		}
	},

	hideGrants() {
		this.$el.find('.grants').hide();
	}
}