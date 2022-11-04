<?php

use App\Http\Controllers\api\AnimeController;
use App\Http\Controllers\api\AuthController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/get-user', function () {
        return response()->json([
            'status' => 200,
            'user' => auth()->user()
        ]);
    });
    Route::post('/anime-add', [AnimeController::class, 'store']);
    Route::post('/anime-remove', [AnimeController::class, 'remove']);
    Route::post('/get-animes', [AnimeController::class, 'get']);
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/anime-check', [AnimeController::class, 'check']);
