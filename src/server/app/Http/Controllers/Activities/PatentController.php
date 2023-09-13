<?php
/******************************************************************************\
|                                                                              |
|                             PatentController.php                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for fetching info about patents.                 |
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
use App\Models\Activities\Patent;
use App\Models\Activities\Summaries\PatentSummary;
use App\Http\Controllers\Controller;

class PatentController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get a patent.
	 *
	 * @param string $id - the id of the patent to get
	 * @return App\Models\Patent
	 */
	public function getIndex(string $id) {

		// find patent by id
		//
		$patent = Patent::find($id);
		if (!$patent) {
			return response("Patent not found.", 404);
		}

		return $patent;
	}

	/**
	 * Get patents associated with a person.
	 *
	 * @param string $id - the id of the person to get patents of
	 * @return App\Models\Patent[]
	 */
	public function getByPerson(string $id) {
		return PatentSummary::where('contributorIds', 'like', '%' . $id . '%')->get();
	}

	/**
	 * Get all patents.
	 *
	 * @return App\Models\Patent[]
	 */
	public function getAll(Request $request) {
		$limit = 1000;

		// get patents by name
		//
		if ($request->has('name')) {
			$name = $request->get('name');
			return PatentSummary::where('name', 'like', '%' . $name . '%')->take($limit)->get();

		// get patents by term
		//
		} else if ($request->has('term')) {
			$term = $request->get('term');
			return PatentSummary::where('abstract', 'like', '%' . $term . '%')->take($limit)->get();	
		}
	}
}