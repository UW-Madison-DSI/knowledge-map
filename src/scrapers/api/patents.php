<?php
/******************************************************************************\
|                                                                              |
|                                 patents.php                                  |
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
// storing methods
//

function storePatent($db, $patent, $person) {

	// find if patent already exists
	//
	if (!$patent || exists($db, 'patents', 'id', $patent->id)) {
		return;
	}

	insert($db, 'patents', [
		'id' => $patent->id,
		'name' => $patent->name,
		'number' => $patent->number,
		'country' => $patent->country,
		'date' => $patent->date,
		'patentKindId' => $patent->patentKindId,
		'patentTypeId' => $patent->patentTypeId,
		'patentTypeName' => $patent->patentTypeName,
		'abstract' => $patent->abstract,
		'workStatusId' => $patent->workStatusId,
		'categoryType' => $patent->categoryType,
		'countryName' => $patent->countryName,
		'activityType' => $patent->activityType,
		'activityYear' => $patent->activityYear,
		'activitySubtype' => $patent->activitySubtype,
		'isExcludedFromReporting' => $patent->isExcludedFromReporting,
		'desiredVisibility' => $patent->desiredVisibility,
		'sourceType' => $patent->sourceType,
		'contributorIds' => getIds($patent->contributors) ?? $person->id
	]);
}

function storePatents($db, $patents, $person) {
	if ($patents) {
		echo "Storing " . count($patents) . " patents...\n";
		for ($i = 0; $i < count($patents); $i++) {
			storePatent($db, $patents[$i], $person);
		}
	}
}