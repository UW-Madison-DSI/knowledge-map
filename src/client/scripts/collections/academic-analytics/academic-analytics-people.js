/******************************************************************************\
|                                                                              |
|                        academic-analytics-people.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a collection of people.                             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import People from '../people.js';
import AcademicAnalyticsPerson from '../../models/academic-analytics/academic-analytics-person.js';

export default People.extend({

	//
	// attributes
	//

	model: AcademicAnalyticsPerson,

	//
	// finding methods
	//

	findByName(name, options) {
		return this.fetchByName(name, {

			// callbacks
			//
			success: () => {
				let models = this.models;
				for (let i = 0; i < models.length; i++) {
					if (AcademicAnalyticsPerson.has(models[i])) {
						models[i] = AcademicAnalyticsPerson.get(models[i]);
					} else {
						AcademicAnalyticsPerson.set(models[i]);
					}
				}
				this.reset(models);

				// perform callback
				//
				if (options && options.success) {
					options.success(this);
				}
			}
		});
	},

	findByLabel(label, options) {
		return this.fetchByLabel(label, {

			// callbacks
			//
			success: () => {
				let models = this.models;
				for (let i = 0; i < models.length; i++) {
					if (AcademicAnalyticsPerson.has(models[i])) {
						models[i] = AcademicAnalyticsPerson.get(models[i]);
					} else {
						AcademicAnalyticsPerson.set(models[i]);
					}
				}
				this.reset(models);

				// perform callback
				//
				if (options && options.success) {
					options.success(this);
				}
			}
		});
	},

	//
	// fetching methods
	//

	fetchByName(name, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/people?name=' + encodeURIComponent(name),
			parse: true
		}));
	},

	fetchByLabel(label, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/people?term=' + encodeURIComponent(label),
			parse: true
		}));
	},

	fetchByInstitutionUnit(institutionUnit, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/institution-units/' + institutionUnit.get('id') + '/people',
			parse: true
		}));
	},

	fetchByInstitutionUnitAffiliation(institutionUnit, options) {
		return this.fetch(_.extend({}, options, {
			url: config.servers.academic + '/institution-units/' + institutionUnit.get('id') + '/affiliations',
			parse: true
		}));
	},
});