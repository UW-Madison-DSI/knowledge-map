/******************************************************************************\
|                                                                              |
|                               book-showable.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for displaying books.                         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BooksView from './books-view.js';

export default {

	//
	// querying methods
	//

	hasBooks: function() {
		return this.$el.find('.books').length > 0;
	},

	//
	// rendering methods
	//

	showBooks: function(options) {

		// show existing books
		//
		if (this.hasBooks()) {
			this.$el.find('.books').show();

			// perform callback
			//
			if (options && options.done) {
				options.done(this.booksView);
			}

			return;
		}

		// make sure we have books to show
		//
		if (!this.model.has('books')) {
			this.showMessage({
				icon: 'fa fa-book',
				text: 'Loading Books...'
			});
			this.model.getBooks().fetchByPerson(this.model, {

				// callbacks
				//
				success: (collection) => {
					this.model.set('books', collection);
					this.showBooks(options);
					this.hideMessage();
				}
			});
			return;
		}

		// render books
		//
		this.booksView = new BooksView({
			collection: this.model.get('books'),
			parent: this
		});
		this.$el.prepend(this.booksView.render());

		// perform callback
		//
		if (options && options.done) {
			options.done(this.booksView);
		}
	},

	hideBooks() {
		this.$el.find('.books').hide();
	}
}