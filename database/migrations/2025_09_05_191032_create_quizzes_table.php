<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('resume_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->json('questions'); // Array of quiz questions
            $table->json('skill_focus'); // Skills this quiz focuses on
            $table->integer('difficulty_level')->default(1); // 1-5 scale
            $table->integer('time_limit')->nullable(); // Time limit in minutes
            $table->boolean('is_completed')->default(false);
            $table->integer('score')->nullable();
            $table->json('answers')->nullable(); // User's answers
            $table->json('correct_answers')->nullable(); // Correct answers
            $table->text('feedback')->nullable(); // AI-generated feedback
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
