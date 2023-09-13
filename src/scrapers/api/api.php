<?php
/******************************************************************************\
|                                                                              |
|                                    api.php                                   |
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

include 'articles.php';
include 'awards.php';
include 'book-chapters.php';
include 'books.php';
include 'conference-proceedings.php';
include 'grants.php';
include 'institutions.php';
include 'institution-units.php';
include 'patents.php';
include 'people.php';
include 'technologies.php';

// API attributes
//
$api = 'https://wisc.discovery.academicanalytics.com/api';
