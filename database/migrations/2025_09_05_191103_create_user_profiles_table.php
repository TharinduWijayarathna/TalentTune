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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->json('skill_assessments'); // User's skill levels
            $table->json('career_goals'); // User's career objectives
            $table->json('learning_preferences'); // Learning style preferences
            $table->json('target_roles'); // Desired job roles
            $table->json('completed_quizzes'); // Quiz completion history
            $table->json('skill_progress'); // Skill improvement tracking
            $table->json('achievements'); // User achievements/badges
            $table->text('bio')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('github_url')->nullable();
            $table->json('preferences')->nullable(); // User preferences
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
