<?php
namespace App\Enum;


use Illuminate\Validation\Rules\Enum;

class UserRole  extends Enum {

    const ADMIN = 'admin';
    const USER = 'user';
}
