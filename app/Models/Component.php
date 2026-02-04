<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    public $fillable = ['supplier', 'supplier_pn','description','ypn'];
}
