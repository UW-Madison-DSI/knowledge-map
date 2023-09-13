<?php
/******************************************************************************\
|                                                                              |
|                             GrantController.php                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for fetching info about grants.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

namespace App\Http\Controllers\Activities;

use Illuminate\Http\Request;
use App\Models\Activities\Grant;
use App\Models\Activities\Summaries\GrantSummary;
use App\Http\Controllers\Controller;

class GrantController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get a grant.
	 *
	 * @param string $id - the id of the grant to get
	 * @return App\Models\Grant
	 */
	public function getIndex(string $id) {

		// find grant by id
		//
		$grant = Grant::find($id);
		if (!$grant) {
			return response("Grant not found.", 404);
		}

		return $grant;
	}

	/**
	 * Get grants associated with a person.
	 *
	 * @param string $id - the id of the person to get grants of
	 * @return App\Models\Grant[]
	 */
	public function getByPerson(string $id) {
		return GrantSummary::where('contributorIds', 'like', '%' . $id . '%')->get();
	}

	/**
	 * Get all grants.
	 *
	 * @return App\Models\Grant[]
	 */
	public function getAll(Request $request) {
		$limit = 1000;

		// get grants by name
		//
		if ($request->has('name')) {
			$name = $request->get('name');
			return GrantSummary::where('name', 'like', '%' . $name . '%')->take($limit)->get();

		// get grants by term
		//
		} else if ($request->has('term')) {
			$term = $request->get('term');
			return GrantSummary::where('abstract', 'like', '%' . $term . '%')->take($limit)->get();	
		}
	}
}