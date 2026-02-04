<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComponentSearchRequest;
use App\Http\Requests\ComponentStoreRequest;
use App\Http\Resources\ComponentResource;
use App\Services\ComponentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComponentController extends Controller
{
    public function __construct(private ComponentService $componentService) {
        
    }

    public function index(ComponentSearchRequest $request) {
        $data = $request->validated();
        $components = null;

        if ($data['searchType'] == 'ypn') {
            $components = $this->componentService->searchYpn($data['searchValue']);
        }

        if ($data['searchType'] == 'spn') {
            $components = $this->componentService->searchSpn($data['searchValue']);
        }
        return Inertia::render('componentsPage/component-search', [
            'components' => ComponentResource::collection($components),
            'searchValue' => $data['searchValue'],
        ]);
    }
     
    public function create() {
        return Inertia::render('componentsPage/component-create', [
            'success' => session('success')
        ]);
    }

    public function store(ComponentStoreRequest $request) {
        $data = $request->validated();
        $component = $this->componentService->storeBasicInformation($data);
        return back()->with('success', "Компонент $component->ypn успешно создан");
    }
}
