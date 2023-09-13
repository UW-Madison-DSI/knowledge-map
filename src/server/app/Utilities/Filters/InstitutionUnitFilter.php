<?php
/******************************************************************************\
|                                                                              |
|                          InstitutionUnitFilter.php                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a utility for filtering by institution unit.             |
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

class InstitutionUnitFilter
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
		$institutionUnitId = $request->input('institution_unit', null);

		// add topic to query
		//
		if ($institutionUnitId) {
			$query->where(function($query) use ($institutionUnitId) {
				$query->where('primaryUnitAffiliationId', '=', $institutionUnitId)
				->orWhere('nonPrimaryUnitAffiliationIds', 'like', '%' . $institutionUnitId . '%');
			});
		}

		return $query;
	}
}