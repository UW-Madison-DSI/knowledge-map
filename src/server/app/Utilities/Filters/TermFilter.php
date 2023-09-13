<?php
/******************************************************************************\
|                                                                              |
|                               TermFilter.php                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a utility for filtering by topic.                        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Utilities\Filters;

use Illuminate\Http\Request;

class TermFilter
{
	/**
	 * Apply name filter to query.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @param Illuminate\Database\Query\Builder $query - the query to apply filters to
	 * @return Illuminate\Database\Query\Builder
	 */
	static function applyTo(Request $request, $query) {

		// parse parameters
		//
		$term = $request->input('term', null);
		if (!$term) {
			return $query;
		}

		// parse parameters
		//
		$exact = $request->input('exact', false);

		// add term to query
		//
		if ($exact) {
			$query = $query->where(function($query) use ($term) {
				$query->where('researchSummary', 'like', '%' . $term . ',%')
					->orWhere('researchTerms', 'like', '%' . $term . ',%')
					->orWhere('researchInterests', 'like', '%' . $term . ',%')
					->orWhere('researchSummary', 'like', '%' . $term . ' %')
					->orWhere('researchTerms', 'like', '%' . $term . ' %')
					->orWhere('researchInterests', 'like', '%' . $term . ' %');
			});
		} else {
			$query = $query->where(function($query) use ($term) {
				$query->where('researchSummary', 'like', '%' . $term . '%')
					->orWhere('researchTerms', 'like', '%' . $term . '%')
					->orWhere('researchInterests', 'like', '%' . $term . '%');
			});
		}

		return $query;
	}
}