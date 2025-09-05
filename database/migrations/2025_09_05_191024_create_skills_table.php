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
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category'); // technical, soft, language, etc.
            $table->string('subcategory')->nullable(); // programming, design, etc.
            $table->text('description')->nullable();
            $table->json('related_skills')->nullable(); // Skills that are related
            $table->json('job_roles')->nullable(); // Job roles that require this skill
            $table->integer('demand_level')->default(1); // 1-5 scale
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
