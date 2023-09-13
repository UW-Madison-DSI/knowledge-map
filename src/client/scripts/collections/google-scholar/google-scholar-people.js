/******************************************************************************\
|                                                                              |
|                         google-scholar-people.js                             |
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

import GoogleScholarPerson from '../../models/google-scholar/google-scholar-person.js';
import People from '../people.js';

export default People.extend({

	//
	// attributes
	//

	model: GoogleScholarPerson,

	//
	// ajax attributes
	//

	urlRoot: 'https://scholar.google.com/citations',

	//
	// parsing methods
	//

	parsePeople(html) {
		let $document = $(html);
		let body = $document.find('#gs_bdy');
		let $users = body.find('.gsc_1usr');
		for (let i = 0; i < $users.length; i++) {
			this.add(new GoogleScholarPerson($users[i], {
				parse: true
			}))
		}
	},

	//
	// fetching methods
	//

	fetchByName(name, options) {
		let queryString = 'view_op=search_authors&mauthors=' + name.replace(/ /g, '+') + '+wisc.edu&hl=en&oi=ao'
		let url = this.urlRoot + '?' + queryString;
		let proxyUrl = 'proxy.php?url=' + encodeURIComponent(url);

		$.ajax({
			type: 'GET',
			url: proxyUrl,
			contentType: 'text/html',
			crossDomain: true,

			// callbacks
			//
			success: (response, textStatus, jqXHR) => {
				this.parsePeople(response);
				if (options && options.success) {
					options.success(this);
				}
			},
			error: (response, textStatus, errorThrown) => {
				alert(response.statusText)
			}
		});
	},

	fetchByLabel(label, options) {
		let baseUrl = 'https://scholar.google.com/citations'
		let queryString = 'hl=en&view_op=search_authors&mauthors=' + label + '||label:' + label + '+wisc.edu';
		let url = baseUrl + '?' + queryString;
		let proxyUrl = 'proxy.php?url=' + encodeURIComponent(url);

		$.ajax({
			type: 'GET',
			url: proxyUrl,
			contentType: 'text/html',
			crossDomain: true,

			// callbacks
			//
			success: (response, textStatus, jqXHR) => {
				this.parsePeople(response);
				if (options && options.success) {
					options.success(this);
				}
			},
			error: (response, textStatus, errorThrown) => {
				alert(response.statusText)
			}
		});
	}
});