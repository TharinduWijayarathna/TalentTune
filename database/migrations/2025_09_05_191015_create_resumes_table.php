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
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('original_filename');
            $table->string('file_path');
            $table->string('file_type'); // pdf, docx
            $table->json('parsed_data'); // AI-parsed resume content
            $table->json('extracted_skills'); // Skills extracted from resume
            $table->json('work_experience'); // Work experience data
            $table->json('education'); // Education data
            $table->json('certifications'); // Certifications data
            $table->text('ai_analysis'); // AI analysis summary
            $table->json('skill_gaps'); // Identified skill gaps
            $table->json('job_fit_scores'); // Job fit scores for different roles
            $table->boolean('is_processed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resumes');
    }
};
