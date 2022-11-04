<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function login(Request $req)
    {
        $credentials = [
            'email' => $req->email,
            'password' => $req->password,
        ];

        if (Auth::attempt($credentials)) {
            $message = 'Good';
            $success = true;
        } else {
            $success = false;
            $message = 'Unautorised';
        }
        return response()->json([
            'message' => $message,
            'success' => $success
        ]);
    }

    public function register(Request $req)
    {
        try {
            $user = new User();
            $user->email = $req->email;
            $user->name = $req->name;
            $user->password = Hash::make($req->password);
            if ($user->save()) {
                $credentials = [
                    'email' => $req->email,
                    'password' => $req->password
                ];
                if (Auth::attempt($credentials)) {
                    $message = 'Good';
                    $success = true;
                } else {
                    $success = false;
                    $message = 'Unautorised';
                }
            }
        } catch (\Throwable $th) {
            $success = false;
            $message = $th;
        }

        return response()->json([
            'message' => $message,
            'success' => $success
        ]);
    }

    public function logout(Request $req)
    {
        try {
            Session::flush();
            $success = true;
            $message = 'Logout successfully';
        } catch (\Throwable $th) {
            $success = false;
            $message = $th;
        }
        return response()->json([
            'message' => $message,
            'success' => $success
        ]);
    }
}
