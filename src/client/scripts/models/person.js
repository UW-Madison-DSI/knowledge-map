/******************************************************************************\
|                                                                              |
|                                  person.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a person.                                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../utilities/scripting/string-utils.js';
import BaseModel from './base-model.js';
	
export default BaseModel.extend({

	defaults: {
		id: undefined,
		source: undefined,

		// personal info
		//
		first_name: undefined,
		last_name: undefined,
		middle_name: undefined,
		image: undefined,

		// educational info
		//
		degree_institution: undefined,
		degree_year: undefined,

		// professional info
		//
		title: undefined,
		primary_affiliation: undefined,
		affiliations: undefined,
		interests: undefined,
		research_summary: undefined,

		// activities
		//
		collaborators: undefined,
		articles: undefined,
		awards: undefined,
		book_chapters: undefined,
		books: undefined,
		conference_proceedings: undefined,
		grants: undefined,
		patents: undefined,
		technologies: undefined,

		// counts
		//
		num_collaborators: undefined,
		num_articles: undefined,
		num_awards: undefined,
		num_book_chapters: undefined,
		num_books: undefined,
		num_conference_proceedings: undefined,
		num_grants: undefined,
		num_patents: undefined,
		num_technologies: undefined,

		// contact info
		//
		email: undefined,
		url: undefined
	},

	//
	// querying methods
	//

	isInterestedIn: function(topic) {
		return this.getInterests().includes(topic);
	},

	hasInterests: function() {
		return this.getInterests().length > 0;
	},

	hasActivities: function() {
		for (let i = 0; i < this.constructor.activities.length; i++) {
			if (this.has(this.constructor.activities[i])) {
				return true;
			}
		}
		return false;
	},

	matches: function(name) {
		return this.getName().toLowerCase() == name.toLowerCase();
	},

	//
	// getting methods
	//

	getName: function() {
		let names = [];
		if (this.has('first_name')) {
			names.push(this.get('first_name'));
		}
		if (this.has('middle_name')) {
			names.push(this.get('middle_name'));
		}
		if (this.has('last_name')) {
			names.push(this.get('last_name'));
		}
		return names.join(' ');
	},

	getAffiliation: function() {
		return this.get('primary_affiliation') || this.get('affiliations')[0];
	},

	getSecondaryAffiliations() {
		let affiliations = this.get('affiliations') || [];
		return affiliations.remove(this.get('primary_affiliation'));
	},

	getInterests: function() {
		let interests = [];

		if (this.has('interests')) {
			interests = this.get('interests');
		}

		if (this.has('primary_affiliation')) {
			interests = interests.concat(this.get('primary_affiliation').split(' '));
		}

		return interests;
	}
});