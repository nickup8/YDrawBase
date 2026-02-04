<?php

namespace App\Services;

use App\Models\Component;

class ComponentService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function storeBasicInformation($data) {
        $baseInformation = Component::create([
            'ypn' => $data['ypn'],
            'supplier_pn' => $data['supplier_pn'],
            'supplier' => $data['supplier'],
            'description' => $data['description']
        ]);
        return $baseInformation;
    }

    public function searchYpn ($data) {
        $component = Component::where('ypn', 'like', '%' . $data . '%')->get();
        return $component;
    }

    public function searchSpn ($data) {
        $component = Component::where('supplier_pn', 'like', '%' . $data . '%')->get();
        return $component;
    }
}
