<?php
/******************************************************************************\
|                                                                              |
|                          TechnologyController.php                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for fetching info about technologies.            |
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
use App\Models\Activities\Technology;
use App\Models\Activities\Summaries\TechnologySummary;
use App\Http\Controllers\Controller;

class TechnologyController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get a technology.
	 *
	 * @param string $id - the id of the technology to get
	 * @return App\Models\Technology
	 */
	public function getIndex(string $id) {

		// find technology by id
		//
		$technology = Technology::find($id);
		if (!$technology) {
			return response("Technology not found.", 404);
		}

		return $technology;
	}

	/**
	 * Get technologies associated with a person.
	 *
	 * @param string $id - the id of the person to get technologies of
	 * @return App\Models\Technology[]
	 */
	public function getByPerson(string $id) {
		return TechnologySummary::where('contributorIds', 'like', '%' . $id . '%')->get();
	}

	/**
	 * Get all technologies.
	 *
	 * @return App\Models\Technology[]
	 */
	public function getAll(Request $request) {
		$limit = 1000;

		// get technologies by name
		//
		if ($request->has('title')) {
			$title = $request->get('title');
			return TechnologySummary::where('title', 'like', '%' . $title . '%')->take($limit)->get();

		// get technologies by term
		//
		} else if ($request->has('term')) {
			$term = $request->get('term');
			return TechnologySummary::where('abstract', 'like', '%' . $term . '%')->take($limit)->get();	
		}
	}
}