<?php
/******************************************************************************\
|                                                                              |
|                             fetch_institution.php                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This script fetches metadata information about an institution         |
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

require('vendor/autoload.php');
include 'utilities/database.php';
include 'api/api.php';

// main
//
storeInstitution($db, fetchInstitution($api));
