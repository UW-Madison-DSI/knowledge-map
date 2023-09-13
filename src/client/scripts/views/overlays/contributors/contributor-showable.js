/******************************************************************************\
|                                                                              |
|                           contributor-showable.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for showing contributors.                     |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../utilities/math/vector2.js';
import ContributorsView from './contributors-view.js';

export default {

	//
	// getting methods
	//

	getContributors: function() {
		let contributors = this.model.get('contributors');

		/*
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			let array = [];
			let selected_id = viewport.parent.selected? viewport.parent.selected.model.get('id') : undefined;
			for (let i = 0; i < contributors.length; i++) {
				if (contributors[i]) {
					if (contributors[i].get('id') != selected_id) {
						array.push(contributors[i]);
					}
				}
			}
			contributors = array;
		}
		*/

		return contributors;
	},

	//
	// selection methods
	//

	selectByContributor: function(contributor) {
		if (this.model.hasContributor(contributor)) {
			this.select();
		}
	},

	selectContributor: function(contributor) {
		if (this.contributorViews) {
			for (let i = 0; i < this.contributorViews.length; i++) {
				let contributorView = this.contributorViews[i];
				if (contributorView.model.is(contributor)) {
					contributorView.select();
				}
			}
		}
	},

	showContributors: function(options) {

		// render contributors
		//
		let contributorsView = new ContributorsView({
			collection: this.getContributors(),
			parent: this
		});
		this.$el.prepend(contributorsView.render());

		// perform callback
		//
		if (options && options.done) {
			options.done(contributorsView);
		}
	},

	hideContributors: function() {
		this.contributors.remove();
	},

	//
	// selection event handling methods
	//

	onSelect() {

		// show only this grant or publication
		//
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.parent.hideUnselectedItems();
		}
	},

	onDeselect() {

		// show all grants and publications
		//
		let viewport = this.getParentViewById('viewport');
		if (viewport) {
			viewport.parent.showUnselectedItems();
			viewport.rescale();
		}
	}
};