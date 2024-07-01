<?php

namespace App\Exceptions;

use Exception;

class CategoryNotFoundException extends Exception
{
    public function __construct()
    {
        parent::__construct("Category not found.");
    }
}
