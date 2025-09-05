<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recommendation extends Model
{
    protected $fillable = [
        'user_id',
        'resume_id',
        'type',
        'title',
        'description',
        'category',
        'related_skills',
        'url',
        'provider',
        'priority',
        'metadata',
        'is_completed',
        'is_dismissed',
    ];

    protected $casts = [
        'related_skills' => 'array',
        'metadata' => 'array',
        'is_completed' => 'boolean',
        'is_dismissed' => 'boolean',
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
