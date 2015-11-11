<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use Auth;
use Illuminate\Database\QueryException;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /*
     * Logged in method
     * */
    public function loggedin()
    {
        // Check to see if we are logged in via remember me cookie or valid session
        if (!Auth::check()) {
            // If not then return false
            return response([
                'success' => false
            ], 400);
        } else {
            // If so then return true as we still have a valid session cookie
            return response([
                'success' => true,
                'user' => Auth::user()
            ], 200);
        }
    }
    /*
     * Login method
     * */
    public function login(Request $request)
    {
        // Post data
        $post_data = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];

        // Remember token
        $remember = $request->input('remember');

        // Attempt to log in
        if (Auth::attempt($post_data, $remember)) {
            // If login is successful return true and user data
            return response([
                'success' => true,
                'user' => Auth::user()
            ], 200);
        } else {
            // Login attempt failed so check if the user exists
            $user = User::whereEmail($post_data['email'])->first();
            if (count($user) === 0) {
                // If user does not exist then return false
                return response([
                    'success' => false,
                    'user' => false,
                    'message' => 'User does not exist'
                ], 400);
            } else {
                // If user does exist then check the password.  If the password doesn't match then return false
                if (!Hash::check($post_data['password'], $user->password)) {
                    return response([
                        'success' => false,
                        'user' => true,
                        'password' => false,
                        'message' => 'Wrong password'
                    ], 400);
                } else {
                    // It's all jacked up
                    return response([
                        'success' => false,
                        'message' => 'Server error'
                    ], 500);
                }
            }
        }
    }
    /*
     * Register method
     * */
    public function register(Request $request)
    {
        // Post data
        $post_data = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password'))
        ];

        // Create a new User model with the post data
        $user = new User($post_data);
        // Try to save the user
        try {
            $user->save();
        } catch (QueryException $e) {
            // The email field in the users table has a unique index so it will throw an error
            // if there is a duplicate
            if (preg_match('/Duplicate entry/', $e->getMessage())) {
                return response([
                    'success' => false,
                    'message' => 'User Exists'
                ], 400);
            } else {
                return response([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 500);
            }
        }
        // If the user create was a success return Accepted and loggedin false.
        if ($user->exists) {
            return response([
                'success' => true
            ], 200);
        } else {
            return response([
                'success' => false,
                'message' => 'Server error'
            ], 500);
        }
    }
    /*
     * Logout method
     * */
    public function logout()
    {
        Auth::logout();
        if (!Auth::check()) {
            return response([
                'success' => true
            ], 200);
        }
    }
    /*
     * PasswordCode method will update the password_resets table with a code and send it back to the client
     * */
    public function passwordToken(Request $request) {
        // Check that this user exists
        $user = User::where('email',$request->input('email'))->count();
        // If user exists
        if ($user === 1) {
            // Post data
            $post_data = [
                'email' => $request->input('email'),
                'token' => bcrypt($request->input('email') . time() . mt_rand()),
                'created_at' => date('Y-m-d H:i:s')
            ];
            // Insert a new pasword reset token
            DB::table('password_resets')->insert($post_data);
            // Retrieve the token
            $token = DB::table('password_resets')->where('email',$request->input('email'))->orderBy('created_at','desc')->first(['token']);
            // Respond with the token
            return response([
                'success' => true,
                'token' => $token->token
            ], 200);
        } else {
            // If user does not exist
            return response([
                'success' => false,
                'user' => false,
                'message' => 'User does not exist'
            ], 400);
        }
    }
    /*
     * Password method resets the password
     * */
    public function password(Request $request) {
        $token = DB::table('password_resets')->where('email',$request->input('email'))->orderBy('created_at','desc')->first(['token']);
        if ($token->token == $request->input('password_token')) {
            $user = User::where('email',$request->input('email'))->first();
            $user->password = bcrypt($request->input('password'));
            if ($user->save()) {

                DB::table('password_resets')->where('email',$request->input('email'))->where('token',$token->token)->delete();

                return response([
                    'success' => true
                ], 200);
            }
        } else {
            return response([
                'success' => false,
                'token' => false,
                'message' => 'Token does not match'
            ], 400);
        }
    }
}