<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->dropColumn('course_id');
            // $table->dropColumn('course');
            // $table->foreignId('course_id')->after('name')->constrained()->onDelete('cascade');
            // $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->dropForeign('stories_course_id_foreign');
            // $table->dropColumn('course_id');
            // $table->foreignId('course')->constrained()->onDelete('cascade');
            // $table->foreign('course', 'stories_course_foreign')->references('id')->on('courses')->onDelete('cascade');
        });
    }
};
