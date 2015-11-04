<?php
// User authentication routes
Route::get('/auth/loggedin','AuthController@loggedin');
Route::get('/auth/login','AuthController@login');
Route::get('/auth/register','AuthController@register');
Route::get('/auth/logout','AuthController@logout');
