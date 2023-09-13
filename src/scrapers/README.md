<p align="center">
	<div align="center">
		<img src="./images/icon.svg" alt="Logo" style="width:33%">
	</div>
</p>

# University of Wisconsin Academic Analytics Data

This is a utility for pulling and storing data from the University of Wisconsin's [Academic Analytics](https://wisc.discovery.academicanalytics.com/dashboard) application into a database.

## Requirements

- PHP 8.0
- A SQL Database (MySql or MariaDB)

## Configuration

Before running these scripts, you will need to first create a database to store the information.

1. Create a database

First, you'll want to create a database to store the information.  The database schema that is used for this utility is located in the file: [database/academic_analytics_structure.sql](database/academic_analytics_structure.sql).

2. Configure this utility to point to your datbase

Next, you'll need to point this utility to your database.  You can do this by accessing the settings in [utilitiies/database.php](utilities/database.php)

## Running

Once you have configured your database, simply run the command:

php [fetch_all.php](fetch_all.php)

<!-- LICENSE -->
## License

Distributed under the MIT License. See the [license](./LICENSE.txt) for more information.

## Credits

This project was funded by the [American Family Insurance Data Science Institute](https://datascience.wisc.edu) at the [Univeristy of Wisconsin-Madison](https://www.wisc.edu)
