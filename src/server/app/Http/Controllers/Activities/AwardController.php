<?php
/******************************************************************************\
|                                                                              |
|                             AwardController.php                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for fetching info about awards.                  |
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
use App\Models\Activities\Award;
use App\Models\Activities\Summaries\AwardSummary;
use App\Http\Controllers\Controller;

class AwardController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get an award.
	 *
	 * @param string $id - the id of the award to get
	 * @return App\Models\Award
	 */
	public function getIndex(string $id) {

		// find award by id
		//
		$award = Award::find($id);
		if (!$award) {
			return response("Award not found.", 404);
		}

		return $award;
	}

	/**
	 * Get awards associated with a person.
	 *
	 * @param string $id - the id of the person to get awards of
	 * @return App\Models\Award[]
	 */
	public function getByPerson(string $id) {
		return AwardSummary::where('contributorIds', 'like', '%' . $id . '%')->get();
	}

	/**
	 * Get all awards.
	 *
	 * @return App\Models\Award[]
	 */
	public function getAll(Request $request) {
		$limit = 1000;

		// get awards by name
		//
		if ($request->has('name')) {
			$name = $request->get('name');
			return AwardSummary::where('name', 'like', '%' . $name . '%')->take($limit)->get();	

		// get awards by society
		//
		} else if ($request->has('society')) {
			$society = $request->get('society');
			return AwardSummary::where('abstract', 'like', '%' . $society . '%')->take($limit)->get();	
		}
	}
}