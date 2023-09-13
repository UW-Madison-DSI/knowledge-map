<?php
/******************************************************************************\
|                                                                              |
|                             PersonController.php                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for fetching info about people.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Image;
use App\Models\Person;
use App\Models\Scholar;
use App\Models\Academic;
use App\Models\EmailVerification;
use App\Http\Controllers\Controller;
use App\Utilities\Uuids\Uuid;
use App\Utilities\Uuids\Guid;
use App\Utilities\Filters\NameFilter;
use App\Utilities\Filters\InstitutionUnitFilter;
use App\Utilities\Filters\TopicFilter;
use App\Utilities\Filters\TermFilter;
use App\Utilities\Filters\CommunityFilter;
use App\Utilities\Filters\LimitFilter;

class PersonController extends Controller
{
	//
	// creating methods
	//

	public function postCreate(Request $request) {

		// encrypt
		//
		$password = $request->input('password');
		if ($password) {
			$password = '{BCRYPT}' . password_hash($password, PASSWORD_BCRYPT);
		}

		// parse and create a new person
		//
		$person = new Person([

			// account info
			//
			'id' => Person::max('id') + 1,
			'password' => $password,
			'email' => $request->input('email'),

			// name info
			//
			'title' => $request->input('title'),
			'firstName' => $request->input('first_name'),
			'middleName' => $request->input('middle_name'),
			'lastName' => $request->input('last_name'),

			// affiliation info
			//
			'primaryUnitAffiliationId' => $request->input('primary_unit_affiliation_id'),
			'otherPrimaryUnitAffiliation' => $request->input('primary_unit_affiliation'),
			'nonPrimaryUnitAffiliationIds' => implode(',', $request->input('non_primary_unit_affiliation_ids')),
			'isAffiliate' => $request->input('is_affiliate'),
			'communities' => $request->input('communities'),

			// institution info
			//
			'buildingNumber' => $request->input('building_number'),
			'primaryInstitutionId' => 14,
			'desiredExposure' => 2,

			// research info
			//
			'researchSummary' => $request->input('research_summary'),
			'researchTerms' => explode(', ', $request->input('research_terms')),

			// academic info
			//
			'degreeInstitutionName' => $request->input('degree_institution'),
			'degreeYear' => $request->input('degree_year'),
			'orcidId' => $request->input('orcid_id'),

			// personal info
			//
			'homepage' => $request->input('homepage'),
			'profilePhoto' => $request->input('profile_photo'),
			'socialUrl' => $request->input('social_url'),
			'githubUrl' => $request->input('github_url')
		]);
		$person->save();

		// send new email verification
		//
		$emailVerification = new EmailVerification([
			'id' => Guid::create(),
			'personId' => $person->id,
			'isVerified' => false
		]);
		$emailVerification->save();
		$emailVerification->send('#verify-email'); 

		return $person;
	}

	//
	// querying methods
	//

	/**
	 * Get a person.
	 *
	 * @param string $id - the id of the person to get
	 * @return App\Models\Person
	 */
	public function getIndex(string $id) {

		// find person by id
		//
		$person = Scholar::find($id);
		if (!$person) {
			return response("Person not found.", 404);
		}

		return $person;
	}

	/**
	 * Get a user's profile photo.
	 *
	 * @param string $id - the id of the user to get the profile photo of
	 * @return Image
	 */
	public function getProfilePhoto(string $id) {

		// get current user id
		//
		if ($id == 'current') {
			$id = Session::get('user_id');
		}
		
		// find user by id
		//
		$user = Scholar::find($id);
		if (!$user) {
			return response("User not found.", 404);
		}

		// get photo data
		//
		$photo = $user->getProfilePhoto();

		// add response headers
		//
		return response($photo, 200)->header('Content-Type', 'image/jpg');
	}

	/**
	 * Get a user's profile photo thumbnail.
	 *
	 * @param string $id - the id of the user to get the thumbnail photo of
	 * @return Image
	 */
	public function getProfileThumbnail(string $id) {

		// get current user id
		//
		if ($id == 'current') {
			$id = Session::get('user_id');
		}
		
		// find user by id
		//
		$user = Scholar::find($id);
		if (!$user) {
			return response("User not found.", 404);
		}

		// get thumbnail data
		//
		$thumb = $user->getProfileThumbnail($error);

		// add response headers
		//
		if ($thumb) {
			return response($thumb, 200)->header('Content-Type', 'image/jpg');
		} else {
			return $error;
		}
	}

	/**
	 * Get people.
	 *
	 * @return App\Models\Person
	 */
	public function getAll(Request $request) {
		$query = Person::orderBy('lastName', 'ASC');

		// add filters
		//
		$query = NameFilter::applyTo($request, $query);
		$query = InstitutionUnitFilter::applyTo($request, $query);
		$query = TopicFilter::applyTo($request, $query);
		$query = TermFilter::applyTo($request, $query);
		$query = CommunityFilter::applyTo($request, $query);
		$query = LimitFilter::applyTo($request, $query);

		return $query->get();
	}

	/**
	 * Create a new person.
	 *
	 * @return App\Models\Person
	 */
	public function putUpdate(Request $request, string $id) {

		// find place by id
		//
		$person = Person::find($id);
		if (!$person) {
			return response("Person not found.", 404);
		}

		// check password
		//
		/*
		$password = $request->input('password');
		if (!password_verify($password, substr($person->password, 8))) {
			return response("Invalid password.", 401);
		}
		*/

		// parse and create a new person
		//
		$person->change([

			// name info
			//
			'title' => $request->input('title'),
			'firstName' => $request->input('first_name'),
			'middleName' => $request->input('middle_name'),
			'lastName' => $request->input('last_name'),

			// professional info
			//
			'primaryUnitAffiliationId' => $request->input('primary_unit_affiliation_id'),
			'otherPrimaryUnitAffiliation' => $request->input('primary_unit_affiliation'),
			'buildingNumber' => $request->input('building_number'),

			// research info
			//
			'researchSummary' => $request->input('research_summary'),
			'researchTerms' => explode(', ', $request->input('research_terms')),

			// academic info
			//
			'degreeInstitutionName' => $request->input('degree_institution'),
			'degreeYear' => $request->input('degree_year'),

			// personal info
			//
			'homepage' => $request->input('homepage'),
			'profilePhoto' => $request->input('profile_photo'),
			'socialUrl' => $request->input('social_url'),
			'githubUrl' => $request->input('github_url')
		]);

		return $person;
	}

	/**
	 * Delete a new person.
	 *
	 * @return App\Models\Person
	 */
	public function deleteIndex(Request $request, string $id) {

		// find place by id
		//
		$person = Person::find($id);
		if (!$person) {
			return response("Person not found.", 404);
		}

		$person->delete();

		return $person;
	}
}