/******************************************************************************\
|                                                                              |
|                           book-chapter-showable.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for displaying book chapters.                 |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BookChaptersView from './book-chapters-view.js';

export default {

	//
	// querying methods
	//

	hasBookChapters: function() {
		return this.$el.find('.book-chapters').length > 0;
	},

	//
	// rendering methods
	//

	showBookChapters: function(options) {

		// show existing book chapters
		//
		if (this.hasBookChapters()) {
			this.$el.find('.book-chapters').show();

			// perform callback
			//
			if (options && options.done) {
				options.done(this.bookChaptersView);
			}

			return;
		}

		// make sure we have book chapters to show
		//
		if (!this.model.has('book_chapters')) {
			this.showMessage({
				icon: 'fa fa-book-open',
				text: 'Loading Book Chapters...'
			});
			this.model.getBookChapters().fetchByPerson(this.model, {

				// callbacks
				//
				success: (collection) => {
					this.model.set('book_chapters', collection);
					this.showBookChapters(options);
					this.hideMessage();
				}
			});
			return;
		}

		// render awards
		//
		this.bookChaptersView = new BookChaptersView({
			collection: this.model.get('book_chapters'),
			parent: this
		});
		this.$el.prepend(this.bookChaptersView.render());

		// perform callback
		//
		if (options && options.done) {
			options.done(this.bookChaptersView);
		}
	},

	hideBookChapters() {
		this.$el.find('.book-chapters').hide();
	}
}