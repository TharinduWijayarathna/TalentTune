<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    // Job Seeker Routes
    Route::get('cv-review', function () {
        return Inertia::render('CVReview');
    })->name('cv-review');

    Route::get('ats-scoring', function () {
        return Inertia::render('ATSScoring');
    })->name('ats-scoring');

    Route::get('mock-interview', function () {
        return Inertia::render('MockInterview');
    })->name('mock-interview');

    Route::get('portfolio', function () {
        return Inertia::render('Portfolio');
    })->name('portfolio');

    Route::get('profile-score', function () {
        return Inertia::render('ProfileScore');
    })->name('profile-score');

    Route::get('skill-expectations', function () {
        return Inertia::render('SkillExpectations');
    })->name('skill-expectations');

    Route::get('job-applications', function () {
        return Inertia::render('JobApplications');
    })->name('job-applications');

    // HR Professional Routes
    Route::get('post-jobs', function () {
        return Inertia::render('PostJobs');
    })->name('post-jobs');

    Route::get('review-candidates', function () {
        return Inertia::render('ReviewCandidates');
    })->name('review-candidates');

    Route::get('filter-candidates', function () {
        return Inertia::render('FilterCandidates');
    })->name('filter-candidates');

    Route::get('subscriptions', function () {
        return Inertia::render('Subscriptions');
    })->name('subscriptions');

    // Admin Routes
    Route::get('user-management', function () {
        return Inertia::render('admin/UserManagement');
    })->name('user-management');

    Route::get('company-management', function () {
        return Inertia::render('admin/CompanyManagement');
    })->name('company-management');

    Route::get('hr-management', function () {
        return Inertia::render('admin/HRManagement');
    })->name('hr-management');

    Route::get('analytics', function () {
        return Inertia::render('admin/Analytics');
    })->name('analytics');

    Route::get('payments', function () {
        return Inertia::render('admin/Payments');
    })->name('payments');
});

require __DIR__.'/settings.php';
