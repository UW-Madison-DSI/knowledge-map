<?php
/******************************************************************************\
|                                                                              |
|                             BookController.php                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for fetching info about books.                   |
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
use App\Models\Activities\Book;
use App\Models\Activities\Summaries\BookSummary;
use App\Http\Controllers\Controller;

class BookController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get a book.
	 *
	 * @param string $id - the id of the book to get
	 * @return App\Models\Book
	 */
	public function getIndex(string $id) {

		// find book by id
		//
		$book = Book::find($id);
		if (!$book) {
			return response("Book not found.", 404);
		}

		return $book;
	}

	/**
	 * Get books associated with a person.
	 *
	 * @param string $id - the id of the person to get books of
	 * @return App\Models\Book[]
	 */
	public function getByPerson(string $id) {
		return BookSummary::where('contributorIds', 'like', '%' . $id . '%')->get();
	}

	/**
	 * Get all books.
	 *
	 * @return App\Models\Book[]
	 */
	public function getAll(Request $request) {
		$limit = 1000;

		// get books by title
		//
		if ($request->has('title')) {
			$title = $request->get('title');
			return BookSummary::where('title', 'like', '%' . $title . '%')->take($limit)->get();	

		// get books by publisher
		//
		} else if ($request->has('publisher')) {
			$publisher = $request->get('publisher');
			return BookSummary::where('publisher', 'like', '%' . $publisher . '%')->take($limit)->get();
		}
	}
}