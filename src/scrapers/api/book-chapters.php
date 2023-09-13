<?php
/******************************************************************************\
|                                                                              |
|                              book-chapters.php                               |
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

function storeBookChapter($db, $bookChapter, $person) {

	// find if book chapter already exists
	//
	if (!$bookChapter || exists($db, 'book_chapters', 'id', $bookChapter->id)) {
		return;
	}

	insert($db, 'book_chapters', [
		'id' => $bookChapter->id,
		'name' => $bookChapter->name,
		'publisher' => $bookChapter->publisher,
		'isbn' => $bookChapter->isbn,
		'editors' => $bookChapter->editors,
		'publishDate' => $bookChapter->publishDate,
		'bookName' => $bookChapter->bookName,
		'creativeWork' => $bookChapter->creativeWork,
		'doi' => $bookChapter->doi,
		'abstract' => $bookChapter->abstract,
		'significanceTypeId' => $bookChapter->significanceTypeId,
		'workStatusId' => $bookChapter->workStatusId,
		'workReviewStatusId' => $bookChapter->workReviewStatusId,
		'publicationRoleId' => $bookChapter->publicationRoleId,
		'selected' => $bookChapter->selected,
		'invited' => $bookChapter->invited,
		'startPage' => $bookChapter->startPage,
		'endPage' => $bookChapter->endPage,
		'activityType' => $bookChapter->activityType,
		'activityYear' => $bookChapter->activityYear,
		'activitySubtype' => $bookChapter->activitySubtype,
		'isExcludedFromReporting' => $bookChapter->isExcludedFromReporting,
		'desiredVisibility' => $bookChapter->desiredVisibility,
		'sourceType' => $bookChapter->sourceType,
		'contributorIds' => getIds($bookChapter->contributors) ?? $person->id
	]);
}

function storeBookChapters($db, $bookChapters, $person) {
	if ($bookChapters) {
		echo "Storing " . count($bookChapters) . " book chapters...\n";
		for ($i = 0; $i < count($bookChapters); $i++) {
			storeBookChapter($db, $bookChapters[$i], $person);
		}
	}
}
