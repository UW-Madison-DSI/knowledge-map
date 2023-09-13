/******************************************************************************\
|                                                                              |
|                          profile-details-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a person's profile information.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseView from '../../../base-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	className: 'profile details panel',

	template: _.template(`
		<% if (terms && terms.length > 0) { %>
		<div class="terms">
			<label>Key Terms</label>
			<%= terms.join(', ').trim() %>
		</div>
		<% } %>
	`)
});