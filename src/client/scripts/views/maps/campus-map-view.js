/******************************************************************************\
|                                                                              |
|                             campus-map-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a map view showing campus buildings.                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../utilities/math/vector2.js';
import Units from '../../utilities/math/units.js';
import Buildings from '../../collections/buildings.js';
import Departments from '../../collections/departments.js';
import InstitutionUnits from '../../collections/institution-units.js';
import AcademicAnalyticsInstitutionUnits from '../../collections/academic-analytics/academic-analytics-institution-units.js';
import BaseMapView from './base-map-view.js';
import DepartmentMarkerView from '../overlays/departments/department-marker-view.js';
import BuildingsView from '../overlays/buildings/buildings-view.js';
import LabelsView from '../overlays/labels/labels-view.js';

//
// fetching methods
//

export default BaseMapView.extend({

	//
	// constructor
	//

	initialize(options) {

		// set options
		//
		options.layers = ['buildings', 'labels'];

		// call superclass constructor
		//
		BaseMapView.prototype.initialize.call(this, options);
	},

	//
	// fetching methods
	//

	fetchBuildings: function(options) {
		new Buildings().fetch({

			// callbacks
			//
			success: (collection) => {
				let excluded = [202, 1299, 1239];
				let buildings = new Buildings();
				let timeout = null;

				// filter buildings
				//
				for (let i = 0; i < collection.length; i++) {
					let building = collection.at(i);
					let number = building.get('building_number');
					if (!excluded.includes(number)) {
						buildings.add(building);
					}
				}

				// perform callback
				//
				if (options && options.success) {
					options.success(buildings);
				}
			}
		});
	},

	fetchDepartments: function(options) {
		new Departments().fetch({
			full: options && options.full,

			// callbacks
			//
			success: (collection) => {

				// link departments with buildings
				//
				if (options.buildings) {

					// create index of buildings
					//
					let directory = [];
					for (let i = 0; i < options.buildings.length; i++) {
						let building = options.buildings.at(i);
						directory[building.get('id')] = building;
					}

					// add link from department to building
					//
					for (let i = 0; i < collection.length; i++) {
						let department = collection.at(i);
						department.building = directory[department.get('building_id')];
					}
				}

				// perform callback
				//
				if (options && options.success) {
					options.success(collection);
				}
			}
		});
	},

	fetchInstitutionUnits: function(options) {
		this.getInstitutionUnits('academic_analytics').fetch({
			full: options && options.full,

			// callbacks
			//
			success: (collection) => {
				this.departments = collection;

				// link departments with buildings
				//
				if (this.buildings) {

					// create index of buildings
					//
					let directory = [];
					for (let i = 0; i < this.buildings.length; i++) {
						let building = this.buildings.at(i);
						directory[building.get('name')] = building;
					}

					// add link from institution unit to building
					//
					for (let i = 0; i < collection.length; i++) {
						let institutionUnit = collection.at(i);
						institutionUnit.building = directory[institutionUnit.get('building')];
					}
				}

				// perform callback
				//
				if (options && options.success) {
					options.success(collection);
				}
			}
		});
	},

	//
	// getting methods
	//

	getInstitutionUnits: function(source) {
		switch (source) {
			case 'academic_analytics':
				return new AcademicAnalyticsInstitutionUnits();
				break;
			default:
				break;
		}
	},

	getDepartmentLocation: function(name) {
		let department = this.departments[name];
		if (department) {
			return department.location;
		}
	},

	getRGBColor: function(r, g, b, a) {
		if (a == undefined) {
			return 'rgb(' + r + ', ' + g + ', ' + b + ')';
		} else {
			return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
		}
	},

	//
	// setting methods
	//

	setDepartments: function(departments) {

		// build department directory
		//
		this.departments = [];
		for (let i = 0; i < departments.length; i++) {
			let department = departments.at(i);
			let name = department.get('name');
			this.departments[name] = department;
		}
	},

	setInstitutionUnits: function(institutionUnits) {

		// build institution unit directory
		//
		this.institutionUnits = [];
		for (let i = 0; i < institutionUnits.length; i++) {
			let institutionUnit = institutionUnits.at(i);
			let name = institutionUnit.get('name');
			this.institutionUnits[name] = institutionUnit;
		}
	},

	setMapMode: function(mapMode) {
		if (mapMode == 'graph') {
			this.fadeOut();
		} else {
			if (this.mapMode == 'graph') {
				this.fadeIn();
			}
			this.map.view = mapMode;
			this.tiles.render();
		}
		this.mapMode = mapMode;
	},

	//
	// rendering methods
	//

	onAttach: function() {

		// call superclass method
		//
		BaseMapView.prototype.onAttach.call(this);

		this.hideGrid();

		// add details
		//
		this.addBuildings(() => {

			// activate ui
			//
			if (this.start) {
				this.start();
			}
		});
	},

	addBuildings: function(done) {
		const show_departments = false;

		this.fetchBuildings({

			// callbacks
			//
			success: (buildings) => {
				this.buildings = buildings;
				this.showBuildings(buildings);

				if (show_departments) {
					this.fetchDepartments({
						buildings: buildings,

						// callbacks
						//
						success: (departments) => {
							this.showDepartments(departments);

							// perform callback
							//
							if (done) {
								done();
							}
						}
					});
				} else {
					this.fetchInstitutionUnits({
						buildings: buildings,

						// callbacks
						//
						success: (institutionUnits) => {
							this.showInstitutionUnits(institutionUnits);

							// perform callback
							//
							if (done) {
								done();
							}
						}
					});
				}
			}
		});
	},

	showBuildings: function(buildings) {
		let scale = Math.pow(2, this.options.zoom_level - 14);

		this.buildingsView = new BuildingsView({
			collection: buildings,
			offset: new Vector2(-this.map.longitude, this.map.latitude),
			scale: new Vector2(11650, 15950).scaledBy(scale)	
		});

		this.viewport.addLayerGroup('buildings', this.buildingsView.render());
		this.buildings = buildings;
	},

	showDepartments: function(departments) {
		let names = [];
		let fullnames = [];
		let locations = [];
		let weights = [];
		let excludes = ['Academic', 'Alumni', 'Program', 'Programs', 
			'Service', 'Services', 'Shop', 'Clinic', 'Inc', 'Bureau',
			'Library', 'Print', 'Printing', 'iSchool', 'Plan', 'Summer', 'Continuing', 'Picnic',
			'President', 'Exterminator', 'Chancellor', 'Administration', 'Bursar', 'System',
			'Student', 'Major', 'Commons', 'Teacher', 'Enrollment', 'Housing',
			'Cinema', 'Theatre', 'Theater', 'Information', 'Graduate', 
			'Leadership', 'Wisconsin', 'University', 'UW', 'Tech', 'Plumbing',
			'Licensing', 'Car', 'Learning', 'Studio', 'Cooperatives', 'Peace', 'Committee',
			'WISCIENCE', 'WHA', 'WIDA', 'WCER', 'SCALE', 'SAGE', 'DiME', 'CIRTL', 'CCE', 'WARF',
			'Monatshefte', 'Waisman', 'Sonderegger'];

		// save departments
		//
		this.setDepartments(departments);

		// show department labels
		//
		for (let i = 0; i < departments.length; i++) {
			let department = departments.at(i);
			let fullname = department.get('name');
			let name = department.get('base_name');
			let words = fullname.split(' ');
			let skip = false;

			for (let i = 0; i < excludes.length; i++) {
				if (fullname.includes(excludes[i])) {
					skip = true;
					break;
				}
			}

			if (fullname == 'NOAA/NESDIS') {
				name = 'Meteorology';
			}

			if (fullname == 'Computer Sciences') {
				name = 'Computers';
			}

			if (department.building && !skip) {
				let latLng = department.building.getLatLng();

				// set weighting
				//
				let words = name.split(' ');
				let weight;

				location.x += Math.random() * 20 - 10;
				location.y += Math.random() * 20 - 10;
				
				switch (words.length) {
					case 1:
						weight = 10;
						break;
					default:
						weight = 5;
						break;					
				}

				names.push(name);
				fullnames.push(fullname);
				locations.push(location);
				weights.push(weight);
			}
		}

		this.labelsView = new LabelsView({
			viewport: this.viewport,
			names: names,
			fullnames: fullnames,
			location: locations,
			weights: weights,
			parent: this,

			// callbacks
			//
			onclick: (labelView) => {
				this.onClickLabel(labelView);
			}
		});
		this.labelsView.render();
		return this.labelsView;
	},

	showInstitutionUnits: function(institutionUnits) {
		let names = [];
		let locations = [];
		let fullnames = [];
		let weights = [];
		let colors = [];
		let excludes = ['WISCIENCE'];
		let buildingNames = [];
		let $departments = $('#departments');

		// save institution units
		//
		this.setInstitutionUnits(institutionUnits);

		// show institution unit labels
		//
		for (let i = 0; i < institutionUnits.length; i++) {
			let institutionUnit = institutionUnits.at(i);
			let baseName = institutionUnit.get('base_name');
			let numPeople = institutionUnit.get('num_people');

			// skip some departments
			//
			let skip = false;
			if (numPeople == 0) {
				skip = true; 
			} else {
				for (let i = 0; i < excludes.length; i++) {
					if (baseName.includes(excludes[i])) {
						skip = true;
						break;
					}
				}
			}

			if (institutionUnit.building && !skip) {
				let name = institutionUnit.get('base_name') ||  institutionUnit.get('name');
				let fullname = institutionUnit.get('name');
				let latlng = institutionUnit.building.get('latlng');
				let buildingName = institutionUnit.building.get('name');
				let location = this.latLongToPoint(latlng[0], latlng[1]);

				// set color
				//
				let r = Math.trunc(Math.random() * 256);
				let g = Math.trunc(Math.random() * 256);
				let b = Math.trunc(Math.random() * 256);
				let r2 = Math.trunc(r / 2);
				let g2 = Math.trunc(g / 2);
				let b2 = Math.trunc(b / 2);
				let fill = this.getRGBColor(r, g, b);
				let stroke = this.getRGBColor(r2, g2, b2);

				// set weighting
				//
				let words = name.split(' ');
				let weight;

				switch (words.length) {
					case 1:
						weight = 10;
						break;
					default:
						weight = 5;
						break;					
				}

				if (name == 'Data Science') {
					weight = 10;
				}

				if (numPeople > 25) {
					weight = 10;
				}

				// add labels
				//
				if (buildingNames.includes(buildingName)) {
					location.add(Vector2.srandom(10, 10));
				} else {
					buildingNames.push(buildingName);
				}

				names.push(name);
				fullnames.push(fullname);
				locations.push(location);
				weights.push(weight);
				colors.push(stroke);

				// add markers
				//
				if (numPeople > 0) {
					let weight = numPeople / 10;
					let markerView = new DepartmentMarkerView({
						model: institutionUnit,
						location: location,
						weight: weight,
						fill: fill,
						stroke: stroke
					});
					$departments.append(markerView.render());
				}
			}
		}

		if (!this.labelsView) {
			this.labelsView = new LabelsView({
				viewport: this.viewport, 
				names: names,
				fullnames: fullnames,
				locations: locations,
				weights: weights, 
				colors: colors,
				parent: this,

				// callbacks
				//
				onclick: (labelView) => {
					this.onClickLabel(labelView);
				}
			});
			this.labelsView.render();
		}

		return this.labelsView;
	},

	fadeOut: function() {
		this.viewport.$el.find('#tiles').fadeOut();
		this.viewport.$el.find('#departments').fadeTo(500, 1);
		this.viewport.$el.find('#departments').show();
		this.viewport.$el.find('#buildings').fadeTo(500, 0);
		this.viewport.$el.find('#buildings').css('pointer-events', 'none');
		this.viewport.$el.find('#labels').removeClass('dark');
		$('#background').fadeIn();
	},

	fadeIn: function() {
		this.viewport.$el.find('#tiles').fadeIn();
		this.viewport.$el.find('#departments').show();
		this.viewport.$el.find('#departments').fadeTo(500, 0);
		this.viewport.$el.find('#buildings').fadeTo(500, 1);
		this.viewport.$el.find('#buildings').css('pointer-events', 'auto');
		this.viewport.$el.find('#labels').removeClass('dark');
		$('#background').fadeOut();
	},

	showMapLabels: function() {
		this.map.labels = true;
		this.tiles.render();
	},

	hideMapLabels: function() {
		this.map.labels = false;
		this.tiles.render();
	},

	//
	// mouse event handling methods
	//

	onClickLabel: function() {

		// do nothing
		//
	}
});