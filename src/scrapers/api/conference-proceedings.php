<?php
/******************************************************************************\
|                                                                              |
|                        conference-proceedings.php                            |
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

function storeConferenceProceeding($db, $conferenceProceeding, $person) {

	// find if conference proceeding already exists
	//
	if (!$conferenceProceeding || exists($db, 'conference_proceedings', 'id', $conferenceProceeding->id)) {
		return;
	}

	insert($db, 'conference_proceedings', [
		'id' => $conferenceProceeding->id,
		'title' => $conferenceProceeding->title,
		'digitalObjectIdentifier' => $conferenceProceeding->digitalObjectIdentifier,
		'journalName' => $conferenceProceeding->journalName,
		'journalVolume' => $conferenceProceeding->journalVolume,
		'journalIssue' => $conferenceProceeding->journalIssue,
		'journalYear' => $conferenceProceeding->journalYear,
		'publishDate' => $conferenceProceeding->publishDate,
		'endDate' => $conferenceProceeding->endDate,
		'firstPage' => $conferenceProceeding->firstPage,
		'lastPage' => $conferenceProceeding->lastPage,
		'abstract' => $conferenceProceeding->abstract,
		'significanceTypeId' => $conferenceProceeding->significanceTypeId,
		'peerReviewed' => $conferenceProceeding->peerReviewed,
		'communityEngaged' => $conferenceProceeding->communityEngaged,
		'aascbClassificationTypeId' => $conferenceProceeding->aascbClassificationTypeId,
		'workStatusId' => $conferenceProceeding->workStatusId,
		'workReviewStatusId' => $conferenceProceeding->workReviewStatusId,
		'publicationRoleId' => $conferenceProceeding->publicationRoleId,
		'selected' => $conferenceProceeding->selected,
		'creativeWork' => $conferenceProceeding->creativeWork,
		'invited' => $conferenceProceeding->invited,
		'activityType' => $conferenceProceeding->activityType,
		'activityYear' => $conferenceProceeding->activityYear,
		'activitySubtype' => $conferenceProceeding->activitySubtype,
		'isExcludedFromReporting' => $conferenceProceeding->isExcludedFromReporting,
		'desiredVisibility' => $conferenceProceeding->desiredVisibility,
		'sourceType' => $conferenceProceeding->sourceType,
		'contributorIds' => getIds($conferenceProceeding->contributors) ?? $person->id
	]);
}

function storeConferenceProceedings($db, $conferenceProceedings, $person) {
	if ($conferenceProceedings) {
		echo "Storing " . count($conferenceProceedings) . " conference proceedings...\n";
		for ($i = 0; $i < count($conferenceProceedings); $i++) {
			storeConferenceProceeding($db, $conferenceProceedings[$i], $person);
		}
	}
}
