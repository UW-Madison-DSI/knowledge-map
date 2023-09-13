/******************************************************************************\
|                                                                              |
|                  academic-analytics-institution-unit.js                      |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of an institution unit from Academic             |
|        Analytics.                                                            |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import InstitutionUnit from '../institution-unit.js';
	
export default InstitutionUnit.extend({

	parse: function(response) {
		return {
			id: response.id,
			source: 'academic_analytics',

			// model info
			//
			name: response.name,
			base_name: response.baseName,
			institution_id: response.institutionId,
			is_primary: response.isPrimary,
			type: response.type,
			building: response.building,
			num_people: response.numPeople,
			num_affiliations: response.numAffiliations
		}
	}
});