<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('beacons', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(); // Optioneel: een herkenbare naam (bijv. "Beacon Kantine")
            $table->string('bluetooth_id')->unique(); // Het unieke ID dat de browser scant
            $table->string('redirect_url'); // De actie: de link waar de gebruiker heen moet
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beacons');
    }
};
