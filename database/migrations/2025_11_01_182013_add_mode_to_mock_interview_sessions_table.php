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
        Schema::table('mock_interview_sessions', function (Blueprint $table) {
            $table->enum('mode', ['text', 'voice'])->default('text')->after('difficulty');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mock_interview_sessions', function (Blueprint $table) {
            $table->dropColumn('mode');
        });
    }
};
