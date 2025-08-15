<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(2)->state(new Sequence(
            [
                'is_admin' => true,
                'password' => 'password123',
            ],
            [
                'is_admin' => false,
                'password' => null,
            ]
        ))->create();
    }
}
