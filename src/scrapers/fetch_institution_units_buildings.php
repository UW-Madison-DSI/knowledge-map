<?php
/******************************************************************************\
|                                                                              |
|                    fetch_instituion_units_buildings.php                      |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This script fetches all information pertaining to buildings from      |
|        a single institution unit (department) from the                       |
|        Academic Analytics database.                                          |
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

$api2 = 'http://localhost/campus-map/public';

function fetchDepartments($api) {
	$url = $api . '/departments';

	try {
		$contents = file_get_contents($url, false, stream_context_create([
			'http' => [
				'header'  => 'Content-type: application/x-www-form-urlencoded',
				'method'  => 'GET',
				'timeout' => TIMEOUT
			]
		]));
	} catch (\Throwable $e) {
		echo "Error fetching departments.\n";
	}

	return json_decode($contents);
}

function fetchBuildings($api) {
	$url = $api . '/buildings';

	try {
		$contents = file_get_contents($url, false, stream_context_create([
			'http' => [
				'header'  => 'Content-type: application/x-www-form-urlencoded',
				'method'  => 'GET',
				'timeout' => TIMEOUT
			]
		]));
	} catch (\Throwable $e) {
		echo "Error fetching buildings.\n";
	}

	return json_decode($contents);
}

function fixDepartmentNames($departments) {
	for ($i = 0; $i < count($departments); $i++) {
		$department = $departments[$i];
		$departmentName = $department->name;

		if (str_contains($department->name, ', Dept of')) {
			$department->name = 'Department of ' . str_replace(', Dept of', '', $departmentName);
		} else if (str_contains($department->name, ', Dept. of')) {
			$department->name = 'Department of ' . str_replace(', Dept. of', '', $departmentName);
		} else if (str_contains($department->name, ', Department of')) {
			$department->name = 'Department of ' . str_replace(', Department of', '', $departmentName);
		}
	}
	return $departments;
}

function findDepartmentByName($name, $baseName, $departments) {
	for ($i = 0; $i < count($departments); $i++) {
		$department = $departments[$i];
		$departmentName = $department->name;
		if ($department->name == $name || $department->base_name == $baseName || $department->base_name == $baseName . ' Department') {
			return $department;
		}
	}
}

function findBuildingById($id, $buildings) {
	for ($i = 0; $i < count($buildings); $i++) {
		$building = $buildings[$i];
		if ($building->id == $id) {
			return $building;
		}
	}
}

function setInstitutionUnitBuilding($db, $institutionUnit, $departments, $buildings) {
	$name = $institutionUnit->unit->name;
	$baseName = $institutionUnit->unit->baseName;
	$department = findDepartmentByName($name, $baseName, $departments);
	if ($department) {
		$buildingId = $department->building_id;
		$building = findBuildingById($buildingId, $buildings);

		echo "Setting institution unit '" . $name . "' to building '" . $building->name . "'\n";
		$query = "UPDATE institution_units SET building = '$building->name' WHERE id = $institutionUnit->unitId";
		$result = mysqli_query($db, $query);
	}
}

function setInstitutionUnitBuildings($db, $institutionUnits, $departments, $buildings) {
	for ($i = 0; $i < count($institutionUnits); $i++) {
		setInstitutionUnitBuilding($db, $institutionUnits[$i], $departments, $buildings);
	}	
}

// main
//
$institution = fetchInstitution($api);
$institutionUnits = fetchInstitutionUnits($api, $institution);
$departments = fetchDepartments($api2);
$departments = fixDepartmentNames($departments);
$buildings = fetchBuildings($api2);

// print_r($departments);

echo "Found " . count($departments) . " departments.\n";
echo "Found " . count($buildings) . " buildings.\n";

setInstitutionUnitBuildings($db, $institutionUnits, $departments, $buildings);

