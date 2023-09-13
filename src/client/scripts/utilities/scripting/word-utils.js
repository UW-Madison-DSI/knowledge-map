/******************************************************************************\
|                                                                              |
|                                 word-utils.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This contains minor general purpose string formatting utilities.      |
|                                                                              |
|******************************************************************************|
|            Copyright (c) 2013 SWAMP - Software Assurance Marketplace         |
\******************************************************************************/

export default {

	commonWords: [

		// conjunctions
		//
		'and', 'but', 'or',

		// articles
		//
		'a', 'an', 'the', 'this', 'that', 'other', 'some',

		// pronouns
		//
		'i', 'me', 'my', 'mine', 'myself',
		'you', 'you', 'your', 'yours', 'yourself',
		'he', 'him', 'his', 'his', 'himself',
		'she', 'her', 'her', 'hers', 'herself',
		'it', 'its', 'itself',
		'we', 'us', 'our', 'ours', 'ourselves',
		'you', 'your', 'yours', 'yourselves',
		'they', 'them', 'their', 'theirs', 'themselves',

		// prepositions
		//
		'about', 'above', 'across', 'after',
		'against', 'along', 'among', 'around', 
		'at','before', 'behind', 'between', 
		'beyond', 'but', 'by', 'concerning',
		'despite', 'down', 'during', 'except',
		'following', 'for', 'from', 'in',
		'including', 'into', 'like', 'near',
		'of', 'off', 'on', 'onto', 
		'out', 'over', 'past', 'plus',
		'since', 'throughout', 'to', 'towards',
		'under', 'until', 'up', 'upon',
		'up to', 'with', 'within', 'without'
	],

	//
	// getting methods
	//

	getUniqueWords: function(text) {
		let unique = [];

		if (text) {
			let words = text.split(' ');
			for (let i = 0; i < words.length; i++) {

				// strip punctuation
				//
				let word = words[i].toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, '')

				// filter common words
				//
				if (word != '' && !this.commonWords.includes(word)) {
					unique.push(word);
				}
			}
		}

		return unique;
	}
}