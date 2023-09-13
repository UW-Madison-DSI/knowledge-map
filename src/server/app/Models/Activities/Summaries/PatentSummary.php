<?php
/******************************************************************************\
|                                                                              |
|                              PatentSummary.php                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an abridged model of a patent.                           |
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

use App\Models\Activities\Summaries\ActivitySummary;
use App\Models\Summaries\ContributorSummary;

class PatentSummary extends ActivitySummary
{
	//
	// attributes
	//
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'patents';

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;

	/**
	 * The "type" of the primary key ID.
	 *
	 * @var string
	 */
	protected $keyType = 'integer';
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'id',
		'name',
		'date',
		'activityYear',
		'contributorIds'
	];

	/**
	 * The attributes that should be visible in serialization.
	 *
	 * @var array
	 */
	protected $visible = [
		'id',
		'name',
		'date',
		'activityYear',
		'contributors'
	];

	//
	// getting methods
	//

	/**
	 * Get a contributor to this activity.
	 *
	 * @return App\Models\Contributor
	 */
	public function getContributor($contributorId): ?ContributorSummary {
		$contributor = ContributorSummary::find($contributorId);
		if ($contributor) {
			$contributor->startDate = $this->date;
			$contributor->endDate = $this->date;
		}
		return $contributor;
	}
}
