<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    //
}
use App\Models\Player;

class PlayerController extends Controller
{
    public function index()
    {
        $players = Player::all(); // تجيب كل اللاعبين من الداتابيز
        return view('players', compact('players'));
    }
}
