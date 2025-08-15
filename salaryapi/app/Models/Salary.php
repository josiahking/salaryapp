<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    protected $fillable = [
        'local_currency',
        'user_id',
        'local_salary',
        'salary_eur',
        'commission_eur',
    ];

    protected $casts = [
        'salary_local' => 'decimal:2',
        'salary_eur' => 'decimal:2',
        'commission_eur' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function submitSalary(User $user, string $localCurrency, float $localSalary): void
    {
        $this->user()->associate($user);
        $this->local_currency = $localCurrency;
        $this->local_salary = $localSalary;
        $this->save();
    }
}
