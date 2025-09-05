<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'category',
        'subcategory',
        'description',
        'related_skills',
        'job_roles',
        'demand_level',
    ];

    protected $casts = [
        'related_skills' => 'array',
        'job_roles' => 'array',
    ];
}
