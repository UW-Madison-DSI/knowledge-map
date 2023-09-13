<?php
/******************************************************************************\
|                                                                              |
|                             ActivitySummary.php                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an abridged model of an activity.                        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Models\Activities\Summaries;

use App\Models\BaseModel;

class ActivitySummary extends BaseModel
{
	/**
	 * The accessors to append to the model's array form.
	 *
	 * @var array
	 */
	protected $appends = [
		'contributors'
	];

	//
	// accessor methods
	//

	/**
	 * Get this person's contributors attribute.
	 *
	 * @return App\Models\Contributor[]
	 */
	public function getContributorsAttribute(): array {
		$contributors = [];
		$ids = explode(', ', $this->contributorIds);
		for ($i = 0; $i < count($ids); $i++) {
			$contributor = $this->getContributor($ids[$i]);
			if ($contributor) {
				array_push($contributors, $contributor);
			}
		}
		return $contributors;
	}
}
