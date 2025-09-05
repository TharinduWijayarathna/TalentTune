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

    // Job Matching routes
    Route::get('job-matching', [App\Http\Controllers\JobMatchingController::class, 'index'])->name('job-matching.index');
    Route::get('job-matching/{id}', [App\Http\Controllers\JobMatchingController::class, 'show'])->name('job-matching.show');
    Route::post('job-matching/{id}/apply', [App\Http\Controllers\JobMatchingController::class, 'apply'])->name('job-matching.apply');
    Route::post('job-matching/{id}/save', [App\Http\Controllers\JobMatchingController::class, 'saveJob'])->name('job-matching.save');

    // Learning & Development routes
    Route::get('learning', [App\Http\Controllers\LearningController::class, 'index'])->name('learning.index');
    Route::get('learning/path/{id}', [App\Http\Controllers\LearningController::class, 'showPath'])->name('learning.path');

    // Interview Preparation routes
    Route::get('interview', [App\Http\Controllers\InterviewController::class, 'index'])->name('interview.index');
    Route::get('interview/practice', [App\Http\Controllers\InterviewController::class, 'practice'])->name('interview.practice');
    Route::post('interview/mock/start', [App\Http\Controllers\InterviewController::class, 'startMockInterview'])->name('interview.mock.start');
    Route::post('interview/answer', [App\Http\Controllers\InterviewController::class, 'submitAnswer'])->name('interview.answer');

    // Career Analytics routes
    Route::get('career-analytics', [App\Http\Controllers\CareerAnalyticsController::class, 'index'])->name('career-analytics.index');
    Route::get('career-analytics/skills', [App\Http\Controllers\CareerAnalyticsController::class, 'skillsAnalysis'])->name('career-analytics.skills');

    // Portfolio & Projects routes
    Route::get('portfolio', [App\Http\Controllers\PortfolioController::class, 'index'])->name('portfolio.index');
    Route::get('portfolio/{id}', [App\Http\Controllers\PortfolioController::class, 'show'])->name('portfolio.show');
    Route::post('portfolio', [App\Http\Controllers\PortfolioController::class, 'store'])->name('portfolio.store');
    Route::put('portfolio/{id}', [App\Http\Controllers\PortfolioController::class, 'update'])->name('portfolio.update');
    Route::delete('portfolio/{id}', [App\Http\Controllers\PortfolioController::class, 'destroy'])->name('portfolio.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
