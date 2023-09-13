<?php
/******************************************************************************\
|                                                                              |
|                                  Person.php                                  |
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

use App\Casts\Terms;
use App\Models\BaseModel;
use App\Models\InstitutionUnit;
use Intervention\Image\Image;

class Person extends BaseModel
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
	 * Disable default Laravel timestamps.
	 *
	 */
	public $timestamps = false;

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
		'password',
		'isVerified',

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
		'githubUrl'
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
		'lastName',
		'middleName',

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
		'homepage',
		'hasProfilePhoto',
		'socialUrl',
		'githubUrl',
	];

	/**
	 * The accessors to append to the model's array form.
	 *
	 * @var array
	 */
	protected $appends = [
		'hasProfilePhoto',
		'primaryUnitAffiliation',
		'nonPrimaryUnitAffiliations'
	];

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'researchTerms' => Terms::class,
		'researchInterests' => Terms::class,
		'communities' => Terms::class
	];

	//
	// accessor methods
	//

	/**
	 * Get this person's primary unit affiliation attribute.
	 *
	 * @return object
	 */
	public function getHasProfilePhotoAttribute(): bool {
		return $this->profilePhoto != null;
	}

	/**
	 * Get this person's primary unit affiliation attribute.
	 *
	 * @return object
	 */
	public function getPrimaryUnitAffiliationAttribute(): ?InstitutionUnit {
		if ($this->otherPrimaryUnitAffiliation) {
			return new InstitutionUnit([
				'id' => 0,
				'name' => $this->otherPrimaryUnitAffiliation,
				'baseName' => $this->otherPrimaryUnitAffiliation
			]);
		} else {
			return InstitutionUnit::find($this->primaryUnitAffiliationId);
		}
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

	/**
	 * Get this users's full name.
	 *
	 * @return string
	 */
	public function getFullName(): string {
		$name = '';

		if ($this->firstName) {
			$name .= $this->firstName;
		}
		if ($this->middleName) {
			$name .= ' ' . $this->middleName;
		}
		if ($this->lastName) {
			$name .= ' ' . $this->lastName;
		}
		
		return ucwords($name);
	}

	/**
	 * Get this users's profile photo
	 *
	 * @return string
	 */
	public function getProfilePhoto() {
		$filename = $this->profilePhoto;
		$directory = config('filesystems.disks.local.root');
		$filepath =  $directory . '/' . $filename;

		// return "filepath = " . $filepath;

		// check if a photo has been specified
		//
		if (!$filename || !$directory) {
			return "No profile photo.";
		}

		// check if photo exists
		//
		if (!file_exists($filepath)) {
			return "File not found.";
		}

		// return file info
		//
		$data = file_get_contents($filepath);
		return $data;
	}

	/**
	 * Get this users's profile photo
	 *
	 * @return string
	 */
	public function getProfileThumbnail(&$error) {
		$filename = $this->profilePhoto;
		$thumbname = str_replace('profile', 'thumb', $filename);
		$directory = config('filesystems.disks.local.root');
		$filepath =  $directory . '/' . $filename;
		$thumbpath =  $directory . '/' . $thumbname;

		// check if a profile photo has been specified
		//
		if (!$filename || !$directory) {
			$error = "No profile photo.";
			return;
		}

		// check if pre-filtered thumbnail exists
		//
		if (file_exists($thumbpath)) {

			// return file info
			//
			$data = file_get_contents($thumbpath);
			return $data;
		}

		// check if file exists
		//
		if (!file_exists($filepath)) {
			$error = "File $filepath not found.";
			return;
		}

		// downsample profile image
		//
		$data = file_get_contents($filepath);

		// resize to fit
		//
		$image->fit(config('app.thumb_size'));

		return $image->orientate();
	}

	/**
	 * Get this person's protected status.
	 *
	 * @return bool
	 */
	public function getIsProtectedAttribute() {
		return $this->password != null;
	}
}
