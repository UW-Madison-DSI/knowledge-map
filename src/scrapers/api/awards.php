<?php
/******************************************************************************\
|                                                                              |
|                                 awards.php                                   |
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

function storeAward($db, $award, $person) {

	// find if award already exists
	//
	if (!$award || exists($db, 'awards', 'id', $award->id)) {
		return;
	}

	insert($db, 'awards', [
		'id' => $award->id,
		'name' => $award->name,
		'governingSocietyName' => $award->governingSocietyName,
		'awardedOn' => $award->awardedOn,
		'url' => $award->url,
		'scopeTypeId' => $award->scopeTypeId,
		'awardTypeId' => $award->awardTypeId,
		'description' => $award->description,
		'communityEngaged' => $award->communityEngaged,
		'activityType' => $award->activityType,
		'activityYear' => $award->activityYear > 1900? $award->activityYear : null,
		'activitySubtype' => $award->activitySubtype,
		'isExcludedFromReporting' => $award->isExcludedFromReporting,
		'desiredVisibility' => $award->desiredVisibility,
		'sourceType' => $award->sourceType,
		'contributorIds' => getIds($award->contributors) ?? $person->id
	]);
}

function storeAwards($db, $awards, $person) {
	if ($awards) {
		echo "Storing " . count($awards) . " awards...\n";
		for ($i = 0; $i < count($awards); $i++) {
			storeAward($db, $awards[$i], $person);
		}
	}
}