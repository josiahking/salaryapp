<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //retrieve all salaries
        $salaries = Salary::with('user')->get();
        return response()->json($salaries);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate the request
        $request->validate([
            'local_salary' => 'required|numeric',
            'salary_eur' => 'numeric',
            'commission_eur' => 'required|numeric',
        ]);

        // Find the salary by ID
        $salary = Salary::findOrFail($id);
        
        // Update the salary details
        $salary->local_salary = $request->local_salary;
        $salary->salary_eur = $request->salary_eur;
        $salary->commission_eur = $request->commission_eur;
        $salary->save();

        return response()->json(['message' => 'Salary updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
