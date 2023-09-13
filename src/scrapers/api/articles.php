<?php
/******************************************************************************\
|                                                                              |
|                                articles.php                                  |
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

function storeArticle($db, $article, $person) {

	// find if article already exists
	//
	if (!$article || exists($db, 'articles', 'id', $article->id)) {
		return;
	}

	insert($db, 'articles', [
		'id' => $article->id,
		'title' => $article->title,
		'digitalObjectIdentifier' => $article->digitalObjectIdentifier,
		'journalName' => $article->journalName,
		'journalVolume' => $article->journalVolume,
		'journalIssue' => $article->journalIssue,
		'firstPage' => $article->firstPage,
		'lastPage' => $article->lastPage,
		'journalYear' => $article->journalYear,
		'publishDate' => $article->publishDate,
		'abstract' => $article->abstract,
		'aascbClassificationTypeId' => $article->aascbClassificationTypeId,
		'publicationStatusId' => $article->publicationStatusId,
		'peerReviewed' => $article->peerReviewed,
		'communityEngaged' => $article->communityEngaged,
		'pmid' => $article->pmid,
		'significanceTypeId' => $article->significanceTypeId,
		'workStatusId' => $article->workStatusId,
		'workReviewStatusId' => $article->workReviewStatusId,
		'publicationRoleId' => $article->publicationRoleId,
		'selected' => $article->selected,
		'creativeWork' => $article->creativeWork,
		'invited' => $article->invited,
		'activityType' => $article->activityType,
		'activityYear' => $article->activityYear,
		'activitySubtype' => $article->activitySubtype,
		'isExcludedFromReporting' => $article->isExcludedFromReporting,
		'desiredVisibility' => $article->desiredVisibility,
		'sourceType' => $article->sourceType,
		'contributorIds' => getIds($article->contributors) ?? $person->id
	]);
}

function storeArticles($db, $articles, $person) {
	if ($articles) {
		echo "Storing " . count($articles) . " articles...\n";
		for ($i = 0; $i < count($articles); $i++) {
			storeArticle($db, $articles[$i], $person);
		}
	}
}
