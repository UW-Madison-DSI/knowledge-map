<?php
/******************************************************************************\
|                                                                              |
|                                 grants.php                                   |
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

function storeGrant($db, $grant, $person) {

	// find if grant already exists
	//
	if (!$grant || exists($db, 'grants', 'id', $grant->id)) {
		return;
	}

	insert($db, 'grants', [
		'id' => $grant->id,
		'name' => $grant->name,
		'startDate' => $grant->startDate,
		'endDate' => $grant->endDate,
		'primaryInvestigatorId' => $person->id,
		'totalDollars' => $grant->totalDollars,
		'agencyName' => $grant->agencyName,
		'agencyNameAbbreviation' => $grant->agencyNameAbbreviation,
		'abstract' => $grant->abstract,
		'clientGrantId' => $grant->clientGrantId,
		'sponsor' => $grant->sponsor,
		'grantTypeId' => $grant->grantTypeId,
		'grantAwardeeTypeId' => $grant->grantAwardeeTypeId,
		'communityEngaged' => $grant->communityEngaged,
		'contractNumber' => $grant->contractNumber,
		'universityGrantNumber' => $grant->universityGrantNumber,
		'calendarYear' => $grant->calendarYear,
		'studentSupported' => $grant->studentSupported,
		'percentEffort' => $grant->percentEffort,
		'grantStatusId' => $grant->grantStatusId,
		'activityType' => $grant->activityType,
		'activityYear' => $grant->activityYear,
		'activitySubtype' => $grant->activitySubtype,
		'isExcludedFromReporting' => $grant->isExcludedFromReporting,
		'desiredVisibility' => $grant->desiredVisibility,
		'sourceType' => $grant->sourceType,
		'contributorIds' => getIds($grant->contributors) ?? $person->id
	]);
}

function storeGrants($db, $grants, $person) {
	if ($grants) {
		echo "Storing " . count($grants) . " grants...\n";
		for ($i = 0; $i < count($grants); $i++) {
			storeGrant($db, $grants[$i], $person);
		}
	}
}