# ************************************************************
# Sequel Ace SQL dump
# Version 20046
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.3.34-MariaDB)
# Database: academic_analytics
# Generation Time: 2023-06-29 16:40:25 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table articles
# ------------------------------------------------------------

CREATE TABLE `articles` (
  `id` int(11) unsigned NOT NULL,
  `title` varchar(1024) DEFAULT NULL,
  `digitalObjectIdentifier` varchar(128) DEFAULT NULL,
  `journalName` varchar(256) DEFAULT NULL,
  `journalVolume` varchar(32) DEFAULT NULL,
  `journalIssue` varchar(32) DEFAULT NULL,
  `firstPage` varchar(16) DEFAULT NULL,
  `lastPage` varchar(16) DEFAULT NULL,
  `journalYear` year(4) DEFAULT NULL,
  `publishDate` date DEFAULT NULL,
  `abstract` varchar(16384) DEFAULT NULL,
  `aascbClassificationTypeId` int(11) DEFAULT NULL,
  `publicationStatusId` int(11) DEFAULT NULL,
  `peerReviewed` tinyint(1) DEFAULT NULL,
  `communityEngaged` tinyint(1) DEFAULT NULL,
  `pmid` int(11) DEFAULT NULL,
  `significanceTypeId` int(11) DEFAULT NULL,
  `workStatusId` int(11) DEFAULT NULL,
  `workReviewStatusId` int(11) DEFAULT NULL,
  `publicationRoleId` int(11) DEFAULT NULL,
  `selected` tinyint(1) DEFAULT NULL,
  `creativeWork` tinyint(1) DEFAULT NULL,
  `invited` tinyint(1) DEFAULT NULL,
  `activityType` int(11) DEFAULT NULL,
  `activityYear` year(4) DEFAULT NULL,
  `activitySubtype` int(11) DEFAULT NULL,
  `isExcludedFromReporting` tinyint(1) DEFAULT NULL,
  `desiredVisibility` int(11) DEFAULT NULL,
  `sourceType` int(11) DEFAULT NULL,
  `contributorIds` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table awards
# ------------------------------------------------------------

CREATE TABLE `awards` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `governingSocietyName` varchar(256) DEFAULT NULL,
  `awardedOn` date DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `scopeTypeId` int(11) DEFAULT NULL,
  `awardTypeId` int(11) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `communityEngaged` tinyint(1) DEFAULT NULL,
  `activityType` int(11) DEFAULT NULL,
  `activityYear` year(4) DEFAULT NULL,
  `activitySubtype` int(11) DEFAULT NULL,
  `isExcludedFromReporting` tinyint(1) DEFAULT NULL,
  `desiredVisibility` int(11) DEFAULT NULL,
  `sourceType` int(11) DEFAULT NULL,
  `contributorIds` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table book_chapters
# ------------------------------------------------------------

CREATE TABLE `book_chapters` (
  `id` int(11) unsigned NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `publisher` varchar(256) DEFAULT NULL,
  `isbn` varchar(32) DEFAULT NULL,
  `editors` varchar(256) DEFAULT NULL,
  `publishDate` date DEFAULT NULL,
  `bookName` varchar(512) DEFAULT NULL,
  `creativeWork` int(11) DEFAULT NULL,
  `doi` int(11) DEFAULT NULL,
  `abstract` varchar(16384) DEFAULT NULL,
  `significanceTypeId` int(11) DEFAULT NULL,
  `workStatusId` int(11) DEFAULT NULL,
  `workReviewStatusId` int(11) DEFAULT NULL,
  `publicationRoleId` int(11) DEFAULT NULL,
  `selected` tinyint(1) DEFAULT NULL,
  `invited` tinyint(1) DEFAULT NULL,
  `startPage` varchar(16) DEFAULT NULL,
  `endPage` varchar(16) DEFAULT NULL,
  `activityType` int(11) DEFAULT NULL,
  `activityYear` year(4) DEFAULT NULL,
  `activitySubtype` int(11) DEFAULT NULL,
  `isExcludedFromReporting` tinyint(1) DEFAULT NULL,
  `desiredVisibility` int(11) DEFAULT NULL,
  `sourceType` int(11) DEFAULT NULL,
  `contributorIds` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table books
# ------------------------------------------------------------

CREATE TABLE `books` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(512) DEFAULT NULL,
  `publisher` varchar(256) DEFAULT NULL,
  `isbn` varchar(32) DEFAULT NULL,
  `publishDate` date DEFAULT NULL,
  `creativeWork` int(11) DEFAULT NULL,
  `doi` int(11) DEFAULT NULL,
  `abstract` varchar(16384) DEFAULT NULL,
  `aascb` int(11) DEFAULT NULL,
  `significanceTypeId` int(11) DEFAULT NULL,
  `workStatusId` int(11) DEFAULT NULL,
  `workReviewStatusId` int(11) DEFAULT NULL,
  `publicationRoleId` int(11) DEFAULT NULL,
  `selected` tinyint(1) DEFAULT NULL,
  `invited` tinyint(1) DEFAULT NULL,
  `activityType` int(11) DEFAULT NULL,
  `activityYear` year(4) DEFAULT NULL,
  `activitySubtype` int(11) DEFAULT NULL,
  `isExcludedFromReporting` tinyint(1) DEFAULT NULL,
  `desiredVisibility` int(11) DEFAULT NULL,
  `sourceType` int(11) DEFAULT NULL,
  `contributorIds` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table conference_proceedings
# ------------------------------------------------------------

CREATE TABLE `conference_proceedings` (
  `id` int(11) unsigned NOT NULL,
  `title` varchar(256) DEFAULT NULL,
  `digitalObjectIdentifier` varchar(128) DEFAULT NULL,
  `journalName` varchar(256) DEFAULT NULL,
  `journalVolume` varchar(16) DEFAULT NULL,
  `journalIssue` varchar(64) DEFAULT NULL,
  `journalYear` year(4) DEFAULT NULL,
  `publishDate` date DEFAULT NULL,
  `endDate` varchar(16) DEFAULT NULL,
  `firstPage` varchar(16) DEFAULT NULL,
  `lastPage` varchar(16) DEFAULT NULL,
  `abstract` varchar(16384) DEFAULT NULL,
  `significanceTypeId` int(11) DEFAULT NULL,
  `peerReviewed` tinyint(1) DEFAULT NULL,
  `communityEngaged` tinyint(1) DEFAULT NULL,
  `aascbClassificationTypeId` int(11) DEFAULT NULL,
  `workStatusId` int(11) DEFAULT NULL,
  `workReviewStatusId` int(11) DEFAULT NULL,
  `publicationRoleId` int(11) DEFAULT NULL,
  `selected` tinyint(1) DEFAULT NULL,
  `creativeWork` int(11) DEFAULT NULL,
  `invited` tinyint(1) DEFAULT NULL,
  `activityType` int(11) DEFAULT NULL,
  `activityYear` year(4) DEFAULT NULL,
  `activitySubtype` int(11) DEFAULT NULL,
  `isExcludedFromReporting` tinyint(1) DEFAULT NULL,
  `desiredVisibility` int(11) DEFAULT NULL,
  `sourceType` int(11) DEFAULT NULL,
  `contributorIds` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table grants
# ------------------------------------------------------------

CREATE TABLE `grants` (
  `id` int(11) unsigned NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `primaryInvestigatorId` int(11) DEFAULT NULL,
  `totalDollars` int(11) DEFAULT NULL,
  `agencyName` varchar(128) DEFAULT NULL,
  `agencyNameAbbreviation` varchar(8) DEFAULT NULL,
  `abstract` varchar(16384) DEFAULT NULL,
  `clientGrantId` varchar(128) DEFAULT NULL,
  `sponsor` varchar(256) DEFAULT NULL,
  `grantTypeId` int(11) DEFAULT NULL,
  `grantAwardeeTypeId` int(11) DEFAULT NULL,
  `communityEngaged` tinyint(1) DEFAULT NULL,
  `contractNumber` varchar(128) DEFAULT NULL,
  `universityGrantNumber` varchar(256) DEFAULT NULL,
  `calendarYear` year(4) DEFAULT NULL,
  `studentSupported` tinyint(1) DEFAULT NULL,
  `percentEffort` int(11) DEFAULT NULL,
  `grantStatusId` int(11) DEFAULT NULL,
  `activityType` int(11) DEFAULT NULL,
  `activityYear` year(4) DEFAULT NULL,
  `activitySubtype` int(11) DEFAULT NULL,
  `isExcludedFromReporting` tinyint(1) DEFAULT NULL,
  `desiredVisibility` int(11) DEFAULT NULL,
  `sourceType` int(11) DEFAULT NULL,
  `contributorIds` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table institution_units
# ------------------------------------------------------------

CREATE TABLE `institution_units` (
  `id` int(11) unsigned NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `baseName` varchar(128) DEFAULT NULL,
  `institutionId` varchar(32) DEFAULT NULL,
  `isPrimary` tinyint(1) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `building` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table institutions
# ------------------------------------------------------------

CREATE TABLE `institutions` (
  `id` int(11) unsigned NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `shortName` varchar(32) DEFAULT NULL,
  `siteName` varchar(32) DEFAULT NULL,
  `secondarySiteName` varchar(32) DEFAULT NULL,
  `logoPaths` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table patents
# ------------------------------------------------------------

CREATE TABLE `patents` (
  `id` int(11) unsigned NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `number` varchar(32) DEFAULT NULL,
  `country` varchar(128) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `patentKindId` int(11) DEFAULT NULL,
  `patentTypeId` int(11) DEFAULT NULL,
  `patentTypeName` varchar(16) DEFAULT NULL,
  `abstract` varchar(16384) DEFAULT NULL,
  `workStatusId` int(11) DEFAULT NULL,
  `categoryType` int(11) DEFAULT NULL,
  `countryName` varchar(128) DEFAULT NULL,
  `activityType` int(11) DEFAULT NULL,
  `activityYear` year(4) DEFAULT NULL,
  `activitySubtype` int(11) DEFAULT NULL,
  `isExcludedFromReporting` tinyint(1) DEFAULT NULL,
  `desiredVisibility` int(11) DEFAULT NULL,
  `sourceType` int(11) DEFAULT NULL,
  `contributorIds` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table people
# ------------------------------------------------------------

CREATE TABLE `people` (
  `id` int(11) unsigned NOT NULL,
  `aaid` int(11) DEFAULT NULL,
  `firstName` varchar(32) DEFAULT NULL,
  `lastName` varchar(32) DEFAULT NULL,
  `middleName` varchar(32) DEFAULT NULL,
  `primaryUnitAffiliationId` varchar(256) DEFAULT NULL,
  `nonPrimaryUnitAffiliationIds` varchar(256) DEFAULT NULL,
  `primaryInstitutionId` varchar(256) DEFAULT NULL,
  `homepage` varchar(256) DEFAULT NULL,
  `profilePhotoUrl` varchar(256) DEFAULT NULL,
  `desiredExposure` int(11) DEFAULT NULL,
  `isNonFaculty` tinyint(1) DEFAULT NULL,
  `degreeYear` year(4) DEFAULT NULL,
  `hasPreferredName` tinyint(1) DEFAULT NULL,
  `classroomEducationalMaterials` varchar(256) DEFAULT NULL,
  `onlineEducationalMaterials` varchar(256) DEFAULT NULL,
  `otherContent` varchar(256) DEFAULT NULL,
  `softwareDigitalMedia` varchar(256) DEFAULT NULL,
  `presentations` varchar(256) DEFAULT NULL,
  `researchDataSets` varchar(256) DEFAULT NULL,
  `reviewers` varchar(256) DEFAULT NULL,
  `communityEngagements` varchar(256) DEFAULT NULL,
  `technologies` varchar(256) DEFAULT NULL,
  `fieldResearch` varchar(256) DEFAULT NULL,
  `projects` varchar(256) DEFAULT NULL,
  `media` varchar(256) DEFAULT NULL,
  `memberships` varchar(256) DEFAULT NULL,
  `otherIntellectualProperty` varchar(256) DEFAULT NULL,
  `otherPublications` varchar(256) DEFAULT NULL,
  `researchTerms` varchar(1024) DEFAULT NULL,
  `degreeInstitutionName` varchar(128) DEFAULT NULL,
  `title` varchar(32) DEFAULT NULL,
  `researchSummary` varchar(8192) DEFAULT NULL,
  `researchInterests` varchar(256) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table research_terms
# ------------------------------------------------------------

CREATE TABLE `research_terms` (
  `term` varchar(32) NOT NULL DEFAULT '',
  `count` int(11) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `isUserEntered` tinyint(1) DEFAULT NULL,
  `score` float DEFAULT NULL,
  PRIMARY KEY (`term`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table technologies
# ------------------------------------------------------------

CREATE TABLE `technologies` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(1024) DEFAULT NULL,
  `introduction` varchar(8192) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `inventors` varchar(4096) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `technologyTypeId` int(11) DEFAULT NULL,
  `activityYear` year(4) DEFAULT NULL,
  `activityType` int(11) DEFAULT NULL,
  `activitySubtype` int(11) DEFAULT NULL,
  `isExcludedFromReporting` tinyint(1) DEFAULT NULL,
  `desiredVisibility` int(11) DEFAULT NULL,
  `sourceType` int(11) DEFAULT NULL,
  `contributorIds` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
