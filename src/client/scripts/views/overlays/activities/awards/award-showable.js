/******************************************************************************\
|                                                                              |
|                               award-showable.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for displaying awards.                        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import AwardsView from './awards-view.js';

export default {

	//
	// querying methods
	//

	hasAwards: function() {
		return this.$el.find('.awards').length > 0;
	},

	//
	// rendering methods
	//

	showAwards: function(options) {

		// show existing awards
		//
		if (this.hasAwards()) {
			this.$el.find('.awards').show();

			// perform callback
			//
			if (options && options.done) {
				options.done(this.awardsView);
			}

			return;
		}

		// make sure we have awards to show
		//
		if (!this.model.has('awards')) {
			this.showMessage({
				icon: 'fa fa-trophy',
				text: 'Loading Awards...'
			});
			this.model.getAwards().fetchByPerson(this.model, {

				// callbacks
				//
				success: (collection) => {
					this.model.set('awards', collection);
					this.showAwards(options);
					this.hideMessage();
				}
			});
			return;
		}

		// render awards
		//
		this.awardsView = new AwardsView({
			collection: this.model.get('awards'),
			parent: this
		});
		this.$el.prepend(this.awardsView.render());

		// perform callback
		//
		if (options && options.done) {
			options.done(this.awardsView);
		}
	},

	hideAwards() {
		this.$el.find('.awards').hide();
	}
}