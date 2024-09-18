<?php
/******************************************************************************\
|                                                                              |
|                                 people.php                                   |
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

include 'utilities/string-utils.php';

define('TIMEOUT', 30);
define('DEBUG', false);

//
// parsing helper methods
//

function getTerms($array) {
	$terms = [];
	for ($i = 0; $i < count($array); $i++) {
		array_push($terms, $array[$i]->term);
	}
	return $terms;
}

function getInstitutionId($institution, $db) {
	if (!exists($db, 'institutions', 'id', $institution->id)) {
		insert($db, 'institutions', [
			'name' => $institution->name,
			'shortName' => $institution->shortName
			/*
			'siteName' => $institution->siteName,
			'secondarySiteName' => $institution->secondarySiteName,
			'logoPaths' => $institution->logoPaths
			*/
		]);
	}
	return $institution->id;
}

//
// fetching methods
//

function fetchPeopleByInstitutionUnit($api, $institution, $institutionUnit) {
	return fetchPeopleByInstitutionUnitId($api, $institution, $institutionUnit->unit->id);
}

function fetchPeopleByInstitutionUnitId($api, $institution, $institutionUnitId) {
	$url = $api . '/people/getbyunitids/' . $institution->institutionId . '/' . $institutionUnitId;

	try {
		$contents = file_get_contents($url, false, stream_context_create([
			'http' => [
				'header'  => 'Content-type: application/x-www-form-urlencoded',
				'method'  => 'GET',
				'timeout' => TIMEOUT
			]
		]));
	} catch (\Throwable $e) {
		echo "Error fetching people by institution unit #" . $institutionUnitId . ".\n";
	}

	if ($contents) {
		$json = json_decode($contents);
		for ($i = 0; $i < count($json); $i++) {
			$json[$i]->primaryInstitution = (object)[
				'id' => $institution->institutionId
			];
			$json[$i]->primaryUnitAffiliation = (object)[
				'id' => $institutionUnitId
			];
		}
	}

	return $json;
}

function fetchPerson($api, $person) {
	return fetchPersonById($api, $person->id);
}

function fetchPersonById($api, $id) {
	$url = $api . '/people/' . $id;
	$content = null;

	if (DEBUG) {
		echo "Fetching from " . $url . ".\n";
	}

	try {
		$contents = file_get_contents($url, false, stream_context_create([
			'http' => [
				'header'  => "Content-type: application/x-www-form-urlencoded",
				'method'  => 'GET',
				'timeout' => TIMEOUT
			]
		]));
	} catch (\Throwable $e) {
		echo "Error fetching person #" . $id . ".\n";
	}

	return $contents? json_decode($contents) : null;
}

//
// storing methods
//

function storePerson($db, $person, $activities = true) {

	// find if person already exists
	//
	if (!$person || exists($db, 'people', 'id', $person->id)) {
		if ($person) {
			echo $person->firstName . " " . $person->lastName . " already exists.\n"; 
		}
		return;
	}

	echo "Storing " . $person->firstName . " " . $person->lastName . "...\n";
	$data = [
		'id' => $person->id,
		'aaid' => $person->aaid,
		'firstName' => toTitleCase($person->firstName),
		'lastName' => toTitleCase($person->lastName),
		'middleName' => toTitleCase($person->middleName),
		'primaryUnitAffiliationId' => getId($person->primaryUnitAffiliation),
		'nonPrimaryUnitAffiliationIds' => getIds($person->nonPrimaryUnitAffiliations),
		'primaryInstitutionId' => getId($person->primaryInstitution),

		// parse optional attributes
		//
		'desiredExposure' => property_exists($person, 'desiredExposure')? $person->desiredExposure : null,
		'isNonFaculty' => property_exists($person, 'isNonFaculty')? boolval($person->isNonFaculty) : false,
		'degreeYear' => property_exists($person, 'degreeYear')? intval($person->degreeYear) : null,
		'hasPreferredName' => property_exists($person, 'hasPreferredName')? boolval($person->hasPreferredName) : false,
		'degreeInstitutionName' => property_exists($person, 'degreeInstitutionName')? $person->degreeInstitutionName : null,
		'title' => property_exists($person, 'title')? $person->title : null,
		'researchTerms' => property_exists($person, 'researchTerms')? getTerms($person->researchTerms) : null,
		'researchSummary' => property_exists($person, 'researchSummary')? $person->researchSummary : null,
		'researchInterests' => property_exists($person, 'researchTerms')? getTerms($person->researchInterests) : null,
		'createDate' => date('Y-m-d H:i:s')
	];

	if (DEBUG) {
		// echo "person: ";
		// print_r($person);

		echo "data: ";
		print_r($data);
	}
	insert($db, 'people', $data);

	// store appended attributes
	//
	if ($activities) {
		if (property_exists($person, 'articles')) {
			storeArticles($db, $person->articles, $person);
		}
		if (property_exists($person, 'awards')) {
			storeAwards($db, $person->awards, $person);
		}
		if (property_exists($person, 'bookChapters')) {
			storeBookChapters($db, $person->bookChapters, $person);
		}
		if (property_exists($person, 'books')) {
			storeBooks($db, $person->books, $person);
		}
		if (property_exists($person, 'conferenceProceedings')) {
			storeConferenceProceedings($db, $person->conferenceProceedings, $person);
		}
		if (property_exists($person, 'grants')) {
			storeGrants($db, $person->grants, $person);
		}
		if (property_exists($person, 'patents')) {
			storePatents($db, $person->patents, $person);
		}
		if (property_exists($person, 'technologies')) {
			storeTechnologies($db, $person->technologies, $person);
		}
	} else {
		echo "Skipping activities.\n";
	}
}

function storePeople($db, $people, $activities = true) {
	if ($people) {
		echo "Storing " . count($people) . " people...\n";
		for ($i = 0; $i < count($people); $i++) {
			storePerson($db, $people[$i], $activities);
		}
	}
}

//
// fetching and storing methods
//

function fetchAndStorePerson($api, $db, $person, $activities = true) {

	// find if person already exists
	//
	if (exists($db, 'people', 'id', $person->id)) {
		return;
	}

	$scholar = fetchPersonById($api, $person->id);
	if ($scholar) {
		try {
			storePerson($db, $scholar, $activities);
		} catch (\Throwable $e) {
			echo "Caught exception: " . $e->getMessage();
			echo "\n";
		}
	} else {
		echo "Error 404 - Person " . $person->id . " not found!\n";

		// can't fetch complete person, enter what we know.
		//
		storePerson($db, $person, $activities);
		return;
	}
}

function fetchAndStorePeople($api, $db, $people, $activities = true) {
	for ($i = 0; $i < count($people); $i++) {
		$person = $people[$i];
		if ($person) {
			fetchAndStorePerson($api, $db, $person, $activities);
		}
	}
}