<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            "name"=>"Admin",
            "email"=>"admin@gmail.com",
            "password"=>Hash::make("admin"),
            "role_id"=>1
        ]);
        
        User::create([
            "name"=>"client",
            "email"=>"client@gmail.com",
            "password"=>Hash::make("client"),
            "role_id"=>2
        ]);
    }
}
