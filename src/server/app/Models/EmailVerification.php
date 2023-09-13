<?php
/******************************************************************************\
|                                                                              |
|                             EmailVerification.php                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of an email verification.                        |
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

use Illuminate\Support\Facades\Mail;
use App\Models\BaseModel;

class EmailVerification extends BaseModel
{
	//
	// attributes
	//
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'email_verifications';

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'id',
		'personId',
		'isVerified'
	];

	/**
	 * The attributes that should be visible in serialization.
	 *
	 * @var array
	 */
	protected $visible = [
		'id',
		'personId', 
		'isVerified'
	];

	//
	// emailing methods
	//

	/**
	 * Send a user verification email.
	 *
	 * @param string $verifyRoute - the route to call to verify the user.
	 * @return bool
	 */
	public function send(string $verifyRoute) {
		$template = 'emails.email-verification';
		$person = Person::find($this->personId);

		if ($person) {

			// send email
			//
			if (config('mail.enabled')) {
				Mail::send($template, [
					'name' => $person->getFullName(),
					'url' => config('app.client_url') . '?verify= ' . $this->id,
					'app_name' => config('app.name')
				], function($message) use ($person) {
					$message->to($person->email, $person->getFullName());
					$message->subject('New User Verification');
				});
			}
			
			return true;
		} else {
			return false;
		}
	}
}