<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Quiz extends Model
{
    protected $fillable = [
        'user_id',
        'resume_id',
        'title',
        'description',
        'questions',
        'skill_focus',
        'difficulty_level',
        'time_limit',
        'is_completed',
        'score',
        'answers',
        'correct_answers',
        'feedback',
    ];

    protected $casts = [
        'questions' => 'array',
        'skill_focus' => 'array',
        'answers' => 'array',
        'correct_answers' => 'array',
        'is_completed' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function resume(): BelongsTo
    {
        return $this->belongsTo(Resume::class);
    }
}
