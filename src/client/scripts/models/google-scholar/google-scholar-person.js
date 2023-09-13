/******************************************************************************\
|                                                                              |
|                         google-scholar-person.js                             |
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

import Person from '../person.js';
import Article from './google-scholar-article.js';

export default Person.extend({

	//
	// ajax attributes
	//

	urlRoot: 'https://scholar.google.com/citations',

	//
	// ajax methods
	//

	url: function() {
		let queryString = 'user=' + this.get('id');
		let url = this.urlRoot + '?' + queryString;
		let proxyUrl = 'proxy.php?url=' + encodeURIComponent(url);
		return proxyUrl;
	},

	fetch: function(options) {
		$.ajax({
			type: 'GET',
			url: this.url(),
			contentType: 'text/html',
			crossDomain: true,

			// callbacks
			//
			success: (response, textStatus, jqXHR) => {
				// this.parseArticles(response);
				if (options && options.success) {
					options.success(this);
				}
			},
			error: (response, textStatus, errorThrown) => {
				alert(response.statusText)
			}
		});
	},

	//
	// parsing methods
	//

	parse: function(element) {
		let $element = $(element);

		// personal info
		//
		let id = $(element).find('.gs_ai a').attr('href').split('&user=')[1];
		let name = $element.find('.gs_ai_name').text().toTitleCase();
		let image = $element.find('.gs_rimg img').attr('src');
		let homepage = $element.find('.gsc_prf_ivh a').attr('src');

		// professional info
		//
		let affiliation = $element.find('.gs_ai_aff').text();
		let email = $element.find('.gs_ai_eml').text();
		let interests = [];

		// parse user data
		//
		if (image.startsWith('/')) {
			image = 'http://scholar.google.com' + image;
		}
		$element.find('.gs_ai_one_int').map(function() {
			interests.push($(this).text().toLowerCase());
		});

		return {
			id: id,
			source: 'google_scholar',

			// personal info
			//
			name: name,
			image: image,

			// professional info
			//
			primary_affiliation: affiliation,
			affiliations: undefined,
			interests: interests,
			grants: undefined,
			collaborators: undefined,

			// contact info
			//
			email: email,
			url: 'https://scholar.google.com/citations?hl=en&user=' + id
		};
	},

	/*
	parseArticle: function(elment) {
		return new GoogleScholarArticle({
			title: $(element).find('.gsc_a_at')
		});
	},
	*/

	parseArticles: function(element) {
		/*
		let attributes = this.attributes
		let citations = $(element).find('.gsc_a_tr');
		let articles = [];
		for (let i = 0; i < citations.length; i++) {
			articles.push(new Article(citations[i], {
				parse: true
			}));
		}
		attributes.articles = articles;
		this.set(attributes);
		*/
	}
});
