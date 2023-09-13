<?php
/******************************************************************************\
|                                                                              |
|                               fetch_people.php                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This script fetches information about all available people            |
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
/*
$institutionUnits = fetchInstitutionUnits($api, $institution);
$people = fetchPeopleByInstitutionUnits($api, $institution, $institutionUnits[1]);
*/

$institutionUnits = [
	"Animal and Dairy Science" => 28579,
	"Computer Science" => 28603,
	"Educational Psychology" => 28613,
	"Department of Physics" => 28659,
	"Department of Statistics" => 28673,
	"World Affairs and The Global Economy (WAGE), Center for" => 35493
];

$institutionUnit = $institutionUnits["Department of Statistics"];
$people = fetchPeopleByInstitutionUnitsId($api, $institution, $institutionUnit);
print_r($people);
// storePeople($db, $people, false);
fetchAndStorePeople($api, $db, $people, false);
