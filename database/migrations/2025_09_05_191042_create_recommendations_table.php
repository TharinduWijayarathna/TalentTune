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
        Schema::create('recommendations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('resume_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('type'); // course, certification, job_role, skill, etc.
            $table->string('title');
            $table->text('description');
            $table->string('category'); // learning, career, skill_development
            $table->json('related_skills'); // Skills this recommendation addresses
            $table->string('url')->nullable(); // External link
            $table->string('provider')->nullable(); // Course provider, etc.
            $table->integer('priority')->default(1); // 1-5 priority scale
            $table->json('metadata')->nullable(); // Additional data
            $table->boolean('is_completed')->default(false);
            $table->boolean('is_dismissed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recommendations');
    }
};
