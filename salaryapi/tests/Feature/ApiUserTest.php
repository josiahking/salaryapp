<?php

use App\Models\User;
use Pest\Laravel\spy;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('user can login', function () {
    $user = User::factory()->create([
        'password' => 'password123',
    ]);
    $data = $user->only('email',);
    $response = $this->postJson('/api/login', ['password' => 'password123', ...$data]);
    $response->assertStatus(200)
        ->assertJsonStructure(['message', 'token']);
});


test('user can not login with invalid credentials', function () {
    $user = User::factory()->create([
        'password' => 'password123',
    ]);
    $data = $user->only('email', 'password');
    $response = $this->postJson('/api/login', [
        'email' => 'testemail@example.com', 'password' => 'wrongpassword'
    ]);
    $response->assertStatus(422)
    ->assertJsonValidationErrors(['error']);
});
