<?php
/******************************************************************************\
|                                                                              |
|                          BookChapterController.php                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for fetching info about book chapters.           |
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
use App\Models\Activities\BookChapter;
use App\Models\Activities\Summaries\BookChapterSummary;
use App\Http\Controllers\Controller;

class BookChapterController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get a book chapter.
	 *
	 * @param string $id - the id of the book chapter to get
	 * @return App\Models\BookChapter
	 */
	public function getIndex(string $id) {

		// find book chapter by id
		//
		$bookChapter = BookChapter::find($id);
		if (!$bookChapter) {
			return response("Book chapter not found.", 404);
		}

		return $bookChapter;
	}

	/**
	 * Get book chapters associated with a person.
	 *
	 * @param string $id - the id of the person to get book chapters of
	 * @return App\Models\BookChapter[]
	 */
	public function getByPerson(string $id) {
		return BookChapterSummary::where('contributorIds', 'like', '%' . $id . '%')->get();
	}

	/**
	 * Get all book chapters.
	 *
	 * @return App\Models\BookChapter[]
	 */
	public function getAll(Request $request) {
		$limit = 1000;

		// get book chapters by name
		//
		if ($request->has('name')) {
			$name = $request->get('name');
			return BookChapterSummary::where('name', 'like', '%' . $name . '%')->take($limit)->get();	

		// get book chapters by publisher
		//
		} else if ($request->has('publisher')) {
			$publisher = $request->get('publisher');
			return BookChapterSummary::where('publisher', 'like', '%' . $publisher . '%')->take($limit)->get();

		// get book chapters by book name
		//
		} else if ($request->has('bookName')) {
			$bookName = $request->get('bookName');
			return BookChapterSummary::where('bookName', 'like', '%' . $bookName . '%')->take($limit)->get();	
		}
	}
}