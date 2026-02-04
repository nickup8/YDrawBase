<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ComponentStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'supplier' => ['required', 'string', 'max:255'],
            'supplier_pn' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'ypn' => [
                'required',
                'string',
                'max:100',
                Rule::unique('components', 'ypn'),
            ],
            
            // Массив чертежей
            'drawings' => ['nullable', 'array'],
            'drawings.*' => [
                'required',
                'file',
                'mimes:pdf,dwg,dxf,jpg,jpeg,png',
                'max:10240', // 10MB
            ],
            
            // Массив спецификаций
            'specifications' => ['nullable', 'array'],
            'specifications.*' => [
                'required',
                'file',
                'mimes:pdf,doc,docx,xls,xlsx',
                'max:10240', // 10MB
            ],
            
            // Массив кримп-стандартов
            'crimp_standards' => ['nullable', 'array'],
            'crimp_standards.*' => [
                'required',
                'file',
                'mimes:pdf,doc,docx,jpg,jpeg,png',
                'max:10240', // 10MB
            ],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'supplier' => 'Поставщик',
            'supplier_pn' => 'Номер поставщика (SPN)',
            'description' => 'Описание',
            'ypn' => 'Номер компонента (YPN)',
            'drawings' => 'Чертежи',
            'specifications' => 'Спецификации',
            'crimp_standards' => 'Кримп-стандарты',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            // Основные поля
            'ypn.unique' => 'Компонент с таким номером уже существует',
            'ypn.required' => 'Номер компонента обязателен',
            'ypn.string' => 'Номер компонента должен быть строкой',
            'ypn.max' => 'Номер компонента не должен превышать 100 символов',
            
            'supplier.required' => 'Поставщик обязателен',
            'supplier.string' => 'Поставщик должен быть строкой',
            'supplier.max' => 'Поставщик не должен превышать 255 символов',
            
            'supplier_pn.required' => 'Номер поставщика обязателен',
            'supplier_pn.string' => 'Номер поставщика должен быть строкой',
            'supplier_pn.max' => 'Номер поставщика не должен превышать 255 символов',
            
            'description.string' => 'Описание должно быть строкой',
            'description.max' => 'Описание не должно превышать 1000 символов',
            
            // Чертежи
            'drawings.array' => 'Чертежи должны быть массивом',
            'drawings.*.required' => 'Файл чертежа обязателен',
            'drawings.*.file' => 'Чертеж должен быть файлом',
            'drawings.*.mimes' => 'Чертеж должен быть в формате: PDF, DWG, DXF, JPG, PNG',
            'drawings.*.max' => 'Размер чертежа не должен превышать 10 МБ',
            
            // Спецификации
            'specifications.array' => 'Спецификации должны быть массивом',
            'specifications.*.required' => 'Файл спецификации обязателен',
            'specifications.*.file' => 'Спецификация должна быть файлом',
            'specifications.*.mimes' => 'Спецификация должна быть в формате: PDF, DOC, DOCX, XLS, XLSX',
            'specifications.*.max' => 'Размер спецификации не должен превышать 10 МБ',
            
            // Кримп-стандарты
            'crimp_standards.array' => 'Кримп-стандарты должны быть массивом',
            'crimp_standards.*.required' => 'Файл кримп-стандарта обязателен',
            'crimp_standards.*.file' => 'Кримп-стандарт должен быть файлом',
            'crimp_standards.*.mimes' => 'Кримп-стандарт должен быть в формате: PDF, DOC, DOCX, JPG, PNG',
            'crimp_standards.*.max' => 'Размер кримп-стандарта не должен превышать 10 МБ',
        ];
    }
}