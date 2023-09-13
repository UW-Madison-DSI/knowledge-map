<?php
/******************************************************************************\
|                                                                              |
|                                  Grant.php                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a grant.                                      |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Models\Activities;

use App\Models\Activities\Activity;
use App\Models\Contributor;

class Grant extends Activity
{
	//
	// attributes
	//
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'grants';

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
		'startDate',
		'endDate',
		'primaryInvestigatorId',
		'totalDollars',
		'agencyName',
		'agencyNameAbbreviation',
		'abstract',
		'clientGrantId',
		'sponsor',
		'grantTypeId',
		'grantAwardeeTypeId',
		'communityEngaged',
		'contractNumber',
		'universityGrantNumber',
		'calendarYear',
		'studentSupported',
		'percentEffort',
		'grantStatusId',
		'activityType',
		'activityYear',
		'activitySubtype',
		'isExcludedFromReporting',
		'desiredVisibility',
		'sourceType',
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
		'startDate',
		'endDate',
		'primaryInvestigatorId',
		'totalDollars',
		'agencyName',
		'agencyNameAbbreviation',
		'abstract',
		'clientGrantId',
		'sponsor',
		'grantTypeId',
		'grantAwardeeTypeId',
		'communityEngaged',
		'contractNumber',
		'universityGrantNumber',
		'calendarYear',
		'studentSupported',
		'percentEffort',
		'grantStatusId',
		'activityType',
		'activityYear',
		'activitySubtype',
		'isExcludedFromReporting',
		'desiredVisibility',
		'sourceType',
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
	public function getContributor($contributorId): ?Contributor {
		$contributor = Contributor::find($contributorId);
		if ($contributor) {
			$contributor->startDate = $this->startDate;
			$contributor->endDate = $this->endDate;
		}
		return $contributor;
	}
}
