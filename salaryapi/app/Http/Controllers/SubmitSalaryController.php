<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Salary;

class SubmitSalaryController extends Controller
{
    //
    public function __invoke(Request $request)
    {
        // validate the request
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'currency' => 'required|string',
            'salary' => 'required|numeric',
        ]);
        // check if user exists via email, then update the salary
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            //create new user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => null,
            ]);
        }
        // update or create new salary
        $salary = Salary::where('user_id', $user->id)->first();
        if (!$salary) {
            $salary = new Salary();
        }
        $salary->submitSalary($user, $request->currency, $request->salary);

        return response()->json(['message' => 'Salary submitted successfully']);
    }
}
