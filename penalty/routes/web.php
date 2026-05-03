<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/register', function () {
    return view('players');
});

Route::get('/register-player', function () {
    return view('auth.register-player');
});
Route::get('/players', function () {
    return view('players.players');
});

Route::get('/top-players', function () {
    return view('players.top-players');
});
use App\Http\Controllers\PageController;

Route::get('/', [PageController::class, 'home']);
Route::get('/players', [PageController::class, 'players']);

use App\Http\Controllers\PlayerController;

Route::get('/players', [PlayerController::class, 'index']);
