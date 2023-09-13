<?php
/******************************************************************************\
|                                                                              |
|                             InstitutionUnit.php                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of an institution unit (department).             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Models;

use App\Models\BaseModel;
use App\Models\Person;

class InstitutionUnit extends BaseModel
{
	//
	// attributes
	//
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'institution_units';

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
		'baseName',
		'institutionId',
		'isPrimary',
		'type',
		'building',
		'numPeople'
	];

	/**
	 * The attributes that should be visible in serialization.
	 *
	 * @var array
	 */
	protected $visible = [
		'id',
		'name',
		'baseName',
		'institutionId',
		'isPrimary',
		'type',
		'building',
		'numPeople',
		'numAffiliations'
	];

	/**
	 * The accessors to append to the model's array form.
	 *
	 * @var array
	 */
	protected $appends = [
		'numPeople',
		'numAffiliations'
	];

	//
	// accessor methods
	//

	/**
	 * Get this person's num people attribute.
	 *
	 * @return object
	 */
	public function getNumPeopleAttribute() {
		return Person::where('primaryUnitAffiliationId', '=', $this->id)->count();
	}

	/**
	 * Get this person's num people attribute.
	 *
	 * @return object
	 */
	public function getNumAffiliationsAttribute() {
		return Person::where('nonPrimaryUnitAffiliationIds', 'like', '%' . $this->id . '%')->count();
	}
}
