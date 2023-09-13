<?php
/******************************************************************************\
|                                                                              |
|                               fetch_article.php                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This script fetches information about all available articles          |
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
$people = fetchPeopleByInstitutionUnits($api, $institution, $institutionUnits[200]);

// fetch people
//
for ($i = 0; $i < count($people); $i++) {
	$person = fetchPerson($api, $people[$i]);

	// store person's articles
	//
	if ($person->articles) {
		storeArticles($db, $person->articles);
	}
}