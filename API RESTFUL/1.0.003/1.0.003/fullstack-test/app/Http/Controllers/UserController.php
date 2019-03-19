<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(Request $request) {
        $data = $request->all();
        if(!User::where('email', $data['email'])->count()) {
            $data['password'] = bcrypt($data['password']);
            $user = User::create($data);
            return response()->json(['data'=>$user], 201);
        } else {
            return response()->json(['message'=>'Este e-mail já está cadastrado'], 400);
        }
    }

    public function list() {
        $user = User::all();

        return response()->json(['data'=>$user], 302);
    }
}
