<?php
/******************************************************************************\
|                                                                              |
|                           ContributorSummary.php                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a person.                                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Models\Summaries;

use App\Models\Person;
use App\Models\InstitutionUnit;

class ContributorSummary extends Person
{
	//
	// attributes
	//
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'people';

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
		'aaid',
		'firstName',
		'lastName',
		'middleName',
		'primaryUnitAffiliationId',

		// activity information
		//
		'startDate',
		'endDate'
	];

	/**
	 * The attributes that should be visible in serialization.
	 *
	 * @var array
	 */
	protected $visible = [
		'id',
		'aaid',
		'firstName',
		'lastName',
		'middleName',
		'primaryUnitAffiliation',

		// activity information
		//
		'startDate',
		'endDate'
	];

	//
	// accessor methods
	//

	/**
	 * Get this person's primary unit affiliation attribute.
	 *
	 * @return ?string
	 */
	public function getPrimaryUnitAffiliationAttribute(): ?InstitutionUnit {
		return InstitutionUnit::find($this->primaryUnitAffiliationId);
	}
}
