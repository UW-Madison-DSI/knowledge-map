<?php
/******************************************************************************\
|                                                                              |
|                            ArticleController.php                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for fetching info about articles.                |
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
use App\Models\Activities\Article;
use App\Models\Activities\Summaries\ArticleSummary;
use App\Http\Controllers\Controller;

class ArticleController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get an article.
	 *
	 * @param string $id - the id of the article to get
	 * @return App\Models\Article
	 */
	public function getIndex(string $id) {

		// find article by id
		//
		$article = Article::find($id);
		if (!$article) {
			return response("Article not found.", 404);
		}

		return $article;
	}

	/**
	 * Get articles associated with a person.
	 *
	 * @param string $id - the id of the person to get articles of
	 * @return App\Models\ArticleOutline[]
	 */
	public function getByPerson(string $id) {
		return ArticleSummary::where('contributorIds', 'like', '%' . $id . '%')->get();
	}

	/**
	 * Get all articles.
	 *
	 * @return App\Models\Article[]
	 */
	public function getAll(Request $request) {
		$limit = 1000;

		// get articles by title
		//
		if ($request->has('title')) {
			$title = $request->get('title');
			return ArticleSummary::where('title', 'like', '%' . $title . '%')->take($limit)->get();	

		// get articles by term
		//
		} else if ($request->has('term')) {
			$term = $request->get('term');
			return ArticleSummary::where('abstract', 'like', '%' . $term . '%')->take($limit)->get();	
		}
	}
}