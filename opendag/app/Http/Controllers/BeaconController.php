<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Beacon; // Importeer het Beacon model

class BeaconController extends Controller
{
    public function check(Request $request)
    {
        // 1. Valideer of de React-frontend wel een ID heeft gestuurd
        $request->validate([
            'beacon_id' => 'required|string',
        ]);

        // 2. Zoek in de database naar een beacon met dit specifieke bluetooth_id
        $beacon = Beacon::where('bluetooth_id', $request->beacon_id)->first();

        // 3. Als de beacon bestaat, sturen we de gekoppelde actie (URL) terug naar React
        if ($beacon) {
            return response()->json([
                'success' => true,
                'redirect_url' => $beacon->redirect_url // Dit is de gekoppelde actie!
            ]);
        }

        // 4. Bestaat het ID niet in de database? Geef een foutmelding terug
        return response()->json([
            'success' => false,
            'message' => 'Deze beacon is nog niet gekoppeld aan een actie in het systeem.'
        ], 404);
    }

public function store(Request $request) 
{
    // 1. Valideer de binnenkomende formuliergegevens
    $request->validate([
        'bluetooth_id' => 'required|string',
        'name'         => 'required|string|max:255',
        'redirect_url' => 'required|url', // Moet een geldige link zijn (https://...)
    ]);

    // 2. Sla op in de database (of update als het bluetooth_id al bestaat)
    Beacon::updateOrCreate(
        ['bluetooth_id' => $request->bluetooth_id], // Zoekwaarde
        [
            'name'         => $request->name,
            'redirect_url' => $request->redirect_url
        ]
    );

    // 3. GEFIXT VOOR INERTIA: Stuur de gebruiker terug met een flash-bericht
    // Je kunt hier ook 'redirect()->route('dashboard')' of iets anders gebruiken
    return redirect()->back()->with('success', 'Beacon is succesvol gekoppeld!');
}
}