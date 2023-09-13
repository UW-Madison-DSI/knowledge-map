<?php
/******************************************************************************\
|                                                                              |
|                                 Academic.php                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a scholar.                                    |
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

use App\Casts\Terms;
use App\Models\Scholar;
use App\Models\InstitutionUnit;
use App\Models\Activities\Article;
use App\Models\Activities\Award;
use App\Models\Activities\BookChapter;
use App\Models\Activities\Book;
use App\Models\Activities\ConferenceProceeding;
use App\Models\Activities\Grant;
use App\Models\Activities\Patent;
use App\Models\Activities\Technology;

class Academic extends Scholar
{
	//
	// attributes
	//

	/**
	 * The attributes that should be visible in serialization.
	 *
	 * @var array
	 */
	protected $visible = [
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
		'primaryUnitAffiliation',
		'nonPrimaryUnitAffiliations',
		'isAffiliate',
		'communities',

		// institution info
		//		
		'primaryInstitution',
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
		'hasProfilePhoto',
		'homepage',
		'socialUrl',
		'githubUrl',

		// activities
		//
		'articles',
		'awards',
		'bookChapters',
		'books',
		'conferenceProceedings',
		'grants',
		'patents',
		'technologies'
	];

	/**
	 * The accessors to append to the model's array form.
	 *
	 * @var array
	 */
	protected $appends = [
		'hasProfilePhoto',
		'primaryUnitAffiliation',
		'nonPrimaryUnitAffiliations',
		'articles',
		'awards',
		'bookChapters',
		'books',
		'conferenceProceedings',
		'grants',
		'patents',
		'technologies'
	];

	//
	// accessor methods
	//

	/**
	 * Get this person's primary unit affiliation attribute.
	 *
	 * @return object
	 */
	public function getPrimaryUnitAffiliationAttribute() {
		return InstitutionUnit::find($this->primaryUnitAffiliationId);
	}

	/**
	 * Get this person's non-primary unit affiliations attribute.
	 *
	 * @return object[]
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
	// getting methods
	//

	/**
	 * Get the contributors associated with a set of activities.
	 *
	 * @return App\Models\Contributor[]
	 */
	public function getActivitiesContributors($activities): array {
		$contributors = [];
		for ($i = 0; $i < count($activities); $i++) {
			$activity = $activities[$i];
			$people = $activity['contributors'];
			for ($j = 0; $j < count($people); $j++) {
				$contributor = $people[$j];
				if ($contributor->id != $this->id) {
					$contributors[$contributor->id] = $contributor;
				}
			}
		}
		return array_values($contributors);
	}

	/**
	 * Get this scholar's contributors.
	 *
	 * @return App\Models\Contributor[]
	 */
	public function getContributors(): array {
		return array_merge(
			$this->getActivitiesContributors($this->articles),
			$this->getActivitiesContributors($this->awards),
			$this->getActivitiesContributors($this->bookChapters),
			$this->getActivitiesContributors($this->books),
			$this->getActivitiesContributors($this->conferenceProceedings),
			$this->getActivitiesContributors($this->grants),
			$this->getActivitiesContributors($this->patents),
			$this->getActivitiesContributors($this->technologies)
		);
	}
}