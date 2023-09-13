/******************************************************************************\
|                                                                              |
|                     academic-analytics-collaborator.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a person from Academic Analytics.             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Collaborator from '../collaborator.js';
import DateRangeQueryable from '../behaviors/date-range-queryable.js';

export default Collaborator.extend(_.extend({}, DateRangeQueryable, {

	//
	// parsing methods
	//

	parsePrimaryAffiliation(response) {
		if (response.unitName) {
			return response.unitName;
		}
		if (response.primaryUnitAffiliation) {
			return response.primaryUnitAffiliation.baseName;
		}
	},

	parseAffiliations(response) {
		let affiliations = [];
		if (response.nonPrimaryUnitAffiliations) {
			for (let i = 0; i < response.nonPrimaryUnitAffiliations.length; i++) {
				affiliations.push(response.nonPrimaryUnitAffiliations[i].baseName);
			}
		}
		return affiliations;
	},

	parse: function(response) {
		return {
			id: response.id,
			source: 'academic_analytics',

			// personal info
			//
			first_name: response.firstName? response.firstName.toTitleCase() : undefined,
			last_name: response.lastName? response.lastName.toTitleCase() : undefined,
			middle_name: response.middleName? response.middleName.toTitleCase() : undefined,
			image: undefined,

			// professional info
			//
			title: response.title? response.title.toTitleCase() : undefined,
			primary_affiliation: this.parsePrimaryAffiliation(response),
			affiliations: this.parseAffiliations(response),
			terms: response.researchTerms,
			interests: response.researchInterests,
			research_summary: response.researchSummary,

			// date info
			//
			start_date: new Date(response.startDate),
			end_date: new Date(response.endDate),

			// contact info
			//
			email: undefined,
			url: 'https://wisc.discovery.academicanalytics.com/scholar/stack/' + response.id + '/' + response.firstName + '-' + response.lastName
		};
	}
}));
