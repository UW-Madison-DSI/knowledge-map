/******************************************************************************\
|                                                                              |
|                               places-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an item list view.                                       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ItemsView from '../items-view.js';
import PlacesListView from './places-list-view.js';

export default ItemsView.extend({

	//
	// attributes
	//

	item: 'place',
	icon: 'fa fa-building',
	ItemsListView: PlacesListView,

	//
	// querying methods
	//

	toCSV: function() {
		let csv = '';
		csv += 'Name, ';
		csv += 'Street Address';
		csv += '\n';
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			csv += model.get('name') + ',';
			csv += model.get('street_address');
			csv += '\n';
		}
		return csv;
	},

	toJSON: function() {
		let data = [];
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			data.push({
				'Name': model.get('name'),
				'Street Address': model.get('street_address')
			});
		}
		return JSON.stringify(data, null, 4);
	},

	//
	// rendering methods
	//

	showItems: function() {
		this.showChildView('items', new this.ItemsListView({
			collection: this.options.collection,

			// callbacks
			//
			onclick: (item) => this.onClick(item)
		}));
	},

	//
	// selection event handling methods
	//

	onClick: function(item) {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');
		let buildingView = mapView.buildingsView.children.findByModel(item.model);

		// zoom to building
		//
		mapView.clearPopovers();
		let location = buildingView.getLocation(mapView);
		if (location) {
			mapView.goTo(location, 1, {

				// callbacks
				//
				done: () => {
					buildingView.showPopover();
				}
			});
		}
	}
});