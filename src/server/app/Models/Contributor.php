<?php
/******************************************************************************\
|                                                                              |
|                                Contributor.php                               |
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

namespace App\Models;

use App\Models\Person;

class Contributor extends Person
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
		'email',

		// name info
		//
		'title',
		'firstName',
		'middleName',
		'lastName',

		// affiliation info
		//
		'primaryUnitAffiliationId',
		'nonPrimaryUnitAffiliationIds',
		'isAffiliate',
		'communities',

		// institution info
		//	
		'primaryInstitutionId',
		'appointmentType',
		'buildingNumber',

		// research info
		//
		'researchSummary',
		'researchTerms',
		'researchInterests',

		// academic info
		//
		'degreeInstitutionName',
		'degreeYear',
		'orcidId',

		// personal info
		//
		'profilePhoto',
		'homepage',
		'socialUrl',
		'githubUrl',

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

		// name info
		//
		'title',
		'firstName',
		'middleName',
		'lastName',

		// affiliation info
		//
		'primaryUnitAffiliation',
		'nonPrimaryUnitAffiliations',
		'isAffiliate',

		// institution info
		//	
		'primaryInstitution',
		'appointmentType',
		'degreeInstitutionName',

		// research info
		//
		'researchSummary',
		'researchTerms',
		'researchInterests',

		// academic info
		//
		'degreeInstitutionName',
		'degreeYear',
		'orcidId',

		// personal info
		//
		'profilePhoto',
		'homepage',
		'socialUrl',
		'githubUrl',

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
	 * @return ?InstitutionUnit
	 */
	public function getPrimaryUnitAffiliationAttribute(): ?object {
		return InstitutionUnit::find($this->primaryUnitAffiliationId);
	}

	/**
	 * Get this person's non-primary unit affiliations attribute.
	 *
	 * @return InstitutionUnit[]
	 */
	public function getNonPrimaryUnitAffiliationsAttribute(): array {
		$names = [];
		$ids = explode(', ', $this->nonPrimaryUnitAffiliationIds);
		for ($i = 0; $i < count($ids); $i++) {
			$institutionUnit = InstitutionUnit::find($ids[$i]);
			if ($institutionUnit) {
				array_push($names, $institutionUnit);
			}
		}
		return $names;
	}

	//
	// deleting methods
	//

	/**
	 * Delete this chat and its related items.
	 *
	 * @return bool
	 */
	public function delete(): bool {

		// delete messages
		//
		$this->articles()->delete();

		// delete self
		//
		return self::where('id', '=', $this->id)->delete();
	}
}
