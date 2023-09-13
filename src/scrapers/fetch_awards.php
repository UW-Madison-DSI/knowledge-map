<?php
/******************************************************************************\
|                                                                              |
|                               fetch_awards.php                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This script fetches information about all available awards            |
|        from the Academic Analytics database.                                 |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|  Copyright (C) 2022 Data Science Institute, Univeristy of Wisconsin-Madison  |
\******************************************************************************/

require('vendor/autoload.php');
include 'utilities/database.php';
include 'api/api.php';

// main
//
$institution = fetchInstitution($api);
$institutionUnits = fetchInstitutionUnits($api, $institution);
$people = fetchPeopleByInstitutionUnit($api, $institution, $institutionUnits[150]);

// fetch people
//
for ($i = 0; $i < count($people); $i++) {
	$person = fetchPerson($api, $people[$i]);

	// store person's awards
	//
	if ($person->awards) {
		storeAwards($db, $person->awards);
		// var_dump($person->awards);
	}
}