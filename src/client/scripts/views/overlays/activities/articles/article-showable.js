/******************************************************************************\
|                                                                              |
|                             article-showable.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for displaying articles.                      |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ArticlesView from './articles-view.js';

export default {

	//
	// querying methods
	//

	hasArticles: function() {
		return this.$el.find('.articles').length > 0;
	},

	//
	// rendering methods
	//

	showArticles: function(options) {

		// show existing grants
		//
		if (this.hasArticles()) {
			this.$el.find('.articles').show();

			// perform callback
			//
			if (options && options.done) {
				options.done(this.articlesView);
			}

			return;
		}

		// make sure we have articles to show
		//
		if (!this.model.has('articles')) {
			let viewport = this.getParentViewById('viewport');
			this.showMessage({
				icon: 'fa fa-file-text',
				text: 'Loading Articles...'
			});
			this.model.getArticles().fetchByPerson(this.model, {

				// callbacks
				//
				success: (collection) => {
					this.model.set('articles', collection);
					this.showArticles(options);
					this.getTopView().hideMessage();
				}
			});
			return;
		}

		// render articles
		//
		this.articlesView = new ArticlesView({
			collection: this.model.get('articles'),
			parent: this
		});
		this.$el.prepend(this.articlesView.render());

		// perform callback
		//
		if (options && options.done) {
			options.done(this.articlesView);
		}
	},

	hideArticles() {
		this.$el.find('.articles').hide();
	}
}