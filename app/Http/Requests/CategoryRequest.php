<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {

        
        return [
            "category_name" => "required|string|max:10000|min:3",
            "category_slug" => "required|string|max:100",
            "category_description" => "required|string|max:1000",
        ];
    }
}
