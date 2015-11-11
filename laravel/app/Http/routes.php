<?php
/*
 * User authentication routes
 * */
Route::get('/auth/login','AuthController@loggedin'); // Get login uses the loggedin method in the AuthController
Route::post('/auth/login','AuthController@login'); // Post to login uses the login method in the AuthController
Route::post('/auth/register','AuthController@register'); // Post to register uses the register method in the AuthController
Route::get('/auth/logout','AuthController@logout'); // Get to logout uses the logout method in the AuthController
Route::get('/auth/password','AuthController@passwordToken'); // Get password uses the passwordToken method in the AuthController
Route::post('/auth/password','AuthController@password'); // Post to password uses the password method in the AuthController
