/******************************************************************************\
|                                                                              |
|                                  people.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a base collection and generic utility methods.      |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseCollection from './base-collection.js';
import Person from '../models/person.js';
import Department from '../models/department.js';
import Departments from './departments.js';

export default BaseCollection.extend({

	//
	// attributes
	//

	model: Person,

	//
	// sorting methods
	//

	comparator: function(item) {
		return item.get('last_name');
	},

	//
	// getting methods
	//

	getDepartments: function() {
		let departments = new Departments();
		for (let i = 0; i < this.length; i++) {
			let model = this.at(i);
			let department = model.get('primary_affiliation');
			if (!departments.includes(department)) {
				departments.add(model);
			}
		}
		return departments;
	},

	getByDepartment: function(department) {
		let people = new this.constructor();
		for (let i = 0; i < this.length; i++) {
			let model = this.at(i);
			if (model.get('primary_affiliation') == department.get('name')) {
				people.add(model);
			}
		}
		return people;
	},

	//
	// look up models in directory
	//

	lookup: function() {
		let models = this.models;
		for (let i = 0; i < models.length; i++) {
			models[i] = Person.lookup(this.at(i));
		}

		// update collection with directory models
		//
		this.reset(models);
	},

	//
	// filtering methods
	//

	filterByName: function(name) {
		let matches = [];
		for (let i = 0; i < this.length; i++) {
			let person = this.at(i);
			if (person.matches(name)) {
				matches.push(person);
			}
		}
		return matches;
	},

	filterByTopic: function(topic) {
		let matches = [];
		for (let i = 0; i < this.length; i++) {
			let person = this.at(i);
			if (person.isInterestedIn(topic)) {
				matches.push(person);
			}
		}
		return matches;
	}
});