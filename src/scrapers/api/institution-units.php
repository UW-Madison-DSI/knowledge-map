<?php
/******************************************************************************\
|                                                                              |
|                            institution-units.php                             |
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

use Symfony\Component\HttpClient\HttpClient;

//
// fetching methods
//

function fetchInstitutionUnits($api, $institution) {
	$url = $api . '/units/GetInstitutionUnitsForInstitutions';

	$httpClient = HttpClient::create();
	$response = $httpClient->request('POST', $url, [
		'headers' => [
			'Content-Type' => 'application/json'
		],
		'body' => '{institutionIds: [' . $institution->institutionId . ']}'
	]);

	return json_decode($response->getContent());
}

//
// storing methods
//

function storeInstitutionUnit($db, $institutionUnit) {
	insert($db, 'institution_units', [
		'id' => $institutionUnit->unitId,
		'name' => $institutionUnit->unit->name,
		'baseName' => $institutionUnit->unit->baseName,
		'institutionId' => $institutionUnit->institutionId,
		'isPrimary' => $institutionUnit->unit->isPrimary,
		'type' => $institutionUnit->unit->type
	]);
}

function storeInstitutionUnits($db, $institutionUnits) {
	if ($institutionUnits) {
		echo "Storing " . count($institutionUnits) . " institution units...\n";
		for ($i = 0; $i < count($institutionUnits); $i++) {
			storeInstitutionUnit($db, $institutionUnits[$i]);
		}
	}
}
