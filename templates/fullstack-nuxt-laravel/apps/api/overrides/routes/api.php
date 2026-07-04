<?php

use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json([
    'status' => 'ok',
    'service' => config('app.name'),
    'time' => now()->toIso8601String(),
]));

Route::middleware('admin')->group(function () {
    Route::get('/me', fn () => response()->json(['authenticated' => true]));
});
