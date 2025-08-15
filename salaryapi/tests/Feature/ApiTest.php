<?php

test('Api is accessible', function () {
    $response = $this->get('/api');
    $response->assertStatus(200);
});
test('Server is up', function () {
    $response = $this->get('/up');
    $response->assertStatus(200);
});
test('Login endpoint works', function () {
    $response = $this->postJson('/api/login', []);
    expect($response->status())->not->toBe(404);
});
test('Salary submission endpoint works', function () {
    $response = $this->postJson('/api/submit-salary', []);
    expect($response->status())->not->toBe(404);
});

test('Admin endpoints work and requires authentication', function () {
    $adminSalariesResponse = $this->getJson('/api/admin/salaries');
    $adminUserResponse = $this->getJson('/api/admin/user');
    $this->assertNotEquals(404, $adminSalariesResponse->status());
    $this->assertNotEquals(404, $adminUserResponse->status());
    expect($adminSalariesResponse->status())->toBe(401);
    expect($adminUserResponse->status())->toBe(401);
});
