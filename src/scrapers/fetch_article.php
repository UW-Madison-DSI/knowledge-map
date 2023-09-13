<?php
/******************************************************************************\
|                                                                              |
|                               fetch_article.php                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This script fetches information about a single article                |
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

// fetch first person
//
$people = fetchPeopleByInstitutionUnit($api, $institution, $institutionUnits[1]);
$person = fetchPerson($api, $people[1]);

// store person's first article
//
if ($person->articles) {
	storeArticle($db, $person->articles[1]);
}