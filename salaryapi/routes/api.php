<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\SubmitSalaryController;
use App\Http\Middleware\IsAdminMiddleware;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Welcome to the Salary API']);
});
Route::post('/login', LoginController::class);
Route::post('/submit-salary', SubmitSalaryController::class);
Route::middleware(['auth:sanctum', IsAdminMiddleware::class])->prefix('admin')->group(function () {
    Route::get('/salaries', [SalaryController::class, 'index']);
    Route::put('/salaries/{id}', [SalaryController::class, 'update']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
