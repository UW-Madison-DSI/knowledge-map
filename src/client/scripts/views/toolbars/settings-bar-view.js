/******************************************************************************\
|                                                                              |
|                           settings-bar-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a toolbar view for settings.                             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import ToolbarView from './toolbar-view.js';

export default ToolbarView.extend({

	//
	// attributes
	//

	id: 'settings-bar',
	className: 'vertical toolbar',

	template: _.template(`
		<div class="title">View</div>

		<div class="buttons">
			<button id="show-map" class="selected" data-toggle="tooltip" title="Show / Hide Map" data-placement="left">
				<i class="fa fa-map"></i>
			</button>

			<button id="show-labels" class="selected" data-toggle="tooltip" title="Show / Hide Labels" data-placement="left">
				<i class="fa fa-font"></i>
			</button>

			<button id="show-grid" data-toggle="tooltip" title="Show / Hide Grid" data-placement="left" style="display:none">
				<i class="fa fa-table-cells"></i>
			</button>

			<button id="toggle-fullscreen" data-toggle="tooltip" title="Toggle Fullscreen" data-placement="left">
				<i class="fa fa-desktop"></i>
			</button>

			<button id="fit-to-view" data-toggle="tooltip" title="Fit to View" data-placement="left">
				<i class="fa fa-expand"></i>
			</button>
		</div>
	`),

	events: {
		'click #show-map': 'onClickShowMap',
		'click #show-labels': 'onClickShowLabels',
		'click #show-grid': 'onClickShowGrid',
		'click #toggle-fullscreen': 'onClickToggleFullscreen',
		'click #fit-to-view': 'onClickFitToView'
	},

	//
	// querying methods
	//

	isShowMapSelected: function() {
		return this.$el.find('#show-map').hasClass('selected');
	},

	isShowLabelsSelected: function() {
		return this.$el.find('#show-labels').hasClass('selected');
	},

	isShowGridSelected: function() {
		return this.$el.find('#show-grid').hasClass('selected');
	},

	isFullScreenSelected: function() {
		return this.$el.find('#toggle-fullscreen').hasClass('selected');
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		ToolbarView.prototype.onRender.call(this);

		// set initial state
		//
		if (!this.$el.find('#show-grid').hasClass('selected')) {
			this.parent.hideGrid();
		}
	},

	//
	// mouse event handling methods
	//

	onClickShowMap: function() {
		if (!this.isShowMapSelected()) {
			this.$el.find('#show-map').addClass('selected');
			this.parent.getChildView('map').show();
			this.parent.showMap();
		} else {
			this.$el.find('#show-map').removeClass('selected');
			this.parent.getChildView('map').hide();
			this.parent.hideMap();
		}
	},

	onClickShowLabels: function() {
		if (!this.isShowLabelsSelected()) {
			this.$el.find('#show-labels').addClass('selected');
			this.parent.showMarkerLabels();
		} else {
			this.$el.find('#show-labels').removeClass('selected');
			this.parent.hideMarkerLabels();
		}
	},

	onClickShowGrid: function() {
		if (!this.isShowGridSelected()) {
			this.$el.find('#show-grid').addClass('selected');
			this.parent.showGrid();
		} else {
			this.$el.find('#show-grid').removeClass('selected');
			this.parent.hideGrid();
		}
	},

	onClickToggleFullscreen: function() {
		if (!this.isFullScreenSelected()) {
			this.$el.find('#toggle-fullscreen').addClass('selected');
			this.parent.requestFullScreen();
		} else {
			this.$el.find('#toggle-fullscreen').removeClass('selected');
			this.parent.exitFullScreen();
		}
	},

	onClickFitToView: function() {
		if (this.parent.peopleView && !this.parent.peopleView.isEmpty()) {
			let locations = [];
			if (this.parent.selected && this.parent.selected.collaboratorsView) {
				locations = this.parent.selected.collaboratorsView.getLocations();
			} else {
				locations = this.parent.peopleView.getLocations();
			}
			this.parent.zoomToLocations(locations);
		} else if (this.parent.activitiesView) {
			this.parent.zoomToLocations(this.parent.activitiesView.getLocations());
		} else {
			this.parent.resetView();
		}
	}
});