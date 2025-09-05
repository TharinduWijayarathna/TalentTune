<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Resume routes (merged with CV review)
    Route::get('resume', [App\Http\Controllers\ResumeController::class, 'index'])->name('resume.index');
    Route::post('resume/upload', [App\Http\Controllers\ResumeController::class, 'store'])->name('resume.store');
    Route::get('resume/{resume}', [App\Http\Controllers\ResumeController::class, 'show'])->name('resume.show');

    // Skill Profile routes
    Route::get('skills', [App\Http\Controllers\SkillController::class, 'index'])->name('skills.index');

    // Quiz routes
    Route::get('quizzes', [App\Http\Controllers\QuizController::class, 'index'])->name('quizzes.index');
    Route::get('quizzes/{quiz}', [App\Http\Controllers\QuizController::class, 'show'])->name('quizzes.show');
    Route::post('quizzes/{quiz}/submit', [App\Http\Controllers\QuizController::class, 'submit'])->name('quizzes.submit');

    // Recommendations routes
    Route::get('recommendations', [App\Http\Controllers\RecommendationController::class, 'index'])->name('recommendations.index');

    // AI Chat routes
    Route::get('ai-chat', [App\Http\Controllers\AiChatController::class, 'index'])->name('ai-chat.index');
    Route::post('ai-chat/send', [App\Http\Controllers\AiChatController::class, 'sendMessage'])->name('ai-chat.send');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
