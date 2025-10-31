<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            JobSeekerSeeder::class,
            HRProfessionalSeeder::class,
            AdminSeeder::class,
        ]);
    }
}
