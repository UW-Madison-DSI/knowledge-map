<?php
/******************************************************************************\
|                                                                              |
|                                 fetch_all.php                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This script fetches information about all people from an              |
|        institution from the Academic Analytics database.                     |
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

//
// main
//

// fetch all departments
//
$institution = fetchInstitution($api);
$institutionUnits = fetchInstitutionUnits($api, $institution);
for ($i = 0; $i < count($institutionUnits); $i++) {
	$institutionUnit = $institutionUnits[$i];
	echo "Fetching " . $institutionUnit->unit->name . "...\n";

	// fetch people from each department
	//
	$people = fetchPeopleByInstitutionUnit($api, $institution, $institutionUnit);
	if ($people) {
		$activities = true;
		fetchAndStorePeople($api, $db, $people, $activities);
	}
}