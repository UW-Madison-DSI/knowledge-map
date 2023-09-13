<?php
/******************************************************************************\
|                                                                              |
|                                fetch_award.php                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This script fetches information about a single award                  |
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
$person = fetchPerson($api, (object)[ 'id' => 278440 ]);

// store person's first award
//
if ($person->awards) {
	storeAward($db, $person->awards[1]);
}
