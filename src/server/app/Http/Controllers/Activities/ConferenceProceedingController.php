<?php
/******************************************************************************\
|                                                                              |
|                      ConferenceProceedingController.php                      |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for fetching info about conference               |
|        proceedings.                                                          |
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
use App\Models\Activities\ConferenceProceeding;
use App\Models\Activities\Summaries\ConferenceProceedingSummary;
use App\Http\Controllers\Controller;

class ConferenceProceedingController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get a conference proceeding.
	 *
	 * @param string $id - the id of the conference proceeding to get
	 * @return App\Models\ConferenceProceeding
	 */
	public function getIndex(string $id) {

		// find grant by id
		//
		$conferenceProceeding = ConferenceProceeding::find($id);
		if (!$conferenceProceeding) {
			return response("Conference proceeding not found.", 404);
		}

		return $conferenceProceeding;
	}

	/**
	 * Get conference proceedings associated with a person.
	 *
	 * @param string $id - the id of the person to get conference proceedings of
	 * @return App\Models\ConferenceProceeding[]
	 */
	public function getByPerson(string $id) {
		return ConferenceProceedingSummary::where('contributorIds', 'like', '%' . $id . '%')->get();
	}

	/**
	 * Get all conference proceedings.
	 *
	 * @return App\Models\ConferenceProceeding[]
	 */
	public function getAll(Request $request) {
		$limit = 1000;

		// get conference proceedings by title
		//
		if ($request->has('title')) {
			$title = $request->get('title');
			return ConferenceProceedingSummary::where('title', 'like', '%' . $title . '%')->take($limit)->get();

		// get conference proceedings by term
		//
		} else if ($request->has('term')) {
			$term = $request->get('term');
			return ConferenceProceedingSummary::where('abstract', 'like', '%' . $term . '%')->take($limit)->get();	
		}
	}
}