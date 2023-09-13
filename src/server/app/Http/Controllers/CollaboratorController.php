<?php
/******************************************************************************\
|                                                                              |
|                          CollaboratorController.php                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for fetching info about collaborators.           |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Academic;
use App\Http\Controllers\Controller;

class CollaboratorController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get a grant.
	 *
	 * @param string $id - the id of the person to get collaborators of
	 * @return App\Models\Collaborator[]
	 */
	public function getByPerson(string $id) {

		// find person's grants
		//
		$scholar = Academic::find($id);
		if (!$scholar) {
			return response("Person not found.", 404);
		}

		return $scholar->getCollaborators();
	}
}