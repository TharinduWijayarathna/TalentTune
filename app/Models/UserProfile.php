<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id',
        'skill_assessments',
        'career_goals',
        'learning_preferences',
        'target_roles',
        'completed_quizzes',
        'skill_progress',
        'achievements',
        'bio',
        'linkedin_url',
        'github_url',
        'preferences',
    ];

    protected $casts = [
        'skill_assessments' => 'array',
        'career_goals' => 'array',
        'learning_preferences' => 'array',
        'target_roles' => 'array',
        'completed_quizzes' => 'array',
        'skill_progress' => 'array',
        'achievements' => 'array',
        'preferences' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
