<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use Illuminate\Http\Request;

class AnimeController extends Controller
{
    public function check(Request $req)
    {
        if (!auth()->user()) {
            return response()->json([
                'status' => 300,
            ]);
        }
        $anime = Anime::where('user_id', auth()->user()->id)->where('anime_id', $req->id)->first();
        if (!empty($anime)) {
            return response()->json([
                'status' => 400,
            ]);
        }
        return response()->json([
            'status' => 200,
        ]);
    }
    public function store(Request $req)
    {
        $credentials = [
            'title' => $req->title,
            'image' => $req->image,
            'id' => $req->id,
        ];
        $user_id = auth()->user()->id;

        Anime::create([
            'user_id' => $user_id,
            'anime_title' => $credentials['title'],
            'anime_id' => $credentials['id'],
            'anime_image' => $credentials['image'],
        ]);
        return response()->json([
            'status' => 200,
        ]);
    }
    public function remove(Request $req)
    {
        $anime_id = $req->id;
        $user_id = auth()->user()->id;
        $anime = Anime::where('user_id', $user_id)->where('anime_id', $anime_id)->delete();

        return response()->json([
            'status' => 200,
        ]);
    }
    public function get()
    {
        $user_id = auth()->user()->id;
        return response()->json([
            'status' => 200,
            'animes' => Anime::where('user_id', $user_id)->get()
        ]);
    }
}
