<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Resume extends Model
{
    protected $fillable = [
        'user_id',
        'original_filename',
        'file_path',
        'file_type',
        'parsed_data',
        'extracted_skills',
        'work_experience',
        'education',
        'certifications',
        'ai_analysis',
        'skill_gaps',
        'job_fit_scores',
        'is_processed',
    ];

    protected $casts = [
        'parsed_data' => 'array',
        'extracted_skills' => 'array',
        'work_experience' => 'array',
        'education' => 'array',
        'certifications' => 'array',
        'skill_gaps' => 'array',
        'job_fit_scores' => 'array',
        'is_processed' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function quizzes(): HasMany
    {
        return $this->hasMany(Quiz::class);
    }

    public function recommendations(): HasMany
    {
        return $this->hasMany(Recommendation::class);
    }
}
