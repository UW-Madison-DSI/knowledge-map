/******************************************************************************\
|                                                                              |
|                                table-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a table of items.                              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../../../../vendor/jquery/tablesorter/js/jquery.tablesorter.min.js';
import CollectionView from '../../collections/collection-view.js';
import TableItemView from './table-item-view.js';

export default CollectionView.extend({

	//
	// attributes
	//

	tagName: 'table',
	childView: TableItemView,

	//
	// rendering methods
	//

	childViewOptions: function(model) {
		return {
			model: model,
			parent: this,

			// callbacks
			//
			onclick: this.options.onclick,
			onmouseover: this.options.onmouseover,
			onmouseleave: this.options.onmouseleave
		};
	},

	groupBy: function(column) {
		this.ungroup();
		if (!column || column.includes('name')) {
			return;
		}
		let rows = this.$el.find('tr');
		let current;
		for (let i = 0; i < rows.length; i++) {
			let $row = $(rows[i]);
			let $column = $row.find('td.' + column);
			let rowValue = $column.text().trim();
			if (rowValue == current) {
				$column.addClass('duplicate');
			} else {
				$column.removeClass('duplicate');
				current = rowValue;
			}
		}
	},

	ungroup: function() {
		this.$el.find('td.duplicate').removeClass('duplicate');
	},

	highlight: function(text, options) {
		for (let i = 0; i < this.children.length; i++) {
			this.children.findByIndex(i).highlight(text, options);
		}
	},

	onRender: function() {
		this.sortBy(this.options.sorting);
		if (this.groupBy) {
			this.groupBy(this.options.sorting);
		}
	}
});