/******************************************************************************\
|                                                                              |
|                           book-chapter-marker-view.js                        |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../../utilities/math/vector2.js';
import ActivityMarkerView from '../activity-marker-view.js';

export default ActivityMarkerView.extend({

	//
	// attributes
	//

	d: 'M12 4.707c -2.938 -1.83 -7.416 -2.567 -12 -2.707v17.714c3.937.12 7.795.681 10.667 1.995.846.388 1.817.388 2.667 0 2.872 -1.314 6.729 -1.875 10.666  -1.995v -17.714c -4.584.14 -9.062.877 -12 2.707 z',
	offset: new Vector2(-12, -12),

	//
	// popover attributes
	//

	popover_type: 'book-chapter',
	popover_icon: 'fa fa-book-open',
	popover_title: 'Book Chapter',
	popover_template: 
		`<div class="book-chapter">
			<div class="info">
				<% if (chapter_name) { %>
				<div class="title">
					<label>Chapter</label>
					<%= chapter_name %>
				</div>
				<% } %>

				<% if (book_name) { %>
				<div class="book-name">
					<label>Book</label>
					<%= book_name %>
				</div>
				<% } %>

				<% if (publisher) { %>
				<div class="publisher">
					<label>Publisher</label>
					<%= publisher %>
				</div>
				<% } %>

				<% if (isbn) { %>
				<div class="isbn">
					<label>ISBN</label>
					<%= isbn %>
				</div>
				<% } %>
		
				<% if (start_page || end_page) { %>
				<div class="pages">
					<label>Pages</label>
					<%= start_page %> - <%= end_page %>
				</div>
				<% } %>

				<% if (publication_date) { %>
				<div class="publication-date">
					<label>Publication Date</label>
					<%= publication_date.format('shortDate') %>
				</div>
				<% } %>

				<% if (contributors.length > 0) { %>
				<div class="contributors">
					<label>Contributors</label>
					<%= contributors.join(', ') %>
				</div>
				<% } %>

				<% if (abstract) { %>
				<div class="abstract">
					<label>Abstract</label>
					<%= abstract %>
				</div>
				<% } %>
			</div>
		</div>`,

	//
	// constructor
	//

	initialize: function(options) {

		// call superclass constructor
		//
		ActivityMarkerView.prototype.initialize.call(this, options);

		// set attributes
		//
		this.tooltip_title = this.model.get('chapter_name');
	},

	//
	// rendering methods
	//

	getPopoverContent: function() {
		return _.template(this.popover_template)(_.extend(_.extend({}, this.model.attributes, {
			contributors: this.model.getContributorNames()
		})));
	}
});