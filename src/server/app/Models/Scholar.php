<?php
/******************************************************************************\
|                                                                              |
|                                 Scholar.php                                  |
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
use App\Models\Person;
use App\Models\InstitutionUnit;
use App\Models\Activities\Article;
use App\Models\Activities\Award;
use App\Models\Activities\BookChapter;
use App\Models\Activities\Book;
use App\Models\Activities\ConferenceProceeding;
use App\Models\Activities\Grant;
use App\Models\Activities\Patent;
use App\Models\Activities\Technology;

class Scholar extends Person
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

		// counts
		//
		'numCollaborators',
		'numArticles',
		'numAwards',
		'numBooks',
		'numBookChapters',
		'numConferenceProceedings',
		'numGrants',
		'numPatents',
		'numTechnologies'
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

		// activities
		//
		'articles',
		'awards',
		'bookChapters',
		'books',
		'conferenceProceedings',
		'grants',
		'patents',
		'technologies',

		// counts
		//
		'numCollaborators',
		'numArticles',
		'numAwards',
		'numBooks',
		'numBookChapters',
		'numConferenceProceedings',
		'numGrants',
		'numPatents',
		'numTechnologies'
	];

	//
	// accessor methods
	//

	/**
	 * Get this person's articles attribute.
	 *
	 * @return App\Models\Article[]
	 */
	public function getArticlesAttribute(): array {
		return Article::where('contributorIds', 'like', '%' . $this->id . '%')->get()->toArray();
	}

	/**
	 * Get this person's awards attribute.
	 *
	 * @return App\Models\Award[]
	 */
	public function getAwardsAttribute(): array {
		return Award::where('contributorIds', 'like', '%' . $this->id . '%')->get()->toArray();
	}

	/**
	 * Get this person's book chapters attribute.
	 *
	 * @return App\Models\BookChapter[]
	 */
	public function getBookChaptersAttribute(): array {
		return BookChapter::where('contributorIds', 'like', '%' . $this->id . '%')->get()->toArray();
	}

	/**
	 * Get this person's books attribute.
	 *
	 * @return App\Models\Book[]
	 */
	public function getBooksAttribute(): array {
		return Book::where('contributorIds', 'like', '%' . $this->id . '%')->get()->toArray();
	}

	/**
	 * Get this person's conference proceedings attribute.
	 *
	 * @return App\Models\ConferenceProceeding[]
	 */
	public function getConferenceProceedingsAttribute(): array {
		return ConferenceProceeding::where('contributorIds', 'like', '%' . $this->id . '%')->get()->toArray();
	}

	/**
	 * Get this person's grants attribute.
	 *
	 * @return App\Models\Grant[]
	 */
	public function getGrantsAttribute(): array {
		return Grant::where('contributorIds', 'like', '%' . $this->id . '%')->get()->toArray();
	}

	/**
	 * Get this person's patents attribute.
	 *
	 * @return App\Models\Patent[]
	 */
	public function getPatentsAttribute(): array {
		return Patent::where('contributorIds', 'like', '%' . $this->id . '%')->get()->toArray();
	}

	/**
	 * Get this person's technologies attribute.
	 *
	 * @return App\Models\Technology[]
	 */
	public function getTechnologiesAttribute(): array {
		return Technology::where('contributorIds', 'like', '%' . $this->id . '%')->get()->toArray();
	}

	/**
	 * Get the counts of ths person's collaborators.
	 *
	 * @return int
	 */
	public function getNumCollaboratorsAttribute(): int {
		$collaborators = $this->getCollaborators();
		return ($collaborators != null? count($collaborators) : 0);
	}

	/**
	 * Get the counts of ths person's articles.
	 *
	 * @return int
	 */
	public function getNumArticlesAttribute(): int {
		return Article::where('contributorIds', 'like', '%' . $this->id . '%')->count();
	}

	/**
	 * Get the counts of ths person's awards.
	 *
	 * @return int
	 */
	public function getNumAwardsAttribute(): int {
		return Award::where('contributorIds', 'like', '%' . $this->id . '%')->count();
	}

	/**
	 * Get the counts of ths person's books.
	 *
	 * @return int
	 */
	public function getNumBooksAttribute(): int {
		return Book::where('contributorIds', 'like', '%' . $this->id . '%')->count();
	}

	/**
	 * Get the counts of ths person's book chapters.
	 *
	 * @return int
	 */
	public function getNumBookChaptersAttribute(): int {
		return BookChapter::where('contributorIds', 'like', '%' . $this->id . '%')->count();
	}

	/**
	 * Get the counts of ths person's conference proceedings.
	 *
	 * @return int
	 */
	public function getNumConferenceProceedingsAttribute(): int {
		return ConferenceProceeding::where('contributorIds', 'like', '%' . $this->id . '%')->count();
	}

	/**
	 * Get the counts of ths person's grants.
	 *
	 * @return int
	 */
	public function getNumGrantsAttribute(): int {
		return Grant::where('contributorIds', 'like', '%' . $this->id . '%')->count();
	}

	/**
	 * Get the counts of ths person's patents.
	 *
	 * @return int
	 */
	public function getNumPatentsAttribute(): int {
		return Patent::where('contributorIds', 'like', '%' . $this->id . '%')->count();
	}

	/**
	 * Get the counts of ths person's technologies.
	 *
	 * @return int
	 */
	public function getNumTechnologiesAttribute(): int {
		return Technology::where('contributorIds', 'like', '%' . $this->id . '%')->count();
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
		if ($activities) {
			for ($i = 0; $i < count($activities); $i++) {
				$activity = $activities[$i];
				$people = $activity['contributors'];
				for ($j = 0; $j < count($people); $j++) {
					$contributor = $people[$j];
					if ($contributor->id != $this->id) {

						// add new contributor
						//
						$contributors[$contributor->id] = $contributor;
					}
				}
			}
		}
		return array_values($contributors);
	}

	/**
	 * Merge a contributor into an array of contributors.
	 *
	 * @return App\Models\Contributor[]
	 */
	public function mergeContributor(&$contributors, $contributor) {
		if ($contributor->id != $this->id) {

			// add new contributor
			//
			$contributors[$contributor->id] = $contributor;
		} else {

			// expand date window to new contributor
			//
			if ($contributor->startDate < $contributors[$contributor->id]->startDate) {
				$contributors[$contributor->id]->startDate = $contributor->startDate;
			}
			if ($contributor->endDate > $contributors[$contributor->id]->endDate) {
				$contributors[$contributor->id]->endDate = $contributor->endDate;
			}
		}
	}

	/**
	 * Merge an array of contributors into another array of contributors.
	 *
	 * @return App\Models\Contributor[]
	 */
	public function mergeContributors(&$contributors, $contributors2) {
		for ($i = 0; $i < count($contributors2); $i++) {
			$this->mergeContributor($contributors, $contributors2[$i]);
		}
	}

	/**
	 * Get this scholar's collaborators.
	 *
	 * @return App\Models\collaborators[]
	 */
	public function getCollaborators(): array {
		/*
		$contributors = [];
		$this->mergeContributors($contributors, array_merge(
			$this->getActivitiesContributors($this->articles),
			$this->getActivitiesContributors($this->awards),
			$this->getActivitiesContributors($this->bookChapters),
			$this->getActivitiesContributors($this->books),
			$this->getActivitiesContributors($this->conferenceProceedings),
			$this->getActivitiesContributors($this->grants),
			$this->getActivitiesContributors($this->patents),
			$this->getActivitiesContributors($this->technologies)
		));
		return array_values($contributors);
		*/

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
