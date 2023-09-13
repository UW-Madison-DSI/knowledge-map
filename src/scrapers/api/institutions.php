<?php
/******************************************************************************\
|                                                                              |
|                              institutions.php                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an interface for fetching and storing information        |
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

//
// fetching methods
//

function fetchInstitution($api) {
	$url = $api . '/institutions';
	return json_decode(file_get_contents($url, false, stream_context_create([
		'http' => [
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'GET'
		]
	])));
}

//
// storing methods
//

function storeInstitution($db, $institution) {
	insert($db, 'institutions', [
		'id' => $institution->institutionId,
		'name' => $institution->institutionName,
		'shortName' => $institution->institutionShortName,
		'siteName' => $institution->institutionSiteName,
		'secondarySiteName' => $institution->secondarySiteName,
		'logoPaths' => json_encode($institution->logoPaths)
	]);
}

function storeInstitutions($db, $institutions) {
	if ($institutions) {
		echo "Storing " . count($institutions) . " institutions...\n";
		for ($i = 0; $i < count($institutions); $i++) {
			storeInstitution($db, $institutions[$i]);
		}
	}
}