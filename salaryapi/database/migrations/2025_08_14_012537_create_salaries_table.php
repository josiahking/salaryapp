<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id');
            $table->string('local_currency',3)->nullable();
            $table->decimal('local_salary', 15, 2);
            $table->decimal('salary_eur', 15, 2)->nullable();
            $table->decimal('commission_eur', 15, 2)->default(500);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salaries');
    }
};
