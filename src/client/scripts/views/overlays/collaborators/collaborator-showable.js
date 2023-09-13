/******************************************************************************\
|                                                                              |
|                          collaborator-showable.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for showing collaborators.                    |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../utilities/math/vector2.js';
import CollaboratorsView from './collaborators-view.js';

export default {

	//
	// rendering methods
	//

	showCollaborators(options) {

		// show existing collaborators
		//
		if (this.$el.find('.collaborators').length > 0) {
			this.$el.find('.collaborators').show();

			// perform callback
			//
			if (options && options.done) {
				options.done(this.collaboratorsView);
			}

			return;
		}

		// make sure we have collaborators to show
		//
		if (!this.model.has('collaborators')) {
			this.showMessage({
				icon: 'fa fa-users',
				text: 'Loading Collaborators...'
			});
			this.model.fetchCollaborators({

				// callbacks
				//
				success: (collaborators) => {
					this.hideMessage();
					this.model.set('collaborators', collaborators);
					this.showCollaborators(options);
				}
			});
			return;
		}

		// render collaborators
		//
		this.collaboratorsView = new CollaboratorsView({
			collection: this.model.get('collaborators'),
			parent: this
		});
		this.$el.prepend(this.collaboratorsView.render());

		// perform callback
		//
		if (options && options.done) {
			options.done(this.collaboratorsView);
		}

		return this.views;
	},

	hideCollaborators() {
		this.$el.find('.collaborators').hide();
	},

	clearCollaborators: function() {
		this.$el.find('.collaborators').remove();
		this.collaboratorViews = null;
	},
};