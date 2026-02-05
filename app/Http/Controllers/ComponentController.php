<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComponentSearchRequest;
use App\Http\Requests\ComponentStoreRequest;
use App\Http\Resources\ComponentResource;
use App\Models\Component;
use App\Services\ComponentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ComponentController extends Controller
{
    public function __construct(private ComponentService $componentService) {}

    /**
     * Поиск компонентов
     */
    public function index(ComponentSearchRequest $request): Response
{
    $data = $request->validated();
    $components = null;

    // Загружаем файлы + счётчики
    if ($data['searchType'] === 'ypn') {
        $components = Component::with(['files'])
            ->withCount(['drawings', 'specifications', 'crimpStandards'])
            ->where('ypn', 'like', "%{$data['searchValue']}%")
            ->get();
    }

    if ($data['searchType'] === 'spn') {
        $components = Component::with(['files'])
            ->withCount(['drawings', 'specifications', 'crimpStandards'])
            ->where('supplier_pn', 'like', "%{$data['searchValue']}%")
            ->get();
    }

    return Inertia::render('componentsPage/component-search', [
        'components' => ComponentResource::collection($components),
        'searchValue' => $data['searchValue'],
    ]);
}

    /**
     * Форма создания компонента
     */
    public function create(): Response
    {
        return Inertia::render('componentsPage/component-create', [
            'success' => session('success'),
        ]);
    }

    /**
     * Сохранение нового компонента с файлами
     */
    public function store(ComponentStoreRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Сохраняем базовую информацию
        $component = $this->componentService->storeBasicInformation($data);

        // Сохраняем файлы
        $this->componentService->storeFiles($component, $data);

        return redirect()
            ->route('components.create', $component)
            ->with('success', "Компонент {$component->ypn} успешно создан");
    }

    /**
     * Просмотр компонента с файлами
     */
    public function show(int $id): Response
    {
        $component = $this->componentService->getComponentWithFiles($id);

        return Inertia::render('componentsPage/component-show', [
            'component' => $component,
            'files' => [
                'drawings' => $component->drawings,
                'specifications' => $component->specifications,
                'crimp_standards' => $component->crimpStandards,
            ],
        ]);
    }

    /**
     * Форма редактирования компонента
     */
    public function edit(int $id): Response
    {
        $component = $this->componentService->getComponentWithFiles($id);

        return Inertia::render('componentsPage/component-edit', [
            'component' => $component,
            'files' => [
                'drawings' => $component->drawings,
                'specifications' => $component->specifications,
                'crimp_standards' => $component->crimpStandards,
            ],
        ]);
    }

    /**
     * Обновление компонента
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'supplier' => 'required|string|max:255',
            'supplier_pn' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $this->componentService->updateComponent($id, $validated);

        return back()->with('success', 'Компонент успешно обновлён');
    }

    /**
     * Скачивание файла компонента
     */
    public function downloadFile(int $fileId)
    {
        return $this->componentService->downloadFile($fileId);
    }

    /**
     * Удаление файла компонента
     */
    public function deleteFile(int $fileId): RedirectResponse
    {
        $this->componentService->deleteFile($fileId);

        return back()->with('success', 'Файл успешно удалён');
    }

    /**
     * Удаление компонента
     */
    public function destroy(int $id): RedirectResponse
    {
        $component = Component::findOrFail($id);
        $component->delete();

        return redirect()
            ->route('components.index')
            ->with('success', 'Компонент успешно удалён');
    }
}