<?php
/******************************************************************************\
|                                                                              |
|                             CommunityFilter.php                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a utility for filtering by community name.               |
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

class CommunityFilter
{
	/**
	 * Apply community filter to query.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @param Illuminate\Database\Query\Builder $query - the query to apply filters to
	 * @return Illuminate\Database\Query\Builder
	 */
	static function applyTo(Request $request, $query) {

		// parse parameters
		//
		$community = $request->input('community', null);

		// add name filter to query
		//
		if ($community == 'data-science') {
			$query->where(function($query) use ($community) {
				$query->where('communities', 'LIKE', '%' . $community . '%')->orWhereNull('communities');
			});
		} else if ($community && $community != 'all') {
			$query->where(function($query) use ($community) {
				$query->where('communities', 'LIKE', '%' . $community . '%');
			});
		}

		return $query;
	}
}