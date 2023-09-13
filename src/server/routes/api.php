<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\CollaboratorController;
use App\Http\Controllers\InstitutionUnitController;
use App\Http\Controllers\Activities\ArticleController;
use App\Http\Controllers\Activities\AwardController;
use App\Http\Controllers\Activities\BookChapterController;
use App\Http\Controllers\Activities\BookController;
use App\Http\Controllers\Activities\ConferenceProceedingController;
use App\Http\Controllers\Activities\GrantController;
use App\Http\Controllers\Activities\PatentController;
use App\Http\Controllers\Activities\TechnologyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('environment', function() {
	return App::environment();
});

// institution routes
//
Route::get('institution-units', [InstitutionUnitController::class, 'getAll']);
Route::get('institution-units/full', [InstitutionUnitController::class, 'getFull']);
Route::get('institution-units/{id}', [InstitutionUnitController::class, 'getIndex']);
Route::get('institution-units/{id}/people', [InstitutionUnitController::class, 'getPeople']);
Route::get('institution-units/{id}/affiliations', [InstitutionUnitController::class, 'getAffiliates']);

// person routes
//
Route::post('people', [PersonController::class, 'postCreate']);
Route::get('people', [PersonController::class, 'getAll']);
Route::get('people/{id}', [PersonController::class, 'getIndex']);
Route::get('people/{id}/profile/photo', [PersonController::class, 'getProfilePhoto']);
Route::get('people/{id}/profile/thumb', [PersonController::class, 'getProfileThumbnail']);
Route::put('people/{id}', [PersonController::class, 'putUpdate']);
Route::delete('people/{id}', [PersonController::class, 'deleteIndex']);
Route::get('people/{id}/collaborators', [CollaboratorController::class, 'getByPerson']);
Route::get('people/{id}/articles', [ArticleController::class, 'getByPerson']);
Route::get('people/{id}/awards', [AwardController::class, 'getByPerson']);
Route::get('people/{id}/book-chapters', [BookChapterController::class, 'getByPerson']);
Route::get('people/{id}/books', [BookController::class, 'getByPerson']);
Route::get('people/{id}/conference-proceedings', [ConferenceProceedingController::class, 'getByPerson']);
Route::get('people/{id}/grants', [GrantController::class, 'getByPerson']);
Route::get('people/{id}/patents', [PatentController::class, 'getByPerson']);
Route::get('people/{id}/technologies', [TechnologyController::class, 'getByPerson']);

// activity routes
//
Route::get('articles', [ArticleController::class, 'getAll']);
Route::get('articles/{id}', [ArticleController::class, 'getIndex']);

Route::get('awards', [AwardController::class, 'getAll']);
Route::get('awards/{id}', [AwardController::class, 'getIndex']);

Route::get('book-chapters', [BookChapterController::class, 'getAll']);
Route::get('book-chapters/{id}', [BookChapterController::class, 'getIndex']);

Route::get('books', [BookController::class, 'getAll']);
Route::get('books/{id}', [BookController::class, 'getIndex']);

Route::get('conference-proceedings', [ConferenceProceedingController::class, 'getAll']);
Route::get('conference-proceedings/{id}', [ConferenceProceedingController::class, 'getIndex']);

Route::get('grants', [GrantController::class, 'getAll']);
Route::get('grants/{id}', [GrantController::class, 'getIndex']);

Route::get('patents', [PatentController::class, 'getAll']);
Route::get('patents/{id}', [PatentController::class, 'getIndex']);

Route::get('technologies', [TechnologyController::class, 'getAll']);
Route::get('technologies/{id}', [TechnologyController::class, 'getIndex']);
