<?php
/******************************************************************************\
|                                                                              |
|                               fetch_person.php                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This script fetches information about a single person                 |
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

$people = [
	"Brian Yandell" => 279782,
	"Miron Livny" => 277694
];

$person = fetchPersonById($api, $people["Brian Yandell"]);
echo "person: ";
echo json_encode($person, JSON_PRETTY_PRINT);
storePerson($db, $person, true);
