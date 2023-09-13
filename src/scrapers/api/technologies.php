<?php
/******************************************************************************\
|                                                                              |
|                              technologies.php                                |
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

function storeTechnology($db, $technology, $person) {

	// find if technology already exists
	//
	if (!$technology || exists($db, 'technologies', 'id', $technology->id)) {
		return;
	}

	insert($db, 'technologies', [
		'id' => $technology->id,
		'title' => $technology->title,
		'introduction' => $technology->introduction,
		'url' => $technology->url,
		'inventors' => $technology->inventors,
		'date' => $technology->date,
		'technologyTypeId' => $technology->technologyTypeId,
		'activityYear' => $technology->activityYear,
		'activityType' => $technology->activityType,
		'activitySubtype' => $technology->activitySubtype,
		'isExcludedFromReporting' => $technology->isExcludedFromReporting,
		'desiredVisibility' => $technology->desiredVisibility,
		'sourceType' => $technology->sourceType,
		'contributorIds' => getIds($technology->contributors) ?? $person->id
	]);
}

function storeTechnologies($db, $technologies, $person) {
	if ($technologies) {
		echo "Storing " . count($technologies) . " technologies...\n";
		for ($i = 0; $i < count($technologies); $i++) {
			storeTechnology($db, $technologies[$i], $person);
		}
	}
}