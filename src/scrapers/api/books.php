<?php
/******************************************************************************\
|                                                                              |
|                                  books.php                                   |
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

function storeBook($db, $book, $person) {

	// find if book already exists
	//
	if (!$book || exists($db, 'books', 'id', $book->id)) {
		return;
	}

	insert($db, 'books', [
		'id' => $book->id,
		'title' => $book->title,
		'publisher' => $book->publisher,
		'isbn' => $book->isbn,
		'publishDate' => $book->publishDate,
		'creativeWork' => $book->creativeWork,
		'doi' => $book->doi,
		'abstract' => $book->abstract,
		'aascb' => $book->aascb,
		'significanceTypeId' => $book->significanceTypeId,
		'workStatusId' => $book->workStatusId,
		'workReviewStatusId' => $book->workReviewStatusId,
		'publicationRoleId' => $book->publicationRoleId,
		'selected' => $book->selected,
		'invited' => $book->invited,
		'activityType' => $book->activityType,
		'activityYear' => $book->activityYear,
		'activitySubtype' => $book->activitySubtype,
		'isExcludedFromReporting' => $book->isExcludedFromReporting,
		'desiredVisibility' => $book->desiredVisibility,
		'sourceType' => $book->sourceType,
		'contributorIds' => getIds($book->contributors) ?? $person->id
	]);
}

function storeBooks($db, $books, $person) {
	if ($books) {
		echo "Storing " . count($books) . " books...\n";
		for ($i = 0; $i < count($books); $i++) {
			storeBook($db, $books[$i], $person);
		}
	}
}
