<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    function signup(SignUpRequest $request)
    {

        $data = $request->validated();
        $user = User::create([
            'name' => $data["email"],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])

        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));


    }

    public function login(LoginRequest $request)
    {

        //bypass the validation

        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request){

        /**  @var User $user */
        $user = $request ->user();
        $user->currentAccessToken()->delete();
        return response('YO BRO',204);


    }
}


