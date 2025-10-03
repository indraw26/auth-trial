<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => $request->password,
        ]);

        $token = Auth::login($user);

        return $this->respondWithToken($token, $user);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $token = Auth::guard('api')->attempt($credentials);

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => config('jwt.ttl') * 60,
            'user'         => Auth::guard('api')->user()
        ]);
    }


    public function me()
    {
        $user = Auth::guard('api')->user();
        $roleName = $user->role->name;
        return response()->json(compact('user', 'roleName'));
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    protected function respondWithToken($token, $user = null)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => Auth::factory()->getTTL() * 60,
            'user'         => $user ?? Auth::user()
        ]);
    }


    public function test()
    {
        $user = User::find(1);
        $roleName = $user->role->name;
        return response()->json(compact('user', 'roleName'));
    }
}
